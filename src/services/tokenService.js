const jwt = require('jsonwebtoken');

const { Tokens } = require('../models');

class TokenService {
  generateTokenPair(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
      expiresIn: process.env.EXPIRES_ACCESS_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: process.env.EXPIRES_REFRESH_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokenPair(accessToken, refreshToken, userId) {
    const tokenPair = await this.findByUserId(userId);

    if (tokenPair) {
      tokenPair.accessToken = accessToken;
      tokenPair.refreshToken = refreshToken;

      await tokenPair.save({});
      return {
        accessToken,
        refreshToken,
        userId,
      };
    }

    return Tokens.create({ accessToken, refreshToken, userId });
  }

  findByUserId(userId) {
    return Tokens.findOne().where({ userId });
  }
}

module.exports = {
  tokenService: new TokenService(),
};
