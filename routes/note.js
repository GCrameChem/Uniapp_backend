// //此代码能实现从前端接受一个字符串，一个数字（金额），一个时间
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// // 连接到MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', //这里换成你设置好的MongoDB数据库名
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // 数据模型
// const InputSchema = new mongoose.Schema({
//     inputData: String,
//     InputDate: Date,
//     InputNumber: Money,
// });

// const Input = mongoose.model('Input', InputSchema);




// // 中间件
// app.use(cors());
// app.use(bodyParser.json());




// // 路由
// app.post('/api/input', async (req, res) => {
//     const { inputData, inputDate, inputNumber } = req.body;// 接收新的 inputDate
//     const newInput = new Input({ inputData, InputDate ,InputNumber});
//     await newInput.save();
//     res.json(newInput);
// });

// app.get('/api/input', async (req, res) => {
//     const inputs = await Input.find();
//     res.json(inputs);
// });




// // 启动服务器
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
