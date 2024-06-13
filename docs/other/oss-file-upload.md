> 基于 arco-design Upload 二次封装 内置 Oss 上传逻辑

## 依赖 cdn

```js
https://g.alicdn.com/code/lib/ali-oss/6.13.0/aliyun-oss-sdk.min.js
```

## 基本使用

```tsx | react
import { OssFileUpload } from 'lyr-component';

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <OssFileUpload
      value={value}
      maxCount={5}
      accept=".doc,.docx,.pdf,.xlsx,.xls,.txt,.png,.jpg,.jpeg,.css,.js,.ico"
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
    />
  );
};
```

## 上传图片

```tsx | react
import { OssFileUpload } from 'lyr-component';

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <OssFileUpload
      value={value}
      maxCount={9}
      listType="picture-card"
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
    />
  );
};
```

## 上传视频

```tsx | react
import { OssFileUpload } from 'lyr-component';

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <OssFileUpload
      value={value}
      listType="picture-card"
      accept=".mp4"
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
    />
  );
};
```

## 搭配 Form 表单

```tsx | react
import { CardForm } from 'lyr-component';

export default () => {
  return (
    <CardForm
      title="信息采集"
      schema={[
        {
          widget: 'OssFileUpload',
          label: '用户文件',
          name: 'file',
          required: true,
          props: {
            maxCount: 2,
          },
        },
        {
          widget: 'OssFileUpload',
          label: '用户头像',
          name: 'photo',
          props: {
            listType: 'picture-card',
          },
        },
        {
          widget: 'OssFileUpload',
          label: '用户视频',
          name: 'video',
          props: {
            listType: 'picture-card',
            accept: '.mp4',
            maxCount: 2,
          },
        },
      ]}
    />
  );
};
```

## API

```API
/src/oss-file-upload/type.tsx
```
