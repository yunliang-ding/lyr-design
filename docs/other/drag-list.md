> 基于 `DragWrapper` 扩展的单列拖拽组件

## 基本使用

```tsx | react | var(--color-fill-2)
import { DragList } from 'lyr-component';

export default () => {
  return (
    <DragList
      width={100}
      onChange={(list) => {
        console.log(list);
      }}
      items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return {
          key: i,
          content: i,
        };
      })}
    />
  );
};
```

## API

```ts
export interface DragListProps extends DragWrapperProps {
  /** 列顺序改变事件 */
  onChange?: Function;
  /**
   * 是否展示图标
   * @default true
   */
  showIcon?: boolean;
  /** 宽度 */
  width?: number;
}
```
