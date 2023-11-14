import { Card, CardProps, Grid } from '@arco-design/web-react';
import { useState, ReactNode, useEffect } from 'react';
import { getElementTop, getLinkTabs } from './util';
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
  let ticking = false;
  const tabs = list.map((item) => {
    return {
      key: item.title,
      ...item,
    };
  });
  const [activeKey, setActiveKey] = useState(defaultActivityKey);
  // 监听滚动区域
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  const handleScroll = (event) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const elementScrollTop =
          event.srcElement.scrollTop ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (!elementScrollTop) {
          return;
        }
        const linkTabs = getLinkTabs(tabs);
        linkTabs.forEach((item) => {
          if (Number(elementScrollTop) + Number(fixHeight) >= item.offsetTop) {
            setActiveKey(item.key);
          }
        });
        ticking = false;
      });
    }
  };
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
    <Grid.Row className="anchor-card-content">
      <Grid.Col
        span={6}
        flex="160px"
        className="anchor-card-left"
        style={{ top: fixedTop }}
      >
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
      </Grid.Col>
      <Grid.Col span={18} className="anchor-card-right">
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
      </Grid.Col>
    </Grid.Row>
  );
};
