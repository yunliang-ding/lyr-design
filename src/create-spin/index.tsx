import { Spin } from 'antd';
import { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const $: any = document.querySelector.bind(document);

export interface CreateSpinProps {
  getContainer?: () => HTMLElement | null;
  style?: CSSProperties;
  containId?: string;
  mode?: 'vscode' | 'loading';
}

const SpinComponent = ({ style, mode }) => {
  return mode === 'loading' ? (
    <Spin spinning />
  ) : (
    <div className="create-spin-vscode" style={style} />
  );
};

const CreateSpin = ({
  getContainer,
  containId,
  style,
  mode,
}: CreateSpinProps) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', containId);
  tag.style.width = '100%';
  tag.style.height = '100%';
  tag.style.position = 'absolute';
  tag.style.top = '0';
  tag.className = 'create-spin';
  getContainer().appendChild(tag);
  ReactDOM.render(<SpinComponent style={style} mode={mode} />, tag);
  return null;
};

/** 返回具体的函数 */
export default (props = {}) => {
  const {
    getContainer = () => document.querySelector('body'),
    containId = 'spinid_20230318',
    style = {},
    mode = 'loading',
  }: CreateSpinProps = props;
  return {
    open: () => {
      CreateSpin({
        getContainer,
        containId,
        mode,
        style,
      });
    },
    close: () => {
      $(`#${containId}`)?.remove();
    },
  };
};
