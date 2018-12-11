import { createClient, RedisClient } from 'redis';
const REDIS = Symbol('Application#redis');

export default {
  get redis(): NRedisClient {
    if (!this[REDIS]) {
      const app = this as any;
      const redisConfig = app.config.redis;
      const client = createClient(redisConfig) as NRedisClient;

      client.setData = (key: string, value: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          client.set(key, value, (err, data) => {
            if (err) {
              reject(data);
            } else {
              resolve(data);
            }
          });
        });
      };

      client.getData = (key: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          client.get(key, (err, data) => {
            if (err) {
              reject(data);
            } else {
              resolve(data);
            }
          });
        });
      };

      client.setKeyEx = (key: string, seconds: number, value: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          client.setex(key, seconds, value, (err, data) => {
            if (err) {
              reject(data);
            } else {
              resolve(data);
            }
          });
        });
      };

      client.delKey = (key: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          client.del(key, (err, data) => {
            if (err) {
              reject(data);
            } else {
              resolve(data);
            }
          });
        });
      };

      this[REDIS] = client;
    }
    return this[REDIS];
  },

};

interface NRedisClient extends RedisClient {

  /**
   * 设置key值的相关value值
   *
   * @param {*} key key值
   * @param {*} value value值
   * @returns {Promise<any>}
   * @memberof NRedisClient
   */
  setData(key, value): Promise<any>;

  /**
   * 通过key值获取相关value值
   *
   * @param {*} key key值
   * @returns {Promise<any>}
   * @memberof NRedisClient
   */
  getData(key): Promise<any>;

  /**
   * 设置字段值并且具有过期时间(秒)
   *
   * @param {string} key 字段名称
   * @param {number} seconds 过期时间(秒)
   * @param {string} value 值
   * @returns {Promise<any>}
   * @memberof NRedisClient
   */
  setKeyEx(key: string, seconds: number, value: string): Promise<any>;

  /**
   * 删除一个存在的字段
   *
   * @param {string} key key值
   * @returns {Promise<any>} 删除的数量
   * @memberof NRedisClient
   */
  delKey(key: string): Promise<any>;
}
