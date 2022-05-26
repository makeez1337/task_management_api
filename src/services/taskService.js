const { Task } = require('../models');

class TaskService {
  create(userId, title, description, priority, dueDate) {
    return Task.create({ userId, title, description, priority, dueDate });
  }

  findById(taskId) {
    return Task.findById(taskId);
  }

  findByIdAndUpdate(taskId, dataToUpdate) {
    return Task.findByIdAndUpdate(taskId, { ...dataToUpdate }, { new: true });
  }
}

module.exports = {
  taskService: new TaskService(),
};
