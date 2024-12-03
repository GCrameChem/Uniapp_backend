// 这是测试控制器/控制器模板的路由文件。
import express from 'express';
const router = express.Router();
import timetableController from '../controllers/timetableController.js';


// 定义 请求路由

// router.post('/addClass', timetableController.addClass);

router.post('/getTimetable', timetableController.getTimetable);

router.delete('/deleteClass', timetableController.deleteClass);

router.post('/modifyClass', timetableController.modifyClass);

export default router;
