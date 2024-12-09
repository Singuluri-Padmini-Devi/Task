const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validateRequest = require('../middleware/validate');
const taskValidation = require('../validation/task.validation');

router.post('/', validateRequest(taskValidation.createTask), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateRequest(taskValidation.updateTask), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;