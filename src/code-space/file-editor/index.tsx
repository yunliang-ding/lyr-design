import { FileEditorProps } from './types';
import HeaderTabs from './tabs';
import CodeEditor from '@/code-space/code-editor';
import CreateSpin from '@/create-spin';
import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { FileProps } from '@/code-space/file-explorer/types';
import { uuid } from '@/util';
import { sleep } from '@/code-space/file-explorer';
import './index.less';

const defaultExtra = [
  {
    icon: 'codicon codicon-split-horizontal',
    key: 'split',
    title: '新窗口',
  },
  {
    icon: 'codicon codicon-toolbar-more',
    key: 'more',
    title: '更多',
  },
];

const prefixCls = 'ide-editor-file-editor';

export default ({
  defaultFiles = [],
  defaultSelectedKey = '',
  style = {},
  extra = [],
  openCache = false,
  onClick = () => {},
  onClose = () => {},
  onChange = () => {},
  onSave = sleep,
  codeRef,
  editorRef = useRef({
    addTab: {},
  } as any),
  treeData = [],
}: FileEditorProps) => {
  const domKey = useMemo(() => `class-${uuid(12)}`, []);
  const spin = CreateSpin({
    getContainer: () => document.querySelector(`.${domKey}`),
    mode: 'vscode',
    style: {
      top: 35,
    },
  });
  const [reload, setReload] = useState(Math.random());
  const [files, setFiles] = useState<FileProps[]>(
    (openCache && JSON.parse(localStorage.getItem('my-code-space-tabs'))) ||
      defaultFiles,
  );
  const [selectedKey, setSelectedKey] = useState<string>(
    (openCache && localStorage.getItem('my-code-space-selectedKey')) ||
      defaultSelectedKey,
  );
  // Ctrl + S
  const keyboardEvent = async (e) => {
    if (
      (e.key === 's' || e.key === 'S') &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      spin.open();
      try {
        const file = files.find((i) => i.path === selectedKey);
        const content = window[`monaco_${selectedKey}`]?.getValue?.();
        await onSave(content); // 等待外面，通过之后再更新状态
        file.content = content;
        file.notSave = false;
        setFiles([...files]);
      } catch (error) {
        console.log(error);
      } finally {
        spin.close();
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [selectedKey, treeData]);
  // 扩展相关的 API
  const fristRender = useRef(true);
  useEffect(() => {
    editorRef.current.spin = spin;
    // 新增tab
    editorRef.current.addTab = (tab: any) => {
      // 不存在就添加
      if (!files.some((file) => file.path === tab.path)) {
        files.push(tab);
        setFiles([...files]);
      }
      setSelectedKey(tab.path);
    };
    // 删除 tab
    editorRef.current.removeTab = (path: string) => {
      setFiles(files?.filter((i) => i.path !== path));
      if (path === selectedKey) {
        setSelectedKey(files?.[0].path);
      }
    };
    // 新增 Diff 编辑器
    editorRef.current.addDiffTab = (tabProps) => {
      const tab = {
        type: 'file',
        ...tabProps,
        showDiff: true,
        path: `~diff/${tabProps.path}`,
      };
      // 不存在就添加
      if (!files.some((file) => file.path === tab.path)) {
        files.push(tab);
        setFiles([...files]);
      }
      setSelectedKey(tab.path);
    };
    // 切换到指定的tab
    editorRef.current.checkTab = (key: string) => {
      setSelectedKey(key);
    };
    // 获取所有的Tabs
    editorRef.current.getTabs = () => {
      return files;
    };
    // 返回当前编辑的文件
    editorRef.current.getCurrentTab = () => {
      return files.find((i) => i.path === selectedKey);
    };
    // 返回当前编辑的文件
    editorRef.current.updateTabByPath = (path, tab: any) => {
      const file = files.find((i) => i.path === path);
      if (file) {
        Object.assign(file, tab);
        setFiles([...files]);
      }
    };
    // 返回未保存的文件个数
    editorRef.current.getTotalNotSaveCount = () => {
      return files.filter((i) => i.notSave).length;
    };
    if (!fristRender.current && openCache) {
      localStorage.setItem('my-code-space-tabs', JSON.stringify(files));
      localStorage.setItem('my-code-space-selectedKey', selectedKey);
    }
    fristRender.current = false;
  }, [files, selectedKey]);
  return (
    <div style={style} className={`${prefixCls} show-file-icons ${domKey}`}>
      {files.length > 0 ? (
        <>
          <HeaderTabs
            tabs={files}
            selectedKey={selectedKey}
            onClick={(file) => {
              console.log(file);
              setSelectedKey(file.path);
              onClick(file);
            }}
            onTabClose={(file, index) => {
              files.splice(index, 1);
              setFiles([...files]);
              setSelectedKey(files[0]?.path);
              onClose(files[0]);
            }}
            extra={[...extra, ...defaultExtra]}
          />
          {files.map((file) => {
            return (
              <div
                key={file.path}
                style={{
                  width: '100%',
                  height: '100%',
                  display: file.path === selectedKey ? 'block' : 'none',
                }}
              >
                <div className="ide-editor-file-editor-body">
                  {typeof file.render === 'function' ? (
                    // 自定义渲染
                    file.render(file)
                  ) : (
                    <CodeEditor
                      id={`monaco_${file.path}`}
                      codeRef={codeRef}
                      mode={file.showDiff ? 'diff' : undefined}
                      language={
                        {
                          '.less': 'less',
                          '.css': 'css',
                          '.json': 'json',
                          '.md': 'markdown',
                          '.js': 'javascript',
                          '.jsx': 'javascript',
                          '.ts': 'typescript',
                          '.tsx': 'typescript',
                        }[file.extension] || 'javascript'
                      }
                      value={file.content}
                      originalValue={file.remoteContent}
                      onChange={(code) => {
                        // 判断是否修改了
                        file.notSave = code !== file.content;
                        setReload(Math.random());
                        onChange(code);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <img
          style={{ width: 300 }}
          key={reload}
          src="https://img.alicdn.com/imgextra/i1/O1CN01ypboF828fH2ScXohX_!!6000000007959-55-tps-40-40.svg"
        />
      )}
    </div>
  );
};
