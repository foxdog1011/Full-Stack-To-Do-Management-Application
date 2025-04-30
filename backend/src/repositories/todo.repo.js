// 這裡通常連資料庫，但示範先隨便回傳
async function listByUser(userId) {
    // 真實情況可能是 TodoModel.find({ owner: userId }).lean();
    return [{ title: 'Real Todo' }];
  }
  
  module.exports = { listByUser };
  