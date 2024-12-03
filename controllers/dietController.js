import { executeQuery } from '../config/dbconfig.js'; // 引入 executeQuery

// 使用当前时间戳和随机数来生成唯一的记录 id
function generateDietUniqueId() {
    return 'diet-' + (new Date()).getTime() + Math.random().toString(36).substr(2, 9);
}

function generatePlanUniqueId() {
  return 'plan-' + (new Date()).getTime() + Math.random().toString(36).substr(2, 9);
}

// 获取记录的接口
const getRecords = async (req, res) => {
    try {
      const { userId, date } = req.body;

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

  try {
      // 如果 id 不为 none，表示是修改记录，则先删除旧的记录
      if (id !== "none") {
          await executeQuery(
              `DELETE FROM diet WHERE user_id = ? AND diet_id = ?`,
              [userId, id]
          );
      }

      // 生成新的记录 id
      const newRecordId = generateDietUniqueId();

      // 提取年份和月份
      const year = parseInt(date.split('-')[0], 10); // 提取年份并转为整数
      const month = parseInt(date.split('-')[1], 10); // 提取月份并转为整数

      // 插入新记录
      await executeQuery(
          `INSERT INTO diet (diet_id, user_id, year, month, date, number, food_item, sort) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [newRecordId, userId, year, month, date, quantity, remark, category]
      );

      // 返回成功信息
      return res.status(200).json({ code: 200, message: '记录添加成功' });
  } catch (error) {
      console.error('添加记录时出错:', error);
      return res.status(500).json({ code: 500, message: '服务器错误' });
  }
};

// 获取计划的接口
const getPlans = async (req, res) => {
  try {
    const { userId, month } = req.body;

    // 验证参数
    if (!userId || !month) {
      return res.status(400).json({ code: 400, message: 'Invalid parameters' });
    }

    // 转换日期格式
    const formattedMonth = new Date(month).toISOString().split('T')[0];  // Adjust if needed for your database's date format

    // 从 formattedMonth 提取年和月
    const year = parseInt(formattedMonth.split('-')[0], 10); // 提取年份并转为整数
    const monthNumber = parseInt(formattedMonth.split('-')[1], 10); // 提取月份并转为整数

    // 查询 dietplan 表中的计划
    const plans = await executeQuery(
      `SELECT * FROM dietplan WHERE user_id = ? AND year = ? AND month = ?`,
      [userId, year, monthNumber] // 查询月份
    );   

    // 如果没有找到计划，返回空列表
    const planList = plans.length > 0
      ? plans.map(plan => ({
          type: plan.category,  
          quantity: plan.quantity,      
          currentQuantity: plan.quantity,
          year: plan.year,
          month: plan.month,
          id: plan.plan_id,
          quantityRemaining: plan.quantity
      }))
      : [];

     // 查询 diet 表中的记录，计算剩余额度
     for (let plan of planList) {
      // 这里使用 await 等待异步查询完成
      const temps = await executeQuery(
        `SELECT * FROM diet WHERE user_id = ? AND year = ? AND month = ? AND sort = ?`,
        [userId, year, monthNumber, plan.type] // 查询月份
      );

      for (let temp of temps) {
        plan.quantityRemaining -= temp.number; // 更新剩余额度
      }

      // 修改dietplan表中quantity_remained的值
      await executeQuery(
        `UPDATE dietplan SET quantity_remained =? WHERE user_id = ? AND plan_id = ?`,
        [plan.quantityRemaining, userId, plan.id]
      );  

    }
    

    // 返回记录数据
    return res.status(200).json({
      code: 200,
      plans: planList,
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};

// 删除计划的接口
const deletePlan = async (req, res) => {
  const { userId, planId } = req.body;
  console.log(userId, planId);

  try {
      // 删除满足条件的记录
      const result = await executeQuery(
          `DELETE FROM dietplan WHERE user_id = ? AND plan_id = ?`,
          [userId, planId]
      );

      // 检查是否有记录被删除
      if (result.affectedRows > 0) {
          return res.status(200).json({ code: 200, message: '删除成功' });
      } else {
          return res.status(404).json({ code: 404, message: '未找到该计划' });
      }
  } catch (error) {
      console.error('删除计划时出错:', error);
      return res.status(500).json({ code: 500, message: '服务器错误' });
  }
};

const addPlan = async (req, res) => {
const { userId, id, date, quantity, category } = req.body;

try {
    // 如果 id 不为 none，表示是修改计划，则先删除旧的计划
    if (id !== "none") {
        await executeQuery(
            `DELETE FROM dietplan WHERE user_id = ? AND plan_id = ?`,
            [userId, id]
        );
    }

    // 生成新的记录 id
    const newPlanId = generatePlanUniqueId();

    // 转换日期格式
    const formattedDate = new Date(date).toISOString().split('T')[0];  // Adjust if needed for your database's date format

    // 从 formattedMonth 提取年和月
    const year = parseInt(formattedDate.split('-')[0], 10); // 提取年份并转为整数
    const month = parseInt(formattedDate.split('-')[1], 10); // 提取月份并转为整数

    // 插入新记录
    await executeQuery(
        `INSERT INTO dietplan (plan_id, user_id, year, month, quantity, category) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [newPlanId, userId, year, month, quantity, category]
    );

    // 返回成功信息
    return res.status(200).json({ code: 200, message: '计划添加成功' });
} catch (error) {
    console.error('添加计划时出错:', error);
    return res.status(500).json({ code: 500, message: '服务器错误' });
}
};

// 修改计划的接口
const editPlan = async (req, res) => {
  const { userId, id, quantity } = req.body;
  
  try {
    // 修改记录
    await executeQuery(
      `UPDATE dietplan  SET quantity = ?  WHERE plan_id = ? AND user_id = ?`,
      [quantity, id, userId]
    );  

      // 返回成功信息
      return res.status(200).json({ code: 200, message: '计划修改成功' });
  } catch (error) {
      console.error('修改计划时出错:', error);
      return res.status(500).json({ code: 500, message: '服务器错误' });
  }
  };

export default {
  getRecords,
  deleteRecord,
  addRecord,
  getPlans,
  deletePlan,
  addPlan,
  editPlan,
};