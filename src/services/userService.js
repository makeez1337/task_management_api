const { User } = require('../models');

class UserService {
  findByEmail(email) {
    return User.findOne().where({ email });
  }
}

module.exports = {
  userService: new UserService(),
};
