import Item from '@/form/item';
import { tranfromSchema } from '@/form/util';
import { Table, Form, Space } from '@arco-design/web-react';
import { useEffect, useMemo, useRef } from 'react';
import { TableListProps } from './type';
import { EventEmit } from '@/util';
import Button from '@/button';
import { tranfromInnerValues, beforeReceiveInnerValues } from './util';
import { IconPlus } from '@arco-design/web-react/icon';
import './index.css';

export default ({
  maxCount = 999,
  leastOne = false,
  showNo = true,
  readOnly = false,
  schema = [],
  defaultValue = [],
  onChange,
  rowKey = 'id',
  removeConfirm = false,
  actionRef = useRef({}),
  name,
  defaultAddValue = {},
}: TableListProps) => {
  const firstRef = useRef(true);
  const [form] = Form.useForm();
  const event = useMemo(() => {
    return new EventEmit();
  }, []);
  useEffect(() => {
    // 扁平化数据打到对应的Form.Item
    form.setFieldsValue(beforeReceiveInnerValues(defaultValue, columns));
    firstRef.current = false;
    if (name) {
      actionRef.current[name] = {
        ...form,
      };
    }
  }, []);
  const columns = useMemo(() => {
    return schema.map((field: any) => {
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
  }, [schema, defaultValue, readOnly]);
  /** 渲染表格 */
  const renderDom = (
    <>
      <Table
        rowKey={rowKey}
        pagination={false}
        data={defaultValue}
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
            width: 60,
            visible: readOnly !== true,
            className: 'core-form-table-list-actions',
            render(v, record, index) {
              return (
                <Space>
                  <Button
                    type="text"
                    disabled={leastOne && defaultValue.length === 1}
                    confirm={
                      removeConfirm
                        ? {
                            type: 'pop',
                            title: '是否确认删除?',
                          }
                        : undefined
                    }
                    onClick={() => {
                      defaultValue.splice(index, 1);
                      onChange?.([...defaultValue]);
                    }}
                  >
                    删除
                  </Button>
                  <Button
                    type="text"
                    onClick={() => {
                      defaultValue.splice(index, 0, defaultValue[index]);
                      onChange?.([...defaultValue]);
                    }}
                  >
                    复制
                  </Button>
                </Space>
              );
            },
          },
        ].filter((i: any) => i.visible !== false)}
      />
      <div className="core-form-table-list-footer">
        <Button
          type="dashed"
          visible={readOnly !== true}
          icon={<IconPlus />}
          disabled={defaultValue.length >= maxCount}
          onClick={() => {
            defaultValue.push(
              typeof defaultAddValue === 'function'
                ? defaultAddValue()
                : defaultAddValue,
            );
            form.setFieldsValue(
              beforeReceiveInnerValues(defaultValue, columns),
            );
            onChange?.([...defaultValue]);
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
        onValuesChange={(v, vs) => {
          onChange?.(tranfromInnerValues(vs, defaultValue, columns));
        }}
      >
        {renderDom}
      </Form>
    </div>
  );
};
