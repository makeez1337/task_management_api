const { authService, tokenService } = require('../services');
const { constants } = require('../constants');

class AuthController {
  async signUp(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await authService.signUp({ username, email, password });
      const { _id } = user;

      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: _id, userEmail: email });
      const savedTokenPair = await tokenService.saveTokenPair(accessToken, refreshToken, _id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: constants.cookieMaxAge,
      });
      res.json({
        user,
        tokenPair: savedTokenPair,
      });
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const user = req.user;
      const { _id, email } = user;

      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: _id, userEmail: email });
      const savedTokenPair = await tokenService.saveTokenPair(accessToken, refreshToken, _id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: constants.cookieMaxAge,
      });
      res.json({
        user,
        tokenPair: savedTokenPair,
      });
    } catch (e) {
      next(e);
    }
  }

  async signOut(req, res, next) {
    try {
      const { _id } = req.user;

      const { _id: tokenId } = await tokenService.findByUserId(_id);

      const deletedTokens = await tokenService.deleteById(tokenId);
      res.json(deletedTokens);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authController: new AuthController(),
};
