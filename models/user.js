const Base = require('./base');
const router = require('../routes');

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'user'){
    super(props);
  }
}

// 做一个判断，判断需要查的是那个表;new User(表名)     ？以什么为判断条件？


module.exports = new User();