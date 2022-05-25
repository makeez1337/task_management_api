const { authService, tokenService } = require('../services');
const { constants } = require('../constants');

class AuthController {
  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await authService.registration({ username, email, password });
      const { _id } = user;

      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: _id, email });
      const savedTokenPair = await tokenService.saveTokenPair(accessToken, refreshToken, _id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: constants.cookieMaxAge,
      });
      res.json({
        user,
        savedTokenPair,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authController: new AuthController(),
};
