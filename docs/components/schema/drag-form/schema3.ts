import React from 'react';
import { SchemaProps, Button } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    key: '0001',
    type: 'Input',
    name: 'out',
    label: '外部元素1',
  },
  {
    key: '0002',
    type: 'Input',
    name: 'out',
    label: '外部元素2',
  },
  {
    key: '0003',
    type: 'Select',
    name: 'select',
    label: '外部元素3',
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    key: '0004',
    type: 'FormList',
    name: 'contactList',
    label: '联系人表单',
    required: true,
    span: 3,
    props: {
      label: '联系人',
      maxCount: 3, // 最多3条
      leastOne: true, // 至少一条
      column: 3, // 3列
      grid: {
        rowGap: 0,
        colGap: 20,
      },
    },
  },
];
export default schema;
