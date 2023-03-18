import { FileProps } from '../file-explorer/types';
import { CSSProperties, MutableRefObject } from 'react';

export interface FileEditorProps {
  /** 默认文件列表 */
  defaultFiles?: FileProps[];
  /** 住容器样式 */
  style?: CSSProperties;
  /** 选中的key */
  defaultSelectedKey?: string;
  /** 点击事件 */
  onClick?: (file: FileProps) => void;
  /** 关闭事件 */
  onClose?: (selectedFile: FileProps) => void;
  /** monaco实例 */
  codeRef?: any;
  /** api 实例 */
  editorRef?: MutableRefObject<editorRefInstance>;
  /** 右侧图标 */
  extra?: {
    key: string;
    icon: string;
    title: string;
    onClick?: (file: FileProps) => void;
    visible?: (file: FileProps) => boolean;
  }[];
  /** 文件改变钩子 */
  onChange?: (code: string) => void;
  /** ctrl + s 保存钩子 */
  onSave?: (code: string) => void;
  onTabClose?: any;
  openCache?: boolean;
  treeData?: any;
}

export interface editorRefInstance {
  /** 控制loading */
  spin?: any;
  /** 打开一个 Tab */
  addTab: (tabProps: FileProps) => void;
  /** 删除一个 Tab */
  removeTab: (path: string) => void;
  /** 打开文件对比的 Tab */
  addDiffTab: (tabProps: FileProps) => void;
  /** 切换到指定的Tab */
  checkTab: (path: string) => void;
  /** 获取所有的Tab */
  getTabs: () => FileProps[];
  /** 获取当前的Tab */
  getCurrentTab: () => FileProps;
  /** 更新指定的Tab */
  updateTabByPath: (path: string, tab: any) => void;
  /** 返回未保存文件的个数 */
  getTotalNotSaveCount: () => number;
}
