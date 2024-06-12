import { StepProps } from '@arco-design/web-react';
import { ReactNode } from 'react';
import { CoreFormProps } from '../../form/form.type';
import { SchemaProps } from '../../index';
import { ActionProps } from '../action.type';

/** 分步提交表单 */
export interface StepFormProps extends CoreFormProps {
  /** 当前步骤 */
  current?: number;
  /** 手动切换步骤 */
  onStepsClick?: (current) => void;
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

export default (props: StepFormProps) => null;
