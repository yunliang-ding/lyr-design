import { ReactNode } from 'react';

export interface RightProps {
  dark?: boolean;
  userName?: string;
  droplist?: ReactNode;
  avatarUrl?: string;
  extra?: ReactNode;
  themeColor?: string;
  /** 切换主题色 */
  onThemeColorChange?: (color: string) => void;
  /** 切换主题 */
  onDarkChange?: (dark: boolean) => void;
}

export default (props: RightProps) => null;
