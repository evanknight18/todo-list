// backend/models/Task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    default: 'low'
  },
  dueDate: {
    type: Date
  },
  notes: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  subtasks: [
    {
      name: String,
      completed: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = mongoose.model('Task', TaskSchema);
