import { EggAppConfig, PowerPartial } from 'egg';
import { MyLogger } from '../app/utils/sqlLogger';
export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.postgres = {
        host: '192.168.2.179',
        username: 'postgres',
        password: '1qaz2wsx#EDC',
        type: 'postgres',
        database: 'postgres',
        port: 5432,
        synchronize: true,
        logger: new MyLogger(),
        entities: ['app/entity/**/*.ts'],
    };

    return config;
};
