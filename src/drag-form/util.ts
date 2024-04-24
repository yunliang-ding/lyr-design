import { isEmpty } from '@/util';
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
  let startParent = array;
  let removeItem = {};
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
  let endParent = array;
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
  if (isWrap(startParent)) {
    // 空节点返回
    if (startParent?.props?.children[removeIndex].virtual) {
      return false;
    }
    removeItem = startParent?.props?.children?.splice?.(removeIndex, 1)?.[0];
  } else {
    removeItem = startParent?.splice?.(removeIndex, 1)?.[0];
  }
  // 插入
  if (isWrap(endParent)) {
    endParent?.props?.children?.splice?.(insertIndex, 0, removeItem);
  } else {
    endParent?.splice?.(insertIndex, 0, removeItem);
  }
  return true;
};
