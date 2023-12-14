import { Button } from '@arco-design/web-react';
import React from 'react';
import store from './store';

export default () => {
  const { age } = store.use();
  console.log('demo1 render...');
  return (
    <div>
      {age}
      <Button
        onClick={async () => {
          store.age += 1;
        }}
      >
        添加age
      </Button>
    </div>
  );
};
