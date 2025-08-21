const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Routes imports
const authRoutes = require("./routes/auth.routes.js");
const lessonRoutes = require("./routes/lesson.routes.js");
const sectionRoutes = require("./routes/section.routes.js");
// const commentRoutes = require("./routes/comment.routes.js");
// const quizRoutes = require("./routes/quiz.routes.js");
// const questionRoutes = require("./routes/question.routes.js");
// const optionRoutes = require("./routes/option.routes.js");
// const submissionRoutes = require("./routes/submission.routes.js");

// 🔹 Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/sections", sectionRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/quizzes", quizRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api/options", optionRoutes);
// app.use("/api/submissions", submissionRoutes);




const asyncHandler = require("./middlewares/asyncHandler");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(errorHandler);

module.exports = app;
