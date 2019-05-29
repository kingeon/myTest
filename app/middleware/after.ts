//用于计算接口请求时间
module.exports = () => {
    return (ctx) => {
        const reqMS = new Date().getMilliseconds() - new Date(ctx.apiStart).getMilliseconds()
        const logInfo = `${ctx.request.method} : ${ctx.request.url} ${reqMS}ms`;
        if (reqMS > 3000) {
            ctx.app.getLogger('apiLogger').info(logInfo);
        } else {
            console.info(new Date(), logInfo);
        }
    };
};