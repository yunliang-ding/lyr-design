> 基于 `DragWrapper` 扩展的单列拖拽组件

## 基本使用

```tsx | react
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