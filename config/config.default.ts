import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

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

    config.qiniu = {
        accessKey: 'xgaU9mfEDNaX6uzmhdjcnHlitNW5GwADOTCuw8Yp',
        secretKey: 'ntkfSdxfwzGk5I_YKZ4dLd9RO-hXLbqtRHqgQ-ol',
        scope: 'app-content-test',
        host: 'http://test.qiniu.lcfc.gtscloud.cc/',
    };

    config.redis = {
        host: 'idev.icoastline.cn',
        post: 16379,
        password: '',
    };

    // 各个服务url配置
    config.serviceUrl = {
        commonUrl: 'http://ilcfc-gateway.icoastline.cn:5555/activiti-flow',
        ngStockUrl: 'http://ilcfc-gateway.icoastline.cn:5555/ngstock',
        iqcUrl: 'http://ilcfc-gateway.icoastline.cn:5555/iqc',
        accountUrl: 'http://itest-gateway.icoastline.cn:5555/account',
        emailUrl: 'http://itest-gateway.icoastline.cn:5555/notice/inner-api/v1/notice'
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
            '/open-api/'
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

