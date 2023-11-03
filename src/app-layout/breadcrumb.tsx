import { Breadcrumb } from 'antd';

export default ({ breadcrumb }) => {
  return (
    <Breadcrumb>
      {breadcrumb?.map((item: any) => {
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};
