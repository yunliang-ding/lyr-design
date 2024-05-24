## 基本使用

```tsx | react
import { Space } from '@arco-design/web-react';
import { Suspend, Button } from 'lyr-component';

export default () => {
  const { open, close, hide, show } = Suspend.create();
  return (
    <Space>
      <Button
        onClick={() => {
          open({
            content: <div>这是一个悬浮容器</div>,
            placement: 'right',
            top: '50%',
          });
        }}
      >
        打开
      </Button>
      <Button
        onClick={() => {
          close();
        }}
      >
        关闭
      </Button>
      <Button
        onClick={() => {
          show();
        }}
      >
        展开
      </Button>
      <Button
        onClick={() => {
          hide();
        }}
      >
        收起
      </Button>
    </Space>
  );
};
```

## API

```ts
export interface SuspendProps {
  /** 容器内容 */
  content?: React.ReactNode;
  /**
   * 是否默认弹出
   * @default true
   */
  show: boolean;
  /**
   * 顶部距离
   * @default 50%
   */
  top?: string;
  /**
   * 位置
   * @default right
   */
  placement?: 'left' | 'right';
  /** 样式 */
  closeStyle?: CSSProperties;
  /** 实例引用 */
  suspendRef?: any;
}
```
