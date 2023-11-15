/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { TreeSelect, Spin, Empty } from '@arco-design/web-react';
import { AsyncOptionsCache } from '@/util';
import { IconLoading } from '@arco-design/web-react/icon';

export default (props: any) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      if (typeof props.options === 'function') {
        if (AsyncOptionsCache[props.id]) {
          return setOptions(await AsyncOptionsCache[props.id]);
        }
        AsyncOptionsCache[props.id] = props.options(props.form); // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
        setOptions(await AsyncOptionsCache[props.id]);
      } else {
        console.warn(`${props.name} 设置的options不是一个function`);
      }
    } catch (error) {
      setOptions([]);
      console.error('error->', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // 先查询一次
    init();
    return () => {
      // clear
      setOptions([]);
    };
  }, []);
  return loading ? (
    <IconLoading spin />
  ) : (
    <TreeSelect
      {...props}
      value={loading ? [] : props.value}
      notFoundContent={loading ? <Spin /> : <Empty />}
      options={undefined}
      treeData={options}
    />
  );
};
