const { validationResult } = require('express-validator');

const userService = require('../services/user.service');
const roleService = require('../services/role.service');

module.exports.getUsers = async (req, res, next) => {
  try {
    const _mQuery = {};
    const _mProjection = 'email password username firstName lastName roles saltSecret';
    const _users = await userService.getUsers(_mQuery, _mProjection, next);
    return res.send({
      success : true,
      users   : _users,
      message : 'User data sent successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const _user = req.user;
    const user = await userService.getUser({email: _user.email}, next);
    if(user && user['email']) {
      return res.send({
        'success' : true,
        'user'    : user,
        'message' : 'User data sent successfully.',
      });
    } else {
      return next({
        status  : 500,
        title   : 'User Not found!',
        message : 'Sorry, We could not find any user with this details.'
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports.addUserRole = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;

    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const _role = await roleService.getRole('ADMIN', next);
      const user = await userService.addUserRole({email: _request.email}, _role, next);
      return res.send({
        success : true,
        title   : 'User role updated successfully!',
        message : 'User role has been updated successfully.',
        user    : user
      });
    }
  } catch (error) {
    return next(error);
  }
};
