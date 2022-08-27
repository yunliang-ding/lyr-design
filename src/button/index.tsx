import { useState } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import { ProBtnProps } from './type';
import { isEmpty, isObject, isPromise } from '../util';
import { CreateForm } from '..';

// 私有变量只能 set、get
export const authName = Symbol('');
/**
 * 高级Button
 * @param props
 * @returns
 */
const ProButton = ({
  spin,
  confirm,
  auth,
  btnType,
  onBeforeClick,
  drawerFormProps,
  modalFormProps,
  visible = true,
  validator,
  ...props
}: ProBtnProps) => {
  let submitForm;
  const [loading, setLoading] = useState(false);
  let onClick = props.onClick || function () {};
  const isPopConfirm = isObject(confirm) && confirm.type === 'pop';
  let label = props.children;
  if (isObject(drawerFormProps) || isPromise(modalFormProps)) {
    submitForm = CreateForm.Drawer(drawerFormProps);
    onClick = () => submitForm.open();
  } else if (isObject(modalFormProps) || isPromise(modalFormProps)) {
    submitForm = CreateForm.Modal(modalFormProps);
    onClick = () => submitForm.open();
  }
  if (isObject(confirm)) {
    onClick = async () => {
      if (typeof onBeforeClick === 'function') {
        await onBeforeClick(); // 等待改事件执行再出现二次确认
      }
      const confirmClick = submitForm
        ? submitForm.open
        : props.onClick || function () {};

      (confirm.type ?? 'alert') === 'alert'
        ? Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '提示',
            ...confirm,
            type: undefined, // 移除警告
            async onOk() {
              await confirmClick();
            },
          })
        : await confirmClick();
    };
    // 设置按钮loading
  } else if (spin) {
    onClick = async () => {
      setLoading(true);
      try {
        await props.onClick?.();
      } catch (error) {
        console.error('error', error);
      } finally {
        // 延迟下
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
  }
  if (auth) {
    // 处理权限这块的逻辑
    const auths = ProButton.getAuth();
    if (isEmpty(auth)) {
      return null;
    } else {
      const authKey = Object.keys(auths).find((key: any) => {
        return key === auth;
      });
      if (authKey) {
        label = label || auths[authKey]; // 获取文本
      } else {
        return null;
      }
    }
  }
  let vNode = (
    <Button loading={loading} {...props} onClick={!isPopConfirm && onClick}>
      {label}
    </Button>
  );
  if (isPopConfirm) {
    vNode = (
      <Popconfirm
        onConfirm={onClick}
        okText="确定"
        cancelText="取消"
        {...confirm}
      >
        {vNode}
      </Popconfirm>
    );
  }
  return visible && vNode;
};
// 挂载权限
ProButton.setAuth = (auths: any) => {
  ProButton[authName as any] = auths;
};
ProButton.getAuth = () => {
  return ProButton[authName as any] || {};
};
// 判断权限
ProButton.hasAuth = (authKey: string) => {
  const auths = ProButton.getAuth();
  return auths[authKey] !== undefined;
};

export default ProButton;
