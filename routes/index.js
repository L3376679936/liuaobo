var express = require('express');
var router = express.Router();
const login = require('../controllers/login');
const reg = require('../controllers/reg');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const userController = require('../controllers/user');

// 获取用户信息
router.get('/api/get_user', userController.showUser);
// router.post('/login', userController.showUser);
router.post('/api/login',login);
router.post('/api/reg',reg);



module.exports = router;
