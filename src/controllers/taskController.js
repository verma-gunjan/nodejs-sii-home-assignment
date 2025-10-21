const { validationResult } = require('express-validator');
const { Task } = require('../models');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await task.update(req.body);
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};