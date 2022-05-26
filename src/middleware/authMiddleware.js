const { userService, bcryptService } = require('../services');
const { ErrorHandler } = require('../errors');

class AuthMiddleware {
  async isUserExists(req, res, next) {
    try {
      const { email } = req.body;

      const user = await userService.findByEmail(email);

      if (!user) {
        return next(new ErrorHandler('Email or password is not valid'), 401);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  async isValidCredentials(req, res, next) {
    try {
      const { password } = req.body;
      const { password: hashedPassword } = req.user;

      await bcryptService.comparePassword(password, hashedPassword);

      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
