import { Modal } from '@arco-design/web-react';
import { useMemo, useState } from 'react';
import { uuid } from '@/util';
import Form from '@/form';
import { ModalFormProps } from './type';
import Footer from '../footer';
import './index.less';

export default ({
  width = 500,
  height = 400,
  form = Form.useForm()[0],
  modalProps = {},
  style = {},
  bodyStyle = {},
  title,
  actionAlign = 'end',
  className,
  visible = false,
  onClose = () => {},
  onSubmit = () => {},
  footer = true,
  cancelText = '关闭',
  okText = '保存',
  actions,
  render,
  footerRender,
  ...rest
}: ModalFormProps) => {
  /** 宽高设置 */
  const [value, onChange] = useState(rest.initialValues);
  const _actions = actions || [
    {
      label: cancelText,
      onClick: onClose,
    },
    {
      label: okText,
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
        data = form.getFieldsValue();
        if (action.validator) {
          data = await validatorForm();
        }
      }
      await action.onClick(data);
    }
  };
  const _className = [`modal-${id}`, `modal-form-${actionAlign}`];
  if (className) {
    _className.push(className);
  }
  /** 控制底部按钮渲染 */
  let footerNode: any = null;
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
    <Modal
      {...modalProps}
      style={{
        ...style,
        width,
      }}
      className={_className.join(' ')}
      visible={visible}
      title={title}
      onCancel={() => {
        onClose();
      }}
      footer={footerNode}
    >
      <div
        className="arco-modal-body"
        style={{
          ...bodyStyle,
          height,
        }}
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
              document.querySelector(`.modal-${id} .arco-modal-body`)
            }
          />
        )}
      </div>
    </Modal>
  );
};
