import React from 'react';
import { useStore } from 'react-core-form-store';
import { store } from './store';

export default () => {
  const { age, count } = useStore(store);
  return <div>total: {age + count}</div>;
};
