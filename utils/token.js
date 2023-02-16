/*
 * @Author: 
 * @Descripttion: token解密与加密
 * @version: 1.52
 * @Date: 2021-02-04 20:43:40
 */
const jwt = require('jsonwebtoken');	//引入jwt包

  /**
   * @name: 加密函数
   * @param {
   *    *data:  要加密的数据
   *    *time:  过期的时间
   * }
   * @return {*token:加密信息}
   */
  let encrypt = (data, time) => {
  return jwt.sign(data, 'token', { expiresIn: time });
}


  /**
   * @name: 解密函数
   * @param {*token:  要解密的token}
   * @return {
   *    *id:  用户id，便于其他接口使用
   *    *token: 用于作为判断token是否过期或者有效的标识
   * }
   */
  let decrypt = (token) => {

  try {
    let data = jwt.verify(token, 'token');
    return {
      gadID: data.gadID,
      token: true
    }
  } catch (err) {
    return {
      gadID: err,
      token: false
    }
  }
}

module.exports = {	//将这两个加密函数和解密函数导出去
  encrypt,
  decrypt
}
