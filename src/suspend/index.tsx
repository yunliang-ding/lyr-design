/* eslint-disable react-hooks/rules-of-hooks */
import ReactDOM from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uuid } from '@/util';
import { SuspendProps } from './type';
import './index.less';

const $: any = document.querySelector.bind(document);

const Suspend: any = ({
  content,
  show = true,
  top = '50%',
  placement = 'right',
  closeStyle = {},
  suspendRef,
}: SuspendProps) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    suspendRef.current.setVisible = setVisible;
  }, []);
  const classNames = ['lyr-component-suspend-wrap'];
  if (visible) {
    classNames.push('show');
  }
  if (placement === 'left') {
    classNames.push('left');
  }
  return (
    <div className={classNames.join(' ')} style={{ top }}>
      <div
        className="suspend-close"
        style={closeStyle}
        onClick={() => setVisible(!visible)}
      />
      {content}
    </div>
  );
};

Suspend.create = (config: any = {}) => {
  const { id, getContainer = () => $('body') } = config;
  const suspendRef: any = useRef({});
  const layerId = id || useMemo(() => `suspend-${uuid(6)}`, []);
  return {
    // 打开
    open: (props: SuspendProps) => {
      if ($(`#${layerId}`)) {
        $(`#${layerId}`)?.remove();
      }
      const tag = document.createElement('div');
      tag.setAttribute('id', layerId);
      const target = getContainer();
      target.appendChild(tag);
      ReactDOM.render(<Suspend {...props} suspendRef={suspendRef} />, tag);
    },
    // 关闭
    close: () => {
      $(`#${layerId}`)?.remove();
    },
    // 展开
    show() {
      suspendRef.current.setVisible(true);
    },
    // 收起
    hide() {
      suspendRef.current.setVisible(false);
    },
  };
};

export default Suspend;
