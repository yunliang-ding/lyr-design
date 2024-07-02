import {
  IconApps,
  IconCommon,
  IconLanguage,
  IconUser,
  IconThunderbolt,
  IconSkin,
} from '@arco-design/web-react/icon';

export default [
  {
    icon: <IconApps />,
    label: '工作台',
    path: '/workbench',
    children: [
      {
        icon: <IconCommon />,
        path: '/workbench/my',
        label: '我的工作台',
      },
    ],
  },
  {
    icon: <IconLanguage />,
    label: '用户管理',
    path: '/user',
    children: [
      {
        icon: <IconUser />,
        label: '用户列表',
        path: '/user/list',
        children: [
          {
            icon: <IconUser />,
            label: '子用户列表',
            path: '/user/list/sub-list',
          },
          {
            icon: <IconUser />,
            label: '添加子管理',
            path: '/user/list/sub-add',
          },
        ],
      },
    ],
  },
  {
    icon: <IconThunderbolt />,
    label: '字典管理',
    path: '/dict',
    children: [
      {
        icon: <IconSkin />,
        path: '/dict/list',
        label: '字典列表',
      },
    ],
  },
];
