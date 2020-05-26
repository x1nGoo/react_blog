const ipUrl = 'http://127.0.0.1:7001/frontEnd'

const servicePath = {
  // 获取文章分类
  getTypeInfo: `${ipUrl}/getTypeInfo`,
  // 获取所有列表
  getArticleList: `${ipUrl}/getArticleList`,
  // 根据id获取详情
  getArticleById: `${ipUrl}/getArticleById/`,
  // 根据分类id获取列表
  getArticleListByTypeId: `${ipUrl}/getArticleListByTypeId/`,
}

export default servicePath