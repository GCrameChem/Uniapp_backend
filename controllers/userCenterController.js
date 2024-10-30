// 个人中心控制器
import { executeQuery } from '../config/dbconfig.js';


const updateNickName = async (req, res) => {
  const { userId, nickName } = req.body;

  // Validate input
  if (!userId || !nickName) {
    return res.status(400).json({ error: 'userId and nickName are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET nickname = ? WHERE id = ?';  
    const result = await executeQuery(sql, [nickName, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Nickname updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGender = async (req, res) => {
  const { userId, gender } = req.body;

  // Validate input
  if (!userId || !gender) {
    return res.status(400).json({ error: 'userId and gender are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET gender = ? WHERE id = ?';  
    const result = await executeQuery(sql, [gender, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Gender updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAge = async (req, res) => {
  const { userId, age } = req.body;

  // Validate input
  if (!userId || !age) {
    return res.status(400).json({ error: 'userId and age are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET age = ? WHERE id = ?';  
    const result = await executeQuery(sql, [age, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Age updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSchool = async (req, res) => {
  const { userId, school } = req.body;

  // Validate input
  if (!userId || !school) {
    return res.status(400).json({ error: 'userId and school are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET school = ? WHERE id = ?';  
    const result = await executeQuery(sql, [school, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'School updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDesc =  async (req, res) => {
  const { userId, desc } = req.body;

  // Validate input
  if (!userId || !desc) {
    return res.status(400).json({ error: 'userId and description are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET description = ? WHERE id = ?';  
    const result = await executeQuery(sql, [desc, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Desc updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePassword = async (req, res) => {
  const { userId, password } = req.body;

  // Validate input
  if (!userId || !password) {
    return res.status(400).json({ error: 'userId and desc are required' });
  }

  try {
    // 构建 SQL 更新语句  
    const sql = 'UPDATE userdata SET password = ? WHERE id = ?';  
    const result = await executeQuery(sql, [password, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const persondata = async (req, res) => {
  const { userId } = req.body;

  const sql = 'SELECT * FROM userdata WHERE id = ?';

  try {
      const result = await executeQuery(sql, [userId]); // 执行查询
      if (result.length > 0) {
        const userData = result[0]; // 假设返回的用户数据是数组，取第一个元素

        res.send({
          code: 200,
          data: {
            nickName: userData.nickname,
            desc: userData.description,
            gender: userData.gender,
            age: userData.age,
            school: userData.school
          },
        });
      } else {
        res.status(404).json({ code: 404, message: '用户不存在' });
      }
    } catch (error) {
      console.error('数据库查询错误:', error);
      res.status(500).json({ code: 500, message: '内部服务器错误' });
    }
};

// 导出所有函数
export default { 
  updateNickName,
  updateGender,
  updateAge,
  updateSchool,
  updateDesc,
  updatePassword,
  persondata,
 };

// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // 分配userId，使用唯一标识符库
//     const { v4: uuidv4 } = require('uuid');  
//     const userId = uuidv4();
//     const nickName = '默认昵称';
//     const gender = '未知';
//     const age = '未知';
//     const school = '未知';
//     const desc = '默认简介';
//     // 改进:加一个判断用户名是否已经存在的逻辑，不能重复申请
//     // 改进：区分大小写（这个小bug也可能是数据库的问题
//     // const sql1 = 'SELECT username FROM userdata WHERE username = ?';
//     // const result = await executeQuery(sql1, [username]);
//     // if (result.length > 0) {
//     //   return res.status(409).json({ message: 'Username already exists' });
//     // }

//     // const sql = 'INSERT INTO userdata (username, password) VALUES (?, ?)';
//     // const result = await executeQuery(sql, [username, password]);

//     const sql = 'INSERT INTO userdata (username, id, password, nickname, gender, age, school, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//     // 改进：为每个不同的用户自动分配id
//     // 改进：哈希加密至少三次，并保证数据库中存储的是加密后的密码

//     // 传递正确的值
//     const result = await executeQuery(sql, [username, userId, password, nickName, gender, age, school, desc]);

//     res.send({
//       message: 'Data inserted successfully',
//       data: {  
//         userId: userId,  
//         // 可以添加其他需要返回给前端的字段  
//       }, 
//       code: 200,
//     });
//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // mock login route，先前用于测试连接，之后如果有需要可以考虑改造一下变成一个公用最高权限的测试账号（后门·菜鸟版）
// // app.post('/login1', (req, res) => {
// //     const { username, password } = req.body;

// //     if (!username || !password) {
// //         return res.status(400).json({ message: '请输入完整信息' });
// //     }

// //     if (username === mockUsername && password === mockPassword) {
// //         return res.status(200).json({ message: '登录成功', redirect: '/pages/home' });
// //     } else {
// //         return res.status(401).json({ message: '信息错误' });
// //     }
// // });

// // 自定义测试 
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // 查询数据库，检查是否存在该用户名
//         const sql = 'SELECT password, id, nickname, gender, age, school, description FROM userdata WHERE username = ?';
//         const result = await executeQuery(sql, [username]);

//         if (result.length > 0) {
//             const dbPassword = result[0].password;
//             const userId = result[0].id;  // 获取userId
//             const nickname = result[0].nickname;
//             const gender = result[0].gender;
//             const age = result[0].age;
//             const school = result[0].school;
//             const desc = result[0].desc;

//             // 比较数据库中的密码与用户输入的密码
//             if (dbPassword === password) {
//                 res.send({
//                     message: 'Login successful',
//                     data: {  
//                       userId: userId,  
//                       nickname: nickname,
//                       gender: gender,
//                       age: age,
//                       school: school,
//                       desc: desc,
//                       // 可以添加其他需要返回给前端的字段  
//                     }, 
//                     code: 200,
//                 });
//             } else {
//                 res.status(401).send({
//                     message: 'Incorrect password',
//                     code: 401,
//                 });
//             }
//         } else {
//             res.status(404).send({
//                 message: 'User not found',
//                 code: 404,
//             });
//         }
//     } catch (error) {
//         console.error('Error querying database:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });