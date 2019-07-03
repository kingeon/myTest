import * as jwt from 'jsonwebtoken';
import { format } from 'date-fns';

export default function () {
    return async (ctx, next) => {
        if (!ctx.header['x-auth-token']) {
            ctx.status = 401;
            ctx.body = 'AUTHENTICATION_ERROR';
            return;
        }
        const token = ctx.header['x-auth-token'].split(';')[1];
        const data: any = await jwtVerify(token, ctx.app.config.jwtKey);
        if (data.error) {
            if (data.error.name === 'TokenExpiredError') {
                ctx.status = 401;
                ctx.body = 'TOKEN_EXPIRED';
            } else {
                ctx.status = 401;
                ctx.body = 'AUTHENTICATION_ERROR';
            }
            return;
        }
        ctx.userInfo = data.decoded as UserInfo;
        ctx.logger.info(format(new Date(), 'YYYY-MM/DD HH:mm:ss'), ctx.ip, ctx.method, ctx.url, 'userId:', data.decoded.userId, 'body:', ctx.body || '');
        await next();
    };
}


function jwtVerify(authorization, jwtKey) {
    return new Promise((resolve) => {
        jwt.verify(authorization, jwtKey, async (error, decoded) => {
            //JWT验证失败
            resolve({ error, decoded });
        });
    });
}


//  token 解析到的user模型
class UserInfo {
    accountId: string;
    name: string;
    phone: string;
    companyId: String;
}
