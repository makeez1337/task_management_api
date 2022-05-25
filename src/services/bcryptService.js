const bcrypt = require('bcrypt');

const { constants } = require('../constants');

class BcryptService {
  hashPassword(password) {
    return bcrypt.hash(password, constants.saltOrRounds);
  }
}

module.exports = {
  bcryptService: new BcryptService(),
};
