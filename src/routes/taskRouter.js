const { Router } = require('express');

const { authMiddleware } = require('../middleware');
const { taskController } = require('../controllers');

const router = Router();

router.post('/create', authMiddleware.checkAccessToken, taskController.create);

module.exports = {
  taskRouter: router,
};
