---
order: 3
title: Form 高级用法
toc: menu
---

## 使用 required 函数式解决联动校验

```tsx
/**
 * title: 说明
 * desc: readOnly、disabled、required 属性都支持接受一个函数
 */
import React from 'react';
import { Form, Button } from 'react-core-form';
export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    const data = await form.submit(); // 校验并返回数值
    alert(JSON.stringify(data));
  };
  return (
    <>
      <Form
        form={form}
        schema={[
          {
            type: 'Input',
            name: 'name',
            label: '用户姓名',
            required: true,
          },
          {
            type: 'Input',
            name: 'nickname',
            label: '用户昵称',
            tooltip: '判断是否必填',
            extra: '填写名称则昵称非必填',
            effect: ['name'],
            required: ({ getFieldValue }) => !getFieldValue('name'),
          },
        ]}
      />
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </>
  );
};
```

## 使用 beforeReceive 接受前的转换处理

```tsx
/**
 * title: 说明
 * desc: beforeReceive仅仅是在初次渲染时执行、normalize是在更新的时候转换
 */
import React from 'react';
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'Select',
          name: 'likes',
          label: '用户角色',
          props: {
            mode: 'multiple',
            options: [
              { label: '浏览者', value: '1' },
              { label: '开发者', value: '2' },
              { label: '管理员', value: '3' },
            ],
          },
          beforeReceive: ({ likes }) => {
            return likes?.split(',');
          },
        },
      ]}
      initialValues={{
        likes: '1,2',
      }}
    />
  );
};
```

## 使用 transform 处理数据

```tsx
/**
 * title: 说明
 * desc: 返回新对象会替换当前值
 */
import React from 'react';
import { Form, Button } from 'react-core-form';
import moment from 'moment';
export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    const data = await form.submit(); // 校验并返回数值
    alert(JSON.stringify(data));
  };
  return (
    <>
      <Form
        form={form}
        schema={[
          {
            type: 'Select',
            name: 'likes',
            label: '用户角色',
            props: {
              mode: 'multiple',
              options: [
                { label: '浏览者', value: '1' },
                { label: '开发者', value: '2' },
                { label: '管理员', value: '3' },
              ],
            },
            transform: ({ likes }) => {
              return {
                likes: likes?.join(','),
              };
            },
          },
        ]}
      />
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </>
  );
};
```

## 使用异步的 options

```tsx
/**
 * title: 说明
 * desc: 这种模式只会再次渲染单个组件，不会重新渲染Form
 */
import React from 'react';
import { Form, Button } from 'react-core-form';
import schema from './schema/form-advance/async-option';
export default () => {
  const [fresh, setFresh] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const reload = () => {
    setFresh(!fresh);
  };
  const onMount = async ({ getFieldOption }) => {
    /* 获取options */
    console.log(await getFieldOption('classify'));
  };
  return (
    <>
      <Button type="primary" onClick={reload} style={{ marginBottom: 20 }}>
        重新加载
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        onClick={setReadOnly.bind(null, !readOnly)}
        style={{ marginBottom: 20 }}
      >
        设置只读
      </Button>
      <Form
        key={fresh}
        readOnly={readOnly}
        onMount={onMount}
        schema={schema}
        column={2}
        initialValues={{
          classify: [1, 2, 3, 0],
          liked: [1, 2],
          sex: 1,
          position: ['zhejiang', 'dynamic1'],
          department: '0-0-1',
        }}
      />
    </>
  );
};
```

## 使用 setSchemaByName 更新 field

```tsx
/**
 * title: 说明
 * desc: 这种模式仅触发自己更新，不会导致Form重新渲染
 */
import React from 'react';
import { Form } from 'react-core-form';

export default () => {
  const [form] = Form.useForm();
  const onMount = async ({ setSchemaByName }) => {
    setSchemaByName(
      'classify',
      {
        help: '默认提示',
        hasFeedback: true,
        validateStatus: 'error',
        props: {
          placeholder: '自定义校验规则',
          options: [
            {
              label: 'Html',
              value: 'html',
            },
          ],
        },
      },
      (source, target) => {
        if (Array.isArray(target)) {
          return target;
        }
      },
    );
  };
  return (
    <Form
      form={form}
      schema={[
        {
          type: 'Select',
          name: 'classify',
          label: '员工职位',
          required: true,
          props: {
            onChange(value) {
              form.setSchemaByName('classify', {
                hasFeedback: true,
                help: value ? '' : '员工职位不能为空',
                validateStatus: value ? 'success' : 'error',
              });
            },
            options: [
              {
                label: '前端',
                value: 1,
              },
              {
                label: '后端',
                value: 2,
              },
            ],
          },
        },
      ]}
      onMount={onMount}
    />
  );
};
```

## 使用 effect 实现联动交互

```tsx
/**
 * title: 说明
 * desc: 内置shouldUpdate方法是表单的每次数值更新都会调用该方法、扩展的effect副作用 仅仅会在依赖修改的时候，触发该组件卸载->创建
 */
import React from 'react';
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'RadioGroup',
          name: 'sex',
          label: '性别',
          props: {
            optionType: 'button',
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
          },
        },
        {
          type: 'InputNumber',
          name: 'age',
          label: '年龄',
          effect: ['sex'], // 配置副作用
          visible: ({ sex }) => {
            return sex === 1;
          },
        },
        {
          type: 'AsyncRadioGroup',
          name: 'level',
          label: '级别 (类型按照年龄划分)',
          effect: ['age', 'sex'], // 配置副作用
          props: {
            options: async ({ getFieldValue }) => {
              return getFieldValue('age') > 20
                ? [
                    {
                      label: '专科毕业',
                      value: 0,
                    },
                    {
                      label: '本科毕业',
                      value: 1,
                    },
                    {
                      label: '985、211毕业',
                      value: 2,
                    },
                  ]
                : [
                    {
                      label: '普通高中',
                      value: 3,
                    },
                    {
                      label: '重点高中',
                      value: 4,
                    },
                  ];
            },
          },
          visible: ({ sex }) => {
            return sex === 1;
          },
        },
      ]}
    />
  );
};
```

## 使用 setInitialValues 解决 setFieldsValues 无法触发表单联动等问题

```tsx
/**
 * title: 说明
 * desc: 当默认值是接口下发需要晚点设置可用该方案
 */
import React from 'react';
import { Form, Button } from 'react-core-form';

export default () => {
  const [reload, setReload] = React.useState(Math.random());
  return (
    <>
      <Button
        type="primary"
        ghost
        onClick={() => {
          setReload(Math.random());
        }}
      >
        重新加载
      </Button>
      <br /> <br />
      <Form
        key={reload}
        onMount={async ({
          setInitialValues,
          initialValues,
          setFormLoading,
        }) => {
          setFormLoading(true);
          await new Promise((res) => setTimeout(res, 1000));
          setFormLoading(false);
          // 模拟请求接口之后重新设置默认值
          setInitialValues({
            sex: 1,
            age: 30,
          });
        }}
        schema={[
          {
            type: 'RadioGroup',
            name: 'sex',
            label: '性别',
            props: {
              optionType: 'button',
              options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ],
            },
          },
          {
            type: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'], // 配置副作用
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
          {
            type: 'AsyncRadioGroup',
            name: 'level',
            label: '级别 (类型按照年龄划分)',
            effect: ['age', 'sex'], // 配置副作用
            props: {
              options: async ({ getFieldValue }) => {
                return getFieldValue('age') > 20
                  ? [
                      {
                        label: '专科毕业',
                        value: 0,
                      },
                      {
                        label: '本科毕业',
                        value: 1,
                      },
                      {
                        label: '985、211毕业',
                        value: 2,
                      },
                    ]
                  : [
                      {
                        label: '普通高中',
                        value: 3,
                      },
                      {
                        label: '重点高中',
                        value: 4,
                      },
                    ];
              },
            },
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
        ]}
      />
    </>
  );
};
```

## 使用 touchSchemaRender 完成复杂联动交互

```tsx
/**
 * title: 说明
 * desc: 在通常情况下我们使用effect可以完成复杂的交互，但是在特殊的场景却做不到，我们需要借助 touchSchemaRender。
 */
import React from 'react';
import { Form } from 'react-core-form';
import { Switch } from 'antd';

export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Switch
        checkedChildren="男"
        unCheckedChildren="女"
        onChange={(e) => {
          form.setFieldsValue({
            sex: e ? 1 : 2,
          });
          form.touchSchemaRender(['age', 'level']); // 触发age、level刷新
        }}
      />
      <br />
      <br />
      <Form
        schema={[
          {
            type: 'RadioGroup',
            name: 'sex',
            label: '性别',
            props: {
              optionType: 'button',
              options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ],
            },
          },
          {
            type: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'], // 配置副作用
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
          {
            type: 'AsyncRadioGroup',
            name: 'level',
            label: '级别 (类型按照年龄划分)',
            effect: ['age', 'sex'], // 配置副作用
            props: {
              options: async ({ getFieldValue }) => {
                return getFieldValue('age') > 20
                  ? [
                      {
                        label: '专科毕业',
                        value: 0,
                      },
                      {
                        label: '本科毕业',
                        value: 1,
                      },
                      {
                        label: '985、211毕业',
                        value: 2,
                      },
                    ]
                  : [
                      {
                        label: '普通高中',
                        value: 3,
                      },
                      {
                        label: '重点高中',
                        value: 4,
                      },
                    ];
              },
            },
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
        ]}
        form={form}
      />
    </>
  );
};
```

## 使用 setFieldsValueTouchOnValuesChange 完成复杂联动交互

```tsx
/**
 * title: 说明
 * desc: 可替代 touchFieldsRender、完成联动交互
 */
import React from 'react';
import { Form } from 'react-core-form';
import { Switch } from 'antd';
import schema from './schema/advance/schema5';

export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Switch
        checkedChildren="男"
        unCheckedChildren="女"
        onChange={(e) => {
          form.setFieldsValueTouchOnValuesChange({
            sex: e ? 1 : 2,
          });
        }}
      />
      <br />
      <br />
      <Form
        schema={[
          {
            type: 'RadioGroup',
            name: 'sex',
            label: '性别',
            props: {
              optionType: 'button',
              options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ],
            },
          },
          {
            type: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'], // 配置副作用
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
          {
            type: 'AsyncRadioGroup',
            name: 'level',
            label: '级别 (类型按照年龄划分)',
            effect: ['age', 'sex'], // 配置副作用
            props: {
              options: async ({ getFieldValue }) => {
                return getFieldValue('age') > 20
                  ? [
                      {
                        label: '专科毕业',
                        value: 0,
                      },
                      {
                        label: '本科毕业',
                        value: 1,
                      },
                      {
                        label: '985、211毕业',
                        value: 2,
                      },
                    ]
                  : [
                      {
                        label: '普通高中',
                        value: 3,
                      },
                      {
                        label: '重点高中',
                        value: 4,
                      },
                    ];
              },
            },
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
        ]}
        form={form}
      />
    </>
  );
};
```

## 使用 FormList 子表单联动

- 主表单依赖子表单 => 主表单的收入总和是子表单每一项的收入相加
- 子表单依赖主表单 => 子表单爱好的选项和主表单的联系人类型相关
- 子表单依赖子表单 => 子表单项性别是男才有年龄的输入框，当姓名为空的时候收入项禁用

```tsx
import React from 'react';
import { Form, Button } from 'react-core-form';
import schema from './schema/form-advance/form-list';
export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const submit = async () => {
    const data = await form.submit(); // 校验并返回数值
    alert(JSON.stringify(data));
  };
  const onValuesChange = (value, values) => {
    console.log('onValuesChange ->', value, values);
  };
  return (
    <>
      <Button
        onClick={setReadOnly.bind(null, !readOnly)}
        style={{ marginBottom: 20 }}
      >
        设置只读
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          form.formListInstance.contactList.add();
        }}
        style={{ marginBottom: 20 }}
      >
        添加一条
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          form.formListInstance.contactList.remove();
        }}
        style={{ marginBottom: 20 }}
      >
        删除第一条
      </Button>
      <Form
        form={form}
        readOnly={readOnly}
        onValuesChange={onValuesChange}
        schema={schema}
        column={3}
        initialValues={{
          userType: 1,
          contactList: [
            {
              name: '小华',
              liked: [2],
              sex: 1,
              age: 18,
            },
          ],
        }}
      />
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </>
  );
};
```

## 使用 itemRender 扩展渲染

```tsx
import React from 'react';
import { Form } from 'react-core-form';
import DragContainer from './demo/drag';
export default () => {
  return (
    <Form
      column={2}
      schema={[
        {
          type: 'Input',
          name: 'input-uuid130923923',
          label: '包裹Input',
          itemRender(dom, { field }) {
            return <DragContainer field={field} dom={dom} selected />;
          },
        },
        {
          type: 'Select',
          name: 'select-uuid130923923',
          label: '包裹Select',
          itemRender(dom, { field }) {
            return <DragContainer field={field} dom={dom} />;
          },
        },
      ]}
    />
  );
};
```

## 使用自定义渲染

```tsx
/**
 * title: 说明
 * desc: 自定义渲染的使用场景通常用于展示，如果没有定义name属性则数据不会被表单收集，如果收集请设置name属性，此时将作为[自定义表单组件](https://ant.design/components/form-cn/#components-form-demo-customized-form-controls)渲染。
 */
import React from 'react';
import { Form, Button } from 'react-core-form';
import { Alert } from 'antd';
export default () => {
  return (
    <Form
      schema={[
        {
          type: 'Input',
          label: '描述信息',
          name: 'input',
        },
        {
          type: 'Select',
          label: '选择主题',
          name: 'select',
          props: {
            options: ['info', 'success', 'warning', 'error'].map((label) => {
              return {
                label,
                value: label,
              };
            }),
          },
        },
        {
          type: 'Render',
          key: 'render',
          label: '自定义渲染',
          effect: ['input', 'select'],
          props: {
            render({ getFieldValue }) {
              return (
                <Alert
                  message={getFieldValue('input') || 'Info Text'}
                  type={getFieldValue('select') || 'info'}
                />
              );
            },
          },
        },
      ]}
    />
  );
};
```

## 使用范型解决自定义组件属性扩展问题

```ts
const schema: SchemaProps<{
  userId: number;
  userType?: 'admin' | 'normal';
}>[] = [
  {
    type: 'UserData',
    name: 'input',
    label: '用户数据',
    props: {
      userId: 10023,
      userType: 'admin',
    },
  },
];
```

## 使用自定义组件（定义 type 类型为 Function）（不推荐）

```tsx
/**
 * title: 说明
 * desc: 自定义组件约定，当定义了name属性的FormItem回默认注入2个属性给children，value代表默认值，onChange用于表单收集值，同时会获取Form配置的readOnly属性负责渲染详情视图，建议我们在编写自定义组件的时候，按照业务场景添加详情视图。
 */
import React from 'react';
import { Form, Button, Input } from 'react-core-form';
const UrlInput = ({ readOnly, value, ...rest }) => {
  if (readOnly) return <div>{`https://${value || ''}.com`}</div>;
  return (
    <Input addonBefore="https://" addonAfter=".com" value={value} {...rest} />
  );
};
export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const submit = async () => {
    const data = await form.submit(); // 校验并返回数值
    alert(JSON.stringify(data));
  };
  return (
    <>
      <Button onClick={setReadOnly.bind(null, !readOnly)}>
        {readOnly ? '设置编辑模式' : '设置只读模式'}
      </Button>
      <br />
      <br />
      <Form
        form={form}
        readOnly={readOnly}
        schema={[
          {
            type: UrlInput,
            name: 'url',
            label: '输入网址',
            required: true,
          },
        ]}
      />
      {!readOnly && (
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      )}
    </>
  );
};
```

## 使用自定义组件（采用 widgets 实现）

```tsx
/**
 * title: 说明
 * desc: 自定义组件约定和上面一致，推荐使用注入widgets的方式，更加符合组件复用的特性
 */
import React from 'react';
import { Form, Button } from 'react-core-form';
import CountInput from './demo/count-input';

export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    const data = await form.submit(); // 校验并返回数值
    alert(JSON.stringify(data));
  };
  return (
    <>
      <Form
        form={form}
        widgets={{
          Input: CountInput, // 使用扩展的Input覆盖内置的Input部件、数据模型不变
        }}
        schema={[
          {
            type: 'Input',
            name: 'username',
            label: '自定义小部件',
          },
        ]}
      />
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </>
  );
};
```

## 自定义组件之间的通信

```tsx
/**
 * title: 说明
 * desc: 自定义组件通信，可以挂载到 form 实例
 */
import React from 'react';
import { Form } from 'react-core-form';

export default () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      schema={[
        {
          name: 'test',
          label: '组件1',
          type: ({ form }) => {
            const [count, setCount] = React.useState(0);
            React.useEffect(() => {
              // 挂载
              form.getCount = () => {
                return count;
              };
            }, [count]);
            return (
              <div>
                <input value={count} />
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  点击+1
                </button>
              </div>
            );
          },
        },
        {
          label: '组件2',
          type: ({ form }) => {
            return (
              <button
                onClick={() => {
                  alert(form.getCount());
                }}
              >
                获取组件1的方法
              </button>
            );
          },
        },
      ]}
    />
  );
};
```
