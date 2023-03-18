import React, { useState } from 'react';
import classNames from 'classnames';
import './index.less';

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

export default ({
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
