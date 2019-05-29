//用于计算接口请求时间
module.exports = () => {
    return (ctx) => {
        console.log('before middleware => 1');
        ctx.apiStart = new Date();
    };
};