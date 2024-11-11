import fetch from 'node-fetch'; // 使用ESM的import语法


// 通过城市名获取城市经纬度
const getCoordinates = async (city, apiKey) => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    // const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('无法获取城市经纬度');
    const data = await response.json();
    if (data.length === 0) throw new Error('未找到城市');
    return { lat: data[0].lat, lon: data[0].lon };
};


// 通过经纬度获取天气信息
const getWeather = async (req, res) => {
  
    const city = req.query.city;
    console.log('Received city:', req.query.city);
    // const city = 'London';
    const apiKey = '5cc16852c9e6264f476dc3725f2bd846';
    console.log('Received request:', req.body);
    // 获取城市的经纬度
    const { lat, lon } = await getCoordinates(city, apiKey);

    if (!city) {
        return res.status(400).json({ success: false, message: '城市名称不能为空' });
    }

    try {
        // 使用获取的经纬度查询天气数据，包括天气描述、温度、湿度、风速等
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(404).json({ success: false, message: errorData.message });
        }

        const data = await response.json();
        const weatherInfo = {
            weather: data.weather[0].description,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            // 前端获取图标：<img src="{iconUrl}" alt="Weather icon">
        };

        res.json({ success: true, data: weatherInfo });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ success: false, message: '内部服务器错误' });
    }
};

const getTestMessage = (req, res) => {
  res.json({
    message: 'Success! This is a test response.',
    code: 200,
  });
};

export default {
    getWeather,
    getTestMessage
};
