const joi = require("joi");
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateUser = (user) => {
  const schemaRequirements = joi.object({
    fullName: joi.string().min(3).max(50).required(),
    email: joi.string().regex(emailPattern).required(),
    password: joi.string().min(3).max(50).required(),
  });
  return schemaRequirements.validate(user);
};

module.exports = validateUser;
