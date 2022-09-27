---
order: 4
title: Form 提交表单
toc: menu
---

<Alert>

- CardForm 默认展开式的卡片提交表单、在自动收集表单数据的基础上支持定义操作按钮和位置

- CreateModal、CreateDrawer 使用 Api 形式打开弹出层、移除 jsx 模式。

- Form 默认开启 scrollToFirstError、并且我们内部做了处理，自定义组件不需要绑定 id，只需要表单所在的容器设置了高度且开启 overflow 滑动

- 所有下拉容器 默认设置了 getPopupContainer 指向到父节点，滑动不会偏移位置

</Alert>

## CardForm 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm, Form } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { message } from 'antd';
const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default () => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <CardForm
      cardProps={{
        bodyStyle: {
          height: 500,
          overflow: 'auto',
        },
      }}
      title="新增用户"
      onSubmit={onSubmit}
      schema={schema}
      form={form}
      column={2}
    />
  );
};
```

## 使用 actionAlign 定义操作按钮位置

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { message, Switch, Button, Space } from 'antd';
const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default () => {
  const [actionAlign, setActionAlign] = React.useState('end');
  const onSubmit = async (values) => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    }
  };

  return (
    <>
      <Space>
        <Button onClick={setActionAlign.bind(null, 'start')}>左边</Button>
        <Button onClick={setActionAlign.bind(null, 'center')}>居中</Button>
        <Button onClick={setActionAlign.bind(null, 'end')}>右边</Button>
      </Space>
      <CardForm
        title="新增用户"
        cardProps={{
          style: {
            marginTop: 16,
          },
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        actionAlign={actionAlign}
        onSubmit={onSubmit}
        schema={schema}
        column={2}
      />
    </>
  );
};
```

## 使用自定义 actions

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm, Form } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { message, Switch } from 'antd';
const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default () => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  const onReset = (values) => {
    form.resetFields();
    console.log('onReset ->', values);
  };
  const onClear = () => {
    form.clearValues();
    // form.clearValues(['input']);
  };
  const actions1 = [
    {
      label: '保草稿',
      type: 'primary',
      spin: true, // 开启加载
      onClick: onSubmit,
    },
    {
      label: '重置表单',
      type: 'dashed',
      onClick: onReset,
    },
    {
      label: '清空表单',
      type: 'dashed',
      onClick: onClear,
    },
  ];
  const actions2 = [
    {
      label: '同意',
      type: 'primary',
      spin: true, // 开启加载
      validator: true, // 开启表单检验
      onClick: onSubmit,
      confirm: {
        title: '提示',
        content: '是否同意?',
      },
    },
    {
      label: '驳回',
      type: 'dashed',
      confirm: {
        title: '提示',
        content: '是否确认驳回？',
      },
      onClick: (values) => {
        message.success('驳回成功');
      },
    },
  ];
  return (
    <>
      <Switch
        checkedChildren="加载状态"
        unCheckedChildren="加载状态"
        onChange={(v) => {
          form.setFormLoading(v);
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="按钮禁用"
        unCheckedChildren="按钮禁用"
        onChange={(v) => {
          form.setFooterDisabled(v);
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="按钮切换"
        unCheckedChildren="按钮切换"
        onChange={(v) => {
          if (v) {
            form.setFooterActions(actions2);
          } else {
            form.setFooterActions(actions1);
          }
        }}
      />
      <CardForm
        title="新增用户"
        form={form}
        schema={schema}
        cardProps={{
          style: {
            marginTop: 16,
          },
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        column={2}
        initialValues={{
          input: '这里是默认值',
        }}
        actions={actions1}
      />
    </>
  );
};
```

## CreateModal 基本使用

```tsx
import React from 'react';
import { CreateModal } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '新增用户',
          width: 1000,
          modalProps: {
            bodyStyle: {
              height: 500,
              overflow: 'auto',
            },
          },
          onSubmit,
          schema,
          column: 2,
        }).open();
      }}
    >
      打开一个Modal
    </Button>
  );
};
```

## CreateDrawer 基本使用

```tsx
import React from 'react';
import { CreateDrawer } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '新增用户',
          onSubmit,
          schema,
        }).open();
      }}
    >
      打开一个Drawer
    </Button>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { CreateDrawer } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button, Space } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        const myDrawer = CreateDrawer({
          title: '新增用户',
          schema,
        });
        myDrawer.open({
          footerRender: (form) => {
            return (
              <Space>
                <a>这个是一个描述信息</a>
                <Button onClick={myDrawer.close}>取消</Button>
                <Button
                  type="primary"
                  ghost
                  onClick={async () => {
                    const data = await form.submit();
                    const res = await delay(1000);
                    if (res) {
                      message.success('保存成功');
                    }
                    myDrawer.close(); // 关闭
                  }}
                >
                  提交
                </Button>
              </Space>
            );
          },
        });
      }}
    >
      自定义渲染Drawer底部按钮
    </Button>
  );
};
```

## CreateModal 自定义渲染

```tsx
import React from 'react';
import { CreateModal } from 'react-core-form';
import { Button, message, Switch } from 'antd';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '自定义渲染',
          confirmText: '确认',
          onSubmit() {
            message.success('确认完毕');
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

## CardForm 扩展属性

<API src="../../src/form-submit/card-form/index.tsx" hideTitle></API>

## CreateModal 扩展属性

<API src="../../src/form-submit/modal-form/index.tsx" hideTitle></API>

## CreateDrawer 扩展属性

<API src="../../src/form-submit/drawer-form/index.tsx" hideTitle></API>

## CreateModal、CreateDrawer 实例 Api

| **属性名** | **描述**                   | **类型**          | **默认值** |
| ---------- | -------------------------- | ----------------- | ---------- |
| open       | 打开表单，支持扩展属性配置 | `funtion(config)` | `--`       |
| close      | 关闭当前表单               | `funtion()`       | `--`       |

## ActionProps 按钮属性

<API src="../../src/form-submit/type.action.tsx" hideTitle></API>
