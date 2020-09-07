const { check } = require('express-validator');

exports.createRole = [
  check('role', 'Role is not valid').exists().notEmpty(),
  check('scope', 'Scope an array').exists().isArray().isIn(['all']),
];

exports.updateRole = [
  check('role', 'Role is not valid').exists().notEmpty(),
  check('scope', 'Scope an array').exists().isArray().isIn(['all']),
];