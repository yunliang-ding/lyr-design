import { Space } from '@arco-design/web-react';
import { IconDragDotVertical } from '@arco-design/web-react/icon';
import Dnd, { DragWrapperProps } from '../drag-wrapper';
import './index.css';

interface DragListProps extends DragWrapperProps {
  /** 列顺序改变事件 */
  onChange?: Function;
  /**
   * 是否展示图标
   * @default true
   */
  showIcon?: boolean;
  /** 宽度 */
  width?: number;
}

export default ({
  width = 160,
  items = [],
  onChange,
  showIcon = true,
}: DragListProps) => {
  console.log('width', width);
  return (
    <Dnd
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
                background: '#fff',
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
