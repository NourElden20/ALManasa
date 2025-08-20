const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
  role: Joi.string().valid('student', 'teacher').default('student').optional()
});
const registerTeacherSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
  role: Joi.string().valid('teacher').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).optional()
});



module.exports = {
    registerSchema,
    registerTeacherSchema,
    loginSchema,
    updateSchema
};