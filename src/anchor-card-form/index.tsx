/**
 * 电梯表单组件
 */
import { CardFormProps } from '../form-submit/types';
import { CardForm, AnchorCard, Form } from '../index';
import { AnchorCardProps } from '../anchor-card';
import './index.less';

interface AnchorCardFormProps extends Omit<AnchorCardProps, 'tabs'> {
  /** form 属性 */
  formProps: CardFormProps;
  /** 外层容器名 */
  className?: string;
  /** 容器高度 */
  height?: number;
}

export default ({
  height = 500,
  className = 'anchor-card-form-box',
  formProps = {},
  ...rest
}: AnchorCardFormProps) => {
  const [form] = Form.useForm();
  const schema = Array.isArray(formProps.schema)
    ? formProps.schema
    : formProps.schema(form);
  const defaultCardProps = {
    className,
    style: {
      borderWidth: 0,
      background: 'none',
    },
    bodyStyle: {
      height,
      overflow: 'auto',
      padding: 0,
    },
  };
  return (
    <div className="anchor-card-form">
      <AnchorCard
        list={schema
          .filter((item) => item.visible?.(formProps.initialValues) !== false)
          .map((item: any) => {
            return {
              key: item.name,
              title: item.label,
            };
          })}
        getContainer={() =>
          document.querySelector(`.${className} .ant-card-body`)
        }
        {...rest}
      >
        <CardForm {...formProps} cardProps={defaultCardProps} />
      </AnchorCard>
    </div>
  );
};
