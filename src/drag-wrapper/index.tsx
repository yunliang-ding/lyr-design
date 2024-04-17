import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import './index.less';

export interface DragWrapperProps {
  items: {
    key: number | string;
    content: ReactNode;
  }[];
  style?: CSSProperties;
  onChange?: Function;
}

export default ({
  items = [],
  style = {},
  onChange = () => {},
}: DragWrapperProps) => {
  const [list, setList] = useState(items);
  // 同步更新
  useEffect(() => {
    setList(items);
  }, [items]);
  return (
    <div className="lyr-dnd" style={style}>
      {list.map((item, index) => {
        return (
          <div
            key={item.key}
            className="lyr-dnd-item"
            draggable
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderTop = '2px solid #1890ff';
            }}
            onDragEnter={(e) => {
              e.currentTarget.style.borderTop = '2px solid #1890ff';
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.border = '2px solid #fff';
            }}
            onDrop={(e) => {
              e.preventDefault();
              console.log('over');
              const targetIndex = Number(e.dataTransfer.getData('index'));
              const temp = list[targetIndex];
              // 删除之前的
              list.splice(targetIndex, 1);
              // 插入到指定的下标位置
              list.splice(index, 0, temp);
              // 更新视图
              setList([...list]);
              // 通知外部
              onChange(list);
              // 回复颜色
              e.currentTarget.style.border = '2px solid #fff';
            }}
            onDragStart={(e) => {
              e.dataTransfer.setData('index', String(index));
              e.currentTarget.style.opacity = '0.1';
              e.currentTarget.style.border = '2px solid #1890ff';
            }}
            onDragEnd={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.border = '2px solid #fff';
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
