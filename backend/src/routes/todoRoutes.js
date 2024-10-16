// backend/src/routes/todoRoutes.js
const express = require('express');
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authenticate'); // 正確導入

const router = express.Router();

// 檢查 authenticate 的類型
console.log('Type of authenticate:', typeof authenticate); // 應該輸出 'function'

// 使用認證中間件
router.use(authenticate);

// 創建 Todo
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const owner = req.user.userId;

    const newTodo = new Todo({ title, owner });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 獲取 Todos
router.get('/', async (req, res) => {
  try {
    const owner = req.user.userId;
    const todos = await Todo.find({ owner });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 更新 Todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const owner = req.user.userId;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, owner },
      { title, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo 未找到' });
    }

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 刪除 Todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user.userId;

    const todo = await Todo.findOneAndDelete({ _id: id, owner });

    if (!todo) {
      return res.status(404).json({ message: 'Todo 未找到' });
    }

    res.json({ message: 'Todo 已刪除' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

module.exports = router; // 確保這裡是直接導出 router
