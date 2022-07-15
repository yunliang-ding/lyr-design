import { Input } from 'antd';

const Password = (props: any) => {
  // 渲染只读视图
  if (props.readOnly) {
    return <span className="ant-password-readonly">******</span>;
  }
  return <Input.Password {...props} />;
};
Password.displayName = 'Password';
export default Password;
