class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
  }
}

class NotFoundError extends ApiError {
  constructor(message = "not found") {
    super(message, 404);
  }
}

class UnAuthError extends ApiError {
  constructor(message = "unauthorized user") {
    super(message, 401);
  }
}

class InternalError extends ApiError {
  constructor(message = "server error") {
    super(message, 500);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  UnAuthError,
  InternalError,
};
