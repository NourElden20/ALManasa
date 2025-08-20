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
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyEnrolledCourses
} = require("../controllers/course.controller.js");
const validate = require("../middlewares/validate.middleware.js");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../utils/validationSchemas/courseValidationSchemas.js");

console.log(validate, asyncHandler, createCourse);

router.post(
  "/create",
  authenticate,
  authorizeTeacher,
  validate(createCourseSchema),
  asyncHandler(createCourse) // لازم تحط asyncHandler
);

router.get("/", authenticate, asyncHandler(getAllCourses));
router.get('/:id', authenticate, asyncHandler(getCourseById));

router.get("/enrollments/myEnrolledCourses",authenticate,asyncHandler(getMyEnrolledCourses))
router.post('/enrollments/enroll/:id',authenticate,asyncHandler(enrollCourse));


router.put('/:id', authenticate, authorizeTeacher, validate(updateCourseSchema), asyncHandler(updateCourse));
router.delete('/:id', authenticate, authorizeAdmin, asyncHandler(deleteCourse));



module.exports = router;
