const express = require('express');
const router = express.Router();

// importing controllers
const authController = require('./controllers/auth.controller');
const roleController = require('./controllers/role.controller');
const userController = require('./controllers/user.controller');
// importing validators
const authValidator = require('./validators/auth.validator');
const roleValidator = require('./validators/role.validator');
const userValidator = require('./validators/user.validator');

// test
const testController = require('./controllers/test.controller');
router.get('/app', authController.authenticate('USER'), testController.sendHello);
router.get('/test', testController.test);

// auth routes
router.post('/auth/login', authValidator.login, authController.login);
router.post('/auth/logout', authValidator.logout, authController.logout);
router.post('/auth/register', authValidator.register, authController.register);
router.post('/auth/verification/send-email', authValidator.sendVerificationEmail, authController.sendVerificationEmail);
router.post('/auth/verification/verify-email', authValidator.verifyEmail, authController.verifyEmail);

// role routes
router.post('/roles', authController.authenticate('ADMIN'), roleValidator.createRole, roleController.createRole);
router.get('/roles', authController.authenticate('ADMIN'), roleController.getRoles);

// user routes
router.get('/user/users', authController.authenticate('ADMIN'), userController.getUsers);
router.post('/user/roles', authController.authenticate('ADMIN'), userValidator.addUserRole, userController.addUserRole);

module.exports = router;