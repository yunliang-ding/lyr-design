/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type { SortEnd } from 'react-sortable-hoc';
import { IconDragDotVertical } from '@arco-design/web-react/icon';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

export const arrayMoveMutate = (array, from, to) => {
  const startIndex = to < 0 ? array.length + to : to;

  if (startIndex >= 0 && startIndex < array.length) {
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  }
};

export const arrayMove = (array, from, to) => {
  array = [...array];
  arrayMoveMutate(array, from, to);
  return array;
};

export const DragHandle = SortableHandle(() => (
  <IconDragDotVertical
    style={{
      cursor: 'move',
      color: '#555',
    }}
  />
));
export const SortableWrapper = SortableContainer((props) => {
  return <tbody {...props} />;
});

export const SortableItem = SortableElement((props) => {
  return <tr {...props} />;
});

export const onSortEnd = ({
  setDataSource,
  dataSource,
  oldIndex,
  newIndex,
}:
  | SortEnd & {
      setDataSource: any;
      dataSource: [];
    }) => {
  if (oldIndex !== newIndex) {
    const newData = arrayMove(dataSource.slice(), oldIndex, newIndex).filter(
      (el) => !!el,
    );
    setDataSource(newData);
    return {
      oldIndex,
      newIndex,
      dataSource: newData,
    };
  }
};

export const DraggableContainer = (props) => (
  <SortableWrapper
    useDragHandle
    helperClass="core-table-row-dragging"
    onSortEnd={(e) => {
      props.onDragDone(
        onSortEnd({
          setDataSource: props.setDataSource,
          dataSource: props.dataSource,
          ...e,
        }),
      );
    }}
    {...props}
  />
);

export const DraggableRow = (props) => {
  const { record, index, ...rest } = props;
  return <SortableItem index={index} {...rest} />;
};
