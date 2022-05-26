const { User } = require('../models');

class AuthService {
  signUp(data) {
    return User.create({ ...data });
  }
}

module.exports = {
  authService: new AuthService(),
};
