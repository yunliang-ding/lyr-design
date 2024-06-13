import { ReactNode } from 'react';

export interface RightProps {
  /** 主题 */
  dark?: boolean;
  /** 用户名称 */
  userName?: string;
  /** 下拉菜单 */
  droplist?: ReactNode;
  /** 头像地址 */
  avatarUrl?: string;
  /** 自定义渲染  */
  extra?: ReactNode;
  /** 主题色 */
  themeColor?: string;
  /** 切换主题色 */
  onThemeColorChange?: (color: string) => void;
  /** 切换主题 */
  onDarkChange?: (dark: boolean) => void;
}

export default (props: RightProps) => null;
