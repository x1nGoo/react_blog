'use strict';

module.exports = options => {
  return async function adminauth(ctx, next) {
    console.log('ctx.session', ctx, options);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        code: 502,
        message: '请登陆后再操作',
        a: ctx,
        session: ctx.session,
      };
    }
  };
};
