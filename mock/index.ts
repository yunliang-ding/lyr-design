const data: any = [];
for (let i = 1; i < 1001; i++) {
  data.push({
    id: i,
    username: `用户姓名${i}`,
    sex: `${Math.random() > 0.5 ? '男' : '女'}`,
    city: `城市${i}`,
    sign: `签名${i}`,
    classify: `职业${i}`,
    score: Math.ceil(Math.random() * 100),
    logins: Math.ceil(Math.random() * 60),
  });
}

module.exports = {
  '/react-core-form/table': async (req: any, res: any) => {
    await new Promise((r) => setTimeout(r, 500, true));
    const {
      query: { pageSize, pageNum },
    } = req;
    // 解析分页
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.send({
      success: true,
      total: 1000,
      list,
    });
  },
};
