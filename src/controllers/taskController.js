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
      const { taskId, ...dataToUpdate } = req.body;

      const updatedTask = await taskService.findByIdAndUpdate(taskId, dataToUpdate);
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  }

  async markAsDone(req, res, next) {
    try {
      const { _id } = req.task;

      const updatedTask = await taskService.markTask(_id);
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  }

  async unmarkAsDone(req, res, next) {
    try {
      const { _id } = req.task;

      const updatedTask = await taskService.markTask(_id, 'unmarkAsDone');
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  taskController: new TaskController(),
};
