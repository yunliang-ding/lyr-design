/**
 * 下面是一个函数，可以用于在一个多级嵌套数组中交换两个元素的位置：
 * @param array
 * @param indices1
 * @param indices2
 */
export const swapElementsInArray = (array, indices1, indices2) => {
  const getNestedElement = (arr, indices) =>
    indices.reduce((acc, index) => acc[index], arr);
  const setNestedElement = (arr, indices, value) => {
    const lastIndex = indices.pop();
    const parent = indices.reduce((acc, index) => acc[index], arr);
    parent[lastIndex] = value;
  };

  const element1 = getNestedElement(array, indices1);
  const element2 = getNestedElement(array, indices2);

  setNestedElement(array, indices1, element2);
  setNestedElement(array, indices2, element1);
};
