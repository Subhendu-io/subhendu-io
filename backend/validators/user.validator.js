const { check } = require('express-validator');

exports.addUserRole = [
  check('email', 'Your email is not valid').exists().notEmpty().isEmail(),
  check('role', 'Invalid requested user role').exists().notEmpty().isString().isIn(['USER', 'ADMIN', 'DEVELOPER'])
];
