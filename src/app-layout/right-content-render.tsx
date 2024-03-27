import {
  Avatar,
  ColorPicker,
  Dropdown,
  Space,
  Tooltip,
} from '@arco-design/web-react';
import {
  IconLayout,
  IconInteraction,
  IconMoonFill,
  IconSunFill,
} from '@arco-design/web-react/icon';
import { ReactNode } from 'react';

export interface RightProps {
  dark?: boolean;
  compact?: boolean;
  userName?: string;
  droplist?: ReactNode;
  avatarUrl?: string;
  extra?: ReactNode;
  themeColor?: string;
  /** 切换主题色 */
  onThemeColorChange?: (color: string) => void;
  /** 切换布局 */
  onCompactChange?: (compact: boolean) => void;
  /** 切换主题 */
  onDarkChange?: (dark: boolean) => void;
}

export default ({
  dark,
  compact,
  onDarkChange,
  onCompactChange,
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
        {compact ? (
          <Tooltip content="切换布局" position="bottom">
            <div
              className="app-layout-header-right-dark-wrapper"
              onClick={() => {
                onCompactChange(false);
              }}
            >
              <IconInteraction style={{ fontSize: 14 }} strokeWidth={4} />
            </div>
          </Tooltip>
        ) : (
          <Tooltip content="切换布局" position="bottom">
            <div
              className="app-layout-header-right-dark-wrapper"
              onClick={() => {
                onCompactChange(true);
              }}
            >
              <IconLayout style={{ fontSize: 14 }} strokeWidth={4} />
            </div>
          </Tooltip>
        )}

        <ColorPicker
          size="mini"
          defaultValue={themeColor}
          onChange={(newColor) => {
            onThemeColorChange(newColor);
          }}
        />
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
