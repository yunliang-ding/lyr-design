import {
  Avatar,
  ColorPicker,
  Dropdown,
  Space,
  Tooltip,
} from '@arco-design/web-react';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { RightProps } from './right.type';

export default ({
  dark,
  onDarkChange,
  themeColor,
  onThemeColorChange,
  avatarUrl,
  droplist,
  userName,
  extra,
}: RightProps) => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {extra}
      <Space size={20}>
        {dark ? (
          <Tooltip content="点击切换亮色模式" position="bottom">
            <div
              className="app-layout-header-right-dark-wrapper"
              onClick={() => {
                onDarkChange(false);
              }}
            >
              <IconSunFill />
            </div>
          </Tooltip>
        ) : (
          <Tooltip content="点击切换暗黑模式" position="bottom">
            <div
              className="app-layout-header-right-dark-wrapper"
              onClick={() => {
                onDarkChange(true);
              }}
            >
              <IconMoonFill />
            </div>
          </Tooltip>
        )}
        {onThemeColorChange && (
          <ColorPicker
            size="mini"
            defaultValue={themeColor}
            onChange={(newColor) => {
              onThemeColorChange(newColor);
            }}
          />
        )}
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
