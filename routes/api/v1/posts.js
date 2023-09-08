const express = require('express');
const router = express.Router();

const passport = require('passport');
const customMW = require('../../../config/middleware')

const postsApi = require('../../../controllers/api/v1/posts_api');


router.get('/',postsApi.index);
router.delete('/:id', passport.authenticate('jwt',{session:false}) ,  postsApi.destroy); //we kept session: false to prevent session cookies to be generated, here we are using strategy as jwt to authenticate

module.exports = router;