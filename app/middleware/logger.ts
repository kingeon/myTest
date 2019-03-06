import { Context } from 'egg';

export default () => {
    return async (ctx: Context, next) => {
        try {
            await next();
        } catch (e) {
            if (e.name === 'ValidationError') {
                ctx.body = {
                    code: 0,
                    message: e.message,
                };
            }
            else if (e.name === 'UnprocessableEntityError') {//egg-validate插件校验错误
                ctx.logger.warn(e);
                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    message: e.message || '请求字段错误',
                    errors: e.errors || [],
                };
            } else {
                ctx.logger.error(e); // 严重错误以error的方式记录日志
                ctx.status = e.statusCode || 500; // http状态码返回500, 说明服务器内部出现严重错误
                ctx.body = {
                    code: e.code as string || 0, // 错误状态码(根据需求自己规定规则)
                    message: e.message as string || '', // 错误信息
                    errors: e.errors || '', // 错误原因(兼容egg参数校验抛出的错误)
                };
            }
        }
    };
};
