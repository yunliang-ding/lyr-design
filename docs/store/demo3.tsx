import React from 'react';
import store from './store';

export default () => {
  const { age, count } = store.use();
  return <div>total: {age + count}</div>;
};
