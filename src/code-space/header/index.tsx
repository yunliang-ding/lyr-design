import './index.less';

const prefixCls = 'common-sider-header';

export default ({ title, actions = [] }) => {
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-title`} title={title}>
        {title}
      </div>
      <div className={`${prefixCls}-action`}>
        {actions.map((action) => {
          return (
            <i
              className={action.icon}
              onClick={action.onClick}
              title={action.title}
              key={action.title}
            />
          );
        })}
      </div>
    </div>
  );
};
