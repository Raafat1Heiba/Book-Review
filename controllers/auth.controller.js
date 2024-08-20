const jwt = require("jsonwebtoken");
const Errors = require("../error/error");
const bcrypt = require("bcrypt");
const validateUser = require("../validators/user.validator");

class AuthController {
  authRepository;

  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;
    const user = await this.authRepository.getUser({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Errors.ApiError("Incorrect email or password", 401);
    }

    const token = jwt.sign(
      { _id: user._id, role: user.typeId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6h" }
    );

    return { token };
  }

  async register(body) {
    const { error, registerInfo } = await validateUser(body);

    if (error) {
      throw new Errors.ApiError(error.message, 400);
    }

    body.email = body.email.toLowerCase();

    let user = await this.authRepository.getUser({ email: body.email });
    if (user) {
      throw new Errors.ApiError("Email already exists", 401);
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    body.password = passwordHash;

    user = await this.authRepository.addUser(body);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "6h",
    });

    return { token };
  }
}

module.exports = AuthController;
