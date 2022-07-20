const data: any = [];
for (let i = 1; i < 1001; i++) {
  data.push({
    id: i,
    username: '用户姓名' + i,
    sex: '性别' + i,
    city: '城市' + i,
    sign: '签名' + i,
    classify: '职业' + i,
    score: '分数' + i,
    logins: '登录次数' + i,
  });
}
export default {
  '/api/demo/table/user': async ({ params }) => {
    const { pageSize, pageNum } = params;
    // 解析分页
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    return {
      success: true,
      total: 1000,
      list,
    };
  },
};
