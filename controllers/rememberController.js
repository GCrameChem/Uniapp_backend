import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery

// 使用当前时间戳和随机数来生成唯一的记录 id
function generateUniqueId() {
    const timestamp = Date.now(); // 获取当前时间戳
    const randomNum = Math.floor(Math.random() * 1000000); // 生成一个六位的随机数
    return `rec_${timestamp}_${randomNum}`; // 返回组合后的唯一 id
}

// 获取备忘录列表
const getMemos = async (req, res) => {
  try {
    const { user_id } = req.body;
    //const query = 'SELECT * FROM reminders WHERE user_id = ? ORDER BY is_completed ASC, reminder_time ASC';
    const query = 'SELECT * FROM reminders WHERE user_id = ? ';//ORDER BY is_completed ASC'; 
    const memos = await executeQuery(query, [user_id]);

    //测试能否通过
    const resultsList = memos.length > 0
    ? memos.map(record => ({
        reminder_id: record.reminder_id,
        user_id: record.user_id,  
        reminder_content: record.reminder_content,      
        reminder_time: record.reminder_time,
        is_completed: record.is_completed,
        edittime: record.editime
    }))
    : [];

  // 返回记录数据
  return res.status(200).json({
    code: 200,
    memos: resultsList,
  });

    res.status(200).json({ memos });
  } catch (err) {
    res.status(500).json({ message: '获取备忘录失败', error: err.message });
  }
};

// 保存备忘录
const saveMemo = async (req, res) => {
  try {
    const { user_id, reminder_content, reminder_time, is_completed, editime } = req.body;
    const reminderId = generateUniqueId(); // 生成唯一 ID
    const query = 'INSERT INTO reminders (reminder_id, user_id, reminder_content, reminder_time, is_completed, editime) VALUES (?, ?, ?, ?, ?, ?)';
    await executeQuery(query, [reminderId, user_id, reminder_content, reminder_time, is_completed, editime]);

    res.status(200).json({ message: '备忘录保存成功' });
  } catch (err) {
    console.error(err); // 打印错误
    res.status(500).json({ message: '保存备忘录失败', error: err.message });
  }
};

// 更新备忘录状态
const updateMemo = async (req, res) => {
  try {
    const { reminder_id, is_completed } = req.body;
    const query = 'UPDATE reminders SET is_completed = ? WHERE reminder_id = ?';
    const result = await executeQuery(query, [ is_completed, reminder_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '备忘录未找到' });
    }
    res.status(200).json({ message: '备忘录状态更新成功' });
  } catch (err) {
    res.status(500).json({ message: '更新备忘录失败', error: err.message });
  }
};

// 删除备忘录
const deleteMemo = async (req, res) => {
  try {
    const {reminder_id } = req.body;
    const query = 'DELETE FROM reminders WHERE reminder_id = ?';
    const result = await executeQuery(query, [reminder_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '备忘录未找到' });
    }
    res.status(200).json({ message: '备忘录删除成功' });
  } catch (err) {
    res.status(500).json({ message: '删除备忘录失败', error: err.message });
  }
};

export default { 
    getMemos, 
    saveMemo,
    updateMemo,
    deleteMemo,
};