/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileSearchProps } from './type';
import Header from '../header';
import CreateSpin from '@/create-spin';
import { useRef } from 'react';
import FileExplorer, { sleep } from '../file-explorer';
import { isEmpty } from 'react-core-form-tools';
import './index.less';

const prefixCls = 'ide-editor-file-search';

const spin = CreateSpin({
  getContainer: () => document.querySelector(`.${prefixCls}`),
  mode: 'vscode',
});

export default ({
  style = {},
  onRefresh,
  explorerRef = useRef<any>({}),
  onClick,
  onSearch = sleep,
  treeData = [],
  exclude,
  include,
}: FileSearchProps) => {
  const keywordRef = useRef<HTMLInputElement>();
  const search = async () => {
    try {
      const keyword = keywordRef.current.value;
      if (!isEmpty(keyword)) {
        spin.open();
        await onSearch(keyword);
      }
    } catch (error) {
      console.log(error);
    } finally {
      spin.close();
    }
  };
  return (
    <div className={prefixCls} style={style}>
      <Header
        title="SEARCH"
        actions={[
          {
            icon: 'codicon codicon-refresh',
            title: 'Search',
            onClick: search,
          },
          {
            icon: 'codicon codicon-search-clear-results',
            title: 'Clear',
            onClick() {
              keywordRef.current.value = '';
              keywordRef.current.focus();
            },
          },
        ]}
      />
      <div className={`${prefixCls}-search`}>
        <input
          placeholder="请输入查找的关键字"
          autoFocus
          ref={keywordRef}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
        />
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
          menus={false}
        />
      </div>
    </div>
  );
};
