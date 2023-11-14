import { Breadcrumb } from '@arco-design/web-react';

export default ({ breadcrumb }) => {
  return (
    <Breadcrumb>
      {breadcrumb?.map((item: any) => {
        return (
          <Breadcrumb.Item key={item.path}>
            {item.breadcrumbName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
