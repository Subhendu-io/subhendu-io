const { check } = require('express-validator');

exports.login = [
  check('email', 'Your email is not valid').exists().notEmpty().isEmail(),
];

exports.register = [
  check('email', 'Your email is not valid').exists().notEmpty().isEmail(),
  check('firstname', 'Your first name is not valid').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('lastname', 'Your last name is not valid').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('username', 'Your username is not valid').exists().notEmpty().isLength({ min: 4, max: 50 }),
  check('password', 'Your password is not valid').exists().notEmpty().isLength({ min: 6, max: 50 }),
  check('confirmPassword', 'Your confirm password is not valid').exists().notEmpty().isLength({ min: 6, max: 50 }),
  check('phone', 'Your phone number is not valid').exists().notEmpty(),
  check('agree', 'Your phone number is not valid').exists().notEmpty().isBoolean(),
];

exports.logout = [
  check('email', 'Your email is not valid').exists().notEmpty().isEmail(),
  check('refreshToken', 'Your email is not valid').exists().notEmpty(),
];

exports.sendVerificationEmail = [
  check('email', 'Your email is not valid').exists().notEmpty().isEmail()
];

exports.verifyEmail = [
  check('type', 'Invalid requested varification type').exists().notEmpty().isString().isIn(['TOKEN', 'CODE'])
];