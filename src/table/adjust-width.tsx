import { Resizable } from 'react-resizable';

export default ({ onCellWidthChange, children, width = 120 }: any) => {
  return (
    <Resizable
      width={width}
      height={54}
      onResize={(e, { size }) => {
        onCellWidthChange(size.width);
      }}
    >
      <div className="table-column-drag">{children}</div>
    </Resizable>
  );
};
