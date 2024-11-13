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
    const sql = 'UPDATE userdata SET nickname = ? WHERE user_id = ?';  
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
    const sql = 'UPDATE userdata SET gender = ? WHERE user_id = ?';  
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
    const sql = 'UPDATE userdata SET age = ? WHERE user_id = ?';  
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
    const sql = 'UPDATE userdata SET school = ? WHERE user_id = ?';  
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
    const sql = 'UPDATE userdata SET description = ? WHERE user_id = ?';  
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
    const sql = 'UPDATE userdata SET password = ? WHERE user_id = ?';  
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

  const sql = 'SELECT * FROM userdata WHERE user_id = ?';

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