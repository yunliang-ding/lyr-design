import { Button, notification, Space } from 'antd';
import CheckAppVersionProps from './type';
import './index.less';

const VNode = (text) => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <span className="app-version-notifi-text">{text}</span>
    <div className="app-version-notifi-footer">
      <Button
        onClick={() => {
          notification.close('app-version-notifi');
        }}
      >
        取消
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          location.reload();
        }}
      >
        确认
      </Button>
    </div>
  </Space>
);

export default ({
  time = 5,
  remoteCdnUpdateTime,
  text = '系统检测有新版本更新，是否重新加载?',
  placement = 'bottomRight',
  onMessage = () => {
    notification.info({
      key: 'app-version-notifi',
      message: '提示',
      duration: 6000,
      className: 'app-version-notifi',
      description: VNode(text),
      placement,
    });
  },
}: CheckAppVersionProps) => {
  if (typeof remoteCdnUpdateTime !== 'function') {
    return () => {};
  }
  // 当前时间
  const localBuildTime = new Date().getTime();
  // 判断逻辑
  const diffTime = async () => {
    const remoteBuildTime = await remoteCdnUpdateTime();
    if (remoteBuildTime > localBuildTime) {
      return true;
    }
    return false;
  };
  let timer = null;
  // 轮循查询版本差异入口
  const run = () => {
    diffTime().then((res) => {
      if (res) {
        onMessage?.();
        window.clearTimeout(timer);
      } else {
        timer = setTimeout(run, time * 1000);
      }
    });
  };
  run();
  return () => {
    window.clearTimeout(timer);
  };
};
