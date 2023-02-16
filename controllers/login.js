const knex = require('../models/knex');


var jwt = require('jsonwebtoken');

const jwtToken = require('../utils/token')

module.exports = (req,res)=>{
  console.log(res)
    // 请求体是否包含有用户名和密码
    // console.log(req.body)
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')){

        // 获取用户名和密码
        let username = req.body.username;
        let password = req.body.password;
        // 进数据库查询这个表所有的用户信息
        knex.select().from('users').then(result=>{
            // console.dir(result)
            let user_Flag = true;

            let password_Flag = true;
            let token = null;

            for (var i of result){
                if (i.username === username){

                    user_Flag = false;
                
                    if (i.password === password){

                        password_Flag = false;

                        jwt.sign(username,'athuragasiyam',(err,token)=>{
                            if (err) throw err;
                            // console.log(token)
                            try {
                                res.json({
                                    code: 200,
                                    message: "登录成功",
                                    token: jwtToken.encrypt({gadID:token},'1h')
                                  })
                            } catch (error) {
                                res.json({ code: 0, message: "登录失败", data: error })
                            }
  
                        })
                
                    }
                
                }
            
            }

            if (user_Flag){
                res.json({
                    code: 000000,
                    message: "用户名不存在，请注册！！",
                    // status:500
                  })
            
            }else if(password_Flag){

                res.json({
                    code: 000000,
                    message: "密码错误！",
                    // status:500
                  })
            }
        
        }).catch(err=>{

            res.send(err)

        })
    }else {
        res.status(404).json("The Required Fields For Login Are : \n 1.username \n 2.password \n\t Please Enter All The Required Fields!")
        
    }
};