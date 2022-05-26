const { Router } = require('express');
const { authRouter } = require('./authRouter');
const { taskRouter } = require('./taskRouter');

const router = Router();

router.use('/auth', authRouter);
router.use('/task', taskRouter);
router.use('*', (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = {
  apiRouter: router,
};
