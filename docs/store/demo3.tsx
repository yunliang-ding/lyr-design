import React from 'react';
import store from './store';

export default () => {
  const { age, count } = store.use();
  return <div style={{ marginTop: 8 }}>total: {age + count}</div>;
};
