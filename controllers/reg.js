const knex = require("../models/knex");

// var jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  //   console.log(res)
  // 请求体是否包含有用户名和密码
  console.log(req)

  // knex.insert().into users (username,password) values("小王","snv")'

  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    // 获取用户名和密码
    let username = req.body.username;
    let password = req.body.password;

    knex
      .select()
      .from("users")
      .then((result) => {
        console.log(result);
        if (result.find((item) => item.username === username) == undefined) {
          knex("users")
            .insert({ username, password })
            .then((result) => {
              console.log(result);
              try {
                res.json({
                  code: 200,
                  message: "注册成功",
                });
              } catch (error) {
                res.json({ code: 0, message: "注册失败", data: error });
              }
            });
        }else{

            result.forEach((item) => {
              if (item.username === username) {
                return res.json({
                  code: 0,
                  message: "用户名已存在",
                });
              }
            });
        }
      });

    // 进数据库查询这个表所有的用户信息
    // knex.select().from('users').then(result=>{
    //     // console.dir(result)
    //     let user_Flag = true;

    //     let password_Flag = true;
    //     let token = null;

    //     for (var i of result){
    //         if (i.username === username){

    //             user_Flag = false;

    //             if (i.password === password){

    //                 password_Flag = false;

    //                 jwt.sign(username,'athuragasiyam',(err,token)=>{
    //                     if (err) throw err;
    //                     try {
    //                         res.json({
    //                             code: 200,
    //                             message: "登录成功",
    //                             token: token
    //                           })
    //                     } catch (error) {
    //                         res.json({ code: 0, message: "操作失败", data: error })
    //                     }

    //                 })

    //             }

    //         }

    //     }

    //     if (user_Flag){

    //         res.status(404).json('Invalid 用户名错误!');

    //     }else if(password_Flag){

    //         res.status(404).json('Incorrect 密码错误!')
    //     }

    // }).catch(err=>{

    //     res.send(err)

    // })
  } else {
    res
      .status(404)
      .json(
        "The Required Fields For Login Are : \n 1.username \n 2.password \n\t Please Enter All The Required Fields!"
      );
  }
};
