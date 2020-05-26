// 后端路由文件
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 路由守卫 判断有没登陆
  const adminAuth = app.middleware.adminAuth();
  router.post('/admin/login', controller.admin.home.login);
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.home.getTypeInfo);
};
