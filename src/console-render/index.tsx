import ObjectRender from './render/object';
import ArrayRender from './render/array';
import BasicRender from './render/basic';
import ReactDom from 'react-dom';
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

const ConsoleRender = ({ values, log = console.log.bind(console) }) => {
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

ConsoleRender.create = (target) => {
  const HistoryLog = [];
  /** 修饰打印 */
  const console_log_bind_001 = console.log.bind(console);
  console.log = function (...p) {
    console_log_bind_001(...p);
    try {
      print(p);
    } catch (e) {
      console_log_bind_001('err', e);
    }
  };
  const print = (value) => {
    HistoryLog.push(value); // 添加到队列
    if (target) {
      ReactDom.render(
        <ConsoleRender values={HistoryLog} log={console_log_bind_001} />,
        target,
      );
    }
  };
};

export default ConsoleRender;
