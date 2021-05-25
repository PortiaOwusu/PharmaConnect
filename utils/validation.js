const joi = require("joi");

const registerValidator = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});

const pharmacyRegisterValidator = joi.object({
  pharmacyName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
  registrationNumber: joi.string().required(),
  location: joi.string().required(),
});

const loginValidator = joi.object({
  fullName: joi.string().required(),
  password: joi.string().required().min(8),
});

const pharmacyLoginValidator = joi.object({
  pharmacyName: joi.string().required(),
  password: joi.string().required().min(8),
  registrationNumber: joi.string().required(),
});

const createProductValidator = joi.object({
  title: joi.string().required(),
  genericName: joi.string().required(),
  description: joi.string().required(),
  prescription: joi.boolean().required(),
  quantity: joi.number().required(),
  price: joi.number().required(),
  image: joi.string().required(),
  manufactureDate: joi.required(),
  expiryDate: joi.required(),
});

const updateProductValidator = joi.object({
  title: joi.string(),
  genericName: joi.string(),
  description: joi.string(),
  prescription: joi.string(),
  quantity: joi.number(),
  price: joi.number(),
  image: joi.string(),
  manufactureDate: joi.string().required(),
  expiryDate: joi.string(),
});

module.exports = {
  registerValidator,
  pharmacyRegisterValidator,
  loginValidator,
  pharmacyLoginValidator,
  createProductValidator,
  updateProductValidator,
};
