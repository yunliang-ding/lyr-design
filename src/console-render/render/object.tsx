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
        <span className="value object">
          ({length}) {'{...}'}
        </span>
      </div>
      {expand && (
        <div className="children-node">
          {Object.keys(value).map((key) => {
            const type = getJSType(value[key]);
            return (
              <div className={`children-node-item children-node-item-${type}`}>
                <div>
                  <span className="key">{key}</span>
                  <span className="colon">:</span>
                </div>
                <RenderChildren value={value[key]} log={log} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
