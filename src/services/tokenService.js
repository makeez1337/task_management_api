const jwt = require('jsonwebtoken');

const { Tokens } = require('../models');
const { ErrorHandler } = require('../errors');

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

  findByAccessToken(accessToken) {
    return Tokens.findOne().where({ accessToken });
  }

  async verifyToken(token, tokenType = 'access') {
    try {
      let secretKey = process.env.SECRET_ACCESS_KEY;

      if (tokenType === 'refresh') {
        secretKey = process.env.SECRET_REFRESH_KEY;
      }

      return jwt.verify(token, secretKey);
    } catch (e) {
      throw new ErrorHandler(e.message, 401);
    }
  }

  deleteById(tokenId) {
    return Tokens.deleteOne().where({ _id: tokenId });
  }
}

module.exports = {
  tokenService: new TokenService(),
};
