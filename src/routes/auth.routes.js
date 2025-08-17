const  Router  = require('express');
const { register, login, getUserProfile } = require('../controllers/auth.controller.js');
const { authenticate } = require('../middlewares/auth.middleware.js');

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticate, getUserProfile);


module.exports = router;