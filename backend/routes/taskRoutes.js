// backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  const { name, priority, dueDate, subtasks } = req.body;
  try {
    const newTask = new Task({ user: req.user.id, name, priority, dueDate, subtasks });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all tasks for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, priority, dueDate, notes, completed, subtasks } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    task.name = name;
    task.priority = priority;
    task.dueDate = dueDate;
    task.notes = notes;
    task.completed = completed;
    task.subtasks = subtasks;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
