/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Fragment } from 'react';
import { iconMapping } from '../icon-mapping';

const initialPadding = 12;

/** icon渲染 */
export const iconRender = (file) => {
  return file.type === 'directory' ? (
    <i
      className={
        file.status === 'expanded'
          ? 'codicon codicon-tree-item-expanded'
          : 'codicon codicon-tree-item-expanded codicon-is-collapsed'
      }
    />
  ) : (
    <i
      className={`file-icon ${
        file.status === 'edit'
          ? iconMapping[file.extension] || ''
          : iconMapping[file.extension]
      }`}
    />
  );
};
/** label渲染 */
export const labelRender = (file, onAddDone, renameFileDone, prefixCls) => {
  return file.status === 'edit' ? (
    <input
      onBlur={(e) => {
        if (file.name) {
          renameFileDone(e.target.value, file.name);
        } else {
          onAddDone(e.target.value);
        }
      }}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          if (file.name) {
            renameFileDone(e.target.value, file.name);
          } else {
            onAddDone(e.target.value);
          }
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      autoFocus
      defaultValue={file.name}
      style={{
        background: '#333',
        border: 'none',
        width: '100%',
        outline: '1px solid #1890ff',
        color: '#fff',
      }}
    />
  ) : (
    <span className={`${prefixCls}-label`}>{file.name}</span>
  );
};
/** gitStatusRender */
export const gitStatusRender = (file, prefixCls) => {
  return (
    file.gitStatus &&
    (file.type === 'directory' ? (
      <span className={`${prefixCls}-status-dot`} />
    ) : (
      <span className={`${prefixCls}-status`}>{file.gitStatus}</span>
    ))
  );
};
/** 渲染结构树 */
export const RenderFileTree = ({
  selectedKey,
  dataSource,
  tabsPadding = 0,
  prefixCls,
  onFileClick,
  onAddDone,
  renameFileDone,
  onContextMenu,
}) => {
  return (
    <Fragment>
      {dataSource?.map((file) => {
        const { gitStatus = '' } = file;
        const itemPrefixCls = `${prefixCls}-body-item${gitStatus}`;
        const padding = initialPadding + tabsPadding;
        const innerStyle = { padding: `0 ${padding}px` };
        const className =
          selectedKey === file.path
            ? `${itemPrefixCls} ${prefixCls}-body-item-selected`
            : `${itemPrefixCls}`;
        return (
          <Fragment key={file.path}>
            <div
              key={file.path}
              title={file.path}
              style={innerStyle}
              className={className}
              onContextMenu={(e) => {
                onContextMenu(e, file);
              }}
              onClick={() => {
                onFileClick(file);
              }}
            >
              {iconRender(file)}
              {labelRender(file, onAddDone, renameFileDone, itemPrefixCls)}
              {gitStatusRender(file, itemPrefixCls)}
            </div>
            {file.status === 'expanded' && (
              <RenderFileTree
                onContextMenu={onContextMenu}
                dataSource={file.children}
                selectedKey={selectedKey}
                prefixCls={prefixCls}
                onFileClick={onFileClick}
                onAddDone={onAddDone}
                renameFileDone={renameFileDone}
                tabsPadding={padding}
              />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};
