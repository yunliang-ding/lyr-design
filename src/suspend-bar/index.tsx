import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { uuid } from 'react-core-form-tools';
import './index.less';

const $: any = document.querySelector.bind(document);

export type SuspendBarProps = {
  content?: React.ReactNode;
  /** 标题 */
  title?: string;
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
  headerStyle?: CSSProperties;
  /** 样式 */
  bodyStyle?: CSSProperties;
  /** 样式 */
  footerStyle?: CSSProperties;
  /** 挂载方位 */
  getContainer?: Function;
  /**
   * 是否一直保留
   * @default false
   */
  keep?: boolean;
  suspendBarRef?: any;
  footer?: any;
};

const SuspendBar: any = ({
  content,
  title,
  show = true,
  top = '50%',
  placement = 'right',
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {},
  suspendBarRef,
  footer = false,
}: SuspendBarProps) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    suspendBarRef.current.setVisible = setVisible;
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
      <div className="suspend-close" onClick={() => setVisible(!visible)} />
      <div className="suspend-header" style={headerStyle}>
        {title}
      </div>
      <div className="suspend-body" style={bodyStyle}>
        {content}
      </div>
      {footer && (
        <div className="suspend-footer" style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  );
};

SuspendBar.create = (config: any = {}) => {
  const { id, getContainer = () => $('body') } = config;
  const suspendBarRef: any = useRef({});
  const layerId = id || useMemo(() => `suspend-${uuid(6)}`, []);
  return {
    // 打开
    open: (props: SuspendBarProps) => {
      if ($(`#${layerId}`)) {
        $(`#${layerId}`)?.remove();
      }
      const tag = document.createElement('div');
      tag.setAttribute('id', layerId);
      const target = getContainer();
      target.appendChild(tag);
      ReactDOM.render(
        <SuspendBar {...props} suspendBarRef={suspendBarRef} />,
        tag,
      );
    },
    // 关闭
    close: () => {
      $(`#${layerId}`)?.remove();
    },
    // 展开
    show() {
      suspendBarRef.current.setVisible(true);
    },
    // 收起
    hide() {
      suspendBarRef.current.setVisible(false);
    },
  };
};

export default SuspendBar;
