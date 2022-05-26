const { Router } = require('express');

const { authMiddleware, taskMiddleware } = require('../middleware');
const { taskController } = require('../controllers');

const router = Router();

router.post('/create', authMiddleware.checkAccessToken, taskController.create);
router.patch('/update', authMiddleware.checkAccessToken, taskMiddleware.validUserTask, taskController.update);
router.patch('/markAsDone', authMiddleware.checkAccessToken, taskMiddleware.validUserTask, taskController.markAsDone)
router.patch('/unmarkAsDone', authMiddleware.checkAccessToken, taskMiddleware.validUserTask, taskController.unmarkAsDone)

module.exports = {
  taskRouter: router,
};
