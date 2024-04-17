import DragList from '@/drag-list';
import { Dropdown, Space, Tooltip } from '@arco-design/web-react';
import { IconSort } from '@arco-design/web-react/icon';
import Select from './select';

export default ({ options, ...rest }) => {
  const list = [];
  rest.value?.forEach((v) => {
    const option = options.find((item) => item.value === v);
    if (option) {
      list.push({
        ...option,
        key: option.value,
        content: <div style={{ padding: 4 }}>{option.label}</div>,
      });
    }
  });
  return (
    <Space>
      <Select
        showSearch
        mode="multiple"
        value={rest.value}
        onChange={rest.onChange}
        style={{ width: 300, marginRight: 10 }}
        options={options}
        {...rest}
      />
      <Dropdown
        trigger={['click']}
        droplist={
          <div
            style={{
              boxShadow: '0 2px 8px #e1e1e1',
            }}
          >
            <DragList
              items={list}
              onChange={(v) => {
                rest.onChange?.(
                  v.map((i: any) => i.value),
                  v,
                );
              }}
            />
          </div>
        }
      >
        <Tooltip content="点击调整顺序">
          <IconSort style={{ color: 'rgb(var(--primary-6))', fontSize: 18 }} />
        </Tooltip>
      </Dropdown>
    </Space>
  );
};
