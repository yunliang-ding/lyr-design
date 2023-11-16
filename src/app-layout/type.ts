import { MutableRefObject, ReactNode } from 'react';
import type { PageHeaderProps, MenuProps } from '@arco-design/web-react';

export default interface ProLayout {
  /** 当前路径 */
  pathname?: string;
  /** 是否收起 */
  collapsed?: boolean;
  /** 收起展开勾子 */
  onCollapse?: Function;
  /** 是否紧凑排版 */
  compact?: boolean;
  /** 是否黑色主题 */
  dark?: boolean;
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
  logo?: ReactNode;
  /** 扩展类名 */
  className?: string;
  /** 水印配置 */
  waterMarkProps?: any;
  /** 页面头属性 */
  pageHeaderProps?: PageHeaderProps;
  /** 顶部右侧渲染 */
  rightContentRender: () => ReactNode;
  /** 底部渲染 */
  footerRender: () => ReactNode;
  /** 底部渲染 */
  siderFooterRender: (v: boolean) => ReactNode;
  /** 实例引用 */
  layoutRef?: MutableRefObject<{
    listenHashChange: (callBack) => null;
  }>;
  children?: ReactNode;
}
