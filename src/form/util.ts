/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { getGlobalConfig } from '@/config';
import moment from 'moment';
import { uuid } from 'react-core-form-tools';

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
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    if (field.rules.every((i) => i.required !== true)) {
      field.rules.push({
        required: true,
        message: `${field.label || ''}不能为空`,
      });
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
export const tranfromSchema = (schema: any[], name: string, column = 1) => {
  // 读取全局配置
  const {
    defaultInputMaxLength,
    defaultOpenAllowClear,
    defaultFillPlaceholder,
    defaultShowInputCount,
    autoTransfromDatePicker,
  } = getGlobalConfig();
  /** 开始扩展 */
  schema?.forEach((field: any) => {
    // 兼容下
    if (field.name === undefined) {
      field.name = field.key || uuid(8);
    }
    // 兼容下
    if (field.props === undefined) {
      field.props = {};
    }
    if (field.type === 'FieldSet' && Array.isArray(field.props.children)) {
      // 递归下
      return tranfromSchema(field.props.children, name, column);
    }
    if (field.type === 'FormList' && Array.isArray(field.props.schema)) {
      // 递归下
      tranfromSchema(field.props.schema, name, undefined);
    }
    // Input默认64长度限制
    if (field.type === 'Input') {
      field.props.maxLength = field.props.maxLength || defaultInputMaxLength;
    }
    // 默认开启allowClear和设置placeholder
    if (['Input', 'InputNumber', 'TextArea', 'Password'].includes(field.type)) {
      if (!['InputNumber'].includes(field.type)) {
        if (defaultOpenAllowClear) {
          field.props.allowClear =
            field.props.allowClear === undefined
              ? true
              : field.props.allowClear;
        }
      }
      if (defaultFillPlaceholder) {
        field.props.placeholder =
          field.props.placeholder || `请输入${field.label || ''}`;
      }
      if (
        defaultShowInputCount &&
        field.type === 'Input' &&
        field.props.showWordLimit === undefined
      ) {
        field.props.showWordLimit = true;
      }
    }
    // 处理popup类挂载容器
    if (isPopupContainer(field.type)) {
      let popupName = field.name;
      if (Array.isArray(popupName)) {
        // 处理FormList属性名是数组的问题
        popupName = popupName.join('_');
      }
      if (defaultOpenAllowClear) {
        field.props.allowClear =
          field.props.allowClear === undefined ? true : field.props.allowClear;
      }
      // 区间查询不需要设置
      if (!['RangePicker', 'TimeRange'].includes(field.type)) {
        field.props.placeholder =
          field.props.placeholder || `请选择${field.label || ''}`; // 默认提示
      }
    }
    // 配置了showSearch的查询框默认开启模糊匹配
    if (
      ['Select', 'AsyncSelect'].includes(field.type) &&
      field.props.showSearch &&
      typeof field.props.filterOption === 'undefined'
    ) {
      field.props.filterOption = (inputValue: string, option) => {
        // 不做大小写兼容
        return option.props.children.includes(inputValue);
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
    // RangeInput 默认处理
    if (field.type === 'RangeInput') {
      // 没有配置 nameAlise 不做处理
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      const start = field.nameAlise?.[0];
      const end = field.nameAlise?.[1];
      if (!field.beforeReceive) {
        field.beforeReceive = (values) => {
          return (values[start] || values[end]) && [values[start], values[end]];
        };
      }
      if (!field.transform) {
        field.transform = (values) => {
          const nowValue = values[field.name];
          return {
            [start]: nowValue?.[0],
            [end]: nowValue?.[1],
          };
        };
      }
    }
    if (autoTransfromDatePicker) {
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
          field.beforeReceive = (values) => {
            let start;
            let end;
            if (values[startName]) {
              start =
                typeof values[startName] === 'number'
                  ? moment(values[startName])
                  : moment(values[startName], format);
            }
            if (values[endName]) {
              end =
                typeof values[endName] === 'number'
                  ? moment(values[endName])
                  : moment(values[endName], format);
            }
            return start || end ? [start, end] : undefined;
          };
        }
        if (!field.transform) {
          // moment to string
          field.transform = (values) => {
            const dateMoment = values[field.name];
            return {
              [startName]: dateMoment?.[0]
                ? dateMoment[0].format(format)
                : undefined,
              [endName]: dateMoment?.[1]
                ? dateMoment[1].format(format)
                : undefined,
            };
          };
        }
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
