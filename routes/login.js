var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  console.log(req,'routes/login')
  res.send('respond with a resource');
});

module.exports = router;
