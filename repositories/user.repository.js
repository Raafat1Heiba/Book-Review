const UserModel = require("../models/user.model");

class UserRepository {
  async getUser(userId) {
    return await UserModel.findById(userId).populate("reviews");
  }

  async updateUser(userId, val) {
    return await UserModel.findByIdAndUpdate(userId, val, { new: true });
  }
}

module.exports = UserRepository;
