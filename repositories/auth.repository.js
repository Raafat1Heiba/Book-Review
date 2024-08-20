const UserModel = require("../models/user.model");

class AuthRepository {
  constructor() {}

  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      return error;
    }
  }

  async getUser(val) {
    try {
      return await UserModel.findOne(val);
    } catch (error) {
      return error;
    }
  }

  async updateUser(id, val) {
    try {
      return await UserModel.updateOne({ _id: id }, val);
    } catch (error) {
      return error;
    }
  }

  async addUser(userInfo) {
    try {
      return await UserModel.create(userInfo);
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthRepository;
