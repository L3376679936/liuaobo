// 引用用户模版数据
const User = require('../models/user.js');

const jwtToken = require('../utils/token')
// console.log(User)
const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function(req,res,next){
    // console.log(req.headers.authorization)
    let handleToken = jwtToken.decrypt(req.headers.authorization) || false
    console.log(handleToken)
    console.log(!handleToken)
    if(!handleToken){
      console.log('进来了')
      return res.send({
        message:'登录过期,请重新登录'
      })
      
    }
    try{
      let userData = await User.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = userController;
