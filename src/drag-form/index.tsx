import { arrayMove } from '@/drag-wrapper';
import { cloneDeep } from '@/util';
import { useReactive, useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useState } from 'react';
import { CardForm, CardFormProps, DragWrapper, SchemaProps } from '..';
import Drag from './drag';

interface DragFormProps extends CardFormProps {
  /** 拖拽结束 */
  onItemDrop?(list: any): void;
  /** 点击事件 */
  onItemClick?(list: any): void;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 数据源 */
  items: SchemaProps<{}>[];
}

const loopChildren = (
  children: any[],
  setSelectedKey: any,
  selectedKey: string,
  currentIndex: number,
  onDrop,
) => {
  children.forEach((item, index) => {
    if (Array.isArray(item.props?.children)) {
      loopChildren(
        item.props.children,
        setSelectedKey,
        selectedKey,
        currentIndex,
        onDrop,
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
        <DragWrapper.Item index={currentIndex} onDrop={onDrop}>
          <div
            onClick={() => {
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
  onItemClick,
  ...rest
}: DragFormProps) => {
  const [innerSchema, setInnerSchema]: any = useState(cloneDeep(items));
  const store = useReactive({
    selectedKey: defaultSelectedKey,
  });
  useUpdateEffect(() => {
    onItemDrop?.(innerSchema);
  }, [innerSchema]);
  useUpdateEffect(() => {
    onItemClick?.(store.selectedKey);
  }, [store.selectedKey]);
  return (
    <DragWrapper>
      <CardForm
        gridStyle={{
          colGap: 10,
          rowGap: 10,
        }}
        schema={innerSchema.map((item: any, currentIndex: number) => {
          const onDrop = (targetIndex: number) => {
            const newSchema = arrayMove(innerSchema, currentIndex, targetIndex);
            setInnerSchema(newSchema);
          };
          if (Array.isArray(item.props?.children)) {
            loopChildren(
              item.props.children,
              (key: string) => {
                console.log(key);
                store.selectedKey = key;
              },
              store.selectedKey,
              currentIndex,
              onDrop,
            );
          }
          return {
            ...item,
            itemRender(vDom: ReactNode) {
              const VNode = (
                <Drag
                  dom={vDom}
                  label={`${item.type}-${item.key}`}
                  selected={store.selectedKey === item.key}
                />
              );
              return (
                <DragWrapper.Item index={currentIndex} onDrop={onDrop}>
                  <div
                    onClick={() => {
                      store.selectedKey = item.key;
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
