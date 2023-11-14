import { CreateStore } from 'react-core-form-store';

export default CreateStore<{
  count: number;
  addCount(): void;
}>({
  count: 1,
  async addCount() {
    // await new Promise(res => setTimeout(res, 1000))
    this.count += 1;
  },
});
