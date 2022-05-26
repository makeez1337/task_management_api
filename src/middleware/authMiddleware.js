const { constants } = require('../constants');
const { userService, bcryptService, tokenService } = require('../services');
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

  async checkAccessToken(req, res, next) {
    try {
      const accessToken = req.get(constants.Authorization);

      if (!accessToken) {
        return next(new ErrorHandler('Token is not valid', 401));
      }

      const tokenPair = await tokenService.findByAccessToken(accessToken);
      if (!tokenPair) {
        return next(new ErrorHandler('Token is not valid'), 401);
      }

      const { userEmail } = await tokenService.verifyToken(accessToken);
      const user = await userService.findByEmail(userEmail);

      if (!user) {
        return next(new ErrorHandler('Token is not valid', 401));
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  async checkRefreshToken(req, res, next) {
    try {
      const refreshToken = req.get(constants.Authorization);

      const tokenPair = await tokenService.findByRefreshToken(refreshToken);
      if (!tokenPair) {
        return next(new ErrorHandler('Token is not valid'), 401);
      }

      const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');
      const user = await userService.findByEmail(userEmail);

      if (!user) {
        return next(new ErrorHandler('Token is not valid', 401));
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
