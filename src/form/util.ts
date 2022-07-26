/* eslint-disable no-param-reassign */
import moment from 'moment';
import { FormConfigProps } from './type.form';
import { CoreFormInstance } from './type.instance';

// 表单项是否弹出层
export const isPopupContainer = (type: string) => {
  return [
    'AsyncSelect',
    'AsyncCascader',
    'DebounceSelect',
    'Select',
    'AutoComplete',
    'Cascader',
    'TreeSelect',
    'AsyncTreeSelect',
    'DatePicker',
    'RangePicker',
    'TimeRange',
    'TimePicker',
  ].includes(type);
};

/** Item扩展的属性 */
export const isExpansionItemProps = {
  __parentKey__: '',
  props: '',
  visible: '',
  transform: '',
  effect: '',
  onEffect: '',
  effectClearField: '',
  type: '',
  beforeReceive: '',
  span: '',
  expand: '',
  autoSearch: '',
  itemRender: '',
  required: '',
  readOnly: '',
  disabled: '',
  labelWidth: '',
  nameAlise: '',
  actionRef: '',
};

// 渲染之前做些事情
export const beforeFieldRender = (field: any, form: any) => {
  // 扩展 required、disabled、readOnly 支持function
  if (typeof field.required === 'function') {
    field.required = field.required(form);
  }
  if (typeof field.disabled === 'function') {
    field.disabled = field.disabled(form);
  }
  if (typeof field.readOnly === 'function') {
    field.readOnly = field.readOnly(form);
  }
  // 必填逻辑处理
  if (field.required === true) {
    if (Array.isArray(field.rules)) {
      field.rules.push({
        required: true,
        message: `${field.label || ''}不能为空`,
      });
    } else {
      field.rules = [
        {
          required: true,
          message: `${field.label || ''}不能为空`,
        },
      ];
    }
  }
  const pureFields: any = {};
  Object.keys(field).forEach((key) => {
    // 过滤下扩展属性
    if (!(key in isExpansionItemProps)) {
      pureFields[key] = field[key];
    }
  });
  return pureFields;
};

/** 前置格式转化下、默认处理一些逻辑 */
export const tranfromSchema = (
  schema: any[],
  name: string,
  column = 1,
  formConfig?: FormConfigProps,
) => {
  schema?.forEach((field: any) => {
    // 兼容下
    if (field.props === undefined) {
      field.props = {};
    }
    if (field.type === 'FieldSet' && Array.isArray(field.props.children)) {
      // 递归下
      return tranfromSchema(field.props.children, name, column, formConfig);
    }
    if (field.type === 'FormList' && Array.isArray(field.props.schema)) {
      // 递归下
      tranfromSchema(field.props.schema, name, undefined, formConfig);
    }
    // Input默认64长度限制
    if (field.type === 'Input') {
      field.props.maxLength = field.props.maxLength || 64;
    }
    // 默认开启allowClear和设置placeholder
    if (
      [
        'Input',
        'InputNumber',
        'DebounceInput',
        'BankCardInput',
        'AmountInput',
        'TextArea',
        'Password',
      ].includes(field.type)
    ) {
      if (
        !['InputNumber', 'BankCardInput', 'AmountInput'].includes(field.type)
      ) {
        // 不支持allowClear属性
        field.props.allowClear =
          field.props.allowClear === undefined ? true : field.props.allowClear; // 默认允许清除
      }
      field.props.placeholder =
        field.props.placeholder || `请输入${field.label || ''}`; // 默认提示
    }
    // 处理popup类挂载容器
    if (isPopupContainer(field.type)) {
      let popupName = field.name;
      if (Array.isArray(popupName)) {
        // 处理FormList属性名是数组的问题
        popupName = popupName.join('_');
      }
      field.props.allowClear =
        field.props.allowClear === undefined ? true : field.props.allowClear; // 默认允许清除
      // 区间查询不需要设置
      if (!['RangePicker', 'TimeRange'].includes(field.type)) {
        field.props.placeholder =
          field.props.placeholder || `请选择${field.label || ''}`; // 默认提示
      }
      // 生成挂载容器标识
      field.popupid = `${name}_${popupName}`;
      // 挂载到指定的popupid
      if (typeof field.props.getPopupContainer !== 'function') {
        field.props.getPopupContainer = () => {
          return document.querySelector(
            `[popupid=${field.popupid}] .ant-form-item-control`,
          );
        };
      }
    }
    // 配置了showSearch的查询框默认开启模糊匹配
    if (
      ['Select', 'AsyncSelect'].includes(field.type) &&
      field.props.showSearch &&
      typeof field.props.filterOption === 'undefined'
    ) {
      field.props.filterOption = (key, option: any) => {
        const labelAlise = field.props.fieldNames?.label || 'label'; // 获取别名
        return option[labelAlise]?.indexOf(key) >= 0;
      };
    }
    // 简化 BlockQuote 写法、不用写span和key
    if (field.type === 'BlockQuote') {
      field.span = field.span || column;
      field.key = field.props.title;
    }
    // 基于gridColumnStart设置列数
    const style = field.style || {};
    if (field.span) {
      field.style = {
        ...style,
        gridColumnStart: `span ${field.span}`,
      };
    }
    // 日期格式转换默认帮处理下
    if (['DatePicker', 'TimePicker'].includes(field.type)) {
      const format =
        field.props.format ||
        (field.type === 'DatePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      if (!field.beforeReceive) {
        // string | number -> moment
        field.beforeReceive = (values) => {
          return (
            values[field.name] &&
            (typeof values[field.name] === 'number'
              ? moment(values[field.name])
              : moment(values[field.name], format))
          );
        };
      }
      if (!field.transform) {
        // moment- > string
        field.transform = (values) => {
          const dateMoment = values[field.name];
          return {
            [field.name]: dateMoment?.format(format),
          };
        };
      }
    }
    // 日期区间格式转换默认帮处理下
    if (['RangePicker', 'TimeRange'].includes(field.type)) {
      // 没有配置nameAlise不做处理
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      const format =
        field.props.format ||
        (field.type === 'RangePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      const startName = field.nameAlise?.[0];
      const endName = field.nameAlise?.[1];
      if (!field.beforeReceive) {
        // string | number -> moment
        field.beforeReceive = (values) => {
          return (
            values[startName] &&
            values[endName] && [
              typeof values[startName] === 'number'
                ? moment(values[startName])
                : moment(values[startName], format),
              typeof values[endName] === 'number'
                ? moment(values[endName])
                : moment(values[endName], format),
            ]
          );
        };
      }
      if (!field.transform) {
        // moment -> string
        field.transform = (values) => {
          const dateMoment = values[field.name];
          return dateMoment
            ? {
                [startName]: dateMoment[0].format(format),
                [endName]: dateMoment[1].format(format),
              }
            : {
                [startName]: undefined,
                [endName]: undefined,
              };
        };
      }
    }
  });
};

/** 容器滑动到指定的子元素 */
export const scrollToElement = (container, childNode, gap = 50) => {
  if (childNode) {
    // eslint-disable-next-line no-param-reassign
    container.scrollTo({
      top: childNode.offsetTop - container.offsetTop - gap,
      behavior: 'smooth',
    });
  }
};

/** 是否是符合 FieldSet */
export const isFieldSet = (field) => {
  return (
    field.type === 'FieldSet' &&
    (Array.isArray(field.props?.children) ||
      typeof field.props?.children === 'function')
  );
};

/** 处理transform */
export const getCombination = (
  values: any,
  formSchema,
  options: {
    name: string;
    form: CoreFormInstance;
    initialValues: object;
  },
  combination = {},
) => {
  formSchema?.forEach((field: any) => {
    // 这里过滤下不展示、或者没有定义name的字段
    if (
      field.visible?.({
        ...options.initialValues, // 保留默认值
        ...options.form.getFieldsValue(), // 当前表单值
        ...combination, // FieldSet兼容
      }) === false ||
      field.name === undefined
    ) {
      return;
    }
    if (isFieldSet(field) && field.name) {
      // 递归处理下
      const childrenFields =
        typeof field.props?.children === 'function'
          ? field.props?.children(options.form)
          : field.props?.children;
      // 格式处理下
      if (typeof field.props?.children === 'function') {
        tranfromSchema(childrenFields, options.name, field.props.column);
      }
      combination[field.name] = {}; // 创建容器
      // 递归处理下
      return getCombination(
        values,
        childrenFields,
        options,
        combination[field.name],
      );
    }
    Object.assign(
      combination,
      typeof field.transform === 'function'
        ? field.transform({ ...values, ...combination })
        : {
            [field.name]: values[field.name],
          },
    );
    delete values[field.name]; // remove
  });
  return { ...values, ...combination };
};

/** 处理 beforeReceive */
export const parseBeforeReceive = (
  values: any,
  formSchema,
  options: {
    name: string;
    form: CoreFormInstance;
    initialValues: object;
  },
  parseValue = {},
) => {
  formSchema?.forEach((field: any) => {
    if (isFieldSet(field) && field.name) {
      // 递归处理下
      const childrenFields =
        typeof field.props?.children === 'function'
          ? field.props?.children(
              {
                ...options.form,
                initialValues: options.initialValues,
              },
              true,
            )
          : field.props?.children;
      // 格式处理下
      if (typeof field.props?.children === 'function') {
        tranfromSchema(childrenFields, options.name, field.props.column);
      }
      return parseBeforeReceive(
        values[field.name] || {},
        childrenFields,
        options,
        parseValue,
      );
    }
    parseValue[field.name] =
      typeof field.beforeReceive === 'function'
        ? field.beforeReceive(values)
        : values[field.name];
  });
  return {
    ...values,
    ...parseValue,
  };
};
