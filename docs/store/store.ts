import { create } from 'lyr-store';

export default create<{
  count: number;
  age: number;
}>({
  count: 1,
  age: 1,
});
