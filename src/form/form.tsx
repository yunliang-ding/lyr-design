/* eslint-disable no-param-reassign */
import { useRef, useMemo, useState } from 'react';
import { Grid, Form, Spin } from '@arco-design/web-react';
import { cloneDeep, EventEmit } from '@/util';
import Item from './item';
import FieldSet from '@/widgets/extension/fields-set';
import { CoreFormProps } from './form.type';
import CoreForm from './index';
import { tranfromSchema } from './util';
import { expansionInstanceMethod } from './tool';
import './index.less';

// column布局映射关系
const labelColMap = [4, 6, 8, 10];
const wrapperColMap = [20, 18, 16, 14];
export const SubFormType = ['FormList', 'TableList'];
export default ({
  schema = [],
  widgets = {}, // 注入自定义组件
  readOnly = false, // 视图展示
  disabled = false, // 全部表单不可用
  form = CoreForm.useForm()[0],
  column = 1,
  gridStyle = {
    colGap: 20,
    rowGap: 0,
  },
  className = '',
  /** form-props */
  initialValues = {},
  onValuesChange = () => {},
  getScrollContainer, // 设置滚动容器
  scrollToFirstError = true, // 默认开启滚动到第一个错误的位置
  layout = 'vertical', // 默认使用垂直布局
  readOnlyEmptyValueNode = '-',
  forceRender,
  name,
  ...rest
}: CoreFormProps) => {
  const [spin, setSpin] = useState(false);
  const [acroForm]: any = Form.useForm();
  // 一个表单对应一个发布订阅
  const event = useMemo(() => {
    return new EventEmit();
  }, []);
  // 克隆 schema
  const cloneSchema = useMemo(() => {
    const newSchema =
      typeof schema === 'function'
        ? cloneDeep(schema(form))
        : cloneDeep(schema);
    tranfromSchema(newSchema, name, column); // 内部转换下
    return newSchema;
  }, [schema]); // cloneDeep 避免被污染
  // 默认只读模式 保持行 10px 间隙
  if (readOnly && layout !== 'vertical') {
    gridStyle.rowGap = gridStyle.rowGap || 10;
  }
  /**
   * 处理默认布局
   * layout: 使用传入,没有传入按照SearchForm使用horizontal、Form使用vertical
   * labelCol 使用传入,没有传入按照layout是vertical就固定24,否则按照column映射取
   * wrapperCol 使用传入,没有传入按照layout是vertical就固定24,否则按照column映射取
   */
  const labelCol =
    rest.labelCol ?? layout === 'vertical'
      ? { span: 24 }
      : { span: labelColMap[column - 1] };
  const wrapperCol =
    rest.wrapperCol ?? layout === 'vertical'
      ? { span: 24 }
      : { span: wrapperColMap[column - 1] };
  // 获取 formList api
  const actionRef = useRef({});
  // 值改变 setFieldsValue不会触发该方法
  const onChange = (value: any, values: any) => {
    const key = Object.keys(value)[0];
    const index = key.split('.')[1];
    const isFormList = typeof index === 'number';
    if (isFormList) {
      // 兼容 FormList
      event.publish({
        name: key,
      });
    } else {
      // 发布通知
      event.publish({
        name: key,
      });
    }
    onValuesChange(value, values); // 通知外面
  };
  /** 实例扩展方法 */
  expansionInstanceMethod({
    form,
    acroForm,
    name,
    initialValues,
    cloneSchema,
    event,
    scrollToFirstError,
    getScrollContainer,
    actionRef,
    setSpin,
    forceRender,
    onChange,
  });
  /** render FieldSet children */
  const RenderFieldSet = ({ field }) => {
    return field.props?.children ? (
      <Grid {...gridStyle} cols={field.props.column || 1}>
        {RenderSchema(field.props?.children)}
      </Grid>
    ) : null;
  };
  /** Render schema */
  const RenderSchema = (itemSchema = []) => {
    return itemSchema.map((field: any, index: number) => {
      if (field.widget === 'FieldSet') {
        return (
          <Grid.GridItem span={field.span || 1} key={field.name || field.label}>
            <FieldSet
              key={field.label}
              fieldName={field.name}
              itemRender={field.itemRender}
              label={field.label}
              style={field.style}
              extra={field.props?.extra}
              subTitle={field.props?.subTitle}
              form={form}
              initialValues={initialValues}
              effect={field.effect}
              visible={field.visible}
              event={event}
              field={field}
            >
              <RenderFieldSet field={field} />
            </FieldSet>
          </Grid.GridItem>
        );
      }
      return (
        <Grid.GridItem
          span={field.span || 1}
          key={field.name}
          className={field.expand && 'grid-item-expand'}
          style={{
            // 让查询按钮始终在最右边
            gridColumnStart:
              field.key === 'grid-search-btn' ? column : undefined,
            ...(field.gridItemStyle || {}),
          }}
        >
          <Item
            event={event}
            disabled={disabled || field?.props?.disabled}
            readOnly={readOnly}
            form={form}
            widgets={widgets}
            initialValues={initialValues}
            field={field}
            key={field.name || field.key || index}
            readOnlyEmptyValueNode={readOnlyEmptyValueNode}
            actionRef={
              SubFormType.includes(field.widget) ? actionRef : undefined
            }
          />
        </Grid.GridItem>
      );
    });
  };
  // 组装类名
  const _className = [`core-form-${layout}`];
  if (className) {
    _className.push(className);
  }
  if (readOnly) {
    _className.push('core-form-readonly');
  }
  return (
    <Spin loading={spin}>
      <Form
        layout={layout}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        className={_className.join(' ')}
        form={acroForm}
        name={name}
        initialValues={initialValues}
        onChange={onChange}
        {...rest}
      >
        <Grid {...gridStyle} cols={column}>
          {RenderSchema(cloneSchema)}
        </Grid>
      </Form>
    </Spin>
  );
};
