'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }

  // 文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " +
      // "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
      'article.view_count as view_count,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.typeId';
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }

  // 文章详情
  async getArticleById() {
    console.log('this.ctx', this.ctx);
    const id = this.ctx.params.id;
    const sql =
      'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      'article.article_content as article_content, ' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " +
      'article.view_count as view_count, ' +
      'type.id as typeId, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.typeId ' +
      'WHERE article.id=' + id;
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }

  // 文章分类
  async getTypeInfo() {
    const sql = 'SELECT * FROM type ORDER BY orderNum';
    // const res = await this.app.mysql.select('type');
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }

  // 根据类别ID 查询文章列表
  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " +
      'article.view_count as view_count,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.typeId ' +
      'WHERE article.type_id="' + id + '"';
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }
}

module.exports = HomeController;
