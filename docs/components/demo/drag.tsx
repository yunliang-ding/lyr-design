import React from 'react';
import { Icon } from 'react-core-form';

const dragContainer: any = {
  position: 'relative',
  border: '2px solid rgb(var(--primary-6))',
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
  cursor: 'pointer',
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
          <div style={dragContainerDarg}>
            <Icon type="drag" color="#ffffff" />
          </div>
          <div style={dragContainerTools}>
            <Icon type="delete" color="#ffffff" />
            <Icon type="copy" color="#ffffff" />
          </div>
        </>
      )}
    </div>
  );
};
