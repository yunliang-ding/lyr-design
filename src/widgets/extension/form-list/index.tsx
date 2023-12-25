import { useRef } from 'react';
import { Grid, Form, Button, Empty, Message } from '@arco-design/web-react';
import Item from '@/form/item';
import './index.less';

export default ({
  form,
  name,
  event,
  widgets,
  children,
  disabled = false,
  readOnly = false,
  operation = true,
  maxCount = 20,
  leastOne = false,
  label = '',
  actionRef = useRef({}),
  column = 3,
  grid = {
    rowGap: 0,
    colGap: 20,
  },
}: any) => {
  // 是否可以操作
  const notOperation = !operation || readOnly || disabled; // 不可操作的标识
  return (
    <Form.List field={name}>
      {(fields, { add, remove }) => {
        actionRef.current[name] = {
          add: async (...p) => {
            if (notOperation) {
              return Message.info('不可操作');
            }
            if (fields?.length === maxCount) {
              return Message.info(`最多只能添加${maxCount}条`);
            }
            add(...p);
          },
          remove: async (idx = 0) => {
            if (notOperation) {
              return Message.info('不可操作');
            }
            if (leastOne && fields.length === 1) {
              return Message.info('至少保留一条');
            }
            remove(idx);
          },
        };
        return (
          <>
            {fields.map((item: any, index, { length }) => {
              return (
                <div>
                  <div className="core-form-list-block">
                    <span className="form-list-block-label">
                      {label}
                      {index + 1}
                    </span>
                    {!notOperation && (
                      <Button
                        type="text"
                        disabled={
                          (leastOne && index === 0 && length === 1) || disabled
                        }
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                  <Grid
                    {...grid}
                    style={{
                      gridTemplateColumns: `repeat(${column}, minmax(0px, 1fr))`,
                    }}
                  >
                    {children?.map((field: any) => {
                      const _field = { ...field }; // 浅拷贝一下
                      _field.index = index; // 保存下标
                      _field.name = [name, index, _field.name].join('.');
                      return (
                        <Grid.GridItem>
                          <Item
                            readOnly={readOnly}
                            disabled={disabled || _field?.props?.disabled}
                            form={form}
                            widgets={widgets}
                            event={event}
                            initialValues={form.initialValues}
                            field={_field}
                            formListName={name} // 子表单的名字
                            fieldKey={_field.name}
                            key={_field.name}
                          />
                        </Grid.GridItem>
                      );
                    })}
                  </Grid>
                </div>
              );
            })}
            {notOperation && fields.length === 0 && <Empty />}
            {!notOperation && (
              <Form.Item>
                <Button
                  type="dashed"
                  long
                  disabled={fields.length === maxCount || disabled}
                  onClick={() => add()}
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
