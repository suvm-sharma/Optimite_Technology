const Task = require('../model/taskModel');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      task: req.body.task,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      createdBy: req.body.createdBy,
    });
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    let tasks = await Task.find({ createdBy: req.id });
    if (tasks.length < 1) {
      res.status(200).json({
        status: 'success',
        data: 'No task Created',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          tasks,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.id });

    if (!task || task.length < 1) {
      res.status(401).json({
        status: 'fail',
        message: 'Your are not Authorize for this Task !!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          task,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task || task.length < 1) {
      res.status(401).json({
        status: 'fail',
        message: 'Your are not Authorize for this Task !!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          task,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.id,
    });

    if (!task) {
      res.status(401).json({
        status: 'fail',
        message: 'Your are not Authorize for this Task !!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
