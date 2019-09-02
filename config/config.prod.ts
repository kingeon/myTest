import { EggAppConfig, PowerPartial } from 'egg';
import { MyLogger } from '../app/utils/sqlLogger';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: '',//10.0.64.17
        username: '',//admin
        password: '',//icoastline@2018
        type: 'postgres',
        database: '',//
        port: 5432,
        synchronize: true,
        logger: new MyLogger(),
        entities: ['app/entity/**/*.js'],
    };

    // 各个服务url配置
    config.serviceUrl = {
        host: 'http:/'
    };

    return config;
};
