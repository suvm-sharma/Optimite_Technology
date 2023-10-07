const express = require('express');
const taskController = require('../controller/taskController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, taskController.createTask)
  .get(authController.protect, taskController.getAllTask);

router
  .route('/:id')
  .get(authController.protect, taskController.getTaskById)
  .patch(authController.protect, taskController.updateTask)
  .delete(authController.protect, taskController.deleteTask);

module.exports = router;
