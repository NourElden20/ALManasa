const prisma = require("../prisma");
const { AppError } = require("../middlewares/errorHandler");

// ✅ Create Quiz (each lesson has only one quiz)
const createQuiz = async (req, res) => {
  const { title, description, lessonId } = req.body;

  // check lesson exists
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });
  if (!lesson) throw new AppError("Lesson not found", 404);

  // check if quiz already exists for this lesson
  const existingQuiz = await prisma.quiz.findUnique({
    where: { lessonId },
  });
  if (existingQuiz) throw new AppError("Lesson already has a quiz", 400);

  const quiz = await prisma.quiz.create({
    data: { title, description, lessonId },
  });

  res.status(201).json({
    status: "success",
    message: "Quiz created successfully",
    data: quiz,
  });
};

// ✅ Get all Quizzes
const getQuizzes = async (req, res) => {
  const quizzes = await prisma.quiz.findMany({
    include: { lesson: true, questions: true },
  });

  res.status(200).json({
    status: "success",
    results: quizzes.length,
    data: quizzes,
  });
};

// ✅ Get single Quiz by id
const getQuiz = async (req, res) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      lesson: true,
      questions: {
        include: { options: true },
      },
    },
  });

  if (!quiz) throw new AppError("Quiz not found", 404);

  res.status(200).json({
    status: "success",
    data: quiz,
  });
};

// ✅ Update Quiz
const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const quiz = await prisma.quiz.findUnique({ where: { id } });
  if (!quiz) throw new AppError("Quiz not found", 404);

  const updated = await prisma.quiz.update({
    where: { id },
    data: {
      title: title || quiz.title,
      description: description || quiz.description,
    },
  });

  res.status(200).json({
    status: "success",
    data: updated,
  });
};

// ✅ Delete Quiz
const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({ where: { id } });
  if (!quiz) throw new AppError("Quiz not found", 404);

  await prisma.quiz.delete({ where: { id } });

  res.status(204).json({
    status: "success",
    message: "Quiz deleted successfully",
  });
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
