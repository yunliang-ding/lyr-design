import { UploadProps } from '@arco-design/web-react';

export interface OssFileUploadProps extends UploadProps {
  /** 按钮文字 */
  text?: string;
  /**
   * 文件大小
   * @default 1G
   */
  limitSize?: number;
  /** 设置值 */
  value?: any;
  /** 值改变 */
  onChange?: any;
  /** 是否只读 */
  readOnly?: boolean;
  /**
   * 文件个数
   * @default 1
   */
  maxCount?: number;
  name?: any;
  form?: any;
  readOnlyEmptyValueNode?: any;
}

export default (props: OssFileUploadProps) => null;