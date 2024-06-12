/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { getGlobalConfig } from '@/config';
import { uuid } from '@/util';

// 表单项是否弹出层
export const isPopupContainer = (widget: string) => {
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
  ].includes(widget);
};

/** Item扩展的属性 */
export const isExpansionItemProps = {
  __parentKey__: '',
  props: '',
  visible: '',
  isVisible: '',
  effect: '',
  onEffect: '',
  effectClearField: '',
  widget: '',
  span: '',
  expand: '',
  autoSearch: '',
  itemRender: '',
  required: '',
  readOnly: '',
  disabled: '',
  actionRef: '',
  gridItemStyle: '',
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
    defaultShowSearch,
    defaultSetPopupContainer,
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
    if (
      ['FormList', 'FieldSet'].includes(field.widget) &&
      Array.isArray(field.props.children)
    ) {
      // 递归下
      return tranfromSchema(field.props.children, name, column);
    }
    // Input默认64长度限制
    if (field.widget === 'Input') {
      field.props.maxLength = field.props.maxLength || defaultInputMaxLength;
    }
    // 处理开关
    if (field.widget === 'Switch') {
      field.triggerPropName = 'checked';
    }
    // 默认开启allowClear和设置placeholder
    if (
      ['Input', 'InputNumber', 'TextArea', 'Password'].includes(field.widget)
    ) {
      if (!['InputNumber'].includes(field.widget)) {
        if (defaultOpenAllowClear) {
          field.props.allowClear =
            field.props.allowClear === undefined
              ? true
              : field.props.allowClear;
        }
      }
      if (defaultFillPlaceholder) {
        field.props.placeholder = field.props.placeholder || '请输入';
      }
      if (
        defaultShowInputCount &&
        field.widget === 'Input' &&
        field.props.showWordLimit === undefined
      ) {
        field.props.showWordLimit = true;
      }
    }
    // 处理 popup allowClear
    if (isPopupContainer(field.widget)) {
      if (defaultOpenAllowClear) {
        field.props.allowClear =
          field.props.allowClear === undefined ? true : field.props.allowClear;
      }
      // 区间查询不需要设置
      if (!['RangePicker', 'TimeRange'].includes(field.widget)) {
        field.props.placeholder = field.props.placeholder || '请选择'; // 默认提示
      }
    }
    // 设置默认模糊查询
    if (defaultSetPopupContainer) {
      if (
        [
          'Select',
          'AsyncSelect',
          'TreeSelect',
          'AsyncTreeSelect',
          'Cascader',
          'AsyncCascader',
          'DatePicker',
          'TimePicker',
          'TimeRange',
          'RangePicker',
        ].includes(field.widget) &&
        field.props.getPopupContainer === undefined
      ) {
        field.props.getPopupContainer = (node: any) => node.parentNode;
      }
    }
    // 设置默认模糊查询
    if (defaultShowSearch) {
      if (
        [
          'Select',
          'AsyncSelect',
          'TreeSelect',
          'AsyncTreeSelect',
          'Cascader',
          'AsyncCascader',
        ].includes(field.widget) &&
        field.props.showSearch === undefined
      ) {
        field.props.showSearch = true; // 开启
      }
    }
    if (
      ['Select', 'AsyncSelect'].includes(field.widget) &&
      field.props.showSearch &&
      field.props.filterOption === undefined
    ) {
      field.props.filterOption = (inputValue: string, option: any) => {
        // 大小写 + trim
        return String(option.props.children)
          .toLowerCase()
          .includes(String(inputValue).toLowerCase().trim());
      };
    }
    if (
      ['TreeSelect', 'AsyncTreeSelect'].includes(field.widget) &&
      field.props.showSearch &&
      field.props.filterTreeNode === undefined
    ) {
      field.props.filterTreeNode = (inputValue: string, treeNode: any) => {
        // 大小写 + trim
        return String(treeNode.props.title)
          .toLowerCase()
          .includes(String(inputValue).toLowerCase().trim());
      };
    }
    // 简化 BlockQuote 写法、不用写span和key
    if (field.widget === 'BlockQuote') {
      field.span = field.span || column;
      field.key = field.props.title;
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
    field.widget === 'FieldSet' &&
    (Array.isArray(field.props?.children) ||
      typeof field.props?.children === 'function')
  );
};
