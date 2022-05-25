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

  saveTokenPair(accessToken, refreshToken, userId) {
    return Tokens.create({ accessToken, refreshToken, userId });
  }
}

module.exports = {
  tokenService: new TokenService(),
};
