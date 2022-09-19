import { Drawer } from 'antd';
import { useMemo, useState } from 'react';
import { getDefaultPropsByConfig, uuid } from '@/util';
import { Form } from '@/index';
import { DrawerFormProps } from '../types';
import Footer from '../footer';
import './index.less';

export default (props: DrawerFormProps) => {
  const {
    drawerProps = {},
    form = Form.useForm()[0],
    title,
    actionAlign = 'end',
    className,
    width = 500,
    visible = false,
    onClose = () => {},
    onSubmit = () => {},
    footer = true,
    cancelText = '关闭',
    confirmText = '保存',
    actions,
    render,
    footerRender,
    ...rest
  } = Object.assign(getDefaultPropsByConfig('DrawerForm', props), props);
  const [value, onChange] = useState(rest.initialValues);
  const _actions = actions || [
    {
      label: cancelText,
      onClick: onClose,
    },
    {
      label: confirmText,
      type: 'primary',
      validator: true,
      spin: true,
      onClick: onSubmit,
    },
  ];
  const id = useMemo(() => {
    return uuid(10);
  }, []);
  /** validatorForm */
  const validatorForm = async () => {
    try {
      const datas = await form.submit(); // 提交数据验证
      return datas;
    } catch (errorInfo) {
      console.warn('validatorForm fail ->', errorInfo);
      throw errorInfo;
    }
  };
  /** actionClick */
  const actionClick = async (action) => {
    if (typeof action.onClick === 'function') {
      let data;
      // 自定义渲染
      if (typeof render === 'function') {
        data = value;
      } else {
        data = form.getValues();
        if (action.validator) {
          data = await validatorForm();
        }
      }
      await action.onClick(data);
    }
  };
  const _className = [`drawer-${id}`, `drawer-form-${actionAlign}`];
  if (className) {
    _className.push(className);
  }
  /** 控制底部按钮渲染 */
  let footerNode: any = false;
  if (typeof footerRender === 'function') {
    footerNode = footerRender(form);
  } else if (footer) {
    footerNode = (
      <Footer
        actions={_actions}
        actionClick={actionClick}
        validatorForm={validatorForm}
        form={form}
      />
    );
  }
  return (
    <Drawer
      {...{
        getContainer: false, // 适配全局loading
        ...drawerProps,
      }}
      className={_className.join(' ')}
      width={width}
      title={title}
      visible={visible}
      onClose={onClose}
      footer={footerNode}
    >
      {typeof render === 'function' ? (
        render({
          value,
          onChange,
        })
      ) : (
        <Form
          form={form}
          {...rest}
          getScrollContainer={() =>
            document.querySelector(`.drawer-${id} .ant-drawer-body`)
          }
        />
      )}
    </Drawer>
  );
};
