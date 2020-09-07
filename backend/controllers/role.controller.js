const { validationResult } = require('express-validator');
const roleService = require('../services/role.service');

module.exports.createRole = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;

    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const _role = {
        role  : _request.role,
        scope : _request.scope
      };
      const role = await roleService.createRole(_role, next);
      return res.send({
        success : true,
        title   : 'Role created successfully!',
        message : 'Role hase been created successfully.',
        role    : role
      });
    }
  } catch (error) {
    return next(error);
  }
};
module.exports.getRoles = async (req, res, next) => {
  try {
    const role = await roleService.getRoles(next);
    return res.send({
      success : true,
      title   : 'Roles sent successfully!',
      message : 'User roles sent successfully.',
      role    : role
    });
  } catch (error) {
    return next(error);
  }
};