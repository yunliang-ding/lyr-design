/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slider, SliderProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: SliderProps & ExtendInputProps) => {
  // 渲染只读视图
  return <Slider {...props} disabled={props.disabled || readOnly} />;
};
