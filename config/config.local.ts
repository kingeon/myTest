import { EggAppConfig, PowerPartial } from 'egg';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: process.env.APPHost || 'itest.icoastline.cn',
        username: process.env.APPUserName || 'owner',
        password: process.env.APPPassword || 'owner_1a2b3c',
        type: 'postgres',
        database: 'lcfc-sorting',
        port: 5432,
        synchronize: true,
        entities: ['app/entity/**/*.ts'],
    };
    return config;
};
