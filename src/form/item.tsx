import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  cloneDeep,
  AsyncOptionsCache,
  isEmpty,
  NOTICESELF,
  uuid,
} from '@/util';
import CreateWidget from '@/widgets';
import mergeWith from 'lodash/mergeWith';
import AsyncRender from '@/widgets/extension/async/render';
import { Form } from 'antd';
import { beforeFieldRender } from './util';

export default ({
  field = {},
  form,
  initialValues,
  disabled,
  readOnly,
  event,
  className = field?.className || '',
  fieldKey,
  widgets = {},
  formListName = '', // 子表单名字
  readOnlyEmptyValueNode = '-',
  actionRef,
  emptyCellNode = null,
}: any) => {
  const [innerField, setInnerField] = useState(field);
  // field 变化同步更新 innerField
  useEffect(() => {
    setInnerField(field);
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
    const name = Array.isArray(item.name)
      ? `_${item.name.join('_')}` // 添加前缀_
      : item.name; // 兼容下子表单
    delete AsyncOptionsCache[`${form.name}_${formListName}${name}`]; // 清除异步缓存器中的数据
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    // 所有子组件都会订阅
    unsubscribe = event.subscribe(
      _field?.name,
      ({ name }: any, newField, customizer = () => {}) => {
        // 更新field
        if (!isEmpty(newField)) {
          return mergeField(newField, customizer);
        }
        // 触发自己渲染
        if (name === NOTICESELF) {
          touchEffect(field);
        } else if (
          _field?.effect?.some((item) => {
            // effect 配置了二维数组
            if (Array.isArray(item)) {
              if (Array.isArray(_field.name)) {
                // 子表单依赖子表单
                item[1] = _field.name[0]; // 更新index
              } else {
                // 主表单依赖子表单
                item[1] = name.split(',')[1]; // 更新index
              }
            }
            return item.toString() === name.toString();
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
  /** 兼容 antd 升级 导致 Search 组件样式问题 */
  const itemID: string = useMemo(() => {
    return `item_${uuid(10)}`;
  }, []);
  useEffect(() => {
    const element = document.querySelector(`[itemId=${itemID}]`);
    if (element) {
      if (cloneField.expand) {
        element.parentElement.setAttribute('data-expand', 'true');
      }
      element.classList.value = element.classList.value
        .split(',')
        .concat('ant-form-item')
        .join(' ');
    }
  }, []);
  const FormItem = (
    <Form.Item
      {...pureFields}
      key={reload}
      itemID={itemID}
      // 只读模式不需要rules
      rules={readOnly ? undefined : pureFields.rules}
      className={className}
      data-expand={cloneField.expand}
      fieldKey={fieldKey}
      label={
        cloneField.labelWidth ? (
          <span style={{ width: cloneField.labelWidth }}>
            {pureFields.label}
          </span>
        ) : (
          pureFields.label
        )
      }
    >
      {CreateWidget(
        {
          disabled,
          readOnly,
          event, // 发布订阅传递下FormList会用到
          readOnlyEmptyValueNode,
          actionRef,
          ...cloneField,
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
