const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title'],
  },
  description: {
    type: String,
    required: [true, 'A task must have a description '],
  },
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
