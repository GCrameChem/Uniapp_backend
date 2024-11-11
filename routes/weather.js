// 天气查询路由文件

import express from 'express';
const router = express.Router();
import weatherController from '../controllers/weatherController.js';

// 定义获取天气信息的路由
router.get('/city', weatherController.getWeather);
// url：http://localhost:3000/weather/city?city=Chengdu

// 请求体格式参考
// const city = "London"; // 目标城市
// fetch(`http://your-server-domain/api/weather/${encodeURIComponent(city)}`)
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             console.log("天气情况:", data.data.weather);
//             console.log("温度:", data.data.temperature);
//             console.log("湿度:", data.data.humidity);
//             console.log("风速:", data.data.windSpeed);
//         } else {
//             console.error("获取天气失败:", data.message);
//         }
//     })
//     .catch(error => console.error("请求错误:", error));



// 测试连接
router.get('/test', weatherController.getTestMessage);

// 导出路由
export default router;
