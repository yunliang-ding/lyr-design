import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import { Icon } from '..';

export const DragHandle = SortableHandle(() => (
  <Icon
    type="drag3"
    color="#999"
    size={14}
    style={{ cursor: 'grab', top: 3 }}
  />
));

export const SortableItem = SortableElement(
  (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
);
export const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
);

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

export const DraggableContainer = (
  props:
    | SortableContainerProps & {
        dataSource: [];
        setDataSource: any;
        onDragDone: any;
        children: any;
      },
) => (
  <SortableBody
    useDragHandle
    disableAutoscroll
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

export const DraggableBodyRow: React.FC<any> = ({
  className,
  style,
  dataSource,
  ...restProps
}) => {
  const index = dataSource.findIndex(
    (x) => x.index === restProps['data-row-key'],
  );
  return <SortableItem index={index} {...restProps} />;
};
