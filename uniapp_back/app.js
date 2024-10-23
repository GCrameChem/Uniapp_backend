  // 启用跨域资源共享 (CORS)中间件，支持来自不同源（前端localhost:端口）请求.
  // 如后续对前端运行端口或使用的HTTP方法需要更新，请在这里进行修改,该中间件申明需要置于其他中间件和路由申明之前。

const cors = require('cors');
app.use(cors({
  // 允许前端来源
    origin: 'http://localhost:5173',
  // 允许的HTTP方法
    methods: ['GET', 'POST'], 
}));


// 其他中间件和路由声明
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./Function/index');
var usersRouter = require('./Function/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
