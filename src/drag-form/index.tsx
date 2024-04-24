import { cloneDeep, isEmpty, uuid } from '@/util';
import { useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useMemo, useState } from 'react';
import { CardForm, DragWrapper, SchemaProps } from '..';
import { isWrap, swapElementsInArray } from './util';
import Drag from './drag';

const loopChildren = (
  props: any,
  currentIndex: number[],
  onDrop,
  selectedKey,
  setSelectedKey,
  onAdd,
  dragId,
) => {
  // 删除虚拟节点
  const virtualIndex = props?.children?.findIndex((i) => i.virtual);
  if (virtualIndex > -1) {
    props?.children.splice(virtualIndex, 1);
  }
  if (isEmpty(props.children)) {
    // 如果是空容器给一个虚拟节点，用于可拖拽节点
    props.children = [
      {
        key: Math.random(),
        virtual: true,
        type: () => {
          return <div>容器空节点</div>;
        },
      },
    ];
  }
  props.children.forEach((item, index) => {
    if (isWrap(item)) {
      loopChildren(
        item?.props,
        [...currentIndex, index],
        onDrop,
        selectedKey,
        setSelectedKey,
        onAdd,
        dragId,
      );
    }
    // TDDO 临时解决下在itemRender 中取不到最新的selectedKey问题
    item.__proto__.selectedKey = selectedKey;
    item.itemRender = (vDom: ReactNode) => {
      const VNode = (
        <Drag
          dom={vDom}
          label={`${item.type}-${item.key}`}
          virtual={item.virtual}
          mask={!isWrap(item)}
          selected={item.__proto__.selectedKey === item.key}
        />
      );
      return (
        <DragWrapper.Item
          index={[...currentIndex, index]}
          onDrop={onDrop}
          onAdd={onAdd}
          dragId={dragId}
          virtual={item.virtual}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (item.virtual) {
                return;
              }
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
  items = [
    {
      key: uuid(8),
      virtual: true,
      type: () => {
        return <div>容器空节点</div>;
      },
    } as any,
  ],
  defaultSelectedKey,
  onChange,
  onSelected,
  ...rest
}: DragFormProps) => {
  const dragId = useMemo(() => uuid(8), []); // 唯一id
  const [innerSchema, setInnerSchema]: any = useState(cloneDeep(items));
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  useUpdateEffect(() => {
    onChange?.(innerSchema);
  }, [innerSchema]);
  useUpdateEffect(() => {
    onSelected?.(selectedKey);
  }, [selectedKey]);
  // 删除虚拟节点
  const virtualIndex = innerSchema?.findIndex((i) => i.virtual);
  if (virtualIndex > -1 && innerSchema.length > 1) {
    innerSchema.splice(virtualIndex, 1);
  }
  return (
    <DragWrapper dragId={dragId}>
      <CardForm
        gridStyle={{
          colGap: 10,
          rowGap: 10,
        }}
        schema={innerSchema.map((item: any, currentIndex: number) => {
          const onDrop = (indices1: string, indices2: string) => {
            if (indices1 !== indices2) {
              const reRender = swapElementsInArray(
                innerSchema,
                indices1.split(','),
                indices2.split(','),
              );
              if (reRender) {
                setInnerSchema([...innerSchema]);
              }
            }
          };
          // 添加表单项
          const onAdd = (item, index) => {
            innerSchema.splice(index, 0, {
              ...item.schema,
              key: uuid(8),
            });
            setInnerSchema([...innerSchema]);
          };
          if (isWrap(item)) {
            loopChildren(
              item?.props,
              [currentIndex],
              onDrop,
              selectedKey,
              setSelectedKey,
              onAdd,
              dragId,
            );
          }
          return {
            ...item,
            initialValue: isWrap(item) ? [{}] : undefined, // 控制子表单展示
            props: {
              ...item.props,
              operation: !isWrap(item), // 控制子表单在该模式下不可操作
            },
            itemRender(vDom: ReactNode) {
              const VNode = (
                <Drag
                  dom={vDom}
                  virtual={item.virtual}
                  mask={!isWrap(item)}
                  label={`${item.type}-${item.key}`}
                  selected={selectedKey === item.key}
                />
              );
              return (
                <DragWrapper.Item
                  index={currentIndex}
                  onDrop={onDrop}
                  onAdd={onAdd}
                  dragId={dragId}
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
