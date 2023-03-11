/* eslint-disable */
import { isEmpty } from '@/util';
import BabelCompile from './babel-compile';
import { babelParseProps } from './type';
/**
 * 解析
 */
export default ({
  code = '',
  // 默认依赖 react、antd
  dependencies = {
    React: 'react',
    antd: 'antd',
  },
  // 默认 default 导出
  exportDefault = true,
  require = {},
}: babelParseProps) => {
  const babel = new BabelCompile(require);
  try {
    let dependenciesString = '';
    if (!isEmpty(dependencies)) {
      dependenciesString =
        Object.keys(dependencies)
          .map((key) => {
            return `import ${key} from '${dependencies[key]}';`;
          })
          .join('\n') + '\n';
    }
    const res = babel.excuteCode(
      `${dependenciesString}${code.replaceAll('↵', '')}`,
    );
    if (!res?.isError) {
      if (exportDefault) {
        return res?.exports.default;
      } else {
        return res?.exports;
      }
    } else {
      throw res?.error;
    }
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};
