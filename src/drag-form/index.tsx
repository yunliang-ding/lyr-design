import { cloneDeep } from '@/util';
import { useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useState } from 'react';
import { CardForm, CardFormProps, DragWrapper, SchemaProps } from '..';
import { swapElementsInArray } from './util';
import Drag from './drag';

interface DragFormProps extends CardFormProps {
  /** 拖拽结束 */
  onItemDrop?(list: any): void;
  /** 切换事件 */
  onItemSelected?(list: any): void;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 数据源 */
  items: SchemaProps<{}>[];
}

const loopChildren = (
  children: any[],
  currentIndex: number[],
  onDrop,
  selectedKey,
  setSelectedKey,
) => {
  children.forEach((item, index) => {
    if (Array.isArray(item.props?.children)) {
      loopChildren(
        item.props.children,
        [...currentIndex, index],
        onDrop,
        selectedKey,
        setSelectedKey,
      );
    }
    item.itemRender = (vDom: ReactNode) => {
      const VNode = (
        <Drag
          dom={vDom}
          label={`${item.type}-${item.key}`}
          selected={selectedKey === item.key}
        />
      );
      return (
        <DragWrapper.Item index={[...currentIndex, index]} onDrop={onDrop}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedKey(item.key);
            }}
          >
            {VNode}
          </div>
        </DragWrapper.Item>
      );
    };
  });
};

export default ({
  items = [],
  defaultSelectedKey,
  onItemDrop,
  onItemSelected,
  ...rest
}: DragFormProps) => {
  const [innerSchema, setInnerSchema]: any = useState(cloneDeep(items));
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  useUpdateEffect(() => {
    onItemDrop?.(innerSchema);
  }, [innerSchema]);
  useUpdateEffect(() => {
    onItemSelected?.(selectedKey);
  }, [selectedKey]);
  return (
    <DragWrapper>
      <CardForm
        gridStyle={{
          colGap: 10,
          rowGap: 10,
        }}
        schema={innerSchema.map((item: any, currentIndex: number) => {
          const onDrop = (indices1: string, indices2: string) => {
            swapElementsInArray(
              innerSchema,
              indices1.split(','),
              indices2.split(','),
            );
            setInnerSchema([...innerSchema]);
          };
          if (Array.isArray(item.props?.children)) {
            loopChildren(
              item.props.children,
              [currentIndex],
              onDrop,
              selectedKey,
              setSelectedKey,
            );
          }
          return {
            ...item,
            itemRender(vDom: ReactNode) {
              const VNode = (
                <Drag
                  dom={vDom}
                  label={`${item.type}-${item.key}`}
                  selected={selectedKey === item.key}
                />
              );
              return (
                <DragWrapper.Item index={currentIndex} onDrop={onDrop}>
                  <div
                    onClick={(e) => {
                      setSelectedKey(item.key);
                    }}
                  >
                    {VNode}
                  </div>
                </DragWrapper.Item>
              );
            },
          };
        })}
        {...rest}
      />
    </DragWrapper>
  );
};
