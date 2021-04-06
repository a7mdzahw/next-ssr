const joi = require("joi");

const validate = (user) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .rule({
        message: "Password must be at least 8 charachter with one Captial and one special character",
      }),
    stayloggedin: joi.string(),
  });
  return schema.validate(user, { abortEarly: false });
};

module.exports = validate;
