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

  markTask(taskId, action) {
    let isDone = true;

    if (action === 'unmarkAsDone') {
      isDone = false;
    }

    return Task.findByIdAndUpdate(taskId, { isDone }, { new: true });
  }
}

module.exports = {
  taskService: new TaskService(),
};
