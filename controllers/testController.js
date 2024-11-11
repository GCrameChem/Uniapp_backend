// 这是一个简单的控制器文件模板，也可用于基础连接的测试。

// 处理简单的 GET 请求
const getTestMessage = (req, res) => {
  console.log('Received login request:', req.body);
  res.json({
    message: 'Success! This is a test response.',
    code: 200,
  });
};


// 使用默认导出
export default { 
  getTestMessage, 
};