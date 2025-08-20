const Router = require('express');
const router = Router();
const { register, login, getUserProfile, getAllUsers, updateUser, getAllTeachers} = require('../controllers/auth.controller.js');
const { authenticate,authorizeAdmin,authorizeTeacher,authorizeStudent } = require('../middlewares/auth.middleware.js');
const validate  = require('../middlewares/validate.middleware.js');
const { registerSchema, registerTeacherSchema, loginSchema, updateSchema } = require('../utils/validationSchemas/authenticationValidationSchemas.js');

router.post('/register',validate(registerSchema), register);
router.post('/login',validate(loginSchema), login);
router.post('/registerTeacher',authenticate,authorizeAdmin,validate(registerTeacherSchema), register);

router.get('/profile', authenticate, getUserProfile);
router.get('/userById/:id', authenticate,authorizeAdmin,getUserProfile);
router.get('/users',authenticate,authorizeAdmin, getAllUsers);
router.get('/teachers', authenticate, authorizeAdmin, getAllTeachers);

router.put('/updateStudent/:id', authenticate, authorizeStudent,validate(updateSchema) ,updateUser);
router.put('/updateTeacher/:id', authenticate, authorizeAdmin,validate(updateSchema) ,updateUser);

module.exports = router;