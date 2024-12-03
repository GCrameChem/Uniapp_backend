// 课程表编辑的实现
import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery


// 这是课表控制器文件，用于处理课表相关的操作。
import { v4 as uuidv4 } from 'uuid';

// 添加课程信息
// const addClass = async (req, res) => {
//     try {
//         const {
//             user_id,
//             classname,
//             teacher_name,
//             classtime,
//             start_week,
//             end_week,
//             weekday,
//             location,
//         } = req.body;
//         console.log('Received login request:', req.body);
//         const timetable_id = uuidv4();

//         const sql = `
//             INSERT INTO timetable (
//                 timetable_id, user_id, classname, teacher_name, classtime, 
//                 start_week, end_week, weekday, location
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         const params = [
//             timetable_id,
//             user_id,
//             classname,
//             teacher_name,
//             classtime,
//             start_week,
//             end_week,
//             weekday,
//             location,
//         ];
//         const result = await executeQuery(sql,params)

//         res.status(201).json({
//             message: 'Class added successfully',
//             data: { timetable_id, user_id, classname, teacher_name, classtime, start_week, end_week, weekday, location },
//         });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to add class', error: err.message });
//     }
// };

// 获取课程表信息
const getTimetable = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('Received request:', req.body);
        const sql = `SELECT * FROM timetable WHERE user_id = ?`;
        const [records] = await executeQuery(sql, [userId]);

        res.status(200).json({ code: 200, classData: records });
    } catch (err) {
        res.status(500).json({ code: 500, message: 'Failed to retrieve records', error: err.message });
    }
};

// 删除课程信息
const deleteClass = async (req, res) => {
    try {
        const { userId, id } = req.body;

        const sql = `DELETE FROM timetable WHERE timetable_id = ? AND user_id = ?`;
        const result = await executeQuery(sql, [id, userId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ code: 200, message: 'Class deleted successfully' });
        } else {
            res.status(404).json({ code: 404, message: 'Class not found' });
        }
    } catch (err) {
        res.status(500).json({ code: 500, message: 'Failed to delete class', error: err.message });
    }
};

// 修改课程信息，如果课程原本不存在，则添加
const modifyClass = async (req, res) => {
  const { userId, originalId, newRecord } = req.body;
  console.log('Received login request:', req.body);
  if (!userId || !newRecord) {
    return res.status(400).json({ code: 400, message: '缺少必要参数' });
  }
  try {
    // 如果是修改逻辑，删除旧记录
    if (originalId) {
      await executeQuery('DELETE FROM timetable WHERE timetable_id = ? AND user_id = ?', [originalId, userId]);
    }

    // 为新记录生成唯一的 timetable_id
    const timetableId = uuidv4();
    // SQL，插入新记录
    const insertQuery = `
      INSERT INTO timetable 
      (timetable_id, user_id, classname, teacher_name, classtime, start_week, end_week, weekday, timetable_note, timetable_contact, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // 按前端传入的newRecord顺序进行赋值
    const { classname, teacher_name, classtime, start_week, end_week, weekday, timetable_note, timetable_contact, location } = newRecord;

    // 需要插入的数据，与SQL语句中的占位符一一对应
    await executeQuery(insertQuery, [
      timetableId, 
      userId, 
      classname, 
      teacher_name, 
      classtime, 
      start_week, 
      end_week, 
      weekday, 
      timetable_note, 
      timetable_contact, 
      location
    ]);

    res.status(200).json({ code: 200, message: '操作成功', timetableId });
  } catch (err) {
    console.error('Error modifying class:', err.message);
    res.status(500).json({ code: 500, message: 'Failed to modify the class!', error: err.message });
  }
};

// 导出控制器
export default {
    // addClass,
    getTimetable,
    deleteClass,
    modifyClass,
};
