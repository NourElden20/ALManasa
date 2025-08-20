const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().min(0).required(),
    thumbnail: Joi.string().uri().optional()
});
const updateCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    price: Joi.number().min(0),
    thumbnail: Joi.string().uri()
});
module.exports = {
    createCourseSchema,
    updateCourseSchema
};