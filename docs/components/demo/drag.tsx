import React from 'react';

const dragContainer: any = {
  position: 'relative',
  border: '2px solid var(--antd-wave-shadow-color)',
  padding: '20px 10px',
};
const dragContainerDargKey: any = {
  position: 'absolute',
  top: 2,
  right: 4,
  color: 'var(--antd-wave-shadow-color)',
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
  background: 'var(--antd-wave-shadow-color)',
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
  background: 'var(--antd-wave-shadow-color)',
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
            <i className="iconfont spicon-drag" />
          </div>
          <div style={dragContainerTools}>
            <i className="iconfont spicon-delete" />
            <i className="iconfont spicon-copy" />
          </div>
        </>
      )}
    </div>
  );
};
