import FilterColumns from './filter-columns';
import {
  Space,
  Dropdown,
  Menu,
  Tooltip,
  Divider,
} from '@arco-design/web-react';
import Button from '@/button';
import { IconDown, IconRefresh } from '@arco-design/web-react/icon';

export default ({
  title = '',
  filterIds = [], // 过滤的字段
  columns = [], // 全部的列
  tools = [], // 顶部工具栏
  onFilter = () => {}, // filter回调
  onRefresh = () => {}, // refresh
  onSearch = () => {}, // search
  setColumns = () => {},
  size = 'default',
  tableId,
  tableInstance,
}: any) => {
  const handelClick = async (tool: any) => {
    if (tool.disabled) {
      return;
    }
    if (tool.type === 'Refresh') {
      onRefresh();
    }
    if (typeof tool.onClick === 'function') {
      await tool.onClick(tableInstance);
    }
  };
  const renderTool = (tool: any) => {
    const btnProps = {
      ...tool,
      key: tool.key || tool.label || tool.type,
      size,
      onClick: handelClick.bind(null, tool),
    };
    /** 扩展 modalFormProps, drawerFormProps 参数 */
    const { modalFormProps, drawerFormProps } = tool;
    if (typeof tool.modalFormProps === 'function') {
      tool.modalFormProps = async () => await modalFormProps(tableInstance);
    }
    if (typeof tool.drawerFormProps === 'function') {
      tool.drawerFormProps = async () => await drawerFormProps(tableInstance);
    }
    switch (tool.type) {
      case 'Refresh':
        return (
          <Tooltip position="top" content="刷新" key={tool.type}>
            <Button {...btnProps} type="default" icon={<IconRefresh />} />
          </Tooltip>
        );
      case 'FilterColumns':
        return (
          <FilterColumns
            key={tool.type}
            filterIds={filterIds}
            columns={columns}
            setColumns={setColumns}
            onOk={onFilter}
            size={size}
            tableId={tableId}
          />
        );
      case 'Render':
        return tool.render({
          onSearch, // 传递一个查询Api
        }); // 自定义渲染
      case 'Dropdown':
        return tool.menu?.length > 0 ? (
          <Dropdown
            disabled={tool.disabled}
            key={tool.type}
            droplist={
              <Menu
                onClick={(item) => {
                  handelClick(item);
                }}
              >
                {tool.menu?.map((item: any, index: number) => {
                  if (item.type === 'Divider') {
                    return (
                      <Divider key={item.key || index} style={{ margin: 0 }} />
                    );
                  }
                  return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
                })}
              </Menu>
            }
            trigger={tool.trigger || ['click']}
          >
            <Button
              size={size}
              type={tool.btnType || 'default'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {tool.label}
              <IconDown />
            </Button>
          </Dropdown>
        ) : null;
      default:
        return (
          <Button {...btnProps} type={tool.btnType || 'primary'}>
            {tool.label}
          </Button>
        );
    }
  };
  return (tools && tools.length > 0) || title ? (
    <div className="table-form-header">
      <div className="table-form-header-left">{title}</div>
      <div className="table-form-header-right">
        <Space>
          {tools.map((tool: any) => {
            return renderTool(tool);
          })}
        </Space>
      </div>
    </div>
  ) : null;
};
