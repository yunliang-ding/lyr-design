import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { uuid } from 'react-core-form-tools';
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
   * 是否左边打开
   * @default right
   */
  placement?: 'left' | 'right';
  /** 样式 */
  closeStyle?: CSSProperties;
  /** 挂载方位 */
  getContainer?: Function;
  /**
   * 是否一直保留
   * @default false
   */
  keep?: boolean;
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
  return (
    <div
      className={classNames(
        'react-core-form-suspend-wrap',
        { show: visible },
        {
          left: placement === 'left',
        },
      )}
      style={{ top }}
    >
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
