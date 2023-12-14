import React from 'react';
import { Button } from '@arco-design/web-react';
import store from './store';

export default () => {
  const { count } = store.use();
  console.log('demo2 render...');
  return (
    <div>
      {count}
      <Button
        onClick={async () => {
          store.count += 1;
        }}
      >
        添加count
      </Button>
    </div>
  );
};
