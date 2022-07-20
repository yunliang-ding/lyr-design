import mockServices from './mock';

export default {
  get: async (path, params) => {
    // 模拟等待800ms
    await new Promise((res) => setTimeout(res, 1000));
    return {
      data: await mockServices[path](params),
    };
  },
};
