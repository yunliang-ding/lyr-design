/** 基础 antd 组件 */
export { default as Input } from './widgets/antd/input';
export { default as Password } from './widgets/antd/password';
export { default as TextArea } from './widgets/antd/text-area';
export { default as InputNumber } from './widgets/antd/input-number';
export { default as AutoComplete } from './widgets/antd/auto-complete';
export { default as Select } from './widgets/antd/select';
export { default as RadioGroup } from './widgets/antd/radio-group';
export { default as DatePicker } from './widgets/antd/date-picker';
export { default as TimePicker } from './widgets/antd/time-picker';
export { default as TimeRange } from './widgets/antd/time-range';
export { default as CheckGroup } from './widgets/antd/check-group';
export { default as TreeSelect } from './widgets/antd/tree-select';
export { default as Cascader } from './widgets/antd/cascader';
export { default as Switch } from './widgets/antd/switch';
export { default as BlockQuote } from './widgets/extension/block-quote';
/** 扩展组件 */
export { default as Grid } from './grid';
export { default as Button } from './button';
export { default as Icon } from './icon';
export { default as Form } from './form';
export { default as CardForm } from './form-submit/card-form';
export { default as AnchorCardForm } from './form-submit/anchor-card-form';
export { default as StepForm } from './form-submit/step-form';
export { default as CreateModal } from './create-modal';
export { default as CreateDrawer } from './create-drawer';
export { default as CreateSpin } from './create-spin';
export { default as Search } from './search';
export { default as Table } from './table';
export { default as EditableTable } from './table-editable';
export { default as TableList } from './table-list';
export { default as DragList } from './drag-list';
export { default as AnchorCard } from './anchor-card';
export { default as OssFileUpload } from './oss-file-upload';
export { default as Suspend } from './suspend';
export { default as MarkdownViewer } from './markdown-viewer';
export { default as CloudComponent } from './cloud-component';
/** 代码编辑器相关 */
export { default as CodeEditor } from './code-space/code-editor';
export { default as FileExplorer } from './code-space/file-explorer';
export { default as FileEditor } from './code-space/file-editor';
export { default as GitManager } from './code-space/git-manager';
export { default as FileSearch } from './code-space/file-search';
/** 扩展方法 */
export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};
export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', '').replaceAll('_#}}"', '');
  }
  return str?.replaceAll('{{_#', '').replaceAll('_#}}', '');
};
export { default as createOssInstance } from './oss-file-upload/util';
/** 类型 */
export type { SchemaProps, FieldProps } from './form/type.item';
export type { TableProps } from './table/types';
export type { CoreFormProps } from './form/type.form';
export type { CoreFormInstance } from './form/type.instance';
export type { DrawerFormProps, ModalFormProps } from './form-submit/types';
/** 全局配置 */
export { default as setGlobalConfig } from './config';
