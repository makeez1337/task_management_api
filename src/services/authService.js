const { User } = require('../models');

class AuthService {
  registration(data) {
    return User.create({ ...data });
  }
}

module.exports = {
  authService: new AuthService(),
};
