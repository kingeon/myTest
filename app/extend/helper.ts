import axios from 'axios';
import { IHelper } from 'egg';
import { createHmac } from 'crypto';
export default {
    /**
     * 利用AK/SK机制调用其他服务接口
     * @param this 
     * @param url 请求的url地址
     * @param method 请求方式
     * @param data 需要计算签名的数据
     * @param token 需要携带的token
     */
    async sendToService(this: IHelper, url: string, method: string, data?: any, token?: string): Promise<any> {
        const opt: any = {
            url,
            method,
            headers: {
                accessKey: this.app.config.AK, // 不管是什么请求方式,都需要带上AccessKey
            },
        };

        if (data) {
            opt.data = data;
            opt.headers.signature = this.getSignature(data); // 如果POST请求body(或GET请求query中含有数据,则需要计算签名
        }
        if (token) {
            opt.headers['X-Auth-Token'] = token;
        }
        const rs = await axios(opt);
        return rs.data;
    },

    // 根据数据获取签名
    getSignature(this: IHelper, data) {
        if (!data) {
            return '';
        }
        let stringToSign = '';
        if (Array.isArray(data)) {
            stringToSign = JSON.stringify(data);
        } else {
            for (const key of Object.keys(data).sort()) {
                const type = Object.prototype.toString.call(data[key]);
                if (type === '[object Object]' || type === '[object Array]') {
                    continue;
                }
                stringToSign += `${key}=${data[key]}&`;
            }
            stringToSign = stringToSign.slice(0, stringToSign.length - 1);
        }
        const SK = this.app.config.SK;
        const hmac = createHmac('md5', SK);
        hmac.update(stringToSign, 'utf8');
        return hmac.digest('hex').toUpperCase();
    },

};
