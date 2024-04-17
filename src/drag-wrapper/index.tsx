import {
  cloneElement,
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
} from 'react';

export interface DragWrapperProps {
  /** 配置项 */
  items?: {
    key: number | string;
    content: ReactNode;
  }[];
  /** 容器样式 */
  style?: CSSProperties;
  /** 改变的钩子 */
  onChange?: Function;
  children?: ReactNode;
}

const Item = ({ index, onDrop, children }) => {
  /** 扩展节点 */
  const Element = cloneElement(children, {
    style: {
      ...children?.props?.style,
      position: 'relative',
      cursor: 'move',
      borderTop: '2px solid #fff',
    },
    draggable: true,
    onDragOver: (e) => {
      e.preventDefault();
      e.currentTarget.style.borderTop = '2px solid #1890ff';
    },
    onDragEnter: (e) => {
      e.currentTarget.style.borderTop = '2px solid #1890ff';
    },
    onDragLeave: (e) => {
      e.currentTarget.style.borderTop = '2px solid #fff';
    },
    onDrop: (e) => {
      e.preventDefault();
      onDrop?.(Number(e.dataTransfer.getData('index')));
      e.currentTarget.style.borderTop = '2px solid #fff';
    },
    onDragStart: (e) => {
      e.dataTransfer.setData('index', String(index));
      e.currentTarget.style.opacity = '0.1';
    },
    onDragEnd: (e) => {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.borderTop = '2px solid #fff';
    },
  });
  return Element;
};

const DragWrapper = ({
  items = [],
  onChange = () => {},
  children,
}: DragWrapperProps) => {
  const [list, setList] = useState(items);
  // 同步更新
  useEffect(() => {
    setList(items);
  }, [items]);
  return (
    <>
      {children
        ? children
        : list.map((item, index) => {
            return (
              <Item
                key={item.key}
                index={index}
                onDrop={(targetIndex: number) => {
                  const temp = list[targetIndex];
                  // 删除之前的
                  list.splice(targetIndex, 1);
                  // 插入到指定的下标位置
                  list.splice(index, 0, temp);
                  // 更新视图
                  setList([...list]);
                  // 通知外部
                  onChange(list);
                }}
              >
                {item.content}
              </Item>
            );
          })}
    </>
  );
};

DragWrapper.Item = Item;

export default DragWrapper;
