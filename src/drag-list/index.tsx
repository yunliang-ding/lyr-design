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
}

export default ({ items = [], onChange, showIcon = true }: DragListProps) => {
  return (
    <Dnd
      style={{
        flexDirection: 'column',
        width: 100,
      }}
      onChange={onChange}
      items={items.map((item: any) => {
        return {
          key: item.key,
          content: (
            <div
              style={{
                width: 100,
                height: 30,
                background: '#fff',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Space style={{ width: 100 }}>
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
