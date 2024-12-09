const Joi = require('joi');
const TASK_CONSTANTS = require('../utils/constants');

const taskValidation = {
  createTask: Joi.object({
    title: Joi.string().required().max(100).trim(),
    description: Joi.string().trim(),
    status: Joi.string().valid(...Object.values(TASK_CONSTANTS.STATUS)),
    priority: Joi.string().valid(...Object.values(TASK_CONSTANTS.PRIORITY)).required(),
    dueDate: Joi.date().min('now')
  }),

  updateTask: Joi.object({
    title: Joi.string().max(100).trim(),
    description: Joi.string().trim(),
    status: Joi.string().valid(...Object.values(TASK_CONSTANTS.STATUS)),
    priority: Joi.string().valid(...Object.values(TASK_CONSTANTS.PRIORITY)),
    dueDate: Joi.date().min('now')
  })
};

module.exports = taskValidation;