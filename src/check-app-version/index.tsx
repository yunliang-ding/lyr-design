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
  request = async () => false,
  text = '系统检测有新版本更新，是否重新加载?',
}: CheckAppVersionProps) => {
  const run = () => {
    request().then((res) => {
      if (res) {
        notification.info({
          key: 'app-version-notifi',
          message: '提示',
          duration: 6000,
          className: 'app-version-notifi',
          description: VNode(text),
          placement: 'bottomRight',
        });
        window.clearInterval(timer);
      }
    });
  };
  run();
  /** 开启轮训模式 */
  const timer = setInterval(() => {
    run();
  }, time * 1000);
  return () => {
    window.clearInterval(timer);
  };
};
