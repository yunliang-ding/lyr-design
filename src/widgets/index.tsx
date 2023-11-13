/** ui组件 */
import AutoComplete from './arco-design/auto-complete';
import Input from './arco-design/input';
import InputNumber from './arco-design/input-number';
import Rate from './arco-design/rate';
import Slider from './arco-design/slider';
import TextArea from './arco-design/text-area';
import Password from './arco-design/password';
import Select from './arco-design/select';
import RadioGroup from './arco-design/radio-group';
import CheckGroup from './arco-design/check-group';
import DatePicker from './arco-design/date-picker';
import TimePicker from './arco-design/time-picker';
import TimeRange from './arco-design/time-range';
import RangePicker from './arco-design/range-picker';
import TreeSelect from './arco-design/tree-select';
import Cascader from './arco-design/cascader';
import Upload from './arco-design/upload';
import Switch from './arco-design/switch';
/** 扩展组件 */
import Render from './extension/render';
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
import OssFileUpload from '@/oss-file-upload';
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
  RangeInput,
  EditableTable,
  TableList,
  OssFileUpload,
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
