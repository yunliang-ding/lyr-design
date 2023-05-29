/** 资源包 */
import { useState } from 'react';
import { CardForm, Form, Icon, SchemaProps } from '..';

const schema = [
  {
    type: 'Input',
    name: 'name',
    label: '资源名称',
    extra: '如果资源是umd包，请确保资源名称和window挂载的属性一致',
    required: true,
    rules: [
      {
        pattern: /^[A-Za-z0-9]+$/,
        message: '资源名称仅能用大小写字母或数字',
      },
    ],
    props: {
      autoComplete: 'off',
      autoFocus: true,
    },
  },
  {
    type: 'RadioGroup',
    name: 'type',
    label: '类型',
    props: {
      options: [
        {
          label: 'Less',
          value: 'less',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'React',
          value: 'react',
        },
      ],
    },
  },
  {
    type: 'RadioGroup',
    label: '上传格式',
    name: 'codeWay',
    props: {
      options: [
        {
          label: '代码编写',
          value: 1,
        },
        {
          label: '文件上传',
          value: 2,
        },
      ],
    },
  },
  {
    type: 'CodeEditor',
    name: 'content',
    label: '编写脚本',
    required: true,
    effect: ['type', 'codeWay'],
    visible({ codeWay }) {
      return codeWay === 1;
    },
    onEffect: (e, form) => {
      form.setSchemaByName('content', {
        props: {
          language: {
            less: 'less',
            javascript: 'javascript',
            react: 'javascript',
          }[form.getFieldValue('type')],
        } as any,
      });
    },
    props: {
      style: {
        width: '100%',
        height: 300,
      },
      minimapEnabled: false,
    },
  },
  {
    type: 'OssFileUpload',
    name: 'ossPath',
    label: '上传脚本',
    required: true,
    effect: ['codeWay'],
    visible({ codeWay }) {
      return codeWay === 2;
    },
    props: {
      maxCount: 1,
      accept: '.js',
    },
  },
] as SchemaProps[];

const initModel = {
  visible: false,
  title: '新增脚本',
  cardProps: {
    bodyStyle: {
      background: '#1e1e1e',
      paddingBottom: 0,
      paddingTop: 16,
    },
  },
  initialValues: {
    type: 'javascript',
    codeWay: 1,
  },
};

export default ({ dependencies, setDependencies, onAddDep, onUpdateDep }) => {
  const [form] = Form.useForm();
  const [model, setModel]: any = useState(initModel);
  const onClose = () => {
    setModel(initModel);
    form.setFieldsValue({
      name: undefined,
      content: undefined,
      type: 'javascript',
      codeWay: 1,
    });
  };
  return (
    <>
      <div className="cloud-component-left-header">
        <span>配置依赖脚本</span>
        <Icon
          type="add"
          hover
          onClick={() => {
            setModel({
              ...model,
              visible: true,
            });
          }}
        />
      </div>
      <div className="cloud-component-assets">
        <div className="cloud-component-assets-files">
          {dependencies.map((item) => {
            return (
              <div
                key={item.name}
                className="cloud-component-assets-files-file"
                onClick={() => {
                  form.setFieldsValue({
                    ...item,
                  });
                  form.setSchemaByName('content', {
                    props: {
                      language: {
                        less: 'less',
                        javascript: 'javascript',
                        react: 'javascript',
                      }[item.type],
                    } as any,
                  });
                  setModel({
                    ...model,
                    visible: true,
                    title: `更新脚本《${item.name}》`,
                    onSubmit: async (values) => {
                      const res = await onUpdateDep({
                        ...item,
                        ...values,
                      });
                      if (res) {
                        Object.assign(item, values);
                        setDependencies([...dependencies]);
                        onClose();
                      } else {
                        return Promise.reject();
                      }
                    },
                  });
                }}
              >
                <Icon
                  size={14}
                  type={
                    {
                      less: 'file-css',
                      javascript: 'file-javascript',
                      react: 'react',
                    }[item.type] as any
                  }
                  color={
                    {
                      less: '#1296db',
                      javascript: '#f4ea2a',
                      react: '#1890ff',
                    }[item.type] as any
                  }
                />
                <span style={{ color: '#ddd' }}>{item.name}</span>
              </div>
            );
          })}
        </div>
        {model.visible && (
          <div className="cloud-component-assets-mask" onClick={onClose} />
        )}
        <div
          className="cloud-component-assets-form"
          style={{ display: model.visible ? 'flex' : 'none' }}
        >
          <CardForm
            {...{
              onSubmit: async (values) => {
                const res = await onAddDep(values);
                if (res?.id) {
                  dependencies.push({
                    ...res,
                    ...values,
                  });
                  setDependencies([...dependencies]);
                  onClose();
                } else {
                  return Promise.reject();
                }
              },
              ...model,
              form,
              schema,
              cancelText: '关闭',
              onClear: onClose,
            }}
          />
        </div>
      </div>
    </>
  );
};
