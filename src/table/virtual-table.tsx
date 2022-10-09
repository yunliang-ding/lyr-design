/* eslint-disable react/no-unused-prop-types */
import { useState, useRef, useEffect } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';

export default ({
  rowKey,
  dataSource,
  columns,
  loading,
  pagination,
  scroll,
  toolBar,
}) => {
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });
  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);
  const renderVirtualList = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any,
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => {
          const record = rawData[rowIndex];
          const column = mergedColumns[columnIndex];
          const value = record[column.dataIndex];
          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last':
                  columnIndex === mergedColumns.length - 1,
              })}
              style={style}
            >
              {typeof column.render === 'function'
                ? column.render(value, record, rowIndex)
                : value}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <>
      {toolBar}
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          rowKey={rowKey}
          dataSource={dataSource}
          columns={mergedColumns}
          loading={loading}
          pagination={pagination}
          scroll={scroll}
          components={{
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
    </>
  );
};
