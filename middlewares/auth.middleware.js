const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() {}

  anyUser(authRepository) {
    return async (req, res, next) => {
      try {
        const token = req.headers["jwt"];

        if (!token)
          return res.status(401).send({ message: "Unauthorized user" });

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = payload;
        const user = await authRepository.getUser({ _id });

        if (!user)
          return res.status(401).send({ message: "Unauthorized user" });

        req.auth = user;
        next();
      } catch (error) {
        return res.status(403).send({ message: error.message });
      }
    };
  }
}

module.exports = AuthMiddleware;
