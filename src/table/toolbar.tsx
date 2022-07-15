import FilterColumns from './filter-columns';
import { Space, Dropdown, Menu, Tooltip } from 'antd';
import { Button } from '@/index';

export default ({
  title = '',
  filterIds = [], // 过滤的字段
  columns = [], // 全部的列
  tools = [], // 顶部工具栏
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toolsClick = (tool: any) => {}, // 顶部工具栏点击回调
  onFilter = () => {}, // filter回调
  onRefresh = () => {}, // refresh
  onSearch = () => {}, // search
  params,
  setColumns = () => {},
  size = 'default',
  onSizeChange = () => {},
  tableId,
}: any) => {
  // toolClick
  const handelClick = async (tool: any) => {
    if (tool.disabled) {
      return;
    }
    if (tool.type === 'Refresh') {
      onRefresh();
    }
    toolsClick({ ...tool }); // 外部回调
  };
  const renderTool = (tool: any) => {
    const btnProps = {
      ...tool,
      key: tool.key || tool.type,
      size,
      onClick: handelClick.bind(null, tool),
    };
    /** 扩展 modalFormProps、drawerFormProps 支持函数 */
    if (typeof tool.modalFormProps === 'function') {
      tool.modalFormProps = tool.modalFormProps({
        onSearch,
        onRefresh,
      });
    }
    if (typeof tool.drawerFormProps === 'function') {
      tool.drawerFormProps = tool.drawerFormProps({
        onSearch,
        onRefresh,
      });
    }
    switch (tool.type) {
      case 'Refresh':
        return (
          <Tooltip placement="topLeft" title={'刷新'}>
            <Button
              {...btnProps}
              type="default"
              icon={<i className="iconfont spicon-shuaxin" />}
            />
          </Tooltip>
        );
      case 'AdjustSize':
        return (
          <Dropdown
            disabled={tool.disabled}
            key={tool.type}
            arrow
            overlay={
              <Menu
                style={{ width: 80 }}
                selectedKeys={size}
                onClick={({ key }) => {
                  onSizeChange(key);
                }}
              >
                <Menu.Item key="default">默认</Menu.Item>
                <Menu.Item key="middle">中等</Menu.Item>
                <Menu.Item key="small">紧凑</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Tooltip placement="topLeft" title={'密度'}>
              <Button
                {...btnProps}
                type="default"
                icon={
                  <i
                    className="iconfont spicon-da-xiao"
                    style={{ fontSize: size === 'small' ? 10 : 14 }}
                  />
                }
              />
            </Tooltip>
          </Dropdown>
        );
      case 'FilterColumns':
        return (
          <FilterColumns
            key="filter-columns"
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
        return (
          <Dropdown
            disabled={tool.disabled}
            key={tool.key || tool.type}
            overlay={
              <Menu
                onClick={(item) => {
                  handelClick(item);
                }}
              >
                {tool.menu?.map((item: any, index: number) => {
                  if (item.type === 'Divider') {
                    return <Menu.Divider key={item.key || index} />;
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
              <i
                className="iconfont spicon-zhankai"
                style={{ fontSize: 12, marginLeft: 4 }}
              />
            </Button>
          </Dropdown>
        );
      default:
        return (
          <Button {...btnProps} type={tool.btnType || 'primary'}>
            {tool.label}
          </Button>
        );
    }
  };
  // 支持方案
  const _tools = [...tools];
  return _tools || _tools.length > 0 ? (
    <div className="table-form-header">
      <div className="table-form-header-left">{title}</div>
      <div className="table-form-header-right">
        <Space>
          {_tools.map((tool: any) => {
            return renderTool(tool);
          })}
        </Space>
      </div>
    </div>
  ) : null;
};
