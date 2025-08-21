const Router = require("express");
const router = Router();
const asyncHandler = require("../middlewares/asyncHandler.js");

const {createSection,getSectionById,updateSection,deleteSection} = require("../controllers/section.controller.js");
const validate = require("../middlewares/validate.middleware.js");
const {
  createSectionSchema,
  updateSectionSchema,
} = require("../utils/validationSchemas/sectionValidationSchemas.js");

// GET /sections/:id → get section with media & comments
router.get("/:id", asyncHandler(getSectionById));

// POST /sections → create section for a lesson
router.post("/", validate(createSectionSchema), asyncHandler(createSection));

// PUT /sections/:id → update section
router.put("/:id", validate(updateSectionSchema), asyncHandler(updateSection));

// DELETE /sections/:id → delete section
router.delete("/:id", asyncHandler(deleteSection));

module.exports = router;
