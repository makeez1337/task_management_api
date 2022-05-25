const constants = {
  emailRegexp: /^\S+@\S+\.\S+$/,
  cookieMaxAge: 1000 * 60 * 60 * 24 * 30,
  saltOrRounds: 10,
};

module.exports = {
  constants,
};
