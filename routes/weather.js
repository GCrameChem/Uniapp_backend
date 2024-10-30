// 天气查询路由文件

import express from 'express';
const router = express.Router();
import weatherController from '../controllers/weatherController.js';

// 定义获取天气信息的路由
router.get('/:city', weatherController.getWeather);

// 测试连接
// router.get('/test', weatherController.getTestMessage);

// 导出路由
export default router;



// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();

// app.use(cors()); // 允许跨域
// app.use(express.json());

// const apiKey = '5cc16852c9e6264f476dc3725f2bd846'; // OpenWeather API key

// // 定义 API 路由，RESTful 风格
// app.get('/api/weather', async (req, res) => {
//     const { city } = req.query; // 获取前端传来的城市参数
//     if (!city) {
//         return res.status(400).json({ message: 'City parameter is required' });
//     }
    
//     try {
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//         const response = await axios.get(apiUrl);
//         const data = response.data;

//         // 组织响应数据
//         const weatherInfo = {
//             city: data.name,
//             weather: data.weather[0].description,
//             humidity: data.main.humidity,
//             windSpeed: data.wind.speed
//         };

//         res.json(weatherInfo); // 返回 JSON 格式的响应数据
//     } catch (error) {
//         console.error('Error fetching weather data:', error.message);
//         res.status(500).json({ message: 'Failed to fetch weather data' });
//     }
// });



// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
