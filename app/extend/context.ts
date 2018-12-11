import { Validator } from 'class-validator';
const VALIDATOR = Symbol('Context#validator');

export default {
  /**
   * 初始化Validator验证
   */
  get validator(): Validator {
    if (!this[VALIDATOR]) {
      this[VALIDATOR] = new Validator();
    }
    return this[VALIDATOR];
  },
  /**
   * 将UTC形式的Date对象转换为指定的东八区时间格式
   */
  convertUTCtoCCT(utcDate): string {
    const options = {
      timeZone: 'Asia/Shanghai',
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Intl.DateTimeFormat('zh', options).format(utcDate).replace(/-/g, '/');
  },
};


