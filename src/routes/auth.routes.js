const Router = require('express');
const router = Router();
const { register, login, getUserProfile, getAllUsers, updateStudent} = require('../controllers/auth.controller.js');
const { authenticate,authorizeAdmin,authorizeTeacher,authorizeStudent } = require('../middlewares/auth.middleware.js');
const validate  = require('../middlewares/validate.middleware.js');
const { createStudentSchema, loginSchema, updateStudentSchema } = require('../utils/validationSchemas/authenticationValidationSchemas.js');

router.post('/register',validate(createStudentSchema), register);
router.post('/login',validate(loginSchema), login);

router.get('/profile', authenticate, getUserProfile);
router.get('/userById/:id', authenticate,authorizeAdmin,getUserProfile);
router.get('/users',authenticate,authorizeAdmin, getAllUsers);

router.put('/updateStudent/:id', authenticate, authorizeStudent,validate(updateStudentSchema) ,updateStudent);

module.exports = router;