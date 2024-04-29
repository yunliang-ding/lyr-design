import { isEmpty } from '@/util';
import { Message } from '@arco-design/web-react';
/**
 * 判断容器
 */
export const isWrap = ({ type }) =>
  ['FieldSet', 'FormList', 'TableList'].includes(type);
/**
 * 判读空容器
 */
export const isEmptyWrap = ({ type, props }) => {
  return isWrap({ type }) && isEmpty(props?.children);
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
  let startParent = array; // 寻找父节点
  const removeIndex = indices1.pop(); // 最后要删除的下标
  // 起始位置parent
  indices1.forEach((index: number) => {
    if (isWrap(startParent)) {
      startParent = startParent.props.children?.[index];
    } else {
      startParent = startParent[index];
    }
  });
  /** 插入 */
  let endParent = array; // 寻找父节点
  const insertIndex = indices2.pop(); // 最后要插入的下标
  // 结束位置parent
  indices2.forEach((index: number) => {
    if (isWrap(endParent)) {
      endParent = endParent.props.children?.[index];
    } else {
      endParent = endParent[index];
    }
  });
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
    ['FormList', 'TableList'].includes(endParent.type) &&
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
