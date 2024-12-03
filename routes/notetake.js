// 这是测试控制器/控制器模板的路由文件。
import express from 'express';
const router = express.Router();
import noteController from '../controllers/notetakeController.js';



router.post('/saveTextNote', noteController.saveTextNote);

// 处理语音笔记上传和转文字
//router.post('/saveVoiceNote', multer({ dest: './uploads/' }).single('audio'), noteController.saveVoiceNote);
router.post('/searchNoteByName', noteController.searchNoteByName);
router.post('/editNoteContent',noteController.editNoteContent)

export default router;
