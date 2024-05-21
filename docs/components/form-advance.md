## 使用 required 函数式解决联动校验

> readOnly、disabled、required 属性都支持接受一个函数

```tsx | react
import { Form, Button } from 'lyr-component';

export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    const data = await form.submit();
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <Form
        form={form}
        schema={[
          {
            widget: 'Input',
            name: 'name',
            label: '用户姓名',
            required: true,
          },
          {
            widget: 'Input',
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
    </div>
  );
};
```

## 使用异步的 options

```tsx | react
import { Form, Button } from 'lyr-component';
import schema from '@/components/schema/form-advance/async-option.tsx';

export default () => {
  const [fresh, setFresh] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const reload = () => {
    setFresh(!fresh);
  };
  const onMount = async ({ getFieldOption }) => {
    console.log(await getFieldOption('classify'));
  };
  return (
    <div>
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
    </div>
  );
};
```

## 使用 effect 实现联动交互

```tsx | react
import { Form } from 'lyr-component';

export default () => {
  return (
    <Form
      schema={[
        {
          widget: 'RadioGroup',
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
          widget: 'InputNumber',
          name: 'age',
          label: '年龄',
          effect: ['sex'],
          effectClearField: true,
          visible: ({ sex }) => {
            return sex === 1;
          },
        },
        {
          widget: 'AsyncCheckGroup',
          name: 'level',
          label: '级别 (类型按照年龄划分)',
          effect: ['age', 'sex'],
          props: {
            options: async ({ getFieldValue }) => {
              return getFieldValue('age') > 20
                ? [
                    {
                      label: '选项2',
                      value: 2,
                    },
                  ]
                : [
                    {
                      label: '选项1',
                      value: 1,
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

## 使用 setSchemaByName 更新 field

```tsx | react
import { Form } from 'lyr-component';

export default () => {
  const effectType = ({ setSchemaByName, getFieldsValue }) => {
    setSchemaByName('path', {
      props: {
        addBefore:
          getFieldsValue().type === 1
            ? 'https://dev-ops.yunliang.cloud/website/'
            : '',
      },
    });
  };
  return (
    <Form
      initialValues={{
        widget: 1,
      }}
      onMount={effectType}
      schema={[
        {
          widget: 'RadioGroup',
          label: '类型',
          name: 'type',
          props: {
            widget: 'button',
            options: [
              {
                label: '静态站点托管',
                value: 1,
              },
              {
                label: 'pm2托管',
                value: 2,
              },
            ],
          },
        },
        {
          widget: 'Input',
          name: 'path',
          label: '资源访问地址',
          effect: ['type'],
          effectClearField: true,
          onEffect(name, { setSchemaByName, getFieldsValue }) {
            effectType({ setSchemaByName, getFieldsValue });
          },
        },
      ]}
    />
  );
};
```

## 使用 setInitialValues 解决 setFieldsValues 无法触发表单联动等问题

```tsx | react
import { Form, Button } from 'lyr-component';

export default () => {
  const [reload, setReload] = React.useState(Math.random());
  return (
    <>
      <Button
        type="outline"
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
          setInitialValues({
            sex: 1,
            age: 30,
          });
        }}
        schema={[
          {
            widget: 'RadioGroup',
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
            widget: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'],
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

```tsx | react
import { Form } from 'lyr-component';
import { Switch } from '@arco-design/web-react';

export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Switch
        checkedText="男"
        uncheckedText="女"
        onChange={(e) => {
          form.setFieldsValue({
            sex: e ? 1 : 2,
          });
          form.touchSchemaRender(['age']);
        }}
      />
      <br />
      <br />
      <Form
        schema={[
          {
            widget: 'RadioGroup',
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
            widget: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'],
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

```tsx | react
import { Form } from 'lyr-component';
import { Switch } from '@arco-design/web-react';

export default () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Switch
        checkedText="男"
        uncheckedText="女"
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
            widget: 'RadioGroup',
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
            widget: 'InputNumber',
            name: 'age',
            label: '年龄',
            effect: ['sex'],
            visible: ({ sex }) => {
              return sex === 1;
            },
          },
        ]}
        form={form}
      />
    </div>
  );
};
```

## 使用 FormList 子表单联动

- 主表单依赖子表单 => 主表单的收入总和是子表单每一项的收入相加
- 子表单依赖主表单 => 子表单爱好的选项和主表单的联系人类型相关
- 子表单依赖子表单 => 子表单项性别是男才有年龄的输入框，当姓名为空的时候收入项禁用

```tsx | react
import { Form, Button } from 'lyr-component';
import schema from '@/components/schema/form-advance/form-list.ts';

export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const submit = async () => {
    const data = await form.submit();
    alert(JSON.stringify(data));
  };
  const onValuesChange = (value, values) => {
    console.log('onValuesChange ->', value, values);
  };
  return (
    <div>
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
    </div>
  );
};
```

## 使用 itemRender 扩展渲染

```tsx | react
import { Form } from 'lyr-component';
import DragContainer from '@/components/demo/drag.tsx';

export default () => {
  return (
    <Form
      column={2}
      schema={[
        {
          widget: 'Input',
          name: 'input-uuid130923923',
          label: '包裹Input',
          itemRender(dom, { field }) {
            return <DragContainer field={field} dom={dom} selected />;
          },
        },
        {
          widget: 'Select',
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

```tsx | react
import { Form, Button } from 'lyr-component';
import { Alert } from '@arco-design/web-react';

export default () => {
  return (
    <Form
      schema={[
        {
          widget: 'Render',
          key: 'render',
          label: '自定义渲染',
          effect: ['input', 'select'],
          props: {
            render({ getFieldValue }) {
              return (
                <Alert
                  content={getFieldValue('input') || 'Info Text'}
                  type={getFieldValue('select') || 'info'}
                />
              );
            },
          },
        },
        {
          widget: 'Input',
          label: '描述信息',
          name: 'input',
        },
        {
          widget: 'Select',
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
    widget: 'UserData',
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

```tsx | react
import { Form, Button } from 'lyr-component';
import { Input } from '@arco-design/web-react';

export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const submit = async () => {
    const data = await form.submit();
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
            widget: ({ readOnly, value, ...rest }) => {
              if (readOnly) return <div>{`https://${value || ''}.com`}</div>;
              return (
                <Input
                  addBefore="https://"
                  addAfter=".com"
                  placeholder="请输入"
                  value={value}
                  {...rest}
                />
              );
            },
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

```tsx | react
import { Form, Button } from 'lyr-component';
import CountInput from '@/components/demo/count-input.tsx';

export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    const data = await form.submit();
    alert(JSON.stringify(data));
  };
  return (
    <>
      <Form
        form={form}
        widgets={{
          Input: CountInput,
        }}
        schema={[
          {
            widget: 'Input',
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

```tsx | react
import { Form } from 'lyr-component';
import { Input, Button } from '@arco-design/web-react';

export default () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      schema={[
        {
          name: 'test',
          label: '组件1',
          widget: ({ form }) => {
            const [count, setCount] = React.useState(0);
            React.useEffect(() => {
              form.getCount = () => {
                return count;
              };
            }, [count]);
            return (
              <div>
                <Input value={count} style={{ width: 80 }} />
                <br />
                <br />
                <Button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  点击+1
                </Button>
              </div>
            );
          },
        },
        {
          label: '组件2',
          widget: ({ form }) => {
            return (
              <Button
                onClick={() => {
                  alert(form.getCount());
                }}
              >
                获取组件1的方法
              </Button>
            );
          },
        },
      ]}
    />
  );
};
```
