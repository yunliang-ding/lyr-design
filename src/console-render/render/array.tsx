/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react';
import { getJSType, RenderChildren } from '../';

export default ({ value, log }) => {
  const { length } = Object.keys(value);
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="self-node">
        <i
          className="iconfont spicon-jiantou arrow"
          onClick={() => {
            setExpand(!expand);
          }}
          style={{
            transform: expand ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
        <span className="value array">Array({length})</span>
      </div>
      {expand && (
        <div className="children-node">
          {value.map((item, index) => {
            const type = getJSType(item);
            return (
              <div className={`children-node-item children-node-item-${type}`}>
                <div>
                  <span className="key">{index}</span>
                  <span className="colon">:</span>
                </div>
                <RenderChildren value={item} log={log} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
