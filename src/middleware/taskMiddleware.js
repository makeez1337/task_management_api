const { taskService } = require('../services/taskService');
const { ErrorHandler } = require('../errors');

class TaskMiddleware {
  async validUserTask(req, res, next) {
    try {
      const { _id } = req.user;
      const { taskId } = req.body;

      const task = await taskService.findById(taskId);

      if (!task) {
        return next(new ErrorHandler('Such task doesnt exists'));
      }

      if (_id.toString() !== task.userId.toString()) {
        return next(new ErrorHandler('You cant change this task'), 403);
      }

      req.task = task;
      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  taskMiddleware: new TaskMiddleware(),
};
