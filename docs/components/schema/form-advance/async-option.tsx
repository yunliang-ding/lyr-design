import { Tag } from '@arco-design/web-react';
import React from 'react';
import { SchemaProps } from 'lyr-component';
import { isEmpty, uuid } from 'lyr-extra';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const schema: SchemaProps[] = [
  {
    type: 'DebounceSelect',
    name: 'level',
    label: '员工级别',
    props: {
      debounceTimeout: 1000, // 防抖时间
      fetchOptions: async (search: string, form) => {
        // 远程接口调用
        console.log(search, form);
        if (isEmpty(search)) {
          return [];
        }
        await sleep(1000);
        return [uuid(4), uuid(4), uuid(4)].map((item) => {
          return {
            label: [item, '级别'].join('-'),
            value: item,
          };
        });
      },
    },
  },
  {
    type: 'AsyncSelect',
    name: 'roles',
    label: '员工角色',
    props: {
      emptyDescription: '暂无数据请联系管理员添加',
      options: async (form) => {
        await sleep(500);
        return [];
      },
    },
  },
  {
    type: 'AsyncSelect',
    name: 'classify',
    label: '员工职位',
    props: {
      mode: 'multiple',
      showSearch: true,
      maxTagCount: 2,
      options: async (form) => {
        console.log('classify ->', form); // 可以拿到表单实例
        await sleep(500);
        return [
          {
            label: '前端',
            value: 0,
          },
          {
            label: '后端',
            value: 1,
          },
          {
            label: '产品经理',
            value: 2,
          },
          {
            label: '项目经理',
            value: 3,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncCheckGroup',
    name: 'liked',
    label: '员工爱好',
    props: {
      options: async (form) => {
        console.log('liked ->', form); // 可以拿到表单实例
        await sleep(500);
        return [
          {
            label: '游戏',
            value: 0,
          },
          {
            label: '篮球',
            value: 1,
          },
          {
            label: '游泳',
            value: 2,
          },
          {
            label: '卡牌',
            value: 3,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncRadioGroup',
    name: 'sex',
    label: '员工性别',
    props: {
      options: async (form) => {
        console.log('sex ->', form); // 可以拿到表单实例
        await sleep(500);
        return [
          {
            label: '男',
            value: 0,
          },
          {
            label: '女',
            value: 1,
          },
          {
            label: '未知',
            value: 2,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncTreeSelect',
    name: 'department',
    label: '员工所在部门',
    props: {
      options: async () => {
        await sleep(500);
        const options = [
          {
            title: '部门1',
            key: '0-0',
            children: [
              {
                title: '部门1-1',
                key: '0-0-1',
              },
              {
                title: '部门1-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '部门2',
            key: '0-1',
          },
        ];
        return options;
      },
    },
  },
  {
    type: 'AsyncCascader',
    name: 'position',
    label: '员工所在地',
    props: {
      initOptions: async (defaultValue) => {
        await sleep(500);
        const options = [
          {
            value: 'zhejiang',
            label: '浙江省',
            isLeaf: false,
          },
          {
            value: 'jiangsu',
            label: '江苏省',
            isLeaf: false,
          },
        ];
        if (defaultValue?.length > 0) {
          // 找父节点
          const parent: any = options.find((i) => i.value === defaultValue[0]);
          // 挂子节点
          parent.children = [
            {
              label: `${parent.label} Dynamic 1`,
              value: 'dynamic1',
              isLeaf: true,
            },
            {
              label: `${parent.label} Dynamic 2`,
              value: 'dynamic2',
              isLeaf: true,
            },
          ];
        }
        return options;
      },
      loadData: async ({ label }) => {
        await sleep(500);
        return [
          {
            label: `${label} Dynamic 1`,
            value: 'dynamic1',
            isLeaf: true,
          },
          {
            label: `${label} Dynamic 2`,
            value: 'dynamic2',
            isLeaf: true,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncRender',
    label: '已选择性别',
    effect: ['sex'],
    props: {
      spin: true, // 开启loading
      async render({ getFieldOption, getFieldValue }) {
        const options = await getFieldOption('sex');
        return (
          <Tag color="green">
            {options.find((i) => i.value === getFieldValue('sex'))?.label}
          </Tag>
        );
      },
    },
  },
  {
    type: 'AsyncRadioGroup',
    name: 'level-empty',
    label: '员工阶级',
    props: {
      options: async () => {
        await sleep(2000);
        return [];
      },
    },
  },
];
export default schema;
