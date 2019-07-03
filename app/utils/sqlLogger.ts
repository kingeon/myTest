import { Logger } from 'typeorm';
const PlatformTools_1 = require('typeorm/platform/PlatformTools');
const fs = require('mz/fs');
import { format, differenceInDays } from 'date-fns';
export class SqlLogger implements Logger {
    private options: string | boolean | Array<string> | undefined = 'all';

    /**
     * Logging options
     * You can enable different types of logging in connection options
     * query - logs all queries.
     * error - logs all failed queries and errors.
     * schema - logs the schema build process.
     * warn - logs internal orm warnings.
     * info - logs internal orm informative messages.
     * log - logs internal orm log messages.
     * @param {*} options 【query,error,schema,warn,info,log】
     * @memberof MyCustomLogger
     */
    setOption(options?: string | boolean | Array<string>) {
        this.options = options;
    };

    logQuery(query: string, parameters?: any[] | undefined) {
        if (this.options === 'all' || this.options === true || (this.options instanceof Array && this.options.indexOf('query') !== -1)) {
            var sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
            this.write('[QUERY]: ' + sql);
        }
    };

    logQueryError(error: string, query: string, parameters?: any[] | undefined) {
        if (this.options === 'all' || this.options === true || (this.options instanceof Array && this.options.indexOf('error') !== -1)) {
            var sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
            this.write([
                '[FAILED QUERY]: ' + sql,
                '[QUERY ERROR]: ' + error
            ]);
        }
    };

    logQuerySlow(time: number, query: string, parameters?: any[] | undefined) {
        var sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
        this.write('[SLOW QUERY: ' + time + ' ms]: ' + sql);
    };

    logSchemaBuild(message: string) {
        if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('schema') !== -1)) {
            this.write(message);
        }
    };

    logMigration(message: string) {
        this.write(message);
    };

    log(level: 'log' | 'info' | 'warn', message: any) {
        switch (level) {
            case 'log':
                if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('log') !== -1))
                    this.write('[LOG]: ' + message);
                break;
            case 'info':
                if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('info') !== -1))
                    this.write('[INFO]: ' + message);
                break;
            case 'warn':
                if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('warn') !== -1))
                    this.write('[WARN]: ' + message);
                break;
        }
    };

    async write(strings) {
        strings = strings instanceof Array ? strings : [strings];
        var basePath = PlatformTools_1.PlatformTools.load('app-root-path').path;
        const path = basePath + '/app/public/logs/ormlogs.log';
        const exists = await fs.exists(path);
        if (exists) {
            const stats = await fs.stat(path);
            if (differenceInDays(new Date(), stats.birthtime) >= 7) {
                await fs.unlinkSync(path);
            }
        }

        strings = strings.map(function (str) { return '[' + format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ']' + str; });
        PlatformTools_1.PlatformTools.appendFileSync(path, strings.join('\r\n') + '\r\n');
    };

    stringifyParams(parameters) {
        try {
            return JSON.stringify(parameters);
        }
        catch (error) {
            return parameters;
        }
    };
}