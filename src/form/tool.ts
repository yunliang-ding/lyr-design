import { AsyncOptionsCache } from '@/util';
import { cloneDeep } from 'lodash';
import { getCombination, parseBeforeReceive, scrollToElement } from './util';

export const expansionInstanceMethod = ({
  form,
  antdForm,
  name,
  initialValues,
  cloneSchema,
  event,
  scrollToFirstError,
  getScrollContainer,
  actionRef,
  setSpin,
}) => {
  Object.assign(form, {
    ...antdForm,
    initialValues, // 默认值
    name,
    /** 新增getValues、处理字段转换字段等问题 */
    getValues: () => {
      const values = antdForm.getFieldsValue();
      return getCombination({ ...values }, cloneSchema, {
        name,
        form,
        initialValues,
      });
    },
    /** 新增setValues、处理beforeReceive等逻辑 */
    setValues: (data: any) => {
      const values = parseBeforeReceive(data, cloneSchema, {
        name,
        form,
        initialValues,
      });
      antdForm.setFieldsValue(values);
    },
    /** 新增submit、负责处理规则校验、字段转换等问题 */
    submit: async () => {
      try {
        const values = await antdForm.validateFields(); // 校验
        // TableList 子表单校验
        Object.keys(actionRef.current).forEach((key) => {
          if (typeof actionRef.current[key].validateFields === 'function') {
            actionRef.current[key].validateFields();
          }
        });
        return getCombination({ ...values }, cloneSchema, {
          name,
          form,
          initialValues,
        });
      } catch (errorInfo) {
        // 开启自动定位到第一个校验异常的位置
        if (scrollToFirstError) {
          // dom .ant-form-item-has-error 渲染有延迟
          setTimeout(() => {
            const el = getScrollContainer?.();
            scrollToElement(el, el?.querySelector('.ant-form-item-has-error'));
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
  });
};
