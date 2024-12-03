// 记账路由文件

import express from 'express';
const router = express.Router();
import dietController from '../controllers/dietController.js';


// 接口列表
router.post('/getRecords', dietController.getRecords);

router.post('/deleteRecord', dietController.deleteRecord);

router.post('/addRecord', dietController.addRecord);

router.post('/getPlans', dietController.getPlans);

router.post('/deletePlan', dietController.deletePlan);

router.post('/addPlan', dietController.addPlan);

router.post('/editPlan', dietController.editPlan);

export default router;
