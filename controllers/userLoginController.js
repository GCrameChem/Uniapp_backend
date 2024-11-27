// 处理登录与注册的控制器

import { executeQuery } from '../config/dbconfig.js';
import { v4 as uuidv4 } from 'uuid';


const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request:', req.body);

    // 分配userId，使用唯一标识符库
    const userId = uuidv4();
    const nickName = '默认昵称';
    const gender = '未知';
    const age = '未知';
    const school = '未知';
    const desc = '默认简介';
    // 改进:加一个判断用户名是否已经存在的逻辑，不能重复申请
    // 改进：区分大小写（这个小bug也可能是数据库的问题
    // const sql1 = 'SELECT username FROM userdata WHERE username = ?';
    // const result = await executeQuery(sql1, [username]);
    // if (result.length > 0) {
    //   return res.status(409).json({ message: 'Username already exists' });
    // }

    // const sql = 'INSERT INTO userdata (username, password) VALUES (?, ?)';
    // const result = await executeQuery(sql, [username, password]);

    const sql = 'INSERT INTO userdata (username, user_id, password, nickname, gender, age, school, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    // 改进：为每个不同的用户自动分配id
    // 改进：哈希加密至少三次，并保证数据库中存储的是加密后的密码

    // 传递正确的值
    const result = await executeQuery(sql, [username, userId, password, nickName, gender, age, school, desc]);

    res.send({
      message: 'Data inserted successfully',
      data: {  
        userId: userId,  
        // 可以添加其他需要返回给前端的字段  
      }, 
      code: 200,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', req.body);
    try {
        // 查询数据库，检查是否存在该用户名
        const sql = 'SELECT password, user_id, nickname, gender, age, school, description FROM userdata WHERE username = ?';
        const result = await executeQuery(sql, [username]);

        if (result.length > 0) {
            const dbPassword = result[0].password;
            const userId = result[0].user_id;  // 获取userId
            const nickname = result[0].nickname;
            const gender = result[0].gender;
            const age = result[0].age;
            const school = result[0].school;
            const desc = result[0].desc;

            // 比较数据库中的密码与用户输入的密码
            if (dbPassword === password) {
                res.send({
                    message: 'Login successful',
                    data: {  
                      userId: userId,  
                      nickname: nickname,
                      gender: gender,
                      age: age,
                      school: school,
                      desc: desc,
                      // 可以添加其他需要返回给前端的字段  
                    }, 
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
};

// Get all users (for admin testing)
const getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM userdata';
    const result = await executeQuery(sql);

    res.send({
      result,
      code: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default { 
  register,
  login,
  getAllUsers,
 };