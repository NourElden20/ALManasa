const Joi = require('joi');


const createSectionSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  lessonId: Joi.string().uuid().required(),
  mediaUrls: Joi.array().items(Joi.string().uri()).default([]),
});

const updateSectionSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  mediaUrls: Joi.array().items(Joi.string().uri()).optional(),
});

module.exports = {
  createSectionSchema,
    updateSectionSchema,
}