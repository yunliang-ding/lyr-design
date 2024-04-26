import Item from '@/form/item';
import { tranfromSchema } from '@/form/util';
import { Table, Form, Space } from '@arco-design/web-react';
import { useEffect, useMemo, useRef } from 'react';
import { TableListProps } from './type';
import { EventEmit } from '@/util';
import Button from '@/button';
import { tranfromInnerValues, beforeReceiveInnerValues } from './util';
import { IconPlus } from '@arco-design/web-react/icon';
import {
  DraggableContainer,
  DraggableRow,
  DragHandle,
} from '@/table/drag-columns';
import './index.css';

export default ({
  maxCount = 999,
  leastOne = false,
  showNo = true,
  readOnly = false,
  operation = true,
  children = [],
  value = [],
  onChange,
  rowKey = 'id',
  removeConfirm = false,
  actionRef = useRef({}),
  name,
  defaultAddValue = {},
  sortable = false,
  actions = [],
  copy = true,
}: TableListProps) => {
  const [form] = Form.useForm();
  const event = useMemo(() => {
    return new EventEmit();
  }, []);
  useEffect(() => {
    // 扁平化数据打到对应的Form.Item
    form.setFieldsValue(beforeReceiveInnerValues(value, columns));
    if (name) {
      actionRef.current[name] = {
        ...form,
      };
    }
  }, [value]);
  const columns = useMemo(() => {
    return children.map((field: any) => {
      return {
        title:
          field.required && !readOnly ? (
            <span className="table-list-required">{field.label}</span>
          ) : (
            field.label
          ),
        dataIndex: field.name,
        width: field.style?.width || 200,
        render(v, record, index) {
          tranfromSchema([field], ''); // 扩展处理
          const key = `${index}-${field.name}`;
          const vNode = (
            <Item
              key={key}
              form={form}
              event={event}
              readOnly={readOnly}
              className="table-list-field"
              emptyCellNode={'-'}
              field={{
                ...field,
                label: '',
                name: key,
              }}
            />
          );
          if (typeof field.isVisible === 'function') {
            return field.isVisible(record) ? vNode : '-';
          }
          return vNode;
        },
      };
    });
  }, [children, value, readOnly]);
  /** 渲染表格 */
  const renderDom = (
    <>
      <Table
        rowKey={rowKey}
        pagination={false}
        data={value}
        columns={[
          {
            title: '序号',
            dataIndex: '__index__',
            width: 80,
            visible: showNo,
            render(v, record, index) {
              return Number(index) + 1;
            },
          },
          ...columns,
          {
            title: '操作',
            dataIndex: '__operation__',
            visible: readOnly !== true,
            align: 'center' as any,
            render(v, record, index) {
              return (
                <Space>
                  {actions.map((item: any) => {
                    return (
                      <Button
                        {...item}
                        key={item.label}
                        onClick={() => {
                          item.onClick?.(record, (updateValue: any) => {
                            Object.assign(value[index], updateValue);
                            onChange?.([...value]);
                          });
                        }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                  <Button
                    type="text"
                    disabled={(leastOne && value.length === 1) || !operation}
                    confirm={
                      removeConfirm
                        ? {
                            type: 'pop',
                            title: '是否确认删除?',
                          }
                        : undefined
                    }
                    onClick={() => {
                      value.splice(index, 1);
                      onChange?.([...value]);
                    }}
                  >
                    删除
                  </Button>

                  {copy && (
                    <Button
                      type="text"
                      disabled={!operation}
                      onClick={() => {
                        value.push({ ...value[index] });
                        onChange?.([...value]);
                      }}
                    >
                      复制
                    </Button>
                  )}
                </Space>
              );
            },
          },
        ].filter((i: any) => i.visible !== false)}
        components={
          sortable
            ? {
                header: {
                  operations: () => [
                    {
                      node: <th />,
                      width: 40,
                    },
                  ],
                },
                body: {
                  operations: () => [
                    {
                      node: (
                        <td>
                          <div className="arco-table-cell">
                            <DragHandle />
                          </div>
                        </td>
                      ),
                      width: 40,
                    },
                  ],
                  tbody: (props) => <DraggableContainer {...props} />,
                  row: (props) => {
                    return (
                      <DraggableRow
                        dataSource={value}
                        setDataSource={(newData) => {
                          onChange([
                            ...newData.map((v, i) => {
                              return {
                                ...v,
                                index: i, // 更新下标
                              };
                            }),
                          ]);
                        }}
                        {...props}
                      />
                    );
                  },
                },
              }
            : {}
        }
      />
      <div className="core-form-table-list-footer">
        <Button
          type="dashed"
          visible={readOnly !== true && operation}
          icon={<IconPlus />}
          disabled={value.length >= maxCount}
          onClick={() => {
            value.push(
              typeof defaultAddValue === 'function'
                ? defaultAddValue()
                : defaultAddValue,
            );
            onChange?.([...value]);
          }}
        >
          添加一行
        </Button>
      </div>
    </>
  );
  return (
    <div className="core-form-table-list">
      <Form
        form={form}
        onChange={(v, vs) => {
          onChange?.(tranfromInnerValues(vs, value, columns));
        }}
      >
        {renderDom}
      </Form>
    </div>
  );
};
