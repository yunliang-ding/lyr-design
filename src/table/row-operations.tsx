/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Dropdown, Typography } from '@arco-design/web-react';
import Button from '@/button';
import { IconDown } from '@arco-design/web-react/icon';

export default ({ rowOperations = {}, tableInstance }: any) => {
  if (typeof rowOperations.menus !== 'function') {
    return false;
  }
  const RenderItem = ({ menu }: any) => {
    /** 扩展 modalFormProps、drawerFormProps 参数 */
    const { modalFormProps, drawerFormProps } = menu;
    if (typeof menu.modalFormProps === 'function') {
      menu.modalFormProps = async () => await modalFormProps(tableInstance);
    }
    if (typeof menu.drawerFormProps === 'function') {
      menu.drawerFormProps = async () => await drawerFormProps(tableInstance);
    }
    return (
      <Button
        type="text"
        {...menu}
        onClick={async () => {
          if (menu.disabled) {
            return;
          }
          if (typeof menu.onClick === 'function') {
            await menu.onClick(tableInstance);
          }
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
        ellipsis: false,
        className: rowOperations.className
          ? `${rowOperations.className} td-row-operation-area`
          : 'td-row-operation-area',
        render: (_: any, record: any, index: number) => {
          const menus = rowOperations.menus(record, index).filter((i) => {
            try {
              return typeof i.visible === 'function'
                ? i.visible(record) !== false
                : i.visible !== false;
            } catch (error) {
              console.log(error);
              return false;
            }
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
                <RenderItem menu={menu} index={index} />
              </Menu.Item>
            );
          });
          return (
            <>
              {showMenu.map((menu) => {
                return (
                  <RenderItem
                    key={menu.key || menu.label}
                    menu={menu}
                    index={index}
                  />
                );
              })}
              {menus.length > rowOperationsMore && (
                <Dropdown
                  droplist={
                    <Menu className="core-form-row-menu">{menuItems}</Menu>
                  }
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{ paddingLeft: 6 }}
                  >
                    <span style={{ marginRight: 4 }}>更多</span>
                    <IconDown />
                  </a>
                </Dropdown>
              )}
            </>
          );
        },
      };
};
