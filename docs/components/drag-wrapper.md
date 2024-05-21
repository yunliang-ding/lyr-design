> 最基本的拖拽组件

## 基本使用

```tsx | react | var(--color-fill-2)
import { DragWrapper } from 'lyr-component';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <DragWrapper
        style={{
          gap: 20,
        }}
        onChange={(item) => {
          console.log(item);
        }}
        items={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((i) => {
          return {
            key: i,
            content: (
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: 'var(--color-menu-light-bg)',
                  color: 'var(--color-neutral-10)',
                  padding: '0 4px',
                }}
              >
                {i}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};
```

## 模块之间联动

```tsx | react | var(--color-fill-2)
import { DragWrapper } from 'lyr-component';

export default () => {
  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <DragWrapper
          style={{
            gap: 20,
          }}
          onChange={(item) => {
            console.log(item);
          }}
          accept={false}
          items={['Input', 'Select', 'Checkbox'].map((i) => {
            return {
              key: i,
              content: (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: 'var(--color-menu-light-bg)',
                    color: 'var(--color-neutral-10)',
                    padding: '0 4px',
                  }}
                >
                  {i}
                </div>
              ),
            };
          })}
        />
      </div>
      <hr style={{ margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <DragWrapper
          style={{
            gap: 20,
          }}
          onChange={(item) => {
            console.log(item);
          }}
          items={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => {
            return {
              key: i,
              content: (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: 'var(--color-menu-light-bg)',
                    color: 'var(--color-neutral-10)',
                    padding: '0 4px',
                  }}
                >
                  {i}
                </div>
              ),
            };
          })}
        />
      </div>
    </>
  );
};
```