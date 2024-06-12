import { cloneDeep, isEmpty, uuid } from '@/util';
import { Message } from '@arco-design/web-react';
import { ReactNode, useMemo } from 'react';
import { Search, CardForm, DragWrapper } from '..';
import { baptismNode, isWrap, swapElementsInArray } from './util';
import Drag from './drag';
import { DragFormProps } from './type';

const loopChildren = (
  props: any,
  currentIndex: number[],
  onDrop,
  selectedKey,
  setSelectedKey,
  onAdd,
  dragId,
  onChange,
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
  props.children.forEach((item, index, items) => {
    if (isWrap(item)) {
      loopChildren(
        item?.props,
        [...currentIndex, index],
        onDrop,
        selectedKey,
        setSelectedKey,
        onAdd,
        dragId,
        onChange,
      );
    }
    item.initialValue = isWrap(item) ? [{}] : undefined; // 控制子表单展示
    item.props = {
      ...item.props,
      operation: !isWrap(item), // 控制子表单在该模式下不可操作
    };
    // TDDO 临时解决下在itemRender 中取不到最新的selectedKey问题
    (window as any).__itemSelectKey__ = selectedKey
    item.itemRender = (vDom: ReactNode, option: any) => {
      if (option === undefined) {
        return null;
      }
      const { field } = option;
      const VNode = (
        <Drag
          dom={vDom}
          label={`${item.widget}-${field.key}`}
          virtual={item.virtual}
          mask={!isWrap(item)}
          selected={field.key === (window as any).__itemSelectKey__}
          onDelete={() => {
            items.splice(index, 1);
            setSelectedKey(undefined);
            onChange();
          }}
          onCopy={() => {
            items.splice(index + 1, 0, ...baptismNode([items[index]]));
            onChange();
          }}
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
              setSelectedKey(field.key);
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
  items,
  onChange,
  onSelected,
  selectedKey,
  type = 'card',
  ...rest
}: DragFormProps) => {
  const dragId = useMemo(() => uuid(8), []); // 唯一id
  if (isEmpty(items)) {
    items = [
      {
        key: uuid(8),
        virtual: true,
        type: () => {
          return <div>容器空节点</div>;
        },
      },
    ] as any;
  }
  // 删除虚拟节点
  const virtualIndex = items?.findIndex((i: any) => i.virtual);
  if (virtualIndex > -1 && items.length > 1) {
    items.splice(virtualIndex, 1);
  }
  const ComponentWrap: any = type === 'search' ? Search : CardForm;
  return (
    <DragWrapper dragId={dragId}>
      <ComponentWrap
        gridStyle={{
          colGap: 10,
          rowGap: 10,
        }}
        schema={items.map((item: any, currentIndex: number) => {
          const onDrop = (indices1: string, indices2: string) => {
            if (indices1 !== indices2) {
              const reRender = swapElementsInArray(
                items,
                indices1.split(','),
                indices2.split(','),
              );
              if (reRender) {
                onChange([...items]);
              }
            }
          };
          // 添加表单项
          const onAdd = (v, index) => {
            const { schema } = cloneDeep(v);
            let target = items;
            let targetType = '';
            const arr = index.split(',');
            const insertIndex = arr.pop();
            arr.forEach((i: string) => {
              targetType = target[i].widget;
              target = target[i].props.children;
            });
            // 子表单节点暂不支持容器
            if (
              ['FormList', 'TableList'].includes(targetType) &&
              isWrap(schema)
            ) {
              return Message.info('子表单节点暂不支持存放容器');
            }
            const unikey = uuid(8);
            target.splice(insertIndex, 0, {
              ...schema,
              name: unikey,
              key: unikey,
            });
            onChange([...items]);
          };
          if (isWrap(item)) {
            loopChildren(
              item?.props,
              [currentIndex],
              onDrop,
              selectedKey,
              onSelected,
              onAdd,
              dragId,
              () => {
                onChange([...items]);
              },
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
                  label={`${item.widget}-${item.key}`}
                  selected={selectedKey === item.key}
                  onDelete={() => {
                    items.splice(currentIndex, 1);
                    onChange([...items]);
                    onSelected(undefined);
                  }}
                  onCopy={() => {
                    items.splice(
                      currentIndex + 1,
                      0,
                      ...baptismNode([items[currentIndex]]),
                    );
                    onChange([...items]);
                  }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.virtual) {
                        return;
                      }
                      onSelected(item.key);
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
