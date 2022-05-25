const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { User } = require('./User');

const tokensSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = {
  Tokens: model('Tokens', tokensSchema),
};
