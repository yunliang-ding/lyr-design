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
  return (
    <MarkdownViewer
      code={`
# 一级标题

## 二级标题

1. 描述1
2. 描述1
3. 描述1

### 代码块

\`\`\`\jsx
import React from 'react';

export default () => {
  return <div>react</div>
}
\`\`\`

`}
    />
  );
};
```
