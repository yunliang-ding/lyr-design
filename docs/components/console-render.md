---
order: 21
title: ConsoleRender 渲染打印
toc: menu
---

## 基本使用

- 将 Console.log 打印的结果渲染成 ReactNode，输出到指定节点

```tsx
/**
 * background: '#fff'
 * title: 打开控制台运行 console.log 查看效果
 */
import React from 'react';
import { ConsoleRender } from 'react-core-form';

export default () => {
  const consoleInstance = ConsoleRender.create({
    target: '#console-container',
  });
  React.useEffect(() => {
    // 监听日志打印
    consoleInstance.listener();
    console.log(100, 'test', new Date(), Object, () => {}, null, undefined);
    console.log(
      [1, 2, 3, 4],
      { name: 'test', age: { b: 1 } },
      { address: 'test', liked: [1, 2, 3] },
      [100, 200],
    );
    return consoleInstance.destory;
  }, []);
  return (
    <>
      <button
        onClick={() => {
          consoleInstance.clear();
        }}
      >
        清空日志
      </button>
      <br />
      <br />
      <div id="console-container" />
    </>
  );
};
```
