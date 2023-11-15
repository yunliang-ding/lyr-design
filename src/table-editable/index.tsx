import { Table, Form, Space, Message } from '@arco-design/web-react';
import { useEffect, useState, useMemo, useRef } from 'react';
import { AsyncOptionsCache, EventEmit } from '@/util';
import { tranfromSchema } from '@/form/util';
import Item from '../form/item';
import { Button } from '../index';
import AsyncWapper from './async-wapper';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import './index.css';
import { EditTableProps } from './type';
import { IconDragArrow, IconPlus } from '@arco-design/web-react/icon';

const SortableItem = SortableElement((props) => <tr {...props} />);

const SortableBody = SortableContainer((props) => <tbody {...props} />);

const DragHandle = SortableHandle(() => <IconDragArrow />);

// TODO value 中不能混入index属性，否则和内置的index属性冲突、待优化

export default ({
  columns = [],
  value = [],
  onBeforeChange,
  onBeforeDelete,
  onChange,
  readOnly = false,
  sortable = false,
  creatorButtonProps = {
    text: '添加一行',
    style: {},
  },
  maxLength = 999,
  position = 'bottom',
  actionRef = useRef({}),
  name,
  defaultAddValue = {},
  ...rest
}: EditTableProps) => {
  const [form] = Form.useForm();
  const event = useMemo(() => {
    return new EventEmit();
  }, []);
  const [editIndex, setEditIndex] = useState(-1); // 一次只允许编辑一列
  const [_columns, setColumns] = useState([]); // 列信息
  const [dataSource, setDataSource] = useState<any[]>(
    // 扩展数据源
    value.map((v, index) => {
      return {
        ...v,
        index, // 注入下标
      };
    }),
  );
  // 扩展列的render
  const renderColumns = useMemo(() => {
    return columns.map((item, rowIndex) => {
      const definedRender = item.render; // 用户定义的render
      return {
        ...item,
        render: (e, record, index) => {
          if (editIndex !== record.index || !item.fieldProps) {
            return typeof definedRender === 'function' ? (
              <AsyncWapper
                {...{
                  render: definedRender,
                  params: [e, record, index],
                  asyncOptions: AsyncOptionsCache[item.dataIndex],
                }}
              />
            ) : (
              e
            );
          }
          const field: any =
            typeof item.fieldProps === 'function'
              ? {
                  ...item.fieldProps(form, {
                    rowKey: item.dataIndex,
                    rowIndex,
                  }),
                  name: item.dataIndex,
                  label: item.title,
                  labelCol: { span: 0 },
                }
              : {
                  ...item.fieldProps,
                  name: item.dataIndex,
                  label: item.title,
                  labelCol: { span: 0 },
                };
          tranfromSchema([field], ''); // 扩展处理
          return (
            <Item
              event={event}
              form={form}
              className="core-form-editable-table-field"
              initialValues={record}
              key={item.dataIndex}
              field={field}
            />
          );
        },
      };
    });
  }, [columns, editIndex]);
  // 合并 columns
  useEffect(() => {
    setColumns(renderColumns);
    if (editIndex !== -1) {
      // 设置表单默认值
      const initialValues = {};
      Object.keys(dataSource[editIndex]).forEach((key) => {
        initialValues[key] = dataSource[editIndex][key];
      });
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields(); // clear
    }
  }, [editIndex]);
  // 卸载清除缓存
  useEffect(() => {
    return () => {
      // 卸载清除缓存
      Object.keys(AsyncOptionsCache).forEach((key) => {
        delete AsyncOptionsCache[key];
      });
    };
  }, []);
  // 更新
  const saveByIndex = async (index: number) => {
    // 获取表单的指，同步到dataSource
    const values = await form.validate();
    try {
      // 确认的钩子
      await onBeforeChange?.(
        dataSource.filter((i) => i.index !== index),
        values,
      );
      Object.assign(dataSource[index], {
        ...values,
        __isNew__: false,
      });
      setDataSource([...dataSource]);
      setEditIndex(-1); // 完成编辑
      onChange?.(
        dataSource.map((i) => {
          const copyItem = { ...i };
          delete copyItem.index;
          delete copyItem.__isNew__;
          return copyItem;
        }),
      );
    } catch (error) {
      Message.warning(error);
    }
  };
  // 按照指定下标删除行
  const removeRowByIndex = (index: number) => {
    // 直接删除
    dataSource.splice(index, 1);
    setDataSource([
      ...dataSource.map((v, i) => {
        return {
          ...v,
          index: i, // 更新下标
        };
      }),
    ]);
  };
  // 删除
  const deleteByIndex = async (index: number, __isNew__ = false) => {
    if (__isNew__) {
      // 直接删除
      removeRowByIndex(index);
      setEditIndex(-1); // 完成编辑
    } else {
      try {
        // 删除的钩子
        await onBeforeDelete?.(dataSource.find((i) => i.index === index));
        removeRowByIndex(index);
        setEditIndex(-1); // 完成编辑
        onChange?.(
          dataSource.map((i) => {
            const copyItem = { ...i };
            delete copyItem.index;
            delete copyItem.__isNew__;
            return copyItem;
          }),
        );
      } catch (error) {
        Message.warning(error);
      }
    }
  };
  // 添加
  const add = () => {
    if (position === 'bottom') {
      dataSource.push({
        ...(typeof defaultAddValue === 'function'
          ? defaultAddValue()
          : defaultAddValue),
        __isNew__: true, // 新增标识
        index: dataSource.length, // 下标标识
      });
      setDataSource([...dataSource]);
      setEditIndex(dataSource.length - 1);
    } else {
      dataSource.forEach((item) => {
        // 所有下标前进1
        item.index += 1;
      });
      dataSource.unshift({
        __isNew__: true, // 新增标识
        index: 0, // 下标标识
      });
      setDataSource([...dataSource]);
      setEditIndex(0);
    }
  };
  // 等待编辑完成
  const awaitEditComplete = (
    index = -1, // index当前正在编辑的行，默认是-1
  ) =>
    new Promise((res) => {
      if (editIndex !== -1 && editIndex !== index) {
        return Message.warning('有未保存的数据，请先保存!');
      }
      res(true);
    });
  /**
   * 拖拽排序的逻辑
   */
  const onSortEnd = async ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    await awaitEditComplete();
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...dataSource], oldIndex, newIndex);
      setDataSource([
        ...newData.map((v, i) => {
          return {
            ...v,
            index: i, // 更新下标
          };
        }),
      ]);
      onChange?.(
        newData.map((i) => {
          const copyItem = { ...i };
          delete copyItem.index;
          delete copyItem.__isNew__;
          return copyItem;
        }),
      );
    }
  };
  // 渲染体
  const renderDom = [
    <Table
      data={dataSource}
      key="table"
      pagination={false}
      columns={[
        sortable
          ? {
              title: '',
              dataIndex: 'sort',
              width: 60,
              render: () => <DragHandle />,
            }
          : undefined,
        ..._columns,
        !readOnly
          ? {
              title: '操作',
              dataIndex: 'option',
              width: 200,
              render(text, record, index) {
                return (
                  <Space>
                    <Button
                      type="text"
                      spin={editIndex === index}
                      style={{ margin: 0, padding: 0 }}
                      onClick={async () => {
                        await awaitEditComplete(index); // 等待编辑
                        if (editIndex === index) {
                          await saveByIndex(index);
                        } else {
                          setEditIndex(index);
                        }
                      }}
                    >
                      {editIndex === index ? '保存' : '编辑'}
                    </Button>
                    <Button
                      confirm={{
                        title: '是否确认删除？',
                        type: 'pop',
                      }}
                      spin
                      type="text"
                      style={{ margin: 0, padding: 0 }}
                      onClick={async () => {
                        await deleteByIndex(index);
                      }}
                      onBeforeClick={awaitEditComplete.bind(null, index)}
                    >
                      删除
                    </Button>
                    {editIndex === index && (
                      <a
                        onClick={() => {
                          if (dataSource[index].__isNew__) {
                            deleteByIndex(index, true);
                          } else {
                            setEditIndex(-1);
                          }
                        }}
                      >
                        取消
                      </a>
                    )}
                  </Space>
                );
              },
            }
          : undefined,
      ].filter((i) => i)}
      components={
        sortable
          ? {
              body: {
                wrapper: (props: any) => (
                  <SortableBody
                    useDragHandle
                    disableAutoscroll
                    helperClass="row-dragging"
                    onSortEnd={onSortEnd}
                    {...props}
                  />
                ),
                row: (props: any) => {
                  const { className, style, ...restProps } = props;
                  // function findIndex base on Table rowKey props and should always be a right array index
                  const index = dataSource.findIndex(
                    (x) => x[rest.rowKey] === restProps['data-row-key'],
                  );
                  return <SortableItem index={index} {...restProps} />;
                },
              },
            }
          : {}
      }
      {...rest}
    />,
    <Button
      type="dashed"
      key="btn"
      style={creatorButtonProps.style}
      visible={!readOnly}
      disabled={dataSource.length >= maxLength}
      icon={<IconPlus />}
      className={
        dataSource.length >= maxLength
          ? 'editable-table-footer-btn-disabled'
          : 'editable-table-footer-btn'
      }
      onClick={async () => {
        await awaitEditComplete();
        add();
      }}
    >
      {creatorButtonProps.text}
    </Button>,
  ];
  // 挂载API
  useEffect(() => {
    actionRef.current[name] = {
      ...form,
      editIndex,
      setEditIndex,
      saveEdit: async () => {
        await saveByIndex(editIndex);
      },
    };
  }, [editIndex]);
  return (
    <div className="core-form-editable-table">
      <Form
        form={form}
        onValuesChange={(v) => {
          const key = Object.keys(v)[0];
          const field: any = _columns.find((i) => i.dataIndex === key);
          event.publish({
            ...field,
            name: key,
          }); // 发布通知
        }}
      >
        {position === 'top' ? renderDom.reverse() : renderDom}
      </Form>
    </div>
  );
};
