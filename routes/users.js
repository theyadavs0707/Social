const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
//console.log('Inside users route');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);

module.exports = router;