import { ReactNode, useEffect, useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import { Space } from '@arco-design/web-react';
import { Icon } from '..';
import './index.less';

const DragHandle = SortableHandle(() => <Icon type="drag2" />);

const SortContainer = SortableContainer((props: any) => (
  <div className="core-form-drag-list" {...props} />
));

interface DragListProps {
  /**
   * 列表数据源
   * @default []
   */
  list: {
    /** 唯一标识 */
    key: string | number;
    /** 显示文案 */
    label: ReactNode | string;
  }[];
  /** 列顺序改变事件 */
  onChange?: Function;
  /** 点击事件事件 */
  onClick?: Function;
  /** 默认选中 */
  defaultActiveKey?: string | number;
  /**
   * 是否展示图标
   * @default true
   */
  showIcon?: boolean;
}

export default ({
  list = [],
  onChange,
  onClick,
  defaultActiveKey,
  showIcon = true,
}: DragListProps) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const [innerList, setInnerList] = useState([...list]);
  const SortableItem = SortableElement((props: any) => (
    <div
      className="core-form-drag-list-item"
      {...props}
      onClick={(e) => {
        setActiveKey(props.value.key);
        onClick?.(props.value, e);
      }}
    />
  ));
  useEffect(() => {
    setInnerList([...list]);
  }, [list]);
  // 拖拽结束
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...innerList], oldIndex, newIndex);
      setInnerList([...newData]);
      onChange?.(newData);
    }
  };
  return (
    <div className="core-form-drag-list">
      <SortContainer
        distance={1}
        onSortEnd={onSortEnd}
        helperClass="core-form-drag-item-dragging"
      >
        {innerList.map((i, index) => {
          return (
            <SortableItem index={index} key={i.key} value={i}>
              <Space>
                {showIcon && <DragHandle />}
                <div
                  className={
                    activeKey === i.key
                      ? 'core-form-drag-list-item-active-label'
                      : 'core-form-drag-list-item-label'
                  }
                >
                  {i.label}
                </div>
              </Space>
            </SortableItem>
          );
        })}
      </SortContainer>
    </div>
  );
};
