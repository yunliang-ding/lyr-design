import { cloneDeep, isEmpty } from '@/util';
import { useUpdateEffect } from 'lyr-hooks';
import { ReactNode, useState } from 'react';
import { CardForm, DragWrapper, SchemaProps } from '..';
import { isWrap, swapElementsInArray } from './util';
import Drag from './drag';

const loopChildren = (
  props: any,
  currentIndex: number[],
  onDrop,
  selectedKey,
  setSelectedKey,
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
    console.log('selectedKey-->', selectedKey);
    if (isWrap(item)) {
      loopChildren(
        item?.props,
        [...currentIndex, index],
        onDrop,
        selectedKey,
        setSelectedKey,
      );
    }
    item.itemRender = (vDom: ReactNode) => {
      console.log('inner selectedKey', selectedKey);
      const VNode = (
        <Drag
          dom={vDom}
          label={`${item.type}-${item.key}`}
          virtual={item.virtual}
          mask={!isWrap(item)}
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
          console.log('out', item.key, selectedKey);
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
          if (isWrap(item)) {
            loopChildren(
              item?.props,
              [currentIndex],
              onDrop,
              selectedKey,
              setSelectedKey,
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
                  mask={!isWrap(item)}
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
