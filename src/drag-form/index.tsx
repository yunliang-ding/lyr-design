import { arrayMove } from '@/drag-wrapper';
import { useUpdateEffect } from 'lyr-hooks';
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

export default ({
  items = [],
  defaultSelectedKey,
  onItemDrop,
  onItemClick,
  ...rest
}: DragFormProps) => {
  const [innerSchema, setInnerSchema]: any = useState(items);
  const [selectedKey, setSelectedKey]: any = useState(defaultSelectedKey);
  useUpdateEffect(() => {
    onItemDrop?.(innerSchema);
  }, [innerSchema]);
  useUpdateEffect(() => {
    onItemClick?.(selectedKey);
  }, [selectedKey]);
  return (
    <DragWrapper>
      <CardForm
        gridStyle={{
          colGap: 10,
          rowGap: 10,
        }}
        schema={innerSchema.map((item: any, currentIndex: number) => {
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
                <DragWrapper.Item
                  index={currentIndex}
                  onDrop={(targetIndex: number) => {
                    const newSchema = arrayMove(
                      innerSchema,
                      currentIndex,
                      targetIndex,
                    );
                    setInnerSchema(newSchema);
                  }}
                >
                  <div
                    onClick={() => {
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
