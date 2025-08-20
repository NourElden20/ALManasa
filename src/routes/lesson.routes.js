const Router = require("express");
const router = Router();
const asyncHandler = require("../middlewares/asyncHandler.js");
const {
  authenticate,
  authorizeAdmin,
  authorizeTeacher,
  authorizeStudent,
} = require("../middlewares/auth.middleware.js");

const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  enrollLesson,
  getMyEnrolledLessons
} = require("../controllers/lesson.controller.js");

const validate = require("../middlewares/validate.middleware.js");
const {
  createLessonSchema,
  updateLessonSchema
} = require("../utils/validationSchemas/lessonValidationSchemas.js");

router.post(
  "/create",
  authenticate,
  authorizeTeacher,
  validate(createLessonSchema),
  asyncHandler(createLesson)
);

router.get("/", authenticate, asyncHandler(getAllLessons));
router.get("/:id", authenticate, asyncHandler(getLessonById));

router.get("/enrollments/myEnrolledLessons", authenticate, asyncHandler(getMyEnrolledLessons));

router.put("/:id", authenticate, authorizeTeacher, validate(updateLessonSchema), asyncHandler(updateLesson));
router.delete("/:id", authenticate, authorizeTeacher, asyncHandler(deleteLesson));

module.exports = router;
