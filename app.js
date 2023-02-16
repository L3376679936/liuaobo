const createError = require('http-errors');
const logger = require('./logger')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const morgan = require('morgan')
// const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const regRouter = require('./routes/login');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// app.use(logger('dev'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/reg', regRouter);









// 捕捉404错误
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理、
const _errorHandler = (err, req, res, next) => {
  console.log('错误')
  // console.log(err.message,'这个是请求附带的提示')
  logger.error(`${req.method} ${req.originalUrl} ${err.status} ${err.message}`)
  const errorMsg = err.message || '出现问题，检查一下!'
  res.status(err.status || 500).json({
    code:-1,
    success:false,
    message:errorMsg,
    data:{}
  })
  // res.json({
  //   error: err.message
  // })
}
app.use(_errorHandler)

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
