// 天气数据控制器

import fetch from 'node-fetch'; // 使用ESM的import语法

const getWeather = async (req, res) => {
    const city = req.query.city;
    const apiKey = '5cc16852c9e6264f476dc3725f2bd846'; 

    if (!city) {
        return res.status(400).json({ success: false, message: '城市名称不能为空' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(404).json({ success: false, message: errorData.message });
        }

        const data = await response.json();
        res.json({ success: true, weather: data });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ success: false, message: '内部服务器错误' });
    }
};

export default { 
    getWeather,
 };

// 简单的测试代码，每个控制器都可以使用
// exports.getTestMessage = (req, res) => {
//   res.json({
//     message: 'Success! This is a test response.',
//     code: 200,
//   });
// };
