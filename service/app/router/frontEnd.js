// 前台路由文件
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/frontEnd/index', controller.frontEnd.home.index);
  router.get('/frontEnd/getTypeInfo', controller.frontEnd.home.getTypeInfo);
  router.get('/frontEnd/getArticleList', controller.frontEnd.home.getArticleList);
  router.get('/frontEnd/getArticleById/:id', controller.frontEnd.home.getArticleById);
  router.get('/frontEnd/getArticleListByTypeId/:id', controller.frontEnd.home.getArticleListByTypeId);
};
