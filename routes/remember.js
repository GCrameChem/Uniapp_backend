// 这是测试控制器/控制器模板的路由文件。
import express from 'express';
const router = express.Router();
import rememberController from '../controllers/rememberController.js';


// 定义请求路由
router.get('/getMemos', rememberController.getMemos);
router.post('/saveMemo', rememberController.saveMemo);
router.put('/updateMemo', rememberController.updateMemo);
router.delete('/deleteMemo', rememberController.deleteMemo);



export default router;
