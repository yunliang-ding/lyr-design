import { useEffect, useState } from 'react';

export default ({ render, params, asyncOptions }) => {
  const [spin, setSpin] = useState(true);
  const [options, setOptions] = useState([]);
  const init = async () => {
    setOptions(await asyncOptions);
    setSpin(false); // 等待结束
  };
  useEffect(() => {
    init();
  }, []);
  if (spin) {
    return <i className="iconfont spicon-loading" />;
  }
  return render.apply(null, [...params, options]) || '-';
};
