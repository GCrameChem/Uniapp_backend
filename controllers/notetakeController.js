import { executeQuery } from '../config/dbconfig.js';

// function generateUniqueId() {
//   const timestamp = Date.now(); // 获取当前时间戳
//   const randomNum = Math.floor(Math.random() * 1000000); // 生成一个六位的随机数
//    return `rec_${timestamp}_${randomNum}`; // 返回组合后的唯一 id
// }

// 处理保存文本笔记的请求
// const saveTextNote = (req, res) => {
//   const { note_name, course_name, note_title, user_id, note_content } = req.body;

//   // 假设数据库的插入语句
//   const query = `
//     INSERT INTO note (note_name, course_name, note_title, user_id, note_content, edit_time)
//     VALUES (?, ?, ?, ?, ?, NOW())
//   `;
//   db.query(query, [note_name, course_name, note_title, user_id, note_content], (err, result) => {
//     if (err) {
//       console.error('保存文本笔记失败:', err);
//       return res.status(500).json({ message: '保存失败' });
//     }
//     res.status(200).json({ message: '笔记保存成功', noteId: result.insertId });
//   });
// };
// const saveTextNote = async (req, res) => {
//   const { note_name, course_name, note_title, user_id, note_content } = req.body;
//   //const note_id = generateUniqueId();
//   // 确保所有必需字段都有提供
//   if (!note_name || !course_name || !note_title || !user_id || !note_content) {
//     return res.status(400).json({ message: '所有字段都是必需的' });
//   }
//   const query = `
//     INSERT INTO note (note_name, course_name, note_title, user_id, note_content, edit_time)
//     VALUES (?, ?, ?, ?, ?,NOW())
//   `;
//   try {
//     const [result] = await executeQuery(query, [note_name, course_name, note_title, user_id, note_content]);
//     res.status(200).json({ message: '笔记保存成功'});
//   } catch (err) {
//     console.error('保存文本笔记失败:', err);
//     res.status(500).json({ message: '保存失败', error: err.message });
//   }
// };

//保存新笔记
const saveTextNote = async (req, res) => {
  const { note_name, course_name, note_title, user_id, note_content } = req.body;
  // 确保所有必需字段都有提供
  if (!note_name || !course_name || !note_title || !user_id || !note_content) {
    return res.status(400).json({ message: '所有字段都是必需的' });
  }
  const query = `
    INSERT INTO note (note_name, course_name, note_title, user_id, note_content, edit_time)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  try {
    // 执行数据库查询
    const result = await executeQuery(query, [note_name, course_name, note_title, user_id, note_content, edit_time]);
    // 如果没有找到记录，返回空列表
    const recordList = result.length > 0
    ? result.map(record => ({
      note_name: record.note_name,  
      course_name: record.course_name,      
      note_title: record.note_title,
      user_id: record.user_id,
      note_content: record.note_content, 
      edit_time: record.edit_time,
    }))
    : [];
// 返回记录数据
return res.status(200).json({
  code: 200,
  records: recordList,
});
    // // 打印返回结果，帮助调试
    // console.log('数据库操作返回:', result);
    // // 根据返回结果，判断操作是否成功（这里假设返回的 result 有影响行数等信息）
    // if (result && result.affectedRows > 0) {
    //   res.status(200).json({ message: '笔记保存成功' });
    // } else {
    //   // 如果没有影响行数，返回失败响应
    //   res.status(500).json({ message: '保存失败，未插入数据' });
    // }
  } catch (err) {
    // 捕获错误并打印详细错误信息
    console.error('保存文本笔记失败:', err);
    res.status(500).json({ message: '保存失败', error: err.message });
  }
};

//用笔记名称来搜索目标笔记
const searchNoteByName = async (req, res) => {
  const { note_name } = req.body;  // 从查询参数获取笔记名称
  if (!note_name) {
    return res.status(400).json({ message: '笔记名称是必需的' });
  }
  const query = `
    SELECT * FROM note
    WHERE note_name LIKE ?
  `;
  try {
    // 执行数据库查询，使用 LIKE 来模糊匹配笔记名称
    const result = await executeQuery(query, [`%${note_name}%`]);
    if (result.length === 0) {
      return res.status(404).json({ message: '未找到相关笔记' });
    }
    // 返回查询到的笔记数据
    const noteList = result.map(record => ({
      note_name: record.note_name,
      course_name: record.course_name,
      note_title: record.note_title,
      note_content: record.note_content,
      user_id: record.user_id,
      edit_time: record.edit_time
    }));
    return res.status(200).json({
      code: 200,
      notes: noteList,
    });
  } catch (err) {
    console.error('搜索笔记失败:', err);
    return res.status(500).json({ message: '搜索失败', error: err.message });
  }
};


//编辑笔记
const editNoteContent = async (req, res) => {
  const { course_name, note_title, note_content, edit_time, note_name, user_id} = req.body;
  // 确保所有必需字段都有提供
  if (!note_name || !course_name || !note_title || !user_id || !note_content || !edit_time) {
    return res.status(400).json({ message: '所有内容是必需的' });
  }
//用note_name和当前user_id来确定目标笔记
  const query = `
    UPDATE note
    SET course_name = ?, note_title = ?, note_content = ?, edit_time = ?
    WHERE note_name = ? AND user_id = ?
  `; 
  try {
    // 执行数据库查询
    const result = await executeQuery(query, [course_name, note_title, note_content, edit_time, note_name, user_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '未找到该笔记或用户权限不足' });
    }
    return res.status(200).json({
      code: 200,
      message: '笔记内容更新成功',
    });
  } catch (err) {
    console.error('编辑笔记失败:', err);
    return res.status(500).json({ message: '更新失败', error: err.message });
  }
};



// 使用默认导出
export default { 
  saveTextNote,
  searchNoteByName,
  editNoteContent
};
