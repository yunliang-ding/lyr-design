/** ui组件 */
import AutoComplete from './antd/auto-complete';
import Input from './antd/input';
import InputNumber from './antd/input-number';
import Rate from './antd/rate';
import Slider from './antd/slider';
import TextArea from './antd/text-area';
import Password from './antd/password';
import Select from './antd/select';
import RadioGroup from './antd/radio-group';
import CheckGroup from './antd/check-group';
import DatePicker from './antd/date-picker';
import TimePicker from './antd/time-picker';
import TimeRange from './antd/time-range';
import RangePicker from './antd/range-picker';
import TreeSelect from './antd/tree-select';
import Cascader from './antd/cascader';
import Upload from './antd/upload';
import Switch from './antd/switch';
/** 扩展组件 */
import Render from './extension/render';
import UploadImage from './extension/upload-image';
import AsyncRender from './extension/async/render';
import AsyncSelect from './extension/async/select';
import AsyncTreeSelect from './extension/async/tree-select';
import AsyncCheckGroup from './extension/async/check-group';
import AsyncRadioGroup from './extension/async/radio-group';
import AsyncCascader from './extension/async/cascader';
import DebounceSelect from './extension/debounce/select';
import FormList from './extension/form-list';
import BlockQuote from './extension/block-quote';
import FieldSet from './extension/fields-set';
import RangeInput from './extension/input/range';
import EditableTable from '@/table-editable';
import TableList from '@/table-list';
import CodeEditor from '@/code-editor';
import { SubFormType } from '@/form/form';
// 内置组件映射关系
export const BuiltInWidgetMapping: any = {
  // Antd
  AutoComplete,
  Input,
  InputNumber,
  Rate,
  Slider,
  TextArea,
  Password,
  Select,
  RadioGroup,
  CheckGroup,
  DatePicker,
  TimePicker,
  TimeRange,
  RangePicker,
  TreeSelect,
  Cascader,
  Upload,
  Switch,
  // 扩展组件
  AsyncSelect,
  AsyncTreeSelect,
  DebounceSelect,
  AsyncCascader,
  AsyncCheckGroup,
  AsyncRadioGroup,
  Render,
  AsyncRender,
  FormList,
  BlockQuote,
  FieldSet,
  UploadImage,
  RangeInput,
  EditableTable,
  TableList,
  CodeEditor,
};
export const Error = ({ widget }: any) => {
  return <span style={{ color: 'red' }}>Error: widget类型({widget})未知</span>;
};
export default (field: any, formInstance: any = {}, widgets = {}) => {
  let Component: any = null;
  if (typeof field.type === 'function') {
    Component = field.type;
  } else {
    // 优先命中注入的widgets
    Component = widgets[field.type] || BuiltInWidgetMapping[field.type];
  }
  // 没有找到渲染提示组件
  if (Component === undefined) {
    return <Error widget={field.type} />;
  }
  // 扩展属性
  const ExpProps: any = {};
  if (SubFormType.includes(field.type)) {
    ExpProps.actionRef = field.actionRef;
    ExpProps.event = field.event;
    ExpProps.widgets = widgets;
  }
  return (
    <Component
      name={field.name}
      form={formInstance}
      disabled={field.disabled}
      readOnly={field.readOnly}
      readOnlyEmptyValueNode={field.readOnlyEmptyValueNode}
      {...ExpProps}
      {...field.props}
    />
  );
};
