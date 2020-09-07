const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const globalHelper = require('../helpers/global.helper');
const sendgridService = require('../services/sendgrid.service');

const User = mongoose.model('User');

module.exports.createUser = async (_user, next) => {
  try {
    return new Promise(resolve => {
      User.create(_user, (errUser, docUser) => {
        if(errUser) {
          if(errUser.code == 11000) {
            return next({
              status  : 422,
              errors  : errUser,
              title   : 'Email or Phone No. already exists',
              message : 'This Email or Phone No. is already registered.'
            });
          } else {
            return next(errUser);
          }
        } else {
          return resolve(docUser);
        }
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.sendVerificationEmail = async (_user, next) => {
  try {
    return new Promise(async resolve => {
      const _code = await globalHelper.getRandomNumber(6);
      const _token = await globalHelper.getRandomString(35);
      const user = {
        verification: {
          code  : _code,
          token : _token
        }
      };
      await User.findOneAndUpdate(_user, user, {new: true}, async (errUser, docUser) => {
        if(errUser) {
          return next(errUser);
        } else if(docUser && docUser['email'] === _user['email']) {
          const email = {
            to: [
              {
                name  : docUser['firstname'] + ' ' + docUser['lastname'],
                email : docUser['email']
              }
            ],
            cc: [
              {
                name  : 'Subhendu.io',
                email : 'support@subhendu.io'
              }
            ],
            from: {
              name  : 'Subhendu.io',
              email : 'admin@subhendu.io'
            },
            subject : 'Subhendu.io | Email Verification',
            html    : `
              <h3>Hello ${docUser['firstname'] + ' ' + docUser['lastname']}, please verify your email</h3>
              <h4>Your verification code:<h4>
              <h1>${docUser['verification']['code']}</h1>
              <a href="${process.env.BASE_URL}/auth/verification?token=${docUser['verification']['token']}" style="color: white; background-color: #00bfa5; padding: 8px 20px; border-radius: 5px;">Verify Email</a>
            `
          };
          const result = await sendgridService.sendEmail(docUser, email, next);
          return resolve(result);
        } else {
          return next({
            status  : 404,
            title   : 'Email dose not exists',
            message : 'This Email is not registered with us.'
          });
        }
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.verifyEmail = async (_verification, next) => {
  try {
    return new Promise(async resolve => {
      let _user = {};
      if(_verification['type'] === 'TOKEN') {
        _user = {
          'verification.token': _verification['token']
        };
      } else if(_verification['type'] === 'CODE') {
        _user = {
          email               : _verification['email'],
          'verification.code' : _verification['code']
        };
      } else {
        return next({
          status  : 400,
          title   : 'Invalid verification method!',
          message : 'Unable verify your email, due to invalid verification methode.'
        });
      }
      await User.findOne(_user, async (errUser, docUser) => {
        if(errUser) {
          return next(errUser);
        } else {
          const verifiedUser = {
            'verified.email': true
          };
          await User.findOneAndUpdate({email: docUser['email']}, verifiedUser, {new: true}, (userErr, userDoc) => {
            if(userErr) {
              return next(errUser);
            } else {
              return resolve(userDoc);
            }
          });
        }
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getUsers = async (_mQuery, _mProjection, next) => {
  try {
    return await User.find(_mQuery, _mProjection, (errUser, docUser) => {
      if(errUser) {
        return next(errUser);
      } else {
        return docUser;
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getUser = async (_user, next) => {
  try {
    return await User.findOne(_user, 'email password username firstname lastname roles saltSecret verified', (errUser, docUser) => {
      if(errUser) {
        return next(errUser);
      } else {
        return docUser;
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.addUserRole = async (_user, _role, next) => {
  try {
    return new Promise(resolve => {
      User.findOne(_user, 'email password username firstname lastname roles saltSecret', (errUser, docUser) => {
        if(errUser) {
          return next(errUser);
        } else {
          User.updateOne({email: docUser['email']}, { $push: { roles: _role } }, {new: true}, (_errUser, _docUser) => {
            if(_errUser) {
              return next(_errUser);
            } else {
              return resolve(_docUser);
            }
          });
        }
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getEncryptedUser = async (_user, next) => {
  try {
    return new Promise(resolve => {
      bcrypt.genSalt(13, async (err, secrate) => {
        const _encrypted = await globalHelper.encryptPassword(_user.password, secrate);
        _user.password = _encrypted;
        _user.saltSecret = secrate;
        return resolve(_user);
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getDecryptedUser = async (_user, next) => {
  try {
    return new Promise(async resolve => {
      const decrypt = await globalHelper.decryptPassword(_user.password, _user.saltSecret);
      _user.password = decrypt;
      return resolve(_user);
    });
  } catch (error) {
    return next(error);
  }
};