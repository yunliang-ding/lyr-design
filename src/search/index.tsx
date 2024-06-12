import { useState, useMemo, useEffect } from 'react';
import Form from '@/form';
import Button from '@/button';
import { SearchProps } from './type';
import { cloneDeep } from '@/util';
import { IconUp, IconDown } from '@arco-design/web-react/icon';
import './index.less';

export default ({
  layout = 'inline',
  hidden = false, // 默认展示
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  schema = [],
  form = Form.useForm()[0],
  onSearch = () => {},
  onReset = () => {},
  column = 4,
  toolReverse = false,
  defaultExpand = false,
  clearInitialValuesOnReset = false,
  gridStyle = {
    rowGap: 20,
    colGap: 20,
  },
  className = '',
  searchBtnRender,
  ...rest
}: SearchProps) => {
  const [more, setMore] = useState(defaultExpand);
  /** search */
  const search = async () => {
    const values = await form.submit(); // 提交
    if (typeof onSearch === 'function') {
      await onSearch(values);
    }
  };
  /** reset */
  const reset = async () => {
    // 重置逻辑
    const clearValue: any = {};
    Object.keys(form.getFieldsValue()).forEach((key) => {
      clearValue[key] = undefined;
    });
    // resetField会导致Item卸载，例如会触发AsyncSelect再次发送请求
    form.setFieldsValue({
      ...clearValue,
      ...(clearInitialValuesOnReset ? {} : rest.initialValues || {}), // 是否保留默认值选项
    });
    // 通知清除动作
    if (typeof onReset === 'function') {
      onReset();
    }
  };
  /**
   * 挂载search、reset
   */
  useEffect(() => {
    form.search = search;
    form.reset = reset;
  }, []);
  /** moreRender */
  const moreLabel = useMemo(() => {
    return (
      <>
        <span style={{ marginRight: 2 }}>{more ? '收起' : '展开'}</span>
        {more ? <IconUp /> : <IconDown />}
      </>
    );
  }, [more]);
  // 克隆 schema
  const cloneSchema = useMemo(() => {
    const newSchema =
      typeof schema === 'function'
        ? cloneDeep(schema(form))
        : cloneDeep(schema);
    return newSchema;
  }, [schema]); // cloneDeep 避免被污染
  /** touch search field */
  const autoSearchNames: any = [];
  cloneSchema.forEach((field: any) => {
    if (field.autoSearch) {
      autoSearchNames.push(field.name);
    }
    // 处理输入框回车查询以及粘贴带空格问题
    if (['Input', 'InputNumber'].includes(field.widget)) {
      if (field.props === undefined) {
        field.props = {};
      }
      field.props.onPressEnter = () => {
        search();
      };
      // 解决粘贴 自带空格的问题
      if (field.props.onPaste === undefined && field.widget === 'Input') {
        field.props.onPaste = (e) => {
          // eslint-disable-next-line prefer-destructuring
          const target = e.target;
          // 需要延迟下不然有问题
          setTimeout(() => {
            form.setFieldsValue({
              [field.name]: target.value?.trim(),
            });
          });
        };
      }
    }
  });
  const tools: any = [
    {
      label: '重置',
      type: 'default',
      key: 'reset',
      onClick: () => {
        reset();
      },
    },
    {
      label: '查询',
      key: 'search',
      spin: true,
      type: 'primary',
      render: searchBtnRender,
      onClick: async () => {
        await search();
      },
    },
  ];
  if (toolReverse) {
    // 反转下
    tools.reverse();
  }
  // 是否有更多查询
  if (
    cloneSchema.some((field: any) => {
      return (
        field.expand &&
        (typeof field.visible === 'function' ? field.visible() : true)
      );
    })
  ) {
    tools.push({
      type: 'text',
      key: 'more',
      label: moreLabel,
      onClick: () => {
        setMore(!more);
      },
    });
  }
  const searchCls = ['core-form-search', `core-form-search-${layout}`];
  if (className) {
    searchCls.push(className);
  }
  if (hidden) {
    searchCls.push('core-form-search-hidden');
  }
  if (more) {
    searchCls.push(
      'core-form-search-expand',
      `core-form-search-${layout}-expand`,
    );
  }
  return (
    <Form
      className={searchCls.join(' ')}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      form={form}
      schema={[
        ...cloneSchema,
        {
          key: 'grid-search-btn',
          className: 'grid-search-btn',
          style: {
            justifyContent: 'flex-end',
          },
          widget: () => {
            return (
              <div className="tools-btn-box">
                {tools.map((tool: any) => {
                  return tool.render ? (
                    tool.render()
                  ) : (
                    <Button {...tool}>{tool.label}</Button>
                  );
                })}
              </div>
            );
          },
        },
      ]}
      column={column}
      gridStyle={gridStyle}
      onValuesChange={(value) => {
        const key = Object.keys(value)[0];
        if (autoSearchNames.some((name) => name === key)) {
          search();
        }
      }}
      {...rest}
    />
  );
};
