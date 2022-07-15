/** 接受 */
export const beforeReceiveInnerValues = (values, columns) => {
  const initialValues = {};
  values.forEach((value, index): any => {
    columns.forEach(({ dataIndex }: any) => {
      const key = `${index}-${dataIndex}`;
      initialValues[key] = value[dataIndex];
    });
  });
  return initialValues;
};

/** 吐出 */
export const tranfromInnerValues = (vs, innerValue, columns) => {
  const list = [];
  innerValue.forEach((item, index): any => {
    const obj = {};
    columns.forEach(({ dataIndex }: any) => {
      const key = `${index}-${dataIndex}`;
      obj[dataIndex] = vs[key];
    });
    list.push(obj);
  });
  return list;
};
