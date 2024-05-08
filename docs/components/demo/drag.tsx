import React from 'react';
import { IconDelete, IconCopy } from '@arco-design/web-react/icon';

const dragContainer: any = {
  position: 'relative',
  border: '2px dashed rgb(var(--primary-6))',
  padding: 10,
};
const dragContainerDargKey: any = {
  position: 'absolute',
  top: 2,
  right: 4,
  color: 'rgb(var(--primary-6))',
  fontSize: 12,
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
export default ({ field, dom, selected = false }) => {
  return (
    <div
      style={
        selected
          ? dragContainer
          : { ...dragContainer, border: '2px dashed #ccc' }
      }
    >
      {dom}
      <div style={dragContainerDargKey}>{field.name}</div>
      {selected && (
        <>
          <div style={dragContainerTools}>
            <IconDelete />
            <IconCopy />
          </div>
        </>
      )}
    </div>
  );
};
