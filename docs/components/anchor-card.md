> 左侧面板支持点击滑动定位到指定的卡片

## 基本使用

```tsx | react
import { AnchorCard } from 'lyr-component';

const list = [
  {
    title: '基本信息',
    content: '基本信息内容区域23',
    cardProps: {
      extra: <a>更多</a>,
      bodyStyle: {
        height: 100,
      },
    },
  },
  {
    title: '数据报表',
    content: '数据报表内容区域',
  },
  {
    title: '联系人信息',
    content: '联系人信息内容区域',
  },
  {
    title: '关联项目信息',
    content: '关联项目信息内容区域',
  },
  {
    title: '备案信息',
    content: '备案信息内容区域',
  },
];

export default () => {
  return (
    <AnchorCard
      list={list}
      fixHeight={104}
      fixedTop={104}
      defaultActivityKey="基本信息"
    />
  );
};
```
