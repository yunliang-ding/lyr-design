import { Menu } from '@arco-design/web-react';
import Breadcrumb from '../breadcrumb';
import RightContentRender from '../right-content-render';
import './vertical.less';

export default ({
  menu,
  title,
  pageTitle,
  logo,
  breadcrumb,
  extra,
  rightContentProps,
  RenderMenus,
  openKeys,
  menuClick,
  subMenuClick,
  selectedKey,
  content,
  collapsed,
  footerRender,
  dark,
}: any) => {
  /** 右侧渲染逻辑 */
  return (
    <>
      <div className="app-layout-vertical-left">
        <div className="app-layout-vertical-left-logo">
          <a>
            <img
              src={logo}
              style={{
                width: 32,
                height: 32,
                position: 'relative',
                right: collapsed ? 14 : 0,
              }}
            />
            <h1 hidden={collapsed}>{title}</h1>
          </a>
        </div>
        <div className="app-layout-left-menu">
          <Menu
            style={{ width: 208 }}
            openKeys={openKeys}
            onClickMenuItem={menuClick}
            onClickSubMenu={subMenuClick}
            selectedKeys={[selectedKey]}
            collapse={collapsed}
            theme={dark ? 'dark' : 'light'}
          >
            {RenderMenus(menu.items, collapsed)}
          </Menu>
        </div>
      </div>
      <div className="app-layout-vertical-right">
        <div className="app-layout-vertical-right-header">
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Breadcrumb breadcrumb={breadcrumb} />
          </div>
          <RightContentRender
            {...{
              dark,
              ...rightContentProps,
            }}
          />
        </div>
        <div className="app-layout-vertical-right-body">
          <div className="app-layout-vertical-right-body-title">
            <h3>{pageTitle}</h3>
            <div className="app-layout-vertical-right-body-title-extra">
              {extra}
            </div>
          </div>
          <div className="app-layout-vertical-right-body-content">
            {content}
          </div>
          <div className="app-layout-vertical-right-body-footer">
            {footerRender()}
          </div>
        </div>
      </div>
    </>
  );
};
