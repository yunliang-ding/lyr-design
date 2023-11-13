import { SchemaProps } from 'react-core-form';
import { BigNumber } from 'react-core-form-tools';

const schema: SchemaProps[] = [
  {
    type: 'Select',
    label: '联系人类型',
    name: 'userType',
    required: true,
    props: {
      options: [
        {
          label: '联系人类型1',
          value: 1,
        },
        {
          label: '联系人类型2',
          value: 2,
        },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '收入总和(元)',
    name: 'totalAmount',
    disabled: true,
    extra: '子表单收入合计',
    effect: ['contactList.{{index}}.amount', 'contactList'],
    onEffect(name, { getFieldValue, setFieldsValue }) {
      const contactList = getFieldValue('contactList');
      const amount = contactList
        .filter((i) => !!i?.amount)
        .map((i) => i?.amount);
      if (Array.isArray(amount) && amount.length > 0) {
        setFieldsValue({
          totalAmount: BigNumber.add(...amount),
        });
      }
    },
  },
  {
    type: 'FormList',
    name: 'contactList',
    label: '联系人表单',
    required: true,
    span: 3,
    props: {
      label: '联系人',
      maxCount: 3, // 最多3条
      // operation: false, // 不可操作
      // readOnly: true // 只读
      // disabled: true // 禁用
      leastOne: true, // 至少一条
      grid: {
        gridStyle: {
          rowGap: 0,
          columnGap: 20,
        },
        column: 3,
      },
      schema: [
        {
          type: 'Input',
          name: 'name',
          label: '姓名',
          required: true,
        },
        {
          type: 'InputNumber',
          name: 'amount',
          label: '收入(元)',
          required: true,
          effect: ['contactList.{{index}}.name'],
          onEffect(name, { setSchemaByName }) {
            setSchemaByName(
              ['contactList', this.name.split('.')[1], 'amount'].join('.'),
              {
                label: '收入(元)-动态修改',
              },
            );
          },
          disabled({ getFieldValue }) {
            const name =
              getFieldValue('contactList')[this.name.split('.')[1]]?.name;
            return name === '' || name === undefined;
          },
        },
        {
          type: 'AsyncCheckGroup',
          name: 'liked',
          label: '爱好',
          required: true,
          tooltip: '和联系人类型关联',
          effect: ['userType'],
          effectClearField: true,
          props: {
            options: async ({ getFieldValue }) => {
              return [
                {
                  label: '听音乐',
                  value: 1,
                },
                {
                  label: '学习',
                  value: 2,
                },
                {
                  label: '跑步健身',
                  value: 3,
                },
                {
                  label: '陪客户吃饭',
                  value: 4,
                  disabled: getFieldValue('userType') === 1,
                },
              ];
            },
          },
        },
        {
          type: 'Select',
          name: 'sex',
          label: '性别',
          required: true,
          props: {
            options: [
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              },
            ],
          },
        },
        {
          type: 'Input',
          name: 'age',
          label: '年龄',
          required: true,
          effect: ['contactList.{{index}}.sex'],
          visible({ contactList }) {
            return contactList[this.name.split('.')[1]]?.sex === 1;
          },
        },
      ],
    },
  },
];
export default schema;
