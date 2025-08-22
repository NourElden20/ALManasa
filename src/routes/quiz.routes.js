const Router = require("express");
const router = Router();
const asyncHandler = require("../middlewares/asyncHandler");
const validate = require("../middlewares/validate.middleware");

const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quiz.controller");

const {
  createQuizSchema,
  updateQuizSchema,
} = require("../utils/validationSchemas/quizValidationSchemas");

// GET /quizzes → get all quizzes
router.get("/", asyncHandler(getQuizzes));

// GET /quizzes/:id → get single quiz
router.get("/:id", asyncHandler(getQuiz));

// POST /quizzes → create quiz
router.post("/create", validate(createQuizSchema), asyncHandler(createQuiz));

// PUT /quizzes/:id → update quiz
router.put("/:id", validate(updateQuizSchema), asyncHandler(updateQuiz));

// DELETE /quizzes/:id → delete quiz
router.delete("/:id", asyncHandler(deleteQuiz));

module.exports = router;
