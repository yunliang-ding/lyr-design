import React from 'react';
import { useStore } from 'react-core-form-store';
import { store } from './store';

export default () => {
  const { count } = useStore(store);
  console.log('demo2 render...');
  return (
    <div>
      {count}
      <button
        onClick={async () => {
          store.count += 1;
        }}
      >
        添加count
      </button>
    </div>
  );
};
