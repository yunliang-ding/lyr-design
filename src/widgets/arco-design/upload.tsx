import { Upload } from '@arco-design/web-react';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  return <Upload {...props} />;
};
