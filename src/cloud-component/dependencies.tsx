/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import Icon from '@/icon';
import { isEmpty } from '@/util';
import { Spin } from 'antd';
import { useState } from 'react';
import { copyToClipBoard } from 'react-core-form-tools';

export default ({ dependencies, setDependencies, onAddDep }) => {
  const [err, setErr] = useState('');
  const [spin, setSpin] = useState(false);
  const rule = ({ target }) => {
    const { value } = target;
    if (isEmpty(value)) {
      return setErr('');
    }
    if (!/^[A-Za-z0-9-:]+$/.test(value)) {
      setErr('包名仅能用字母或数字或-符号');
    } else if (
      dependencies.some((dep) => dep.name === value && !isEmpty(value))
    ) {
      setErr('已存在');
    } else {
      setErr('');
    }
  };
  const addDependencies = async (pkgName, item, index) => {
    if (!isEmpty(pkgName)) {
      const [name, alise] = pkgName.split(':'); // 分割出来
      setSpin(true);
      // 请求资源确认存在并查询到最新的版本
      const { url, status } = await fetch(`https://unpkg.com/${name}`);
      setSpin(false);
      if (status === 404) {
        return setErr('资源不存在');
      }
      url.replace(new RegExp(`${name}@[0-9+.]+`, 'g'), (keyword) => {
        item.version = keyword.substring(keyword.lastIndexOf('@') + 1);
        return undefined;
      });
      item.alise = alise || name;
      item.name = name;
      item.path = url;
      const data = await onAddDep(item);
      setSpin(false);
      if (data?.id) {
        Object.assign(item, data);
        delete item.edit;
      } else {
        return setErr('添加依赖失败');
      }
    } else {
      dependencies.splice(index, 1);
    }
    setDependencies([...dependencies]);
  };
  return (
    <>
      <div className="cloud-component-left-header">
        <span>配置外部依赖</span>
        <Icon
          type="add"
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
                <>
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
                      marginRight: 10,
                    }}
                  />
                  <Spin spinning={spin} size="small" />
                </>
              ) : (
                <>
                  <span className="dep-label">{item.name}</span>
                  <select>
                    <option>{item.version}</option>
                  </select>
                  <Icon
                    type="copy"
                    size={12}
                    color="#1890ff"
                    style={{ marginLeft: 6, top: 1 }}
                    onClick={() => {
                      copyToClipBoard(
                        `import ${item.name} from '${item.name}'; \n`,
                      );
                    }}
                  />
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
