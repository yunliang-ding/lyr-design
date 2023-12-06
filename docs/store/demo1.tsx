import React from 'react';
import { useStore } from 'react-core-form-store';
import { store } from './store';

export default () => {
  const { age } = useStore(store);
  console.log('demo1 render...');
  return (
    <div>
      {age}
      <button
        onClick={async () => {
          store.age += 1;
        }}
      >
        添加age
      </button>
    </div>
  );
};
