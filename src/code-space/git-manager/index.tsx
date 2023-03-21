/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GitManageProps } from './type';
import FileExplorer, { sleep } from '../file-explorer';
import Header from '../header';
import CreateSpin from '@/create-spin';
import { useRef } from 'react';
import { isEmpty } from 'react-core-form-tools';
import './index.less';

const prefixCls = 'ide-editor-git-manage';

const spin = CreateSpin({
  getContainer: () => document.querySelector(`.${prefixCls}`),
  mode: 'vscode',
});

export default ({
  style = {},
  onRefresh,
  explorerRef = useRef<any>({}),
  onClick,
  onCommit = sleep,
  onPull = sleep,
  onReset = sleep,
  treeData = [],
}: GitManageProps) => {
  const messageRef: any = useRef();
  return (
    <div className={prefixCls} style={style}>
      <Header
        title="SOURCE CONTROL"
        actions={[
          {
            icon: 'codicon codicon-check',
            title: 'commit code',
            onClick: async () => {
              try {
                const message = messageRef.current.value;
                if (!isEmpty(message)) {
                  spin.open();
                  await onCommit(message, treeData);
                  messageRef.current.value = '';
                }
              } catch (error) {
                console.log(error);
              } finally {
                spin.close();
              }
            },
          },
          {
            icon: 'codicon codicon-refresh',
            title: 'refresh',
            onClick: onRefresh,
          },
          {
            icon: 'codicon codicon-toolbar-more',
            title: 'more',
          },
        ]}
      />
      <div className={`${prefixCls}-commit`}>
        <input placeholder="请输入提交的备注" autoFocus ref={messageRef} />
      </div>
      <div className={`${prefixCls}-body`}>
        <FileExplorer
          explorerRef={explorerRef}
          spinWapper={spin}
          header={false}
          style={{
            width: '100%',
            height: '100%',
          }}
          onRefresh={onRefresh}
          onClick={onClick}
          treeData={treeData}
          menus={[
            {
              key: 'disCard',
              label: 'DisCard Change',
              onClick({ props }) {
                console.log(props);
              },
            },
            {
              key: 'stage',
              label: 'Stage Change',
              onClick({ props }) {
                console.log(props);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};
