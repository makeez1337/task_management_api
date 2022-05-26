const { Task } = require('../models');
const { ErrorHandler } = require('../errors');

class TaskService {
  create(userId, title, description, priority, dueDate) {
    return Task.create({ userId, title, description, priority, dueDate });
  }

  findById(taskId) {
    try {
    return Task.findById(taskId);
    } catch (e) {
      throw new ErrorHandler(e.message);
    }
  }

  findByIdAndUpdate(taskId, dataToUpdate) {
    return Task.findByIdAndUpdate(taskId, { ...dataToUpdate }, { new: true });
  }
}

module.exports = {
  taskService: new TaskService(),
};
