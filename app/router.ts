import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators-v2';
export default (app: Application) => {
    let options:any = {
        prefix: '/',
        quickStart: false,
        swaggerOpt: {
            open: true,
            title: 'xxx接口文档',
            version: '1.0.0',
            host: '127.0.0.1',
            port: 7001,
            basePath: '/',
            schemes: ['http'],
            paths: {
                outPath: './app/public/swagger/main.json',
                definitionPath: './app/public/swagger/definitions',
                swaggerPath: './app/public/swagger',
            },
            securityDefinitions: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "X-Auth-Token"
                },
            }
        },
    };
    if (app.config.env === 'test') {
        options.swaggerOpt.host = '';
        options.swaggerOpt.port = '';
        options.swaggerOpt.basePath = '';
    }
    //...any other env
    EggShell(app, options);
};