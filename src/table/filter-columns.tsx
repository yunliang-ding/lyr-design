import {
  Checkbox,
  Menu,
  Dropdown,
  Button,
  Tooltip,
} from '@arco-design/web-react';
import { useMemo } from 'react';
import DragList from '@/drag-list';
import { IconSettings } from '@arco-design/web-react/icon';

export default ({
  filterIds = [],
  columns = [],
  onOk = () => {},
  setColumns,
  size,
}: any) => {
  const columnList = useMemo(
    () =>
      columns.map((column: any) => {
        return {
          key: column.dataIndex,
          value: column,
          content: (
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
            key={filterIds}
            onChange={(list) => {
              const _columns = list.map((i) => i.value);
              setColumns(_columns);
            }}
            items={columnList}
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
          icon={<IconSettings />}
          onClick={(e) => e.preventDefault()}
        />
      </Tooltip>
    </Dropdown>
  );
};
