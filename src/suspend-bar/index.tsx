import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './index.less';
import { uuid } from 'react-core-form-tools';

const $: any = document.querySelector.bind(document);
const layerId = 'suspend-bar-0328';

export type SuspendBarProps = {
  children?: React.ReactNode;
  /** title*/
  title?: string;
  /** 是否显示*/
  show: boolean;
  /** 顶部距离*/
  top?: string;
  /** 挂载方位*/
  placement?: string;
  bodyStyle?: CSSProperties;
  getContainer?: Function;
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
