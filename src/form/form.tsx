/* eslint-disable no-param-reassign */
import { useRef, useMemo, useCallback, useState } from 'react';
import { ConfigProvider, Empty, Form, Spin } from '@arco-design/web-react';
import { cloneDeep, EventEmit, queryFieldByName } from '@/util';
import Item from './item';
import FieldSet from '@/widgets/extension/fields-set';
import { CoreFormProps } from './type.form';
import CoreForm from './index';
import { tranfromSchema } from './util';
import { expansionInstanceMethod } from './tool';
import { Grid } from '..';
import './index.less';

// column布局映射关系
const labelColMap = [4, 6, 8, 10];
const wrapperColMap = [20, 18, 16, 14];
export const SubFormType = ['FormList', 'TableList', 'EditableTable'];
export default ({
  schema = [],
  widgets = {}, // 注入自定义组件
  readOnly = false, // 视图展示
  disabled = false, // 全部表单不可用
  form = CoreForm.useForm()[0],
  column = 1,
  gridStyle = {
    columnGap: 20,
    rowGap: 0,
  },
  className = '',
  /** form-props */
  initialValues = {},
  onValuesChange = () => {},
  locale,
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
    const field: any = queryFieldByName(cloneSchema, key); // 查找指定的field
    const fieldValue = value[key];
    if (field.type === 'FormList' && Array.isArray(fieldValue)) {
      // 兼容 FormList
      const index = fieldValue.findIndex((i) => typeof i === 'object');
      if (index > -1) {
        const innerName = Object.keys(fieldValue[index])[0];
        // 组装 FormList 指定项的改表字段 name
        event.publish({
          name: [key, index, innerName].join(','),
        });
      }
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
    // 支持函数默认参数为form
    const childrenFields =
      typeof field.props?.children === 'function'
        ? field.props?.children(form)
        : field.props?.children;
    // 格式处理下
    if (typeof field.props?.children === 'function') {
      tranfromSchema(childrenFields, name, field.props.column);
    }
    return childrenFields ? (
      <Grid
        gridStyle={field.props.gridStyle || gridStyle}
        column={field.props.column || 1}
      >
        <RenderSchema itemSchema={childrenFields || []} />
      </Grid>
    ) : (
      <Empty />
    );
  };
  /** render field */
  const RenderSchema = useCallback(
    ({ itemSchema = [] }): any => {
      return itemSchema.map((field: any, index: number) => {
        if (field.type === 'FieldSet') {
          // 基于gridColumnStart设置列数
          let style = field.style || {};
          if (field.span) {
            style = {
              ...style,
              gridColumnStart: `span ${field.span}`,
            };
          }
          if (!field.name) {
            // eslint-disable-next-line no-console
            console.warn('FieldSet 缺少 name 属性');
          }
          // 支持函数默认参数为form
          const childrenFields =
            typeof field.props?.children === 'function'
              ? field.props?.children(form)
              : field.props?.children;
          // 格式处理下
          if (typeof field.props?.children === 'function') {
            tranfromSchema(childrenFields, name, field.props.column);
          }
          const FormItem = (
            <FieldSet
              key={field.name}
              fieldName={field.name}
              label={field.label}
              style={style}
              extra={field.props?.extra}
              subTitle={field.props?.subTitle}
              form={form}
              initialValues={initialValues}
              effect={field.effect}
              visible={field.visible}
              event={event}
            >
              <RenderFieldSet field={field} />
            </FieldSet>
          );
          // 返回节点
          let vNode = FormItem;
          // 异步渲染
          if (typeof field.itemRender === 'function') {
            vNode = field.itemRender(FormItem, {
              field,
              form,
              disabled,
              readOnly,
            });
          }
          return vNode;
        }
        return (
          <Item
            event={event}
            className={field.className || ''}
            disabled={disabled || field?.props?.disabled}
            readOnly={readOnly}
            onChange={onChange}
            form={form}
            formName={name}
            widgets={widgets}
            initialValues={initialValues}
            field={field}
            key={field.name || field.key || index}
            readOnlyEmptyValueNode={readOnlyEmptyValueNode}
            actionRef={SubFormType.includes(field.type) ? actionRef : undefined}
          />
        );
      });
    },
    [disabled, readOnly],
  );
  // 组装类名
  const _className = [`core-form-${layout}`];
  if (className) {
    _className.push(className);
  }
  if (readOnly) {
    _className.push('core-form-readonly');
  }
  return (
    <ConfigProvider locale={locale}>
      <Spin loading={spin}>
        <Form
          layout={layout}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          className={_className.join(' ')}
          form={acroForm}
          name={name}
          initialValues={initialValues}
          onValuesChange={onChange}
          {...rest}
        >
          <Grid gridStyle={gridStyle} column={column}>
            <RenderSchema itemSchema={cloneSchema} />
          </Grid>
        </Form>
      </Spin>
    </ConfigProvider>
  );
};
