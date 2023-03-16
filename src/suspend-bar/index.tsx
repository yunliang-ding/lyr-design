import { useState } from 'react';
import './index.less';

export default ({ children, title, show = true, top, placement = 'right' }) => {
  const [visible, setVisible] = useState(show);
  return (
    <div
      className={`react-core-form-suspend-wrap${visible ? ' show' : ''}${
        placement === 'left' ? ' left' : ''
      }`}
      style={{ top }}
    >
      <div className="suspend-close" onClick={() => setVisible(!visible)} />
      <div className="suspend-title">{title}</div>
      <div className="suspend-content">{children}</div>
    </div>
  );
};
