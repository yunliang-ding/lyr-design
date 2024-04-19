const isWrap = (type: string) =>
  ['FieldSet', 'FormList', 'TableList'].includes(type);
/**
 * 下面是一个函数，可以用于在一个多级嵌套数组中交换两个元素的位置：
 * @param array
 * @param indices1
 * @param indices2
 */
// [3, 1], [3]
export const swapElementsInArray = (array, indices1, indices2) => {
  console.log(array, indices1, indices2);
  /** 删除 */
  let startParent = array;
  let removeItem = {};
  const removeIndex = indices1.pop(); // 最后要删除的下标
  // 起始位置parent
  indices1.forEach((index: number) => {
    if (isWrap(startParent.type)) {
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
    if (isWrap(endParent.type)) {
      endParent = endParent.props.children?.[index];
    } else {
      endParent = endParent[index];
    }
  });
  // 删除
  console.log(startParent);
  if (isWrap(startParent.type)) {
    removeItem = startParent?.props?.children?.splice?.(removeIndex, 1)?.[0];
  } else {
    removeItem = startParent?.splice?.(removeIndex, 1)?.[0];
  }
  // 插入
  if (isWrap(endParent.type)) {
    endParent?.props?.children?.splice?.(insertIndex, 0, removeItem);
  } else {
    endParent?.splice?.(insertIndex, 0, removeItem);
  }
};
