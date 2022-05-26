const { authMiddleware } = require('./authMiddleware');
const { taskMiddleware } = require('./taskMiddleware');

module.exports = {
  authMiddleware,
  taskMiddleware,
};
