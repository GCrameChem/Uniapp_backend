import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery

// 使用当前时间戳和随机数来生成唯一的记录 id
function generateUniqueId() {
    const timestamp = Date.now(); // 获取当前时间戳
    const randomNum = Math.floor(Math.random() * 1000000); // 生成一个六位的随机数
    return `rec_${timestamp}_${randomNum}`; // 返回组合后的唯一 id
}

const getRecords = async (req, res) => {
    try {
      const { userId, date } = req.body;

      // 验证参数
      if (!userId || !date) {
        return res.status(400).json({ code: 400, message: 'Invalid parameters' });
      }
  
      // 转换日期格式
      const formattedDate = new Date(date).toISOString().split('T')[0];  // Adjust if needed for your database's date format
      console.log(formattedDate);

      // 查询 accountdata 表中的记录
      const records = await executeQuery(
        `SELECT * FROM accountdata WHERE userId = ? AND time LIKE ?`,
        [userId, `${formattedDate}%`] // 使用 LIKE 查询日期
      );
  
      // 如果没有找到记录，返回空列表
      const recordList = records.length > 0
        ? records.map(record => ({
            description: record.note,  
            amount: record.amount,      
            type: record.type 
        }))
        : [];
  
      // 返回记录数据
      return res.status(200).json({
        code: 200,
        records: recordList,
      });
    } catch (err) {
      console.error('Error fetching records:', err);
      return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
  };

// 删除记录的接口
const deleteRecord = async (req, res) => {
    const { userId, date, recordId } = req.body;

    try {
        // 删除满足条件的记录
        const result = await executeQuery(
            `DELETE FROM accountdata WHERE userId = ? AND time = ? AND id = ?`,
            [userId, date, recordId]
        );

        // 检查是否有记录被删除
        if (result.affectedRows > 0) {
            return res.status(200).json({ code: 200, message: '删除成功' });
        } else {
            return res.status(404).json({ code: 404, message: '未找到该记录' });
        }
    } catch (error) {
        console.error('删除记录时出错:', error);
        return res.status(500).json({ code: 500, message: '服务器错误' });
    }
};

// 添加或更新记录的接口
const addRecord = async (req, res) => {
    const { userId, id, mydate, date, remark, amount, type, category } = req.body;

    // 确定是支出类型还是收入类型
    const expenseType = type === 'expense' ? category : null;
    const incomeType = type === 'income' ? category : null;

    let numericAmount = parseFloat(amount);

    try {
        // 如果 id 不为 -1，表示是修改记录，则先删除旧的记录
        if (id !== -1) {
            await executeQuery(
                `DELETE FROM accountdata WHERE userId = ? AND time = ? AND id = ?`,
                [userId, mydate, id]
            );
        }

        // 生成新的记录 id
        const newRecordId = generateUniqueId();

        // 插入新记录
        await executeQuery(
            `INSERT INTO accountdata (id, userId, time, type, amount, note, expensetype, incometype) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [newRecordId, userId, date, type, numericAmount, remark, expenseType, incomeType]
        );

        // 返回成功信息
        return res.status(200).json({ code: 200, message: '记录添加成功' });
    } catch (error) {
        console.error('添加记录时出错:', error);
        return res.status(500).json({ code: 500, message: '服务器错误' });
    }
};

export default {
  getRecords,
  deleteRecord,
  addRecord,
};