import { NOTICESELF } from '@/util';
import { Space } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import './index.less';

export default ({
  style = {},
  children,
  label = '',
  subTitle = '',
  event,
  effect,
  extra = [],
  fieldName,
  visible,
  form,
  initialValues,
  itemRender,
  field,
}) => {
  const [reload, setReload] = useState(Math.random());
  useEffect(() => {
    let unsubscribe = () => {};
    // 订阅
    unsubscribe = event.subscribe(fieldName, ({ name }: any) => {
      if (name === NOTICESELF || effect?.includes(name)) {
        setReload(Math.random());
      }
    });
    return () => {
      unsubscribe(); //  取消订阅
    };
  }, []);
  let vNode = (
    <div style={style} className="core-form-fieldset" key={reload}>
      <div className="core-form-fieldset-title" id={fieldName}>
        <div className="core-form-fieldset-label">
          {label}
          {subTitle && (
            <span className="core-form-fieldset-label-subTitle">
              {subTitle}
            </span>
          )}
        </div>
        <div className="core-form-fieldset-extra">
          <Space>{extra?.map((dom) => dom)}</Space>
        </div>
      </div>
      <div className="core-form-fieldset-content">{children}</div>
    </div>
  );
  if (typeof itemRender === 'function') {
    vNode = itemRender(vNode, { field }); // 暂不支持 async
  }
  // 执行visible逻辑
  if (typeof visible === 'function') {
    vNode = visible({
      ...initialValues,
      ...form.getFieldsValue(),
    })
      ? vNode
      : null;
  }
  return vNode;
};
