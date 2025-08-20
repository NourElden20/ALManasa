const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const lessonRoutes = require("./lessonRoutes");
const sectionRoutes = require("./sectionRoutes");
const commentRoutes = require("./commentRoutes");
const quizRoutes = require("./quizRoutes");
const questionRoutes = require("./questionRoutes");
const optionRoutes = require("./optionRoutes");
const submissionRoutes = require("./submissionRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);
router.use("/quizzes", quizRoutes);
//router.use("/sections", sectionRoutes);
//router.use("/comments", commentRoutes);
//router.use("/questions", questionRoutes);
//router.use("/options", optionRoutes);
//router.use("/submissions", submissionRoutes);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const asyncHandler = require("./middlewares/asyncHandler");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(errorHandler);

module.exports = app;
