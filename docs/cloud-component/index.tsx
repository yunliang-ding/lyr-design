import React from 'react';
import { CloudComponent } from 'react-core-form';
import { message } from 'antd';
import axios from '../axios';
import './index.less';

export default () => {
  const [initialComponent, setInitialComponent] = React.useState();
  const addOrUpdate = async (v) => {
    const {
      data: { code },
    } = await axios.post(v.id ? '/component/update' : '/component/add', {
      ...v,
      props: JSON.stringify(v.props),
      createTime: undefined,
      updateTime: undefined,
      open: undefined,
      selected: undefined,
    });
    if (code === 200) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
  };
  const list = async () => {
    const {
      data: {
        code,
        data: { data },
      },
    } = await axios('/component/list');
    setInitialComponent(
      code === 200
        ? data.map((i, index) => {
            return {
              ...i,
              open: index === 0,
              selected: index === 0,
              props: JSON.parse(i.props),
            };
          })
        : [],
    );
  };
  React.useEffect(() => {
    list();
  }, []);
  return initialComponent === undefined ? (
    <div style={{ padding: 20 }}>数据加载中...</div>
  ) : (
    <CloudComponent
      require={{
        'react-core-form': require('react-core-form'),
        'react-core-form-tools': require('react-core-form-tools'),
      }}
      onSave={addOrUpdate}
      initialComponent={initialComponent}
    />
  );
};
