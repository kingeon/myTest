import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.postgres = {
        host: '192.168.2.179',
        username: 'postgres',
        password: '1qaz2wsx#EDC',
        type: 'postgres',
        database: 'postgres',
        port: 5432,
        synchronize: true,
        logger: new SqlLogger(),
        entities: ['app/entity/**/*.ts'],
    };

    // 日志名称配置
    config.logger = {
        dir: path.join(__dirname, '../app/public/logs/'),
        appLogName: 'dev.log',
        coreLogName: 'framework.log',
        agentLogName: 'agent.log',
        errorLogName: 'error.log',
        coreLogger: 'egg-schedule.log',
    };

    // 日志按天分割
    config.logrotator = {
        maxFileSize: 2 * 1024 * 1024 * 1024,
    };

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1540776367524_6331';
    config.AK = '9099789f7b9b4d5ab713e5232fb8f620';
    config.SK = '4E318E559B40BAD1B77C98B8E8BD18A1';

    config.jwtKey = '098f6bcd4621d373cade4e832627b4f6';

    // add your egg config in here
    config.middleware = ['logger', 'auth'];
    config.auth = {
        ignore: [
            '/open-api/',
            '/inner-api'
        ]
    };

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        }
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE,PATCH',
    }

    // add your special config in here
    // const bizConfig = {
    //   sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    // };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        // ...bizConfig,
    };
};

