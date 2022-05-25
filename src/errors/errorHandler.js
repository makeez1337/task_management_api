class ErrorHandler extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ErrorHandler,
};
