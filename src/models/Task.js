const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { User } = require('./User');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = {
  Task: model('Tasks', taskSchema),
};
