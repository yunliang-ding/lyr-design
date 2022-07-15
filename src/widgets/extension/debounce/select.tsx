/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { Spin, Empty } from 'antd';
import debounce from 'lodash/debounce';
import Select from '@/widgets/antd/select';
import { useEffect, useState, useRef, useMemo } from 'react';
import { AsyncOptionsCache } from '@/util';

export default ({ fetchOptions, debounceTimeout = 800, ...props }: any) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRef = useRef(0);
  const init = async () => {
    try {
      setLoading(true);
      if (typeof fetchOptions === 'function') {
        if (AsyncOptionsCache[props.id]) {
          return setOptions(await AsyncOptionsCache[props.id]);
        }
        // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
        AsyncOptionsCache[props.id] = fetchOptions('', props.form);
        setOptions(await AsyncOptionsCache[props.id]);
      } else {
        console.warn(`${props.name} 设置的fetchOptions不是一个function`);
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
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setLoading(true);
      fetchOptions(value, props.form).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        AsyncOptionsCache[props.id] = newOptions; // 缓存一下
        setOptions(newOptions);
        setLoading(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      {...props}
      filterOption={false}
      loading={loading}
      value={loading ? [] : props.value}
      onSearch={debounceFetcher}
      notFoundContent={
        loading ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      options={options}
      showSearch
    />
  );
};
