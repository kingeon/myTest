import { EggAppConfig, PowerPartial } from 'egg';
import { SqlLogger } from '../app/utils/sqlLogger';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: '',//192.168.2.179
        username: '',//postgres
        password: '',//1qaz2wsx#EDC
        type: 'postgres',
        database: '',//
        port: 5432,
        synchronize: true,
        logger: new SqlLogger(),
        entities: ['app/entity/**/*.js'],
    };
    return config;
};
