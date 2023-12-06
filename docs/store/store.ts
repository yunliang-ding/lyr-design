import { CreateStore } from 'react-core-form-store';

export const store = CreateStore<{
  count: number;
  age: number;
}>({
  count: 1,
  age: 1,
});
