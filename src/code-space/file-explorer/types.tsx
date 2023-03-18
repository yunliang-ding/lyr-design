import { CSSProperties, MutableRefObject, ReactNode } from 'react';

export interface FileProps {
  /** 文件路径 */
  path: string;
  /** 文件类型 */
  type: 'file' | 'directory';
  /** 文件名 */
  name: string;
  /** 文件后缀名 */
  extension?: string;
  /** 文件大小 */
  size?: number;
  /** 文件状态 */
  status?: 'edit' | 'nomal' | 'expanded';
  /** 文件是否未保存 */
  notSave?: boolean;
  /** 文件子节点 */
  children?: FileProps[];
  /** 文件内容 */
  content?: string;
  /** 自定义渲染 */
  render?: (file: FileProps) => ReactNode;
  /** git 远程代码内容 */
  remoteContent?: string;
  /** git 远程路径 */
  remotePath?: string;
  /** git文件状态 */
  gitStatus?: 'U' | 'M' | 'D' | undefined;
  /** 是否展示 diff 对比 */
  showDiff?: boolean;
  sha?: string;
}

export interface FileExplorerProps {
  /** 获取 ref 实例 */
  explorerRef?: MutableRefObject<explorerRefInstance>;
  /** 主容器样式 */
  style?: CSSProperties;
  /** 文件点击 */
  onClick?: (file: FileProps) => void;
  /** 创建文件或者文件夹 */
  onCreateFile?: (file: FileProps, files: FileProps[]) => Promise<void>;
  /** 重命名文件 */
  onRenameFile?: (file: FileProps) => Promise<void>;
  /** 删除文件 */
  onDeleteFile?: (file: FileProps, files: FileProps[]) => Promise<void>;
  /** 刷新文件 */
  onRefresh?: () => void;
  /** 项目名称 */
  projectName?: string;
  /** 是否展示头部 */
  header?: boolean;
  /** 右键菜单配置 */
  menus?: any[] | boolean;
  spinWapper?: any;
  /** 文件树 */
  treeData?: FileProps[];
}

export interface explorerRefInstance {
  openSpin: () => void;
  closeSpin: () => void;
  getOpenFiles: () => FileProps[];
  setSelected: (key: string) => void;
}
