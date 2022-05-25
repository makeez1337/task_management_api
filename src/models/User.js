const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { constants } = require('../constants');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: constants.emailRegexp,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmedAt: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(constants.saltOrRounds, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = {
  User: model('Users', userSchema),
};
