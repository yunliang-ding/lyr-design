import { Breadcrumb } from '@arco-design/web-react';

export default ({ breadcrumb }) => {
  return (
    <Breadcrumb>
      {breadcrumb?.map((item: any, index: number) => {
        return (
          <Breadcrumb.Item>
            {index === 0 && (
              <Breadcrumb.Item style={{ marginRight: 8 }}>
                {item.icon}
              </Breadcrumb.Item>
            )}
            {item.breadcrumbName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
