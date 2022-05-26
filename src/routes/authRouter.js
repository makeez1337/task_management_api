const { Router } = require('express');

const { authController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = Router();

router.post('/signUp', authController.signUp);
router.post('/signIn', authMiddleware.isUserExists, authMiddleware.isValidCredentials, authController.signIn);
router.delete('/signOut', authMiddleware.checkAccessToken, authController.signOut);


module.exports = {
  authRouter: router,
};
