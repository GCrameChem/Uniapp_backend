// 处理登录与注册的控制器

import { executeQuery } from '../config/dbconfig.js';
import { v4 as uuidv4 } from 'uuid';

// 发送邮箱验证码所需依赖引入
// 使用 ES Module 语法导入模块
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
// import assert from 'http-assert';

// 创建SMTP连接
const transport = nodemailer.createTransport(smtpTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'tqq25172431@163.com', // 发件邮箱
    pass: 'MKdheYM746y4yfv8'  // 发件邮箱的SMTP授权码
  }
}));

// 生成6位验证码
const randomFns = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += parseInt(Math.random() * 10);  // 生成随机数
  }
  return code;
};

// 邮箱格式验证正则
const regEmail = /^([a-zA-Z0-9]+[||.]?)[a-zA-Z0-9]+@([a-zA-Z0-9]+[||.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/;

const getCaptcha = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('Received getCaptcha request:', req.body);

    // 验证邮箱格式
    if (!regEmail.test(email)) {
      return res.status(422).json({ message: '请输入正确的邮箱格式！' });
    }

    // 检查邮箱是否已注册
    const emailCheckSql = 'SELECT email FROM userdata WHERE email = ?';
    const emailResult = await executeQuery(emailCheckSql, [email]);

    if (emailResult.length > 0) {
      return res.status(409).json({ message: '邮箱已被注册' });
    }

    // 发送验证码
    const code = randomFns();
    transport.sendMail({
      from: 'tqq25172431@163.com',
      to: email,
      subject: '验证你的电子邮件',
      html: `<p>你好！</p>
             <p>您正在注册智慧伴学助手账号</p>
             <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
             <p>该验证码5分钟内有效</p>`
    }, async (error, data) => {
      if (error) {
        return res.status(500).json({ message: '发送验证码失败！' });
      }

      // 将验证码存入数据库
      const insertCodeSql = 'INSERT INTO code (email, veri_code) VALUES (?, ?)';
      await executeQuery(insertCodeSql, [email, code]);

      // 5分钟后删除验证码
      setTimeout(async () => {
        await executeQuery(deleteCodeSql, [email]);
      }, 5 * 60 * 1000);

      res.status(200).json({
        message: '验证码发送成功',
        code: 200
      });
    });
  } catch (error) {
    console.error('Error during getCaptcha:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, emailCode } = req.body;
    console.log('Received register request:', req.body);

    // 判断验证码是否正确
    const checkCodeSql = 'SELECT * FROM code WHERE email =? AND veri_code =?';
    const result = await executeQuery(checkCodeSql, [email, emailCode]);

    if(result.length == 0){
      return res.status(403).json({ message: '验证码不正确' });
    }

    // 分配userId，使用唯一标识符库
    const userId = uuidv4();
    const nickName = '默认昵称';
    const gender = '未知';
    const age = '未知';
    const school = '未知';
    const desc = '默认简介';

    const sql = 'INSERT INTO userdata (username, user_id, email, password, nickname, gender, age, school, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // 存储用户信息
    await executeQuery(sql, [username, userId, email, password, nickName, gender, age, school, desc]);

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
    const { username, email, password } = req.body;
    console.log('Received login request:', req.body);
    try {
        // 查询数据库，检查是否存在该用户
        const sql = 'SELECT password, user_id, nickname, gender, age, school, description FROM userdata WHERE username = ? AND email = ?';
        const result = await executeQuery(sql, [username, email]);

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
  getCaptcha,
  register,
  login,
  getAllUsers,
 };