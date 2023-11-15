import React from 'react';
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
    id: 39,
    icon: <IconApps />,
    name: '工作台',
    order: 1,
    path: '/workbench',
    delete: 0,
    children: [
      {
        id: 40,
        icon: <IconCommon />,
        name: '我的工作台',
        order: null,
        path: '/workbench/my',
        delete: 0,
        key: '/workbench/my',
        label: '我的工作台',
      },
    ],
    key: '/workbench',
    label: '工作台',
  },
  {
    id: 35,
    icon: <IconLanguage />,
    name: '用户管理',
    order: 5,
    path: '/user',
    delete: 0,
    children: [
      {
        id: 36,
        icon: <IconUser />,
        name: '用户列表',
        order: null,
        path: '/user/list',
        delete: 0,
        key: '/user/list',
        label: '用户列表',
      },
    ],
    key: '/user',
    label: '用户管理',
  },
  {
    id: 32,
    icon: <IconThunderbolt />,
    name: '字典管理',
    order: 10,
    path: '/dict',
    delete: 0,
    children: [
      {
        id: 33,
        icon: <IconSkin />,
        name: '字典列表',
        order: null,
        path: '/dict/list',
        delete: 0,
        key: '/dict/list',
        label: '字典列表',
      },
    ],
    key: '/dict',
    label: '字典管理',
  },
];
