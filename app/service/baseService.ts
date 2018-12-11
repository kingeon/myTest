import { Service } from 'egg';

export default class BaseService extends Service {
    protected errorHandler(errors) {
        let message = '';
        for (const e of errors) {
            for (const k in e.constraints) {
                if (e.constraints.hasOwnProperty(k)) {
                    message += 'Error: ' + e.constraints[k] + ';   ';
                }
            }
        }
        return message;
    }
}
