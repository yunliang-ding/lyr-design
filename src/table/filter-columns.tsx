import {
  Checkbox,
  Menu,
  Dropdown,
  Button,
  Tooltip,
} from '@arco-design/web-react';
import { useMemo } from 'react';
import { DragList, Icon } from '@/index';

export default ({
  filterIds = [],
  columns = [],
  onOk = Function,
  setColumns,
  size,
}: any) => {
  const columnList = useMemo(
    () =>
      columns.map((column: any) => {
        return {
          key: column.dataIndex,
          value: column,
          label: (
            <div style={{ padding: 4 }}>
              <Checkbox
                checked={!filterIds.includes(column.dataIndex)}
                onChange={() => {
                  const index = filterIds.findIndex(
                    (item: any) => item === column.dataIndex,
                  );
                  if (index > -1) {
                    filterIds.splice(index, 1);
                  } else {
                    filterIds.push(column.dataIndex);
                  }
                  onOk([...filterIds]);
                }}
              >
                {column.title}
              </Checkbox>
            </div>
          ),
        };
      }),
    [columns, filterIds],
  );
  return (
    <Dropdown
      droplist={
        <Menu style={{ height: 220, overflow: 'auto' }}>
          <DragList
            onChange={(list) => {
              const _columns = list.map((i) => i.value);
              setColumns(_columns);
            }}
            list={columnList}
          />
        </Menu>
      }
      position="bottom"
      trigger={['click']}
    >
      <Tooltip position="top" content="列设置">
        <Button
          type="default"
          size={size}
          icon={<Icon type="setting" style={{ top: 3 }} />}
          onClick={(e) => e.preventDefault()}
        />
      </Tooltip>
    </Dropdown>
  );
};
