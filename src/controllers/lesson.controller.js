const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AppError = require("../middlewares/appError.js"); // Make sure you have this file

// Create Lesson
const createLesson = async (req, res) => {
  const { title, description, thumbnail, price } = req.body;
  const teacherId = req.user.id;

  const lesson = await prisma.lesson.create({
    data: { title, description, thumbnail, price, teacherId },
  });

  res.status(201).json({ success: true, lesson });
};

// Get All Lessons
const getAllLessons = async (req, res) => {
  const lessons = await prisma.lesson.findMany({
    include: { teacher: { select: { id: true, name: true, email: true } } },
  });
  res.json({ success: true, lessons });
};

// Get Lesson by ID
const getLessonById = async (req, res, next) => {
  const { id } = req.params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      teacher: { select: { id: true, name: true, email: true } },
      sections: { include: { comments: true } },
      quiz: true,
      enrolledUsers: true,
    },
  });

  if (!lesson) return next(new AppError("Lesson not found", 404));

  res.json({ success: true, lesson });
};

// Update Lesson
const updateLesson = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, thumbnail, price } = req.body;

  try {
    const lesson = await prisma.lesson.update({
      where: { id },
      data: { title, description, thumbnail, price },
    });

    res.json({ success: true, lesson });
  } catch (error) {
    return next(new AppError("Lesson not found", 404));
  }
};

// Delete Lesson
const deleteLesson = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.lesson.delete({ where: { id } });
    res.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    return next(new AppError("Lesson not found", 404));
  }
};

/*
// Enroll in Lesson
const enrollLesson = async (req, res, next) => {
  const userId = req.user.id;
  const { id: lessonId } = req.params;

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) return next(new AppError("Lesson not found", 404));

  const alreadyEnrolled = await prisma.lessonEnrollment.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  if (alreadyEnrolled)
    return next(new AppError("Already enrolled", 400));

  const enrollment = await prisma.lessonEnrollment.create({
    data: { userId, lessonId },
  });

  res.json({ success: true, enrollment });
};
*/
// Get My Enrolled Lessons
const getMyEnrolledLessons = async (req, res) => {
  const userId = req.user.id;

  const enrolledLessons = await prisma.lessonEnrollment.findMany({
    where: { userId },
    include: { lesson: true },
  });

  res.json({ success: true, lessons: enrolledLessons.map(el => el.lesson) });
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  enrollLesson,
  getMyEnrolledLessons
};
