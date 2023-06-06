import MainReact from './react';
import MainMd from './markdown';
import Icon from '@/icon';

export default (props) => {
  if (props.item.componentName.endsWith('.md')) {
    return <MainMd {...props} />;
  }
  return <MainReact {...props} />;
};

export const injectStyle = async (
  id: string,
  lessCode: string,
  less = window.less,
) => {
  const { css } = await less.render(lessCode);
  const styleTag = document.querySelector(`style[id=_${id}]`);
  if (styleTag) {
    styleTag.innerHTML = css;
  } else {
    const style = document.createElement('style');
    style.id = `_${id}`;
    style.innerHTML = css;
    document.querySelector('head')?.appendChild(style);
  }
};

export const injectScript = async (src: string, name) => {
  return new Promise((res) => {
    if (document.querySelector(`script[class=_${name}]`)) {
      res(true); // 存在直接返回
    } else {
      const script = document.createElement('script');
      script.src = src;
      script.className = `_${name}`;
      document.querySelector('head')?.appendChild(script);
      script.onload = () => {
        res(true);
      };
    }
  });
};

export const IconRender = ({ componentName, ...rest }) => {
  if (componentName.endsWith('.md')) {
    return <Icon type="file-markdown" {...rest} />;
  }
  return <Icon type="react" {...rest} />;
};
