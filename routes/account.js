// 记账路由文件

import express from 'express';
const router = express.Router();
import accountController from '../controllers/accountController.js';


// 接口列表
router.post('/getRecords', accountController.getRecords);

router.post('/deleteRecord', accountController.deleteRecord);

router.post('/addRecord', accountController.addRecord);



export default router;