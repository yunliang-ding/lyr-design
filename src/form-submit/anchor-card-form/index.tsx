import { AnchorCardFormProps } from './type';
import CardForm from '@/form-submit/card-form';
import AnchorCard from '@/anchor-card';
import Form from '@/form';
import './index.less';

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
        height={height + 100}
        scrollElement=".arco-card-body"
        list={schema
          .filter((item) => item.visible?.(formProps.initialValues) !== false)
          .map((item: any) => {
            return {
              key: item.name,
              title: item.label,
            };
          })}
        {...rest}
      >
        <CardForm {...formProps} cardProps={defaultCardProps} />
      </AnchorCard>
    </div>
  );
};
