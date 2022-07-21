---
order: 4
title: Form 提交表单
toc: menu
---

<Alert>

- CardForm 默认展开式的卡片提交表单、在自动收集表单数据的基础上支持定义操作按钮和位置

- ModalForm、DrawerForm 使用弹窗收集表单，内部包含收集校验、数据数据，通过 visible 控制显隐、不希望使用 visible 控制 可以使用 `CreateForm` [推荐]

- 由于 Form 默认开启 scrollToFirstError、并且我们内部做了处理，自定义组件不需要绑定 id，只需要表单所在的容器设置了高度且开启 overflow 滑动

- 所有下拉容器 默认设置了 getPopupContainer 指向到父节点，滑动不会偏移位置。(可以设置 formConfig autoSetPopupContainer 属性取消该功能)。

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

## ModalForm 基本使用

```tsx
import React from 'react';
import { ModalForm } from 'react-core-form';
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
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  return (
    <>
      <Switch
        checkedChildren="拖拽"
        unCheckedChildren="拖拽"
        onChange={setDrag}
      />
      <br />
      <br />
      <Button type="primary" onClick={setOpen.bind(null, true)}>
        新增
      </Button>
      <ModalForm
        title="新增用户"
        drag={drag}
        visible={open}
        width={1000}
        modalProps={{
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        onClose={setOpen.bind(null, false)}
        onSubmit={onSubmit}
        schema={schema}
        column={2}
      />
    </>
  );
};
```

## DrawerForm 基本使用

```tsx
import React from 'react';
import { DrawerForm } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button } from 'antd';
const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const [open, setOpen] = React.useState(false);
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={setOpen.bind(null, true)}>
        新增
      </Button>
      <DrawerForm
        title="新增用户"
        visible={open}
        width={500}
        onClose={setOpen.bind(null, false)}
        onSubmit={onSubmit}
        schema={schema}
      />
    </>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { DrawerForm, ModalForm } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch, Space } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));

export default (props) => {
  const [opeModal, setOpenModal] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={setOpenModal.bind(null, true)}>
        新增Modal
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" onClick={setOpenDrawer.bind(null, true)}>
        新增Drawer
      </Button>
      <ModalForm
        title="新增用户"
        visible={opeModal}
        schema={schema}
        column={2}
        width={1000}
        onClose={setOpenModal.bind(null, false)}
        modalProps={{
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        footerRender={(form) => {
          return (
            <Space>
              <a>这个是一个描述信息</a>
              <Button onClick={setOpenModal.bind(null, false)}>取消</Button>
              <Button
                type="primary"
                ghost
                onClick={async () => {
                  const data = await form.submit();
                  const res = await delay(1000);
                  if (res) {
                    message.success('保存成功');
                  }
                  setOpenModal(false);
                }}
              >
                提交
              </Button>
            </Space>
          );
        }}
      />
      <DrawerForm
        title="新增用户"
        schema={schema}
        visible={openDrawer}
        onClose={setOpenDrawer.bind(null, false)}
        footerRender={(form) => {
          return (
            <Space>
              <a>这个是一个描述信息</a>
              <Button onClick={setOpenDrawer.bind(null, false)}>取消</Button>
              <Button
                type="primary"
                ghost
                onClick={async () => {
                  const data = await form.submit();
                  const res = await delay(1000);
                  if (res) {
                    message.success('保存成功');
                  }
                  setOpenDrawer(false);
                }}
              >
                提交
              </Button>
            </Space>
          );
        }}
      />
    </>
  );
};
```

## CreateForm 创建表单

```tsx
import React from 'react';
import schema from './schema/form-submit/schema';
import { CreateForm } from 'react-core-form';
import { Space, Button, message } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));

const modalForm = CreateForm.Modal({
  title: '新增用户',
  width: 1000,
  column: 2,
  schema,
  modalProps: {
    bodyStyle: {
      height: 500,
      overflow: 'auto',
    },
  },
});

const drawerForm = CreateForm.Drawer({
  title: '新增用户',
  width: 500,
  schema,
});

const renderForm = CreateForm.Modal({
  title: '自定义渲染',
  initialValues: {
    userName: '张三',
    address: 'xx省xx市',
  },
});

export default (props) => {
  const onSubmit = async (values) => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    } else {
      return Promise.reject(); // 阻止关闭
    }
  };
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          modalForm.open({
            onSubmit,
          });
        }}
      >
        打开弹窗
      </Button>
      <Button
        type="primary"
        onClick={() => {
          drawerForm.open({
            onSubmit,
          });
        }}
      >
        打开抽屉
      </Button>
      <Button
        type="primary"
        onClick={() => {
          renderForm.open({
            onSubmit,
            // 体现为一个自定义组件
            render: ({ value = {}, onChange }) => {
              return (
                <div>
                  姓名：
                  <input
                    value={value.userName}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        userName: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  地址：
                  <input
                    value={value.address}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            },
          });
        }}
      >
        打开弹窗自定义渲染
      </Button>
    </Space>
  );
};
```

## CardForm 扩展属性

<API src="../../src/form-submit/card-form/index.tsx" hideTitle></API>

## ModalForm 扩展属性

<API src="../../src/form-submit/modal-form/index.tsx" hideTitle></API>

## DrawerForm 扩展属性

<API src="../../src/form-submit/drawer-form/index.tsx" hideTitle></API>

## CreateForm Api

| **属性名** | **描述**             | **类型**                                 | **默认值** |
| ---------- | -------------------- | ---------------------------------------- | ---------- |
| Modal      | 创建 ModalForm 实例  | `funtion(config: CreateModalFormProps)`  | `--`       |
| Drawer     | 创建 DrawerForm 实例 | `funtion(config: CreateDrawerFormProps)` | `--`       |

## CreateForm 实例 Api

| **属性名** | **描述**                   | **类型**          | **默认值** |
| ---------- | -------------------------- | ----------------- | ---------- |
| open       | 打开表单，支持扩展属性配置 | `funtion(config)` | `--`       |
| close      | 关闭当前表单               | `funtion()`       | `--`       |

## ActionProps 按钮属性

<API src="../../src/form-submit/type.action.tsx" hideTitle></API>
