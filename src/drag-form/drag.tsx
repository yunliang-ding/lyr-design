import { Space, Tooltip } from '@arco-design/web-react';
import {
  IconDragArrow,
  IconDelete,
  IconCopy,
  IconExclamationCircle,
} from '@arco-design/web-react/icon';
import './index.css';

export default ({ virtual = false, label, dom, selected = false }) => {
  return virtual ? (
    <div
      className="dragContainer"
      style={{
        borderColor: '#ccc',
        padding: 20,
      }}
    >
      <Space>
        <span>空节点元素</span>
        <Tooltip
          content="当一个容器为空的时候，会提供一个空节点元素辅助拖拽"
          position="right"
        >
          <IconExclamationCircle
            style={{ fontSize: 18, position: 'relative', top: 2 }}
          />
        </Tooltip>
      </Space>
    </div>
  ) : (
    <div
      className="dragContainer"
      style={{
        borderColor: selected ? 'rgb(var(--primary-6))' : '#ccc',
      }}
    >
      <div>{dom}</div>
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
