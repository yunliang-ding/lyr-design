import { Space } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import Button from '@/button';

export default ({ actions = [], actionClick, validatorForm, form }) => {
  const [disabled, setDisabled]: any = useState(false); // 设置底部按钮禁用
  const [innerActions, setInnerActions] = useState(actions); // 设置操作
  useEffect(() => {
    setInnerActions(actions);
  }, [actions]);
  // 挂载到Form实例
  useEffect(() => {
    Object.assign(form, {
      setFooterDisabled: setDisabled,
      setFooterActions: setInnerActions,
    });
  }, []);
  if (!Array.isArray(innerActions)) {
    return null;
  }
  return (
    <Space>
      {innerActions
        .filter((i) => i.visible !== false) // 提前过滤
        .map((action: any) => {
          // 开启前置校验
          const options: any = {}; // 扩展属性
          if (action.validator) {
            // 添加前置校验
            options.onBeforeClick = async () => {
              await validatorForm();
            };
          }
          return (
            <Button
              disabled={disabled}
              key={action.label}
              {...options}
              {...action}
              onClick={async () => {
                await actionClick(action);
              }}
            >
              {action.label}
            </Button>
          );
        })}
    </Space>
  );
};
