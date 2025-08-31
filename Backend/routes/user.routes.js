const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register',[
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
],userController.register);

router.post('/login',[
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isLength({min:6}).notEmpty().withMessage('Password is required'),
],userController.login);


router.get('/profile',authMiddleware.authUser , userController.GetProfile);

router.get('/logout', authMiddleware.authUser, userController.logout);


module.exports = router;