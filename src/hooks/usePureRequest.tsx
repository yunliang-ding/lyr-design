import { cloneDeep } from 'lodash';
import { useState, useRef } from 'react';

/**
 * 提供 loading标识 + 时间戳校验
 */
export default (request) => {
  const timeStampRef = useRef(0);
  const [loading, setLoading] = useState(false); // loading
  return [
    loading,
    ({
      url = '',
      data = {},
      method = 'POST',
    }: {
      url: string;
      method: 'GET' | 'POST';
      data: any;
    }) => {
      setLoading(true);
      const formData = cloneDeep(data); // 拷贝下
      timeStampRef.current = new Date().getTime(); // 每次请求生成时间戳，会持续更新
      formData.__timeStamp = timeStampRef.current; // 记录请求的时间戳
      if (method === 'GET') {
        formData.params = data;
      } else {
        formData.data = data;
      }
      return new Promise((resolve) => {
        request({
          url,
          ...formData,
          method,
        })
          .then((res) => {
            // 只接受最后一次的请求的响应
            if (formData.__timeStamp === timeStampRef.current) {
              resolve(res);
            }
          })
          .catch(() => {
            resolve({
              success: false,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      });
    },
  ];
};
