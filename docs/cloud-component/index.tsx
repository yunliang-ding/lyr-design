import React from 'react';
import { CloudComponent } from 'react-core-form';
import './index.less';

export default () => {
  return (
    <CloudComponent
      initialComponent={[
        {
          componentName: 'App',
          less: `.app{}`,
          props: {},
          react: `export default (props) => {
  return 'App'
}`,
        },
      ]}
      onAdd={async (code) => {
        console.log(code);
        await new Promise((res) => setTimeout(res, 1000));
        return Math.random();
      }}
      onSave={async (codes, code) => {
        console.log(codes, code);
      }}
    />
  );
};
