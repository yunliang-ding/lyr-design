import BabelCompile from './babel-compile';

export default ({ code = '', require = {} }) => {
  const babel = new BabelCompile(require);
  try {
    return babel.getES5Code(`${code.replaceAll('↵', '')}`);
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};
