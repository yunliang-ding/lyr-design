import { cloneDeep, isEmpty } from '@/util';
import { useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useState } from 'react';
import { CardForm, CardFormProps, DragWrapper, SchemaProps } from '..';
import { isWrap, swapElementsInArray } from './util';
import Drag from './drag';

const loopChildren = (
  children: any[],
  currentIndex: number[],
  onDrop,
  selectedKey,
  setSelectedKey,
) => {
  // 删除虚拟节点
  const virtualIndex = children.findIndex((i) => i.virtual);
  if (virtualIndex > -1) {
    children.splice(virtualIndex, 1);
  }
  console.log(children);
  if (isEmpty(children)) {
    // 如果是空容器给一个虚拟节点，用于可拖拽节点
    children.push({
      virtual: true,
      type: () => {
        return <div>容器空节点</div>;
      },
    });
  }
  children.forEach((item, index) => {
    if (isWrap(item)) {
      loopChildren(
        item?.props?.children,
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
          virtual={item.virtual}
          selected={selectedKey === item.key}
        />
      );
      return (
        <DragWrapper.Item
          index={[...currentIndex, index]}
          onDrop={onDrop}
          virtual={item.virtual}
        >
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

export interface DragFormProps {
  /** 拖拽结束 */
  onChange?(list: any): void;
  /** 切换事件 */
  onSelected?(list: any): void;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 数据源 */
  items: SchemaProps<{}>[];
}

export default ({
  items = [],
  defaultSelectedKey,
  onChange,
  onSelected,
  ...rest
}: DragFormProps) => {
  const [innerSchema, setInnerSchema]: any = useState(cloneDeep(items));
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  useUpdateEffect(() => {
    onChange?.(innerSchema);
  }, [innerSchema]);
  useUpdateEffect(() => {
    onSelected?.(selectedKey);
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
            if (indices1 !== indices2) {
              swapElementsInArray(
                innerSchema,
                indices1.split(','),
                indices2.split(','),
              );
              setInnerSchema([...innerSchema]);
            }
          };
          if (isWrap(item)) {
            loopChildren(
              item?.props?.children,
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
