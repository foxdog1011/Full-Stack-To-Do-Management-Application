const todoRepo = require('../repositories/todo.repo');

async function listTodos(userId, options = {}) {
  // service 層可能還會處理分頁、排序…，這裡簡化
  return await todoRepo.listByUser(userId, options);
}

module.exports = { listTodos };
