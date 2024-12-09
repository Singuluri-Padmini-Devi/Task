const asyncHandler = require('express-async-handler');
const taskService = require('../services/task.service');

const taskController = {
  createTask: asyncHandler(async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  }),

  getAllTasks: asyncHandler(async (req, res) => {
    const result = await taskService.getAllTasks(req.query);
    res.json(result);
  }),

  getTaskById: asyncHandler(async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.json(task);
  }),

  updateTask: asyncHandler(async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.json(task);
  }),

  deleteTask: asyncHandler(async (req, res) => {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(204).send();
  })
};

module.exports = taskController;