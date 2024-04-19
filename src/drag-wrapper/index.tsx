import { cloneElement, CSSProperties, ReactNode, useState } from 'react';

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

export const arrayMove = (
  arr: any[],
  currentIndex: number,
  targetIndex: number,
) => {
  // 拷贝下
  const temp = arr[targetIndex];
  // 删除之前的
  arr.splice(targetIndex, 1);
  // 插入到指定的下标位置
  arr.splice(currentIndex, 0, temp);
  return [...arr];
};

const Item = ({ index, onDrop, children, virtual = false }: any) => {
  /** 扩展节点 */
  const Element = cloneElement(children, {
    style: {
      ...children?.props?.style,
      cursor: virtual ? 'not-allowed' : 'move',
      borderTop: '2px solid var(--color-menu-light-bg)',
    },
    draggable: true,
    onDragOver: (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.style.borderTop = '2px solid rgb(var(--primary-6))';
    },
    onDragEnter: (e) => {
      e.stopPropagation();
      e.currentTarget.style.borderTop = '2px solid rgb(var(--primary-6))';
    },
    onDragLeave: (e) => {
      e.stopPropagation();
      e.currentTarget.style.borderTop = '2px solid var(--color-menu-light-bg)';
    },
    onDrop: (e) => {
      e.stopPropagation();
      onDrop?.(e.dataTransfer.getData('index'), String(index));
      e.currentTarget.style.borderTop = '2px solid var(--color-menu-light-bg)';
    },
    onDragStart: (e) => {
      e.stopPropagation();
      e.dataTransfer.setData('index', String(index));
      e.currentTarget.style.opacity = '0.5';
    },
    onDragEnd: (e) => {
      e.stopPropagation();
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.borderTop = '2px solid var(--color-menu-light-bg)';
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
                  const newList = arrayMove(list, index, targetIndex);
                  // 更新视图
                  setList(newList);
                  // 通知外部
                  onChange(newList);
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
