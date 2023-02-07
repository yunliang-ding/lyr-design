/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { AsyncOptionsCache } from '@/util';

export default (Component: any) =>
  ({ emptyDescription, openOptionsCache = true, ...props }: any) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const init = async () => {
      try {
        setLoading(true);
        if (typeof props.options === 'function') {
          if (AsyncOptionsCache[props.id] && openOptionsCache) {
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
    return Component.displayName === 'Select' ? (
      <Component
        {...props}
        loading={loading}
        value={loading ? [] : props.value}
        notFoundContent={
          loading ? (
            <Spin size="small" />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={props.emptyDescription}
            />
          )
        }
        options={options}
      />
    ) : loading ? (
      <i className="iconfont spicon-loading" />
    ) : options?.length > 0 ? (
      <Component {...props} options={options} />
    ) : (
      !props.readOnly && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={props.emptyDescription}
        />
      )
    );
  };
