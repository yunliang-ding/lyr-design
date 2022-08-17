/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Dropdown, Typography } from 'antd';
import { Button } from '@/index';

export default ({
  rowOperations = {},
  rowOperationsClick = (a: any, b: any, index: number) => {},
  tableInstance,
}: any) => {
  if (typeof rowOperations.menus !== 'function') {
    return false;
  }
  const RenderItem = ({ menu, record, index }: any) => {
    /** 扩展 modalFormProps、drawerFormProps 支持函数 */
    if (typeof menu.modalFormProps === 'function') {
      menu.modalFormProps = menu.modalFormProps(tableInstance);
    }
    if (typeof menu.drawerFormProps === 'function') {
      menu.drawerFormProps = menu.drawerFormProps(tableInstance);
    }
    return (
      <Button
        type="link"
        {...menu}
        onClick={async () => {
          if (menu.disabled) {
            return;
          }
          await rowOperationsClick(
            { ...menu },
            { ...record },
            index,
            tableInstance,
          );
        }}
      >
        {menu.copyable ? (
          <Typography.Paragraph
            copyable={menu.copyable}
            style={{ marginBottom: 0 }}
          >
            <a>{menu.label}</a>
          </Typography.Paragraph>
        ) : (
          menu.label
        )}
      </Button>
    );
  };
  return rowOperations.visible === false
    ? null
    : {
        ...rowOperations,
        dataIndex: 'row-operations-td-row-operation-area', // 配置默认的dataIndex, 用户不必关注改属性
        className: 'td-row-operation-area', // TODO 这里统一会覆盖操作列的className
        render: (_: any, record: any, index: number) => {
          const menus = rowOperations.menus(record, index).filter((i) => {
            return typeof i.visible === 'function'
              ? i.visible(record) !== false
              : i.visible !== false;
          }); // 提前过滤
          if (!Array.isArray(menus) || menus.length === 0) {
            return;
          }
          const rowOperationsMore = parseInt(rowOperations.showMore, 10) + 1;
          const showMenu =
            menus.length === rowOperationsMore
              ? menus.slice(0, rowOperationsMore)
              : menus.slice(0, rowOperations.showMore);
          const menuItems = menus.slice(rowOperations.showMore).map((menu) => {
            return (
              <Menu.Item key={menu.key}>
                <RenderItem menu={menu} record={record} index={index} />
              </Menu.Item>
            );
          });
          return (
            <>
              {showMenu.map((menu) => {
                return (
                  <RenderItem
                    key={menu.key}
                    menu={menu}
                    record={record}
                    index={index}
                  />
                );
              })}
              {menus.length > rowOperationsMore && (
                <Dropdown
                  arrow
                  overlay={
                    <Menu className="core-form-row-menu">{menuItems}</Menu>
                  }
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    更多
                    <i
                      className="iconfont spicon-zhankai"
                      style={{ fontSize: 14, marginLeft: 6 }}
                    />
                  </a>
                </Dropdown>
              )}
            </>
          );
        },
      };
};
