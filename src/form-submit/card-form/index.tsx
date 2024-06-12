import { Card } from '@arco-design/web-react';
import Form from '@/form';
import { useMemo } from 'react';
import { uuid } from '@/util';
import { CardFormProps } from './type';
import Footer from '../footer';
import './index.less';

export default ({
  cardProps = {},
  form = Form.useForm()[0],
  width = '100%',
  title,
  onClear = () => {
    form.clearValues();
  },
  onSubmit = () => {},
  footer = true,
  actionAlign = 'end',
  cancelText = '重制',
  okText = '保存',
  actions,
  ...rest
}: CardFormProps) => {
  const _actions = actions || [
    {
      label: cancelText,
      onClick: onClear,
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
      let data: any = form.getFieldsValue(true);
      if (action.validator) {
        data = await validatorForm();
      }
      await action.onClick(data);
    }
  };
  return (
    <div className={`card-${id} card-form-${actionAlign}`} style={{ width }}>
      <Card
        {...cardProps}
        title={title}
        actions={
          footer
            ? [
                <Footer
                  actions={_actions}
                  actionClick={actionClick}
                  validatorForm={validatorForm}
                  form={form}
                />,
              ]
            : null
        }
      >
        <Form
          form={form}
          {...rest}
          getScrollContainer={() =>
            document.querySelector(`.card-${id} .arco-card-body`)
          }
        />
      </Card>
    </div>
  );
};
