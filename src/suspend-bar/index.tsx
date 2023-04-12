import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { uuid } from 'react-core-form-tools';
import './index.less';

const $: any = document.querySelector.bind(document);

export type SuspendBarProps = {
  children?: React.ReactNode;
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
  bodyStyle?: CSSProperties;
  /** 挂载方位 */
  getContainer?: Function;
  /**
   * 是否一直保留
   * @default false
   */
  keep?: boolean;
};

const SuspendBarWapper = ({
  children,
  title,
  show = true,
  top,
  placement = 'right',
  bodyStyle = {},
}: SuspendBarProps) => {
  const [visible, setVisible] = useState(show);
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
      <div className="suspend-title">{title}</div>
      <div className="suspend-content" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default ({
  keep = false,
  getContainer = () => $('body'),
  ...props
}: SuspendBarProps) => {
  const layerId = useMemo(() => `suspend-${uuid(6)}`, []);
  useEffect(() => {
    const tag = document.createElement('div');
    tag.setAttribute('id', layerId);
    const target = getContainer();
    target.appendChild(tag);
    ReactDOM.render(<SuspendBarWapper {...props} />, tag);
    return () => {
      !keep && $(`#${layerId}`)?.remove();
    };
  }, []);
  return null;
};
