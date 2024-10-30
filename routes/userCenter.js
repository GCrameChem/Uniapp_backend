// 个人中心路由文件

import express from 'express';
// import { updateNickName } from '../controllers/userCenterController.js';
const router = express.Router();
import userCenterController from '../controllers/userCenterController.js';


// 接口列表
// router.post('/updateNickName', updateNickName);
router.post('/updateNickName', userCenterController.updateNickName);

router.post('/updateGender', userCenterController.updateGender);

router.post('/updateAge', userCenterController.updateAge);

router.post('/updateSchool', userCenterController.updateSchool);

router.post('/updateDesc', userCenterController.updateDesc);

router.post('/updatePassword', userCenterController.updatePassword);

router.post('/persondata', userCenterController.persondata);



export default router;
