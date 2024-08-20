const Errors = require("../error/error");

class UserController {
  userRepository;
  authRepository;

  constructor(_userRepository, _authRepository) {
    this.userRepository = _userRepository;
    this.authRepository = _authRepository;
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      if (!user) {
        throw new Errors.ApiError("User not found", 404);
      }
      return user;
    } catch (error) {
      throw new Errors.ApiError("Unable to fetch user", 500);
    }
  }

  async updateUser(userId, val) {
    try {
      const user = await this.userRepository.updateUser(userId, val);
      if (!user) {
        throw new Errors.ApiError("User not found", 404);
      }
      return user;
    } catch (error) {
      throw new Errors.ApiError("Unable to update user", 500);
    }
  }
}

module.exports = UserController;
