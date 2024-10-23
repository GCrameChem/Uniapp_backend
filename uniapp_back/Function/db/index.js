const express = require('express');
const { pool, executeQuery } = require('./dbconfig.js');
const app = express();

// Set up the server
app.use(express.json());

// Mock user credentials
const mockUsername = '123';
const mockPassword = '123';


// Route to insert a new record into the "login" table
app.post('/register', async (req, res) => {
  try {
    const { username, id, password } = req.body;
    // 改进:加一个判断用户名是否已经存在的逻辑，不能重复申请
    // 改进：区分大小写（这个小bug也可能是数据库的问题
    // const sql1 = 'SELECT username FROM userdata WHERE username = ?';
    // const result = await executeQuery(sql1, [username]);
    // if (result.length > 0) {
    //   return res.status(409).json({ message: 'Username already exists' });
    // }

    // const sql = 'INSERT INTO userdata (username, password) VALUES (?, ?)';
    // const result = await executeQuery(sql, [username, password]);

    const sql = 'INSERT INTO userdata (username, id, password) VALUES (?, ?, ?)';
    // 改进：为每个不同的用户自动分配id
    // 改进：哈希加密至少三次，并保证数据库中存储的是加密后的密码

    // 传递正确的值
    const result = await executeQuery(sql, [username, id, password]);

    res.send({
      message: 'Data inserted successfully',
      code: 200,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// mock login route，先前用于测试连接，之后如果有需要可以考虑改造一下变成一个公用最高权限的测试账号（后门·菜鸟版）
// app.post('/login1', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: '请输入完整信息' });
//     }

//     if (username === mockUsername && password === mockPassword) {
//         return res.status(200).json({ message: '登录成功', redirect: '/pages/home' });
//     } else {
//         return res.status(401).json({ message: '信息错误' });
//     }
// });

// 自定义测试 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 查询数据库，检查是否存在该用户名
        const sql = 'SELECT password FROM userdata WHERE username = ?';
        const result = await executeQuery(sql, [username]);

        if (result.length > 0) {
            const dbPassword = result[0].password;

            // 比较数据库中的密码与用户输入的密码
            if (dbPassword === password) {
                res.send({
                    message: 'Login successful',
                    code: 200,
                });
            } else {
                res.status(401).send({
                    message: 'Incorrect password',
                    code: 401,
                });
            }
        } else {
            res.status(404).send({
                message: 'User not found',
                code: 404,
            });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
});


// 管理员测试用，可查看数据库中存储的所有用户信息。
app.get('/get', async (req, res) => {
  try {
    // SQL query to select all records from the "userdata" table
    const sql = 'SELECT * FROM userdata';
    
    // Execute the query
    const result = await executeQuery(sql);

    res.send({
      result,
      code: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 端口监听
app.listen(3000, () => {
  console.log('Node service started on port 3000');
});
