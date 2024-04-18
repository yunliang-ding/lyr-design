import {
  IconDragArrow,
  IconDelete,
  IconCopy,
} from '@arco-design/web-react/icon';
import './index.css';

export default ({ label, dom, selected = false }) => {
  return (
    <div
      className="dragContainer"
      style={{
        borderColor: selected ? 'rgb(var(--primary-6))' : '#ccc',
      }}
    >
      <div style={{ pointerEvents: 'none' }}>{dom}</div>
      <div className="dragContainerDargKey">{label}</div>
      {selected && (
        <>
          <div className="dragContainerDarg">
            <IconDragArrow />
          </div>
          <div className="dragContainerTools">
            <IconDelete />
            <IconCopy />
          </div>
        </>
      )}
    </div>
  );
};
