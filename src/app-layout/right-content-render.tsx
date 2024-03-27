import { Avatar, ColorPicker, Dropdown, Space } from '@arco-design/web-react';
import {
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
          <IconSunFill
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onDarkChange(false);
            }}
          />
        ) : (
          <IconMoonFill
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onDarkChange(true);
            }}
          />
        )}
        <IconInteraction
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onCompactChange(!compact);
          }}
        />
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
