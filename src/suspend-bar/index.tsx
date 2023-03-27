import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './index.less';
import { uuid } from 'react-core-form-tools';

const $: any = document.querySelector.bind(document);

type Props = {
  children?: React.ReactNode;
  /** title*/
  title?: string;
  /** 是否显示*/
  show: boolean;
  /** 顶部距离*/
  top?: string;
  /** 挂载方位*/
  placement?: string;
};

const SuspendBar = ({
  children,
  title,
  show = true,
  top,
  placement = 'right',
}: Props) => {
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
      <div className="suspend-content">{children}</div>
    </div>
  );
};

export default (props) => {
  useEffect(() => {
    const tag = document.createElement('div');
    tag.setAttribute('id', `suspend-bar-${uuid(6)}`);
    const target = $('body');
    target.appendChild(tag);
    ReactDOM.render(<SuspendBar {...props} />, tag);
  }, []);
  return null;
};
