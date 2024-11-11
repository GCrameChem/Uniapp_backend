// 这是测试控制器/控制器模板的路由文件。
import express from 'express';
const router = express.Router();
import testController from '../controllers/testController.js';


// 定义 GET 请求路由
router.get('/test', testController.getTestMessage);





export default router;
