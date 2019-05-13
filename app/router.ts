import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators-v2';

export default (app: Application) => {
    let options = {
        prefix: '/',
        quickStart: false,
        swaggerOpt: {
            open: true,
            title: 'xxx接口文档',
            version: '1.0.0',
            host: '',
            port: 5555,
            basePath: '/xxx',
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
    if (app.env === 'local') {
        options.swaggerOpt.host = '127.0.0.1';
        options.swaggerOpt.port = 7001;
        options.swaggerOpt.basePath = '/';
    }
    EggShell(app, options);
};