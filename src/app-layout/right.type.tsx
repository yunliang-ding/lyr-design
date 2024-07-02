import { ReactNode } from 'react';

export interface RightProps {
  /** 用户名称 */
  userName?: string;
  /** 下拉菜单 */
  droplist?: ReactNode;
  /** 头像地址 */
  avatarUrl?: string;
  /** 自定义渲染 */
  avatarRender?: () => ReactNode;
  /** 右侧自定义渲染  */
  extra?: ReactNode;
  dark?: any;
  onDarkChange?: any;
  themeColor?: any;
  layout?: any;
  onSetting?: any;
}

export default (props: RightProps) => null;
