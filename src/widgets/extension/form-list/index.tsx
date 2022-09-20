import Grid from '@/grid';
import { Fragment, useRef } from 'react';
import { Form, Button, Empty, message } from 'antd';
import Item from '@/form/item';
import './index.less';

export default ({
  form,
  name,
  event,
  widgets,
  schema,
  disabled = false,
  readOnly = false,
  operation = true,
  maxCount = 20,
  leastOne = false,
  label = '',
  actionRef = useRef({}),
  grid = {
    gridStyle: {
      rowGap: 0,
      columnGap: 20,
    },
    column: 2,
  },
  formConfig,
}: any) => {
  // 是否可以操作
  const notOperation = !operation || readOnly || disabled; // 不可操作的标识
  return (
    <Form.List name={name}>
      {(f, { add, remove }) => {
        actionRef.current[name] = {
          add: async (...p) => {
            if (notOperation) {
              return message.info('不可操作');
            }
            if (f?.length === maxCount) {
              return message.info(`最多只能添加${maxCount}条`);
            }
            add(...p);
          },
          remove: async (idx = 0) => {
            if (notOperation) {
              return message.info('不可操作');
            }
            if (leastOne && f.length === 1) {
              return message.info('至少保留一条');
            }
            remove(idx);
          },
        };
        return (
          <>
            {f.map((item: any, index, { length }) => {
              return (
                <Fragment key={item.key || item.name}>
                  <div className="core-form-list-block">
                    <span className="form-list-block-label">
                      {label}
                      {index + 1}
                    </span>
                    {!notOperation && (
                      <Button
                        type="link"
                        disabled={
                          (leastOne && index === 0 && length === 1) || disabled
                        }
                        onClick={() => remove(item.name)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                  <Grid {...grid}>
                    {schema?.map((field: any) => {
                      const _field = { ...field }; // 浅拷贝一下
                      _field.name = [item.name, _field.name];
                      return (
                        <Item
                          readOnly={readOnly}
                          disabled={disabled || _field?.props?.disabled}
                          form={form}
                          widgets={widgets}
                          event={event}
                          initialValues={form.initialValues}
                          field={_field}
                          formListName={name} // 子表单的名字
                          fieldKey={[item.fieldKey, _field.name]}
                          key={_field.name || _field.key}
                          formConfig={formConfig}
                        />
                      );
                    })}
                  </Grid>
                </Fragment>
              );
            })}
            {notOperation && f.length === 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {!notOperation && (
              <Form.Item>
                <Button
                  type="dashed"
                  disabled={f.length === maxCount || disabled}
                  onClick={() => add()}
                  block
                >
                  添加
                </Button>
              </Form.Item>
            )}
          </>
        );
      }}
    </Form.List>
  );
};
