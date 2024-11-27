import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery

// 使用当前时间戳和随机数来生成唯一的记录 id
function generateUniqueId() {
    return 'diet-' + (new Date()).getTime() + Math.random().toString(36).substr(2, 9);
}

const getRecords = async (req, res) => {
    try {
      const { userId, date } = req.body;
      console.log(userId, date);

      // 验证参数
      if (!userId || !date) {
        return res.status(400).json({ code: 400, message: 'Invalid parameters' });
      }
  
      // 转换日期格式
      const formattedDate = new Date(date).toISOString().split('T')[0];  // Adjust if needed for your database's date format

      // 查询 diet 表中的记录
      const records = await executeQuery(
        `SELECT * FROM diet WHERE user_id = ? AND date LIKE ?`,
        [userId, `${formattedDate}%`] // 使用 LIKE 查询日期
      );
  
      // 如果没有找到记录，返回空列表
      const recordList = records.length > 0
        ? records.map(record => ({
            foodItem: record.food_item,  
            quantity: record.number,      
            foodCategory: record.sort,
            date: record.date,
            recordId: record.diet_id
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
    const { userId, recordId } = req.body;
    console.log(userId, recordId);

    try {
        // 删除满足条件的记录
        const result = await executeQuery(
            `DELETE FROM diet WHERE user_id = ? AND diet_id = ?`,
            [userId, recordId]
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

const addRecord = async (req, res) => {
  const { userId, id, mydate, date, remark, quantity, category } = req.body;

  console.log(quantity);
  let numericAmount = parseFloat(quantity);
  console.log(numericAmount);

  try {
      // 如果 id 不为 none，表示是修改记录，则先删除旧的记录
      if (id !== "none") {
          await executeQuery(
              `DELETE FROM diet WHERE user_id = ? AND diet_id = ?`,
              [userId, id]
          );
      }

      // 生成新的记录 id
      const newRecordId = generateUniqueId();

      // 插入新记录
      await executeQuery(
          `INSERT INTO diet (diet_id, user_id, date, number, food_item, sort) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [newRecordId, userId, date, numericAmount, remark, category]
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