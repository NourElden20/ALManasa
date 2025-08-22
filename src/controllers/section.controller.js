const prisma = require("../prisma"); // adjust path
const {AppError} = require("../middlewares/errorHandler"); // Make sure you have this file

// ✅ Create Section
const createSection = async (req, res) => {
  const { title, lessonId,mediaUrls } = req.body;
  console.log(lessonId);
  if (!title || !lessonId) {
    throw new AppError("Section name and lessonId are required", 400);
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new AppError("Course not found", 404);
  }

  const section = await prisma.section.create({
    data: { title, lessonId,mediaUrls },
  });

  res.status(201).json({
    status: "success",
    data: section,
  });
};

// ✅ Get All Sections
const getSections = async (req, res) => {
  const sections = await prisma.section.findMany({
    include: { lesson: true },
  });

  res.status(200).json({
    status: "success",
    results: sections.length,
    data: sections,
  });
};

// ✅ Get Single Section
const getSection = async (req, res) => {
  const { id } = req.params;

  const section = await prisma.section.findUnique({
    where: { id },
    include: { lesson: true },
  });

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: section,
  });
};

// ✅ Update Section
const updateSection = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  const updated = await prisma.section.update({
    where: { id },
    data: { name: name || section.name },
  });

  res.status(200).json({
    status: "success",
    data: updated,
  });
};

// ✅ Delete Section
const deleteSection = async (req, res) => {
  const { id } = req.params;

  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  await prisma.section.delete({
    where: { id },
  });

  res.status(204).json({
    status: "success",
    message: "Section deleted successfully",
  });
};

module.exports = {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
};
