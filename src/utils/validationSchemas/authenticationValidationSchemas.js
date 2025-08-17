const Joi = require('joi');

const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateStudentSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).optional()
});
module.exports = {
    createStudentSchema,
    loginSchema,
    updateStudentSchema
};