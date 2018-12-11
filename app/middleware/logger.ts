import { Context } from 'egg';

export default () => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (e) {
      if (e.name !== 'ValidationError') {
        ctx.logger.error(e);
      }
      ctx.body = {
        code: 0,
        message: e.message,
      };
    }
  };
};
