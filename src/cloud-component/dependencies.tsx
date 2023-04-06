/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { isEmpty } from '@/util';
import { useState } from 'react';
import { copyToClipBoard } from 'react-core-form-tools';

export default ({ dependencies, setDependencies }) => {
  const [err, setErr] = useState('');
  const rule = ({ target }) => {
    const { value } = target;
    if (/\s+/.test(value)) {
      setErr('文件名称不能包含空格');
    } else if (/[\u4E00-\u9FA5]/.test(value)) {
      setErr('文件名称不能有中文');
    } else if (/^\d+$/.test(value)) {
      setErr('文件名称不能以数字开头');
    } else if (
      dependencies.some((dep) => dep.name === value && !isEmpty(value))
    ) {
      setErr('文件已存在');
    } else {
      setErr('');
    }
  };
  const addDependencies = async (name, item, index) => {
    if (!isEmpty(name)) {
      // 请求资源确认存在并查询到最新的版本
      const { url, status } = await fetch(`https://unpkg.com/${name}`);
      if (status === 404) {
        return setErr('资源不存在');
      }
      url.replace(new RegExp(`${name}@[0-9+.]+`, 'g'), (keyword) => {
        item.version = keyword.substring(keyword.lastIndexOf('@') + 1);
        return undefined;
      });
      item.name = name;
      item.path = url;
      delete item.edit;
    } else {
      dependencies.splice(index, 1);
    }
    setDependencies([...dependencies]);
  };
  return (
    <>
      <div className="cloud-component-left-header">
        <span>配置外部依赖</span>
        <i
          className="iconfont spicon-add"
          onClick={() => {
            dependencies.push({
              edit: true,
            });
            setDependencies([...dependencies]);
          }}
        />
      </div>
      <div className="cloud-component-left-footer-content">
        {dependencies.map((item: any, index) => {
          return (
            <div
              className="cloud-component-left-footer-content-item"
              key={item.name}
              title={item.path}
            >
              {item.edit ? (
                <input
                  onBlur={(e) => {
                    !err && addDependencies(e.target.value, item, index);
                  }}
                  onChange={rule}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      !err && addDependencies(e.target.value, item, index);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  autoFocus
                  defaultValue={item.componentName}
                  style={{
                    background: '#333',
                    border: 'none',
                    width: 'calc(100% + 30px)',
                    height: 18,
                    outline: '1px solid #1890ff',
                    color: '#fff',
                  }}
                />
              ) : (
                <>
                  <span>
                    {item.name}
                    &nbsp;&nbsp;
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        copyToClipBoard(
                          `import ${item.name} from '${item.name}'; \n`,
                        );
                      }}
                    >
                      <i
                        className="iconfont spicon-icon_file"
                        style={{ fontSize: 12, color: '#1890ff' }}
                      />
                    </span>
                  </span>
                  <select>
                    <option>{item.version}</option>
                  </select>
                </>
              )}
              {item.edit && (
                <div className="cloud-component-left-body-input-error">
                  {err}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
