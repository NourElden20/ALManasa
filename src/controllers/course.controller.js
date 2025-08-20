const { AppError } = require("../middlewares/errorHandler");
const prisma = require("../prisma.js");

const createCourse = async (req, res) => {
  const { title, description } = req.body;

  const existingCourse = await prisma.course.findFirst({
    where: { title, teacherId: req.user.id },
  });
  // لازم نتأكد إن المستخدم موجود
  if (!req.user || !req.user.id) {
    throw new AppError("Unauthorized: user not found", 401);
  }
  if (existingCourse) {
    // لو في خطأ متوقع نستخدم AppError
    throw new AppError("You already created a course with this title", 400);
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
      teacherId: req.user.id,
    },
  });

  res.status(201).json(course);
};

const getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany({
    include: {
      teacher: true, // لو عايز تجيب بيانات المدرس
      enrolledUsers: true, // لو عايز تجيب الطلاب المسجلين في الكورس
    },
  });
  res.status(200).json(courses);
};

const getCourseById = async (req, res) => {
  var { id } = req.params;
  var course = await prisma.course.findFirst({
    where: { id },
    include: {
      teacher: true,
      enrolledUsers: true,
    },
  });
  if (!course) throw new AppError("Course Not Found");
  res.status(200).json(course);
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  var course = await prisma.course.findUnique({
    where: { id },
  });
  if (!course) throw new AppError("Course Not Found");
  const updatedCourse = await prisma.course.update({
    where: { id },
    data: { title, description },
  });
  res.json({ message: "Course updated successfully", course: updatedCourse });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) throw new AppError("Course Not Found");
  await prisma.course.delete({ where: { id } });
  res.status(204).json({ message: "Course deleted successfully" });
};

const enrollCourse = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  console.log(courseId, userId);
  var course = await prisma.course.findFirst({
    where: { id: courseId },
  });
  if (!course) throw new AppError("Course Not Found");
  const existingEnrollment = await prisma.courseEnrollment.findFirst({
    where: { courseId, userId },
  });
  console.log(existingEnrollment);
  if (existingEnrollment)
    throw new AppError("The user already enrolled this course");
  const enrollment = await prisma.courseEnrollment.create({
    data: {
      userId,
      courseId,
    },
  });
  res.status(201).json({
    message: "Course enrolled successfully",
    data: enrollment,
  });
};

const getMyEnrolledCourses = async (req, res) => {
  const userId = req.user.id;
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { userId },
    include: {
      course: true,
    },
  });
  res.status(200).json({
    message:
      enrollments.count > 0 ? "No enrollment found" : "Enrollments Fetched",
    data: enrollments,
  });
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyEnrolledCourses,
};
