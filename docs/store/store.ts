import { create } from 'react-core-form-store';

export const store = create<{
  count: number;
  age: number;
}>({
  count: 1,
  age: 1,
});
