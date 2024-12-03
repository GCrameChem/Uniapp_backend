// 这是测试控制器/控制器模板的路由文件。
import express from 'express';
const router = express.Router();
import contactController from '../controllers/contactController.js';


// 接口列表
router.post('/addContact', contactController.addContact);
router.post('/getAllContacts', contactController.getAllContacts);
router.post('/getContacts', contactController.getContacts);
router.put('/editContact', contactController.editContact);
router.delete('/deleteContact', contactController.deleteContact);





export default router;
