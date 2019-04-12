import { EggAppConfig, PowerPartial } from 'egg';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: 'itest.icoastline.cn',
        username: 'owner',
        password: 'owner_1a2b3c',
        type: 'postgres',
        database: '',
        port: 5432,
        synchronize: true,
        entities: ['app/entity/**/*.ts'],
    };
    return config;
};
