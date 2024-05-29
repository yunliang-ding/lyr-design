import { isValidElement, useState } from 'react';
import { Button, Popconfirm, Modal, Tooltip } from '@arco-design/web-react';
import { ProBtnProps } from './type';
import { isEmpty, isObject } from '../util';
import CreateModal from '../create-modal';
import CreateDrawer from '../create-drawer';
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
  onBeforeClick,
  drawerFormProps,
  modalFormProps,
  visible = true,
  tooltip,
  validator,
  ...props
}: ProBtnProps) => {
  let submitForm;
  const [loading, setLoading] = useState(false);
  let onClick = props.onClick || function () {};
  const isPopConfirm = isObject(confirm) && confirm.type === 'pop';
  let label = props.children;
  if (isObject(drawerFormProps)) {
    submitForm = CreateDrawer(drawerFormProps as any);
    onClick = () => submitForm.open();
  } else if (isObject(modalFormProps)) {
    submitForm = CreateModal(modalFormProps as any);
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
            type: undefined,
            async onOk() {
              await confirmClick();
            },
          } as any)
        : await confirmClick();
    };
    // 设置按钮loading
  } else if (
    spin ||
    typeof drawerFormProps === 'function' ||
    typeof modalFormProps === 'function'
  ) {
    if (typeof drawerFormProps === 'function') {
      onClick = WapperSpinOnClick(
        setLoading,
        async () => {
          const config = await drawerFormProps();
          CreateDrawer(config).open();
        },
        10,
      );
    } else if (typeof modalFormProps === 'function') {
      onClick = WapperSpinOnClick(
        setLoading,
        async () => {
          const config = await modalFormProps();
          CreateModal(config).open();
        },
        10,
      );
    } else if (spin) {
      onClick = WapperSpinOnClick(setLoading, props.onClick, 500);
    }
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
  if (isPopConfirm && !props.disabled) {
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
  if (tooltip) {
    const tooltipProps: any =
      typeof tooltip === 'object' && !isValidElement(tooltip)
        ? tooltip
        : {
            content: tooltip,
          };
    vNode = <Tooltip {...tooltipProps}>{vNode}</Tooltip>;
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

/** 处理 loading 的 onClick */
export const WapperSpinOnClick =
  (setLoading, onClick, timer = 0) =>
  async () => {
    if (timer) {
      setLoading(true);
    }
    try {
      await onClick?.();
    } catch (error) {
      console.error('error', error);
    } finally {
      // 延迟下
      setTimeout(() => {
        setLoading(false);
      }, timer);
    }
  };
