const Joi = require("joi");

// ✅ Create Quiz
const createQuizSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).max(1000).optional(),
  lessonId: Joi.string().uuid().required(),
});

// ✅ Update Quiz
const updateQuizSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().min(10).max(1000).optional(),
});

module.exports = {
  createQuizSchema,
  updateQuizSchema,
};
