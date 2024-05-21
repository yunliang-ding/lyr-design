## 基本使用

```tsx | react
import { CreateModal, Button } from 'lyr-component';
import schema from '@/components/schema/form-submit/schema.ts';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '新增用户',
          schema,
          column: 2,
          width: 800,
          async onSubmit(values) {
            alert(JSON.stringify(values));
          },
        }).open();
      }}
    >
      打开一个Modal
    </Button>
  );
};
```

## 手动关闭和阻止关闭

```tsx | react
import { CreateModal, Button } from 'lyr-component';
import { Message } from '@arco-design/web-react';
import schema from '@/components/schema/form-submit/schema.ts';

export default (props) => {
  return (
    <Button
      type="dashed"
      onClick={() => {
        const modal = CreateModal({
          title: '新增用户',
          width: 800,
          schema,
          column: 2,
          actions: [
            {
              label: '手动关闭',
              onClick() {
                modal.close();
              },
            },
            {
              label: '手动提交',
              spin: true,
              type: 'primary',
              async onClick(value) {
                await new Promise((res) => setTimeout(res, 1000));
                console.log(value);
                Message.error('接口异常');
                return Promise.reject();
              },
            },
          ],
        });
        modal.open();
      }}
    >
      手动关闭和阻止关闭
    </Button>
  );
};
```

## 自定义渲染

```tsx | react
import { CreateModal, Button } from 'lyr-component';
import { Message } from '@arco-design/web-react';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '自定义渲染',
          okText: '确认',
          height: 200,
          async onSubmit() {
            Message.success('确认完毕');
            await new Promise((res) => setTimeout(res, 1000));
          },
        }).open({
          render: ({ value }) => {
            return <h4>这个是详情页面可用自定义渲染</h4>;
          },
        });
      }}
    >
      自定义渲染Modal
    </Button>
  );
};
```