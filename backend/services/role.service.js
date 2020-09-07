const mongoose = require('mongoose');
const Role = mongoose.model('Role');

module.exports.createRole = async (_role, next) => {
  try {
    return new Promise(resolve => {
      Role.create(_role, (errRole, docRole) => {
        if(errRole) {
          if(errRole.code == 11000) {
            return next({
              status  : 422,
              errors  : errRole,
              title   : 'Role already exists',
              message : 'This role is already there'
            });
          } else {
            return next(errRole);
          }
        } else {
          return resolve(docRole);
        }
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getRoles = async (next) => {
  try {
    return await Role.find({}, (errRole, docRole) => {
      if(errRole) {
        return next(errRole);
      } else {
        return docRole;
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getRole = async (_role, next) => {
  try {
    return await Role.findOne({role: _role}, 'role', (errRole, docRole) => {
      if(errRole) {
        return next(errRole);
      } else {
        return docRole;
      }
    });
  } catch (error) {
    return next(error);
  }
};