## 基本使用

```tsx | react | #f5f5f5
import { AnchorCardForm, Button } from 'lyr-component';

export default () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <AnchorCardForm
      fixHeight={256}
      height={460}
      defaultActivityKey="baseInfo"
      formProps={{
        title: '我是电梯表单',
        schema: [
          {
            widget: 'FieldSet',
            name: 'baseInfo',
            label: '基础表单',
            props: {
              column: 2,
              subTitle: '一个描述信息...',
              extra: [
                <Button type="outline" key="operation" size="small">
                  操作区域
                </Button>,
                <Button type="outline" key="more" size="small">
                  更多操作
                </Button>,
              ],
              children: [
                {
                  widget: 'Input',
                  name: 'input',
                  label: '输入框',
                  required: true,
                },
                {
                  widget: 'InputNumber',
                  name: 'inputNumber',
                  label: '数字输入框',
                },
                {
                  widget: 'Select',
                  name: 'select',
                  label: '下拉选',
                  props: {
                    options: [
                      { label: '选项1', value: 1 },
                      { label: '选项2', value: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            widget: 'FieldSet',
            name: 'advanceInfo',
            label: '高级表单',
            props: {
              children: [
                {
                  widget: 'Switch',
                  name: 'switch',
                  label: '开关切换',
                  valuePropName: 'checked',
                  props: {
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  },
                },
                {
                  widget: 'Rate',
                  name: 'rate',
                  label: '评分组件',
                },
                {
                  widget: 'Slider',
                  name: 'slider',
                  label: '滑块组件',
                  props: {},
                },
              ],
            },
          },
          {
            widget: 'FieldSet',
            name: 'dateInfo',
            label: '日期相关',
            props: {
              children: [
                {
                  widget: 'DatePicker',
                  name: 'datePicker',
                  label: '选择日期',
                },
                {
                  widget: 'RangePicker',
                  name: 'rangePicker',
                  label: '区间选取',
                },
              ],
            },
          },
          {
            widget: 'FieldSet',
            name: 'timeInfo',
            label: '时间相关',
            props: {
              children: [
                {
                  widget: 'TimePicker',
                  name: 'timePicker',
                  label: '时间选择',
                },
                {
                  widget: 'TimeRange',
                  name: 'timeRange',
                  label: '时间区间',
                },
              ],
            },
          },
        ],
        onSubmit,
        initialValues: {
          baseInfo: { inputNumber: 2323, select: 2 },
          advanceInfo: { switch: true, rate: 3, slider: 30 },
          dateInfo: {
            datePicker: '2022-02-12',
            rangePickerStart: '2022-09-12',
            rangePickerEnd: '2022-12-12',
          },
          timeInfo: {
            timeRangeStart: '01:23:12',
            timeRangeEnd: '12:23:12',
            timePicker: '09:23:12',
          },
        },
      }}
    />
  );
};
```
