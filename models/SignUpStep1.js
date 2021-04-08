const joi = require("joi");

const validateStep1 = (step1) => {
  const schema = joi.object({
    fullName: joi.string().required().min(3),
    countryCode: joi.string().required(),
    phone: joi.string().required(),
  });
  return schema.validate(step1, { abortEarly: false });
};

module.exports = validateStep1;
