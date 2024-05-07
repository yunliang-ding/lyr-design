import { cloneDeep, isEmpty, uuid } from '@/util';
import { Message } from '@arco-design/web-react';
/**
 * 判断容器
 */
export const isWrap = ({ widget }) =>
  ['FieldSet', 'FormList', 'TableList'].includes(widget);
/**
 * 判读空容器
 */
export const isEmptyWrap = ({ widget, props }) => {
  return isWrap({ widget }) && isEmpty(props?.children);
};
/** 给定下标数组查找父节点 */
export const queryParentByIndex = (startParent: any, indices: any) => {
  indices.forEach((index: number) => {
    if (isWrap(startParent)) {
      startParent = startParent.props.children?.[index];
    } else {
      startParent = startParent[index];
    }
  });
  return startParent;
};
/**
 * 下面是一个函数，可以用于在一个多级嵌套数组中交换两个元素的位置
 * @param array
 * @param indices1
 * @param indices2
 */
export const swapElementsInArray = (array, indices1, indices2) => {
  // 不允许插入子节点，或者位置没有变化
  if (String(indices2).startsWith(String(indices1))) {
    return false;
  }
  /** 删除 */
  const removeIndex = indices1.pop(); // 最后要删除的下标
  const startParent = queryParentByIndex(array, indices1); // 寻找父节点
  /** 插入 */
  const insertIndex = indices2.pop(); // 最后要插入的下标
  const endParent = queryParentByIndex(array, indices2); // 寻找父节点
  // 删除
  let startParentNode = startParent;
  if (isWrap(startParentNode)) {
    // 空节点返回
    if (startParentNode?.props?.children[removeIndex].virtual) {
      return false;
    }
    startParentNode = startParent?.props?.children;
  }
  // 插入
  let endParentNode = endParent;
  if (isWrap(endParentNode)) {
    endParentNode = endParent?.props?.children;
  }
  // 子表单节点暂不支持容器
  if (
    ['FormList', 'TableList'].includes(endParent.widget) &&
    isWrap(startParentNode[removeIndex])
  ) {
    return Message.info('子表单节点暂不支持存放容器');
  }
  endParentNode?.splice?.(
    insertIndex,
    0,
    startParentNode.splice?.(removeIndex, 1)?.[0],
  );
  return true;
};

// 节点洗礼
export const baptismNode = (children: any) => {
  const _item = cloneDeep(children);
  _item.forEach((item: any) => {
    const unikey = uuid(8);
    item.name = unikey;
    item.key = unikey;
    if (isWrap(item)) {
      item.props.children = baptismNode(item.props.children);
    }
  });
  return _item;
};
