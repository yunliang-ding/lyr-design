export default interface CheckAppVersionProps {
  /** 设置轮训时间 */
  time?: number;
  /** 提示文案 */
  text?: string;
  /** 远程资源地址更新时间 */
  remoteCdnUpdateTime: () => Promise<number>;
  /** 可选位置 */
  placement?: 'topRight' | 'bottomRight';
  /** 展示提示 */
  onMessage?: Function;
}
