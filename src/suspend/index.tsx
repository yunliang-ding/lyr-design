/* eslint-disable react-hooks/rules-of-hooks */
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { uuid } from '@/util';
import './index.less';

const $: any = document.querySelector.bind(document);

export interface SuspendProps {
  /** 容器内容 */
  content?: React.ReactNode;
  /**
   * 是否默认弹出
   * @default true
   */
  show: boolean;
  /**
   * 顶部距离
   * @default 50%
   */
  top?: string;
  /**
   * 位置
   * @default right
   */
  placement?: 'left' | 'right';
  /** 样式 */
  closeStyle?: CSSProperties;
  /** 实例引用 */
  suspendRef?: any;
}

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
