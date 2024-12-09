const Task = require('../models/task.model');
const { buildTaskQuery, buildSortOptions } = require('../utils/query-builder');
const { getPaginationParams } = require('../utils/pagination');

const taskService = {
  async createTask(taskData) {
    return Task.create(taskData);
  },

  async getAllTasks(queryParams) {
    const { page, limit, skip } = getPaginationParams(queryParams);
    const query = buildTaskQuery(queryParams);
    const sort = buildSortOptions(queryParams.sort);

    const [tasks, total] = await Promise.all([
      Task.find(query).sort(sort).skip(skip).limit(limit),
      Task.countDocuments(query)
    ]);

    return {
      tasks,
      page,
      totalPages: Math.ceil(total / limit),
      total
    };
  },

  async getTaskById(id) {
    return Task.findOne({ _id: id, isDeleted: false });
  },

  async updateTask(id, updateData) {
    return Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    );
  },

  async deleteTask(id) {
    return Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  }
};

module.exports = taskService;