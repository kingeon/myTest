import { Controller } from 'egg';

export class BaseController extends Controller {
    /**
     * 请求json返回
     * @param {*} data 返回json数据
     * @param {number} [status=200] http请求状态 默认200
     */
    json(data: any, status: number = 200) {
        this.ctx.status = status;
        this.ctx.body = {
            data
        };
    }
    /**
     * 请求成功返回
     *
     * @param {*} data 返回成功数据
     * @param {number} [code=1] 返回成功代码 默认1表示请求正确
     * @param {number} [status=200] http请求状态 默认200
     * @memberof BaseController
     */
    success(data: any, code: number = 1, status: number = 200) {
        this.ctx.status = status;
        this.ctx.body = {
            code,
            data,
        };
    }

    /**
     * 请求错误返回
     *
     * @param {*} message 返回错误提示
     * @param {number} [code=0] 返回错误代码 默认0表示请求错误
     * @param {number} [status=200] http请求状态 默认200
     * @memberof BaseController
     */
    error(message: string, code: number = 0, status: number = 200) {
        this.ctx.status = status;
        this.ctx.body = {
            code,
            message,
        };
    }

    /**
     * 请求资源未找到
     *
     * @param {*} message 错误提示信息
     * @memberof BaseController
     */
    notFound(message) {
        this.ctx.throw(404, message || 'not found');
    }
};
