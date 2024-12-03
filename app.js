// 主服务器配置文件

// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
import cors from 'cors';
// 启用跨域资源共享 (CORS)中间件，支持来自不同源（前端localhost:端口）请求.
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

import { fileURLToPath } from 'url';
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！



// 本项目中其他路由在这里引入
// 此乃测试/模板路由声明
import testRoutes from './routes/test.js';

import timetableRoutes from './routes/timetable.js';
import userLoginRoutes from './routes/userLogin.js';
import userCenterRoutes from './routes/userCenter.js';
import weatherRoutes from './routes/weather.js';
import accountRoutes from './routes/account.js'; 
import contactRoutes from './routes/contact.js';
import rememberRoutes from './routes/remember.js';
import dietRoutes from './routes/diet.js';
import notetakeRoutes from './routes/notetake.js';
// 本项目中其他路由在这里引入



// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 设置视图引擎和视图目录
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！



// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
app.use(cors({
  // 允许前端来源
    origin: 'http://localhost:5173',
  // 允许的HTTP方法
  methods: ['GET', 'POST','PUT','DELETE'], 
  // 如后续对前端运行端口或使用的HTTP方法需要更新，请在这里进行修改,该中间件申明需要置于其他中间件和路由申明之前
  // WYH在11月19日试图加入PUT和DELETE
}));
app.use(logger('dev'));
app.use(express.json());
// 解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！
// ！！！！！！！！！！不要修改！！！！！！！！！！！！！




// 本项目中的路由在这里进行相关路径挂载
// 此乃测试路由挂载说明，进行接口测试时请使用 http://localhost:3000/test/test 进行测试
app.use('/test', testRoutes);

app.use('/timetable', timetableRoutes);
app.use('/userLogin', userLoginRoutes);
app.use('/userCenter', userCenterRoutes);
app.use('/weather', weatherRoutes);
app.use('/account',accountRoutes);
app.use('/contact', contactRoutes);
app.use('/remember',rememberRoutes);
app.use('/diet', dietRoutes);
app.use('/notetake', notetakeRoutes);
// 本项目中的路由在这里进行相关路径挂载



// catch 404 and forward to error handler
// 这玩意会报错 先禁用
//   app.use(function(req, res, next) {
//     next(createError(404));
//   });
// // error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    // console.log('Received login request:', req.body);
    res.status(500).render('error', { message: 'Internal Server Error' });
});


// 本项目使用端口3000 非必要暂不修改
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;