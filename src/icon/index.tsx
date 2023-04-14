import mapping from './mapping';
import './index.less';
import { CSSProperties } from 'react';

export interface IconProps {
  type: 'react' | string;
  size?: number;
  color?: string;
  onClick?: any;
  title?: string;
  style?: CSSProperties;
  theme?: 'primary' | undefined;
}

export default ({
  type,
  size = 16,
  color = '#888',
  onClick = () => {},
  title = '',
  style = {},
  theme,
}: IconProps) => {
  if (theme === 'primary') {
    color = 'var(--antd-wave-shadow-color)';
  }
  return (
    <span
      className={`rcf-icon rcf-icon-${type}`}
      onClick={onClick}
      title={title}
      style={style}
    >
      {mapping[type]?.({
        size,
        color,
      })}
    </span>
  );
};
