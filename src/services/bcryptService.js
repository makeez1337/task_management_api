const bcrypt = require('bcrypt');

const { constants } = require('../constants');
const { ErrorHandler } = require('../errors');

class BcryptService {
  hashPassword(password) {
    return bcrypt.hash(password, constants.saltOrRounds);
  }

  async comparePassword(password, hashedPassword) {
    const isPasswordEqual = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEqual) {
      throw new ErrorHandler('Email or password is not valid', 401);
    }
  }
}

module.exports = {
  bcryptService: new BcryptService(),
};
