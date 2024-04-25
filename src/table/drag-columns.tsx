import { DragWrapper } from '..';
import { IconDragDotVertical } from '@arco-design/web-react/icon';

export const DragHandle = () => (
  <IconDragDotVertical
    style={{
      cursor: 'move',
      color: '#555',
    }}
  />
);

export const DraggableContainer = (props) => {
  return (
    <DragWrapper dragId="table-list">
      <tbody {...props} />
    </DragWrapper>
  );
};

export const DraggableRow = ({
  record,
  index,
  dataSource,
  setDataSource,
  onDragDone,
  ...rest
}) => {
  return (
    <DragWrapper.Item
      index={index}
      key={record.id}
      dragId="table-list"
      onDrop={(targetIndex: number) => {
        const temp = dataSource[targetIndex];
        // 删除之前的
        dataSource.splice(targetIndex, 1);
        // 插入到指定的下标位置
        dataSource.splice(index, 0, temp);
        // 更新视图
        setDataSource([...dataSource]);
        // 通知外部
        onDragDone?.(dataSource);
      }}
    >
      <tr {...rest} />
    </DragWrapper.Item>
  );
};
