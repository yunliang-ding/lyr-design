---
order: 23
title: MarkdownViewer 渲染 markdown
toc: menu
---

<Alert>

- 渲染 markdown

</Alert>

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { MarkdownViewer } from 'react-core-form';

export default () => {
  const [codeTheme, setCodeTheme] = React.useState('dark');
  return (
    <div>
      <button
        onClick={() => {
          setCodeTheme(codeTheme === 'dark' ? 'light' : 'dark');
        }}
      >
        切换代码主题
      </button>
      <MarkdownViewer
        codeTheme={codeTheme}
        content={`
# 一级标题

## 二级标题

**描述**

> 区块描述

1. 描述1
2. 描述1
3. 描述1

### 代码块

\`\`\`\jsx
import React from 'react';

export default () => {
  return <div className='app'>react</div>
}
\`\`\`

`}
      />
    </div>
  );
};
```

## API

<API src="../../src/markdown-viewer/index.tsx" hideTitle></API>
