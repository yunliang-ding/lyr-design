export default interface CheckAppVersionProps {
  /** 设置轮训时间 */
  time?: number;
  /** 设置轮训请求，返回true 代表提示 */
  request: () => Promise<boolean>;
  /** 提示文案 */
  text?: string;
}
