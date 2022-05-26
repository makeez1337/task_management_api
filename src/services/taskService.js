const { Task } = require('../models');

class TaskService {
  create(userId, title, description, priority, dueDate) {
    return Task.create({ userId, title, description, priority, dueDate });
  }
}

module.exports = {
  taskService: new TaskService(),
};
