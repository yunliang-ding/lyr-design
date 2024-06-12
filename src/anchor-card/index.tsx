import { Card, Grid } from '@arco-design/web-react';
import { useState, useRef, useEffect } from 'react';
import { getLinkTabs } from './util';
import { AnchorCardProps } from './type';
import './index.css';

export default ({
  list,
  height = 500,
  defaultActivityKey,
  children = null,
  scrollElement = '.anchor-card-right',
}: AnchorCardProps) => {
  let ticking = false;
  const tabs = list.map((item) => {
    return {
      key: item.title,
      ...item,
    };
  });
  const [activeKey, setActiveKey] = useState(defaultActivityKey);
  const wrapperRef: any = useRef({});
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
          if (Number(elementScrollTop) >= item.offsetTop) {
            setActiveKey(item.key);
          }
        });
        ticking = false;
      });
    }
  };
  const onAnchorClick = (key: string) => {
    const el: any = document.querySelector(`#${key}`);
    if (el) {
      setActiveKey(key);
      console.log(wrapperRef.current.querySelector(scrollElement), el.offsetTop)
      wrapperRef.current.querySelector(scrollElement).scrollTo({
        top: el.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  // 左侧锚点模块的高度
  return (
    <div
      className="anchor-card-content"
      style={{ height, overflow: 'auto' }}
      ref={wrapperRef}
    >
      <Grid.Col span={6} flex="160px" className="anchor-card-left">
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
    </div>
  );
};
