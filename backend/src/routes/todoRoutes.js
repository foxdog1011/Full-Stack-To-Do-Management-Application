// backend/src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Todo = require('../models/Todo');

router.post('/todos', auth, async (req, res) => {
  try {
    console.log('User ID:', req.user._id); // 输出用户ID，确保存在
    const todo = new Todo({
      user: req.user._id, // 使用 req.user._id 创建 Todo
      title: req.body.title,
      completed: req.body.completed
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error while saving Todo:', error);
    res.status(500).json({ error: error.message });
  }
});
router.get('/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/todos/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id }, // 确保更新的是属于该用户的待办事项
      { title, completed },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found or not authorized.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error updating Todo:', error);
    res.status(500).json({ error: error.message });
  }
});
router.delete('/todos/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found or not authorized.' });
    }

    res.status(200).json({ message: 'Todo deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Todo:', error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
