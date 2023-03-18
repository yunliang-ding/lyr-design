---
order: 2
title: FileExplorer 文件目录
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { FileExplorer } from 'react-core-form';
import files from './files.json';
import filesGit from './files-git.json';

export default () => {
  const explorerRef = React.useRef({});
  const [treeData, setTreeData] = React.useState(files);
  return (
    <>
      <button
        onClick={() => {
          setTreeData(files);
        }}
      >
        普通展示
      </button>
      &nbsp;
      <button
        onClick={() => {
          setTreeData(filesGit);
        }}
      >
        文件打git标记
      </button>
      <br />
      <br />
      <FileExplorer
        treeData={treeData}
        projectName="my-code-space"
        style={{ width: 260, height: 400 }}
        explorerRef={explorerRef}
        onRefresh={async () => {
          explorerRef.current.openSpin();
          await new Promise((res) => setTimeout(res, 1000));
          setTreeData(files);
          explorerRef.current.closeSpin();
        }}
        onClick={(file) => {
          console.log('onClick', file);
        }}
        onCreateFile={async (file) => {
          await new Promise((res) => setTimeout(res, 2000));
          console.log(file);
        }}
        onRenameFile={async (file) => {
          await new Promise((res) => setTimeout(res, 2000));
          console.log(file);
        }}
        onDeleteFile={async (file) => {
          await new Promise((res) => setTimeout(res, 2000));
          console.log(file);
        }}
      />
    </>
  );
};
```

## API

<API src="../../src/code-space/file-explorer/index.tsx" hideTitle></API>
