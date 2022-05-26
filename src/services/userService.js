const { User } = require('../models');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);


class UserService {
  findByEmail(email) {
    return User.findOne().where({ email });
  }

  findByConfirmationLink(confirmationLink) {
    return User.findOne().where({ confirmationLink });
  }

  confirmEmail(userId) {
    const utc = dayjs.utc();
    return User.findOneAndUpdate({ _id: userId }, { confirmedAt: utc.local().format() });
  }
}

module.exports = {
  userService: new UserService(),
};
