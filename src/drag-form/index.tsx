import { arrayMove } from '@/drag-wrapper';
import { useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useEffect, useState } from 'react';
import { CardForm, CardFormProps, DragWrapper } from '..';
import Drag from './drag';

interface DragFormProps extends CardFormProps {
  /** 拖拽结束 */
  onItemDrop?(list: any): void;
  /** 点击事件 */
  onItemClick?(list: any): void;
  /** 默认选中的key */
  defaultSelectedKey?: string;
}

export default ({
  schema = [],
  defaultSelectedKey,
  onItemDrop,
  onItemClick,
  ...rest
}: DragFormProps) => {
  const [innerSchema, setInnerSchema]: any = useState(() => schema);
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
          colGap: 20,
          rowGap: 20,
        }}
        schema={innerSchema.map((item: any, currentIndex: number) => {
          return {
            ...item,
            itemRender(vDom: ReactNode) {
              const VNode = (
                <Drag
                  dom={vDom}
                  label={item.name}
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
