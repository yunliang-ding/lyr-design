import mapping from './mapping';
import './index.less';

export interface IconProps {
  type: 'react' | string;
  size?: number;
  color?: string;
  onClick?: any;
  title?: string;
}

export default ({
  type,
  size = 16,
  color = '#888',
  onClick = () => {},
  title = '',
}: IconProps) => {
  return (
    <span className="rcf-icon" onClick={onClick} title={title}>
      {mapping[type]({
        size,
        color,
      })}
    </span>
  );
};
