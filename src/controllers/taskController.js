const { taskService } = require('../services/taskService');

class TaskController {
  async create(req, res, next) {
    try {
      const { _id } = req.user;
      const { title, description, priority, dueDate } = req.body;

      const task = await taskService.create(_id, title, description, priority, dueDate);
      res.json(task);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  taskController: new TaskController(),
};
