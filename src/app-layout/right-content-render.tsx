import { Avatar, Dropdown, Space, Tooltip } from '@arco-design/web-react';
import {
  IconMoonFill,
  IconSettings,
  IconSunFill,
} from '@arco-design/web-react/icon';
import { Button } from '..';
import { RightProps } from './right.type';

export default ({
  avatarUrl,
  droplist,
  userName,
  extra,
  dark,
  onDarkChange,
  themeColor,
  layout,
  onSetting,
}: RightProps) => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {extra}
      <Space size={20}>
        {dark ? (
          <Tooltip content="点击切换亮色模式" position="bottom">
            <Button
              style={{
                borderRadius: 'var(--border-radius-circle)',
                padding: 0,
                height: 32,
                width: 32,
              }}
              onClick={() => {
                onDarkChange(false);
              }}
            >
              <IconSunFill />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip content="点击切换暗黑模式" position="bottom">
            <Button
              style={{
                borderRadius: 'var(--border-radius-circle)',
                padding: 0,
                height: 32,
                width: 32,
              }}
              onClick={() => {
                onDarkChange(true);
              }}
            >
              <IconMoonFill />
            </Button>
          </Tooltip>
        )}
        <Tooltip content="页面设置" position="bottom">
          <Button
            style={{
              borderRadius: 'var(--border-radius-circle)',
              padding: 0,
              height: 32,
              width: 32,
            }}
            drawerFormProps={{
              title: '页面设置',
              footer: false,
              onMount({ setFieldsValue }) {
                setFieldsValue({
                  themeColor,
                  layout,
                });
              },
              schema: [
                {
                  widget: 'ColorPicker',
                  label: '系统主题色',
                  name: 'themeColor',
                  props: {
                    onChange(v: string) {
                      onSetting({
                        themeColor: v,
                      });
                    },
                  },
                },
                {
                  widget: 'RadioGroup',
                  label: '布局风格',
                  name: 'layout',
                  props: {
                    type: 'button',
                    options: [
                      {
                        label: 'horizontal',
                        value: 'horizontal',
                      },
                      {
                        label: 'vertical',
                        value: 'vertical',
                      },
                      {
                        label: 'inline',
                        value: 'inline',
                      },
                    ],
                    onChange(v: string) {
                      onSetting({
                        layout: v,
                      });
                    },
                  },
                },
              ],
            }}
          >
            <IconSettings />
          </Button>
        </Tooltip>
        <Dropdown position="bottom" droplist={droplist}>
          <a
            style={{
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            <Avatar size={32} style={{ marginRight: 10 }}>
              <img alt="avatar" src={avatarUrl} />
            </Avatar>
            {userName}
          </a>
        </Dropdown>
      </Space>
    </div>
  );
};
