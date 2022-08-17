import { Upload } from 'antd';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  return <Upload {...props} />;
};
