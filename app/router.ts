import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
    EggShell(app, {
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
            tokenOpt: {
                default: 'manager',
                tokens: {
                    manager: '123',
                    user: '321',
                },
            }
        },
    });
};