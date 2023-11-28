/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { Spin, Empty } from '@arco-design/web-react';
import debounce from 'lodash.debounce';
import Select from '@/widgets/arco-design/select';
import { useEffect, useState, useRef, useMemo } from 'react';
import { AsyncOptionsCache, isEmpty } from '@/util';

export default ({
  fetchOptions,
  debounceTimeout = 800,
  onChange,
  ...props
}: any) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRef = useRef(0);
  const optionsCacheRef: any = useRef(); // 缓存上一份数据源，解决用户不选择的问题
  const init = async () => {
    try {
      setLoading(true);
      if (typeof fetchOptions === 'function') {
        if (!AsyncOptionsCache[props.id]) {
          // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
          AsyncOptionsCache[props.id] = fetchOptions('', props.form);
        }
        const _options = await AsyncOptionsCache[props.id];
        optionsCacheRef.current = _options; // 第一次同步 optionsCacheRef
        setOptions(_options);
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
      // 没有选择的时候 将 options 自动回退到上一次
      if (isEmpty(value) && optionsCacheRef.current) {
        AsyncOptionsCache[props.id] = optionsCacheRef.current; // 缓存一下
        setOptions(optionsCacheRef.current);
        setLoading(false);
      } else {
        fetchOptions(value, props.form).then((newOptions: any) => {
          // 第一次同步一下
          if (isEmpty(optionsCacheRef.current)) {
            optionsCacheRef.current = newOptions;
          }
          // 解决请求竞争问题
          if (fetchId !== fetchRef.current) {
            return;
          }
          AsyncOptionsCache[props.id] = newOptions; // 缓存一下
          setOptions(newOptions);
          setLoading(false);
        });
      }
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      {...props}
      onChange={(v) => {
        if (v) {
          // 当用户选中了开始缓存一份数据源
          optionsCacheRef.current = options;
        }
        onChange(v);
      }}
      filterOption={false}
      loading={loading}
      value={loading ? [] : props.value}
      onSearch={debounceFetcher}
      notFoundContent={loading ? <Spin /> : <Empty />}
      options={options}
      showSearch
    />
  );
};
