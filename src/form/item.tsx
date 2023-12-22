/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { cloneDeep, AsyncOptionsCache, isEmpty, NOTICESELF } from '@/util';
import CreateWidget from '@/widgets';
import mergeWith from 'lodash.mergewith';
import AsyncRender from '@/widgets/extension/async/render';
import { Form } from '@arco-design/web-react';
import { beforeFieldRender } from './util';

export default ({
  field = {},
  form,
  initialValues,
  disabled,
  readOnly,
  event,
  widgets = {},
  formListName = '', // 子表单名字
  readOnlyEmptyValueNode = '-',
  actionRef,
  emptyCellNode = null,
}: any) => {
  const [innerField, setInnerField] = useState(field);
  // 暂时忽略 FormList 的 fields 改变
  useEffect(() => {
    if (!formListName) {
      setInnerField(field);
    }
  }, [field]);
  const _field = useMemo(() => {
    return cloneDeep(innerField);
  }, [innerField]); // cloneDeep 避免被污染
  // 外部更新
  const mergeField = useCallback((newField, customizer) => {
    setInnerField({
      ...mergeWith(innerField, newField, customizer),
    });
    setReload(Math.random()); // 组件重新卸载，构建。
  }, []);
  const [reload, setReload] = useState(Math.random()); // 组件刷新
  // 执行副作用逻辑
  const touchEffect = useCallback((item: any, triggerField?: string) => {
    delete AsyncOptionsCache[`${form.name}_${item.name}`]; // 清除异步缓存器中的数据
    // 处理渲染顺序问题，避免多级联动出现问题
    setTimeout(() => {
      setReload(Math.random()); // 组件重新卸载，构建
    });
    if (_field.effectClearField === true) {
      // clear
      form.setFieldsValue({
        [item.name]: undefined,
      });
    }
    _field.onEffect?.(triggerField, form);
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    // 所有子组件都会订阅
    unsubscribe = event.subscribe(
      _field.name,
      ({ name }: { name: string }, newField, customizer = () => {}) => {
        // 更新field
        if (!isEmpty(newField)) {
          return mergeField(newField, customizer);
        }
        // 触发自己渲染
        if (name === NOTICESELF) {
          touchEffect(field);
        } else if (
          _field?.effect?.some((eft: string) => {
            if (eft.includes('{{index}}')) {
              // 如果没有_field.index表示主表单依赖了子表单
              const index =
                _field.index === undefined ? name.split('.')[1] : _field.index;
              return eft.replace('{{index}}', index) === name.toString();
            }
            return eft === name;
          })
        ) {
          // 执行副作用
          touchEffect(field, name);
        }
      },
    );
    return () => {
      unsubscribe(); //  取消订阅
    };
  }, []);
  // 处理默认设置
  const cloneField = cloneDeep(_field); // 拷贝一份原始_field,扩展的时候不会修改原始属性
  const pureFields = beforeFieldRender(cloneField, form); // 开始扩展处理
  const FormItem = (
    <Form.Item
      {...pureFields}
      field={pureFields.name} // 采用 name
      rules={readOnly ? undefined : pureFields.rules} // 只读模式不需要rules
      key={reload}
    >
      {CreateWidget(
        {
          disabled,
          readOnly,
          event, // 发布订阅传递下FormList会用到
          readOnlyEmptyValueNode,
          actionRef,
          ...cloneField,
          id: [form.name, pureFields.name].join('_'),
        },
        form,
        widgets,
      )}
    </Form.Item>
  );
  // 返回节点
  let vNode = FormItem;
  // 异步渲染
  if (typeof _field.itemRender === 'function') {
    const node = _field.itemRender(FormItem, {
      field,
      form,
      disabled,
      readOnly,
    });
    // 处理下Promise
    if (Object.prototype.toString.call(node) === '[object Promise]') {
      vNode = (
        <AsyncRender
          form={form}
          spin={false}
          key={reload} // effect生效
          render={() => {
            return node;
          }}
        />
      );
    } else {
      vNode = node;
    }
  }
  // 执行visible逻辑
  if (typeof field.visible === 'function') {
    return field.visible({
      ...initialValues,
      ...form.getFieldsValue(),
    })
      ? vNode
      : emptyCellNode;
  }
  return vNode;
};
