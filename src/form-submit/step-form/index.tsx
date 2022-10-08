import Form from '@/form';
import { StepProps, Steps, Tabs } from 'antd';
import { ReactNode, useLayoutEffect } from 'react';
import { ActionProps } from '../type.action';
import { CoreFormProps } from '../../form/type.form';
import { SchemaProps } from '../../form/type.item';
import Footer from '../footer';
import './index.less';

/** 分步提交表单 */
export interface StepFormProps extends CoreFormProps {
  /** 当前步骤 */
  current?: number;
  /** 手动切换步骤 */
  onStepsClick?: (current) => void;
  /**
   * 展示模式
   * @default step
   */
  mode?: 'step' | 'tab';
  /** 步骤属性 */
  stepProps?: StepProps;
  /** 配置每一步的表单项和操作按钮 */
  steps: {
    title: ReactNode;
    description?: ReactNode;
    column?: number;
    schema: SchemaProps[];
    actions: ActionProps[];
  }[];
}

export default ({
  current = 0,
  mode = 'step',
  onStepsClick = () => {},
  form = Form.useForm()[0],
  stepProps = {},
  steps,
  ...rest
}: StepFormProps) => {
  /** validatorForm */
  const validatorForm = async () => {
    try {
      const datas = await form.submit(); // 提交数据验证
      return datas;
    } catch (errorInfo) {
      console.error('validatorForm fail ->', errorInfo);
      throw errorInfo;
    }
  };
  /** actionClick */
  const actionClick = async (action) => {
    if (typeof action.onClick === 'function') {
      let data = form.getValues();
      if (action.validator) {
        data = await validatorForm();
      }
      await action.onClick(data);
    }
  };
  useLayoutEffect(() => {
    if (mode === 'tab') {
      document
        .querySelectorAll(
          `.core-form-${mode}-form .core-form-step-form-header-tabs .ant-tabs-tab`,
        )
        ?.forEach((node) => {
          node.setAttribute('style', 'width: 33.3%');
        });
    }
  }, [mode]);
  return (
    <div className={`core-form-${mode}-form`}>
      <div className="core-form-step-form-header">
        {mode === 'step' && (
          <Steps {...stepProps} current={current} onChange={onStepsClick}>
            {steps?.map((step) => {
              return (
                <Steps.Step title={step.title} description={step.description} />
              );
            })}
          </Steps>
        )}
        {mode === 'tab' && (
          <Tabs
            activeKey={String(current)}
            onChange={(v) => {
              onStepsClick(Number(v));
            }}
            className="core-form-step-form-header-tabs"
          >
            {steps?.map((step, idx) => {
              return <Tabs.TabPane key={idx} tab={step.title} />;
            })}
          </Tabs>
        )}
      </div>
      <div className="core-form-step-form-body">
        <Form
          {...rest}
          schema={steps
            .map((step, index) => {
              return step.schema.map((field) => {
                return {
                  ...field,
                  hidden: index !== current ? true : field.hidden, // 其他步骤不展示
                  required: index !== current ? false : field.required, // 其他步骤不校验
                  rules: index !== current ? [] : field.rules, // 其他步骤不校验
                  // type: index !== current ? () => null : field.type, // 其他步骤组件不渲染
                };
              });
            })
            .flat()}
          form={form}
          column={steps[current].column}
        />
      </div>
      <div className="core-form-step-form-footer">
        <Footer
          actions={steps[current].actions}
          actionClick={actionClick}
          validatorForm={validatorForm}
          form={form}
        />
      </div>
    </div>
  );
};
