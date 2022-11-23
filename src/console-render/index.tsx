import ObjectRender from './render/object';
import ArrayRender from './render/array';
import BasicRender from './render/basic';
import './index.less';

export const getJSType = (obj: unknown): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};

export const typeMapping = {
  object: ObjectRender,
  array: ArrayRender,
  number: BasicRender,
  string: BasicRender,
  boolean: BasicRender,
  undefined: BasicRender,
  null: BasicRender,
};

export const RenderChildren = ({ value, log }) => {
  const VNode = typeMapping[getJSType(value)] || BasicRender;
  return <VNode value={value} log={log} />;
};

export default ({ values, log = console.log.bind(console) }) => {
  return (
    <div className="console-wrap">
      {values.map((value) => {
        return (
          <div className="console-wrap-row">
            {value.map((v) => {
              return (
                <div className="console-wrap-row-col">
                  <RenderChildren value={v} log={log} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
