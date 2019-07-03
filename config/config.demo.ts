import { EggAppConfig, PowerPartial } from 'egg';
import { SqlLogger } from '../app/utils/sqlLogger';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: '',//192.168.0.9
        username: '',//pguser
        password: '',//icoastline@2019
        type: 'postgres',
        database: '',//
        schema: 'public',
        port: 5432,
        synchronize: true,
        logger: new SqlLogger(),
        entities: ['app/entity/**/*.js'],
    };

    // 各个服务url配置
    config.serviceUrl = {
        host: 'http:/'
    };

    return config;
};
