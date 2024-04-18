import {
  IconDragArrow,
  IconDelete,
  IconCopy,
} from '@arco-design/web-react/icon';

const dragContainer: any = {
  position: 'relative',
  border: '2px dashed rgb(var(--primary-6))',
  padding: '20px 10px',
};
const dragContainerDargKey: any = {
  position: 'absolute',
  top: 2,
  right: 4,
  color: 'rgb(var(--primary-6))',
  fontSize: 12,
};
const dragContainerDarg: any = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgb(var(--primary-6))',
  color: '#fff',
  cursor: 'move',
};
const dragContainerTools: any = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 50,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: 'rgb(var(--primary-6))',
  color: '#fff',
  cursor: 'pointer',
  borderTopLeftRadius: '8px',
};

export default ({ label, dom, selected = false }) => {
  return (
    <div
      style={
        selected
          ? dragContainer
          : { ...dragContainer, border: '2px dashed #ccc' }
      }
    >
      {dom}
      <div style={dragContainerDargKey}>{label}</div>
      {selected && (
        <>
          <div style={dragContainerDarg}>
            <IconDragArrow />
          </div>
          <div style={dragContainerTools}>
            <IconDelete />
            <IconCopy />
          </div>
        </>
      )}
    </div>
  );
};
