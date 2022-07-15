import { Row, Col, Card, CardProps } from 'antd';
import { useState, ReactNode } from 'react';
import { getElementTop } from './util';
import './index.less';

export interface AnchorCardProps {
  list: {
    /** 唯一标识 */
    key?: string;
    /** 文案 */
    title: string;
    /** 内容 */
    content?: ReactNode;
    /** 卡片属性  */
    cardProps?: CardProps;
  }[];
  /** 设置挂载Dom容器 */
  getContainer?: () => HTMLElement;
  /** 默认选中 */
  defaultActivityKey?: string;
  /** 设置固定高度 */
  fixHeight?: number;
  /** 固定高度 */
  fixedTop?: number;
  children?: ReactNode;
}

export default ({
  list,
  getContainer,
  defaultActivityKey,
  fixHeight = 24,
  fixedTop = 0,
  children = null,
}: AnchorCardProps) => {
  const tabs = list.map((item) => {
    return {
      key: item.title,
      ...item,
    };
  });
  const [activeKey, setActiveKey] = useState(defaultActivityKey);
  const onAnchorClick = (key) => {
    const el = document.querySelector(`#${key}`);
    if (el) {
      setActiveKey(key);
      const dom = getContainer?.() || document.documentElement;
      dom.scrollTo({
        top: getElementTop(el) - fixHeight,
        behavior: 'smooth',
      });
    }
  };
  // 左侧锚点模块的高度
  return (
    <Row className="anchor-card-content" wrap={false}>
      <Col flex="160px" className="anchor-card-left" style={{ top: fixedTop }}>
        {tabs.map((item) => {
          return (
            <div
              className={
                item.key === activeKey
                  ? 'anchor-card-left-nav active'
                  : 'anchor-card-left-nav'
              }
              key={item.key}
              onClick={onAnchorClick.bind(null, item.key)}
            >
              {item.title}
            </div>
          );
        })}
      </Col>
      <Col className="anchor-card-right">
        {children ||
          tabs.map((item) => {
            return (
              <Card
                {...(item.cardProps || {
                  bodyStyle: {
                    height: 360,
                  },
                })}
                title={item.title}
                key={item.key}
                id={item.key}
              >
                {item.content}
              </Card>
            );
          })}
      </Col>
    </Row>
  );
};
