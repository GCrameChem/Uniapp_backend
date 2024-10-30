// // 用于实现天气功能

// const express = require('express');
// const { pool, executeQuery } = require('../dbconfig.js');
// const app = express();

// // Set up the server
// app.use(express.json());

// const apiKey = '5cc16852c9e6264f476dc3725f2bd846'; // OpenWeather API key
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// // api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY
// // api doc：https://openweathermap.org/api/one-call-3
// // FAQ: https://openweathermap.org/faq#onecall


// document.getElementById('search-btn').addEventListener('click', () => {
//     const city = document.getElementById('city-input').value;
//     getWeather(city);
// });

// async function getWeather(city) {
//     try {
//         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
//         const data = await response.json();
        
//         if (data.cod === '404') {
//             alert('城市未找到');
//             return;
//         }
        
//         displayWeather(data);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         alert('获取天气数据失败');
//     }
// }

// function displayWeather(data) {
//     document.getElementById('city-name').innerText = data.name;
//     document.getElementById('temperature').innerText = `温度: ${data.main.temp}℃`;
//     document.getElementById('description').innerText = `天气状况: ${data.weather[0].description}`;
//     document.getElementById('humidity').innerText = `湿度: ${data.main.humidity}%`;
//     document.getElementById('wind-speed').innerText = `风速: ${data.wind.speed} m/s`;
// }


