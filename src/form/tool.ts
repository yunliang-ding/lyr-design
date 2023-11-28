/* eslint-disable no-await-in-loop */
import { cloneDeep, AsyncOptionsCache } from '@/util';
import { scrollToElement } from './util';

export const expansionInstanceMethod = ({
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
}) => {
  Object.assign(form, {
    ...acroForm,
    initialValues, // 默认值
    name,
    /** 新增submit、负责处理规则校验、字段转换等问题 */
    submit: async () => {
      try {
        const values = await acroForm.validate(); // 校验
        const arr = Object.keys(actionRef.current);
        for (let i = 0; i < arr.length; i++) {
          const key = arr[i];
          if (typeof actionRef.current[key].validate === 'function') {
            await actionRef.current[key].validate(); // TableList 子表单校验
          }
        }
        return values;
      } catch (errorInfo) {
        // 开启自动定位到第一个校验异常的位置
        if (scrollToFirstError) {
          setTimeout(() => {
            const el = getScrollContainer?.();
            scrollToElement(el, el?.querySelector('.arco-form-item-error'));
          }, 50);
        }
        // eslint-disable-next-line no-console
        console.warn('validator fail ->', errorInfo);
        throw errorInfo;
      }
    },
    /** 触发指定字段重新渲染 */
    touchSchemaRender: (names: string[]) => {
      event.publishFields(names); // 批量发布通知
    },
    // 合并 Field
    setSchemaByName: (fieldName, newField, customizer) => {
      event.publishMergeField(fieldName, newField, customizer); // 更新合并Field指令
    },
    // 获取 Field
    getSchemaByName: (fieldName: string) => {
      const field = cloneSchema.find((i) => i.name === fieldName);
      return cloneDeep(field); // 返回拷贝体，剔除引用关系
    },
    /** 获取指定field的异步加载options */
    getFieldOption: async (fieldName: string) => {
      if (!(await AsyncOptionsCache[`${name}_${fieldName}`])) {
        await new Promise((res) => setTimeout(res, 100, true)); // 没有找到先等待0.1秒让组件effect执行请求发出去
      }
      return (await AsyncOptionsCache[`${name}_${fieldName}`]) || [];
    },
    /** 手动暂存异步加载的options */
    setFieldOption: async (fieldName: string, options: any) => {
      AsyncOptionsCache[`${name}_${fieldName}`] = options;
    },
    /** 清空表单值，不会还原到默认值 */
    clearValues: async (names?) => {
      if (names) {
        names.forEach((fieldName: string) => {
          form.setFieldsValue({
            [fieldName]: undefined,
          });
        });
      } else {
        form.setFieldsValue(
          Object.keys(form.getFieldsValue()).reduce((name1, name2) => {
            return { ...name1, ...{ [name2]: undefined } };
          }, {}),
        );
      }
    },
    /** 获取 FormList 引用 */
    formListInstance: actionRef.current,
    /** 控制加载中 */
    setFormLoading: setSpin,
    /** 接受新的默认值，form重新渲染 */
    setInitialValues: (values) => {
      forceRender(values);
    },
    /** 设置值的时候，会触发 OnValuesChange */
    setFieldsValueTouchOnValuesChange: (value: any) => {
      form.setFieldsValue(value);
      // 触发 OnValuesChange
      onChange(value, form.getFieldsValue(true));
    },
  });
};
