import mapping from './mapping';

export interface IconProps {
  type: 'react' | '';
  size?: number;
  color?: string;
}

export default ({ type, size, color }: IconProps) => {
  return (
    <span className="rcf-icon">
      {mapping[type]({
        size,
        color,
      })}
    </span>
  );
};
