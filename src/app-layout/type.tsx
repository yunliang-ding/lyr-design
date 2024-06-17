import { MutableRefObject, ReactNode } from 'react';
import type { PageHeaderProps, MenuProps } from '@arco-design/web-react';
import { RightProps } from './right.type';

export interface AppLayoutProps {
  /** 
   * 布局方式
   * @default vertical
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 主题色 */
  themeColor?: string;
  /** 点击设置的回调 */
  onSetting?(v: any): void;
  /** 当前路径 */
  pathname?: string;
  /** 是否收起 */
  collapsed?: boolean;
  /** 收起展开勾子 */
  onCollapse?: Function;
  /** 是否黑色主题 */
  dark?: boolean;
  /** 切换主题 */
  onDarkChange?: (dark: boolean) => void;
  /** 菜单属性 */
  menu: MenuProps & {
    items: {
      icon?: ReactNode;
      path: string;
      label: ReactNode;
      children?: [];
    }[];
    onClick?: Function;
  };
  /** 应用标题 */
  title?: ReactNode;
  /** 渲染logo */
  logo?: string;
  /** 扩展类名 */
  className?: string;
  /** 水印配置 */
  waterMarkProps?: any;
  /** 页面头属性 */
  pageHeaderProps?: PageHeaderProps;
  /** 顶部右侧配置 */
  rightContentProps?: RightProps;
  /** 底部渲染 */
  footerRender?: () => ReactNode;
  /** 底部渲染 */
  siderFooterRender?: (v: boolean) => ReactNode;
  /** 实例引用 */
  layoutRef?: MutableRefObject<{
    listenHashChange: (callBack) => null;
  }>;
  children?: ReactNode;
}

export default (props: AppLayoutProps) => null;
