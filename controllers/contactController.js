import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery

function generateUniqueId() {
  const timestamp = Date.now(); // 获取当前时间戳
  const randomNum = Math.floor(Math.random() * 1000000); // 生成一个六位的随机数
   return `rec_${timestamp}_${randomNum}`; // 返回组合后的唯一 id
}

// 处理添加通讯录条目的请求
const addContact = async (req, res) => {
  const {user_id, name, gender, phone, job, grp, remark, email, QQnum} = req.body;
  // 简单的验证，确保必要字段不为空
  if (!name || !phone) {
    return res.status(400).json({
      message: 'Name and phone are required.', 
      code: 400,
    });
  }
  //尝试生成随机数来表示contact_id
  const contact_id = generateUniqueId();
  try {
    // SQL 插入语句
    const query = `
      INSERT INTO contacts (contact_id, user_id, name, gender, phone, job, grp, remark, email, QQnum)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [contact_id, user_id, name, gender, phone, job, grp, remark, email, QQnum];
    // 执行插入操作
    const result = await executeQuery(query, values);


    const resultsList = result.length > 0
    ? result.map(record => ({
        contact_id: record.contact_id, 
        user_id: record.user_id,      
        name: record.name,
        gender: record.gender,
        phone: record.phone, 
        job: record.job,
        grp : record.grp,
        remark: record.remark,
        email: record.email,
        QQnum: record.QQnum
    }))
    : [];

  // 返回记录数据
  return res.status(200).json({
    code: 200,
    result: resultsList,
  });





    // const newContact = result.rows[0]; // 获取返回的新增联系人数据
    // return res.status(201).json({
    //   message: 'Contact added successfully.',
    //   data: newContact,
    //   code: 201,
    // });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error adding contact.',
      code: 500,
    });
  }
};

//处理获取所有通讯录条目的请求
const getContacts = async (req, res) => {
  const { name } = req.body;  // 从查询参数中获取姓名
  if (!name) {
    return res.status(400).json({
      message: 'Name is required for search.',
      code: 400,
    });
  }
  try {
    // 使用 SQL 查询语句根据姓名进行筛选
    const query = 'SELECT * FROM contacts WHERE LOWER(name) LIKE LOWER(?);'
    const values = [`%${name}%`];  // 使用 % 来进行模糊查询
    const result = await executeQuery(query, values);
    // if (result.rows.length == 0) {
    //   return res.status(404).json({
    //     message: 'No contacts found with that name.',
    //     code: 404,
    //   });
    // }
    // return res.json({
    //   message: 'Success!',
    //   data: result.rows, // 返回查询到的联系人数据
    //   code: 200,
    // });


    // 如果没有找到记录，返回空列表
    const resultsList = result.length > 0
    ? result.map(record => ({
        contact_id: record.contact_id,
        user_id: record.user_id,      
        name: record.name,
        gender: record.gender,
        phone: record.phone, 
        job: record.job,
        grp : record.grp,
        remark: record.remark,
        email: record.email,
        QQnum: record.QQnum
    }))
    : [];

  // 返回记录数据
  return res.status(200).json({
    code: 200,
    result: resultsList,
  });




  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching contacts.',
      code: 500,
    });
  }
};

// 处理编辑通讯录条目的请求
const editContact = async (req, res) => {
  const { name, gender, phone, job, grp, remark, email, QQnum, contact_id } = req.body;
  try {
    // SQL 更新语句
    const query = `
      UPDATE contacts
      SET name = COALESCE(?, name),
          gender = COALESCE(?, gender),
          phone = COALESCE(?, phone),
          job = COALESCE(?, job),
          grp = COALESCE(?, grp),
          remark = COALESCE(?, remark),
          email = COALESCE(?, email),
          QQnum = COALESCE(?, QQnum)
      WHERE contact_id = ?
    `;
    const values = [name, gender, phone, job, grp, remark, email, QQnum, contact_id];

    // 执行更新操作
    const result = await executeQuery(query, values);

    // 检查受影响的行数
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Contact not found now.',
        code: 404,
      });
    }

    // 如果有行被更新，执行 SELECT 查询来获取更新后的联系人信息
    const selectQuery = 'SELECT * FROM contacts WHERE contact_id = ?';
    const selectResult = await executeQuery(selectQuery, [contact_id]);

    // 如果找不到联系人数据，返回错误
    if (selectResult.length === 0) {
      return res.status(404).json({
        message: 'Contact not found yet.',
        code: 404,
      });
    }

    // 返回更新后的联系人数据
    const updatedContact = selectResult[0];
    return res.json({
      message: 'Contact updated successfully.',
      data: updatedContact,
      code: 200,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error updating contact.',
      code: 500,
    });
  }
};



// 处理删除通讯录条目的请求
const deleteContact = async (req, res) => {
  const { contact_id } = req.body;
  try {
    // SQL 删除语句
    const query = 'DELETE FROM contacts WHERE contact_id = ? ;';
    const result = await executeQuery(query, [contact_id]);
    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     message: 'Contact not found.',
    //     code: 404,
    //   });
    // }
    return res.json({
      message: 'Contact deleted successfully.',
      code: 200,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error deleting contact.',
      code: 500,
    });
  }
};

// 导出控制器方法
export default {
  addContact,
  getContacts,
  editContact,
  deleteContact,
};
