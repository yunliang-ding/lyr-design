/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Spin, Empty } from '@arco-design/web-react';
import { AsyncOptionsCache } from '@/util';
import { IconLoading } from '@arco-design/web-react/icon';

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
          // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
          AsyncOptionsCache[props.id] = props.options(props.form);
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
          loading ? <Spin /> : <Empty description={props.emptyDescription} />
        }
        options={options}
      />
    ) : loading ? (
      <IconLoading spin style={{ color: 'rgb(var(--primary-6))' }} />
    ) : options?.length > 0 ? (
      <Component {...props} options={options} />
    ) : (
      !props.readOnly && <Empty description={props.emptyDescription} />
    );
  };
