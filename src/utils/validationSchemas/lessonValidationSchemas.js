const Joi = require('joi');

const createLessonSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().min(0).required(),
    thumbnail: Joi.string().uri().optional()
});
const updateLessonSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    price: Joi.number().min(0),
    thumbnail: Joi.string().uri()
});
module.exports = {
    createLessonSchema,
    updateLessonSchema
};