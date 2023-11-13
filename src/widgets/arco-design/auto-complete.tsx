import { AutoComplete } from '@arco-design/web-react';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  return <AutoComplete {...props} />;
};
