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

  async update(req, res, next) {
    try {
      const user = req.user;
      const task = req.task;

      const { taskId, ...dataToUpdate } = req.body;

      const updatedTask = await taskService.findByIdAndUpdate(taskId, dataToUpdate);
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  taskController: new TaskController(),
};
