import { Space } from '@arco-design/web-react';
import { IconDragDotVertical } from '@arco-design/web-react/icon';
import DragWrapper from '../drag-wrapper';
import { DragListProps } from './type';


export default ({
  width = 160,
  items = [],
  onChange,
  showIcon = true,
}: DragListProps) => {
  return (
    <DragWrapper
      style={{
        flexDirection: 'column',
        width,
      }}
      onChange={onChange}
      items={items.map((item: any) => {
        return {
          ...item,
          content: (
            <div
              style={{
                width,
                height: 30,
                background: 'var(--color-menu-light-bg)',
                color: 'var(--color-neutral-10)',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Space style={{ width }}>
                {showIcon && <IconDragDotVertical />}
                {item.content}
              </Space>
            </div>
          ),
        };
      })}
    />
  );
};
