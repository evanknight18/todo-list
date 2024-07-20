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
    required: true
  },
  dueDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  subtasks: [
    {
      name: String,
      completed: Boolean
    }
  ]
});

module.exports = mongoose.model('Task', TaskSchema);
