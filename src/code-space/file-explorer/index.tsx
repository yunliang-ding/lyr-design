import Header from '../header';
import { FileExplorerProps, FileProps } from './types';
import { useEffect, useRef, useState } from 'react';
import { RenderFileTree } from './render';
import { getOpenFiles } from './util';
import { isEmpty, uuid } from '@/util';
import { useContextMenu } from 'react-contexify';
import Contexify from './contexify';
import { cloneDeep } from 'lodash';
import CreateSpin from '@/create-spin';
import { getFileByPath } from '../util';
import './index.less';

const prefixCls = 'ide-component-file-explorer';

const explorerSpin = CreateSpin({
  getContainer: () => document.querySelector(`.${prefixCls}`),
  mode: 'vscode',
});

const MENU_ID = 'justTest';

export const sleep: any = async () =>
  new Promise((res) => setTimeout(res, 1000));

export default ({
  style = {},
  onClick = () => {},
  projectName = 'EXPLORER',
  header = true,
  onRefresh,
  onCreateFile = sleep,
  onRenameFile = sleep,
  onDeleteFile = sleep,
  explorerRef,
  menus,
  spinWapper = explorerSpin,
  treeData = [],
}: FileExplorerProps) => {
  const editFileRef = useRef<FileProps>();
  const [files, setFiles] = useState<FileProps[]>([]);
  useEffect(() => {
    setFiles(cloneDeep(treeData)); // 剔除引用关系
  }, [treeData]);
  const [selectedKey, setSelected] = useState<string>();
  // 扩展 api
  useEffect(() => {
    explorerRef.current.openSpin = spinWapper.open;
    explorerRef.current.closeSpin = spinWapper.close;
    explorerRef.current.setSelected = setSelected;
    explorerRef.current.getOpenFiles = (): FileProps[] => {
      return getOpenFiles(files);
    };
  }, [files]);
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  const handleContextMenu = (event, file) => {
    event.preventDefault();
    show(event, {
      props: file,
    });
  };
  const contexifyMenus = menus || [
    {
      key: 'new folder',
      label: 'New Folder',
      hidden: ({ props }) => props.type === 'file',
      onClick({ props }) {
        createFile(props, 'directory');
      },
    },
    {
      key: 'new file',
      label: 'New File',
      hidden: ({ props }) => props.type === 'file',
      onClick({ props }) {
        createFile(props, 'file');
      },
    },
    {
      key: 'rename',
      label: 'Rename',
      onClick({ props }) {
        renameFile(props);
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick({ props }) {
        deleteFile(props);
      },
    },
  ];
  /** 文件点击 */
  const onFileClick = (file: FileProps) => {
    if (file.type === 'directory') {
      file.status = file.status === 'expanded' ? 'nomal' : 'expanded';
    } else {
      setSelected(file.path);
    }
    setFiles([...files]);
    onClick(file);
  };
  // 文件夹全部收起
  const onUnFold = () => {};
  // 打开新增文件
  const createFile = (file?: FileProps, type?: 'file' | 'directory') => {
    let currentNode: any = {};
    if (file?.path) {
      currentNode = file;
    } else {
      // 默认节点为根
      currentNode = {
        path: files[0]?.path.substring(0, files[0]?.path.lastIndexOf('/')),
        children: files,
      };
      if (selectedKey) {
        const currentFile = getFileByPath(selectedKey, files);
        if (currentFile.type === 'directory') {
          // 当前目录为根
          currentNode = currentFile;
        } else {
          const parentPath = selectedKey.substring(
            0,
            selectedKey.lastIndexOf('/'),
          );
          const currentFileParent = getFileByPath(parentPath, files);
          if (!isEmpty(currentFileParent)) {
            // 取父节点目录为根
            currentNode = currentFileParent;
          }
        }
      }
    }
    // 展开文件夹
    currentNode.status = 'expanded';
    editFileRef.current = {
      name: '',
      path: [currentNode.path, `new-${uuid(12)}`].join('/'),
      status: 'edit',
      type: type || 'file',
    };
    if (type === 'directory') {
      editFileRef.current.children = [];
    }
    currentNode.children.push(editFileRef.current);
    setFiles([...files]);
  };
  // 新增文件完毕
  const createFileDone = async (fileName: string) => {
    if (isEmpty(fileName)) {
      // 空直接删除不需要确认
      deleteFile(
        {
          path: editFileRef.current.path,
        },
        false,
      );
      return setFiles([...files]);
    }
    const path = editFileRef.current.path;
    editFileRef.current.extension = fileName.substring(
      fileName.lastIndexOf('.'),
    );
    editFileRef.current.name = fileName;
    editFileRef.current.gitStatus = 'U';
    editFileRef.current.path = [
      path.substring(0, path.lastIndexOf('/')),
      fileName,
    ]
      .filter((i) => i)
      .join('/');
    editFileRef.current.status = 'nomal';
    // 等待外面确认
    try {
      explorerSpin.open();
      await onCreateFile(editFileRef.current, files);
      setFiles([...files]);
    } catch (error) {
      console.log(error);
    } finally {
      explorerSpin.close();
    }
  };
  // 重命名文件
  const renameFile = (file?: FileProps) => {
    editFileRef.current = file;
    file.status = 'edit';
    setFiles([...files]);
  };
  // 新增文件完毕
  const renameFileDone = async (newName: string, oldName: string) => {
    // 不做处理直接返回
    if (isEmpty(newName) || newName === oldName) {
      editFileRef.current.status = 'nomal';
      return setFiles([...files]);
    }
    const path = editFileRef.current.path;
    editFileRef.current.extension = newName.substring(newName.lastIndexOf('.'));
    editFileRef.current.name = newName;
    editFileRef.current.status = 'nomal';
    editFileRef.current.path = [
      path.substring(0, path.lastIndexOf('/')),
      newName,
    ].join('/');
    // 等待外面确认
    try {
      explorerSpin.open();
      await onRenameFile(editFileRef.current);
      setFiles([...files]);
    } catch (error) {
      console.log(error);
    } finally {
      explorerSpin.close();
    }
  };
  // 删除指定的文件
  const deleteFile = async (file, isCheck = true) => {
    const { path } = file;
    let root = files;
    const parentNode = getFileByPath(
      path.substring(0, path.lastIndexOf('/')),
      files,
    );
    if (parentNode) {
      root = parentNode.children;
    }
    const index = root.findIndex((i) => i.path === path);
    root.splice(index, 1);
    if (isCheck) {
      try {
        explorerSpin.open();
        // 等待外面确认
        await onDeleteFile(file, files);
        setFiles([...files]);
      } catch (error) {
        console.log(error);
      } finally {
        explorerSpin.close();
      }
    } else {
      setFiles([...files]);
    }
  };
  /** 渲染 vNode */
  return (
    <div className={`${prefixCls} show-file-icons`} style={style}>
      {header && (
        <Header
          title={[
            'explorer'.toLocaleUpperCase(),
            projectName.toLocaleUpperCase(),
          ].join(': ')}
          actions={[
            {
              icon: 'codicon codicon-new-file',
              title: 'New File',
              onClick: () => {
                createFile(null);
              },
            },
            {
              icon: 'codicon codicon-new-file',
              title: 'New Folder',
              onClick: () => {
                createFile(null, 'directory');
              },
            },
            {
              icon: 'codicon codicon-refresh',
              title: 'Refresh Explorer',
              onClick: onRefresh,
            },
            {
              icon: 'codicon codicon-collapse-all',
              title: 'Collapse Folders in Explorer',
              onClick: onUnFold,
            },
          ]}
        />
      )}
      <div className={`${prefixCls}-body`}>
        <RenderFileTree
          onContextMenu={handleContextMenu}
          dataSource={files}
          selectedKey={selectedKey}
          prefixCls={prefixCls}
          onFileClick={onFileClick}
          onAddDone={createFileDone}
          renameFileDone={renameFileDone}
        />
      </div>
      {menus !== false && <Contexify menus={contexifyMenus} />}
    </div>
  );
};
