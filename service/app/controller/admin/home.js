'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const { userName, password } = this.ctx.request.body;
    const sql = `SELECT * FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length) {
      const openId = new Date().getTime();
      this.ctx.body = { data: openId, message: '登陆成功' };
    } else {
      this.ctx.body = { data: '', message: '用户名或密码错误' };
    }
  }

  // 文章分类
  async getTypeInfo() {
    const sql = 'SELECT * FROM type ORDER BY orderNum';
    // const res = await this.app.mysql.select('type');
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }
}

module.exports = HomeController;
