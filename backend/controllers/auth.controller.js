const requestIp = require('request-ip');
const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const roleService = require('../services/role.service');
const globalHelper = require('../helpers/global.helper');

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

module.exports.login = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;

    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const _user = {
        email    : _request.email,
        password : await globalHelper.getDecrypted(_request.password, process.env.CRYPTO_PUBLIC_KEY),
      };
      if(_user.email && _user.password && emailRegex.test(_user.email)) {
        const _encryptedUser = await userService.getUser({email: _user.email}, next);
        if(_encryptedUser && _encryptedUser.email && _encryptedUser.email === _user.email) {
          const _decryptedUser = await userService.getDecryptedUser(_encryptedUser, next);
          if(_decryptedUser && _decryptedUser.email && _decryptedUser.password && _user.email === _decryptedUser.email && _user.password === _decryptedUser.password) {
            _decryptedUser.currentIp = requestIp.getClientIp(req);
            const tokenData = await authService.createToken(_decryptedUser, next);
            const token = {
              accessToken  : tokenData.accessToken,
              refreshToken : tokenData.refreshToken,
              expiresIn    : tokenData.expiresIn,
              loginUser    : tokenData.loginUser
            };
            return res.send({
              success : true,
              title   : 'Login Successful!',
              message : 'You have successfully login to Subhendu.io!',
              user    : tokenData.loginUser,
              _jwt    : await globalHelper.getEncrypted(token, process.env.CRYPTO_PUBLIC_KEY)
            });
          } else {
            return next({
              status  : 400,
              title   : 'Incorrect username or password!',
              message : 'It seems that either your email or your password dose not match.'
            });
          }
        } else {
          return next({
            status  : 400,
            title   : 'Incorrect username or password!',
            message : 'It seems that either your email or your password dose not match.'
          });
        }
      } else {
        return next({
          status  : 403,
          title   : 'Invalid User',
          message : 'Invalid User Details.'
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;

    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const _tokenData = {
        email        : _request.email,
        refreshToken : await globalHelper.getDecrypted(_request.refreshToken, process.env.CRYPTO_PUBLIC_KEY),
      };
      if(_tokenData.email && _tokenData.refreshToken) {
        const _tokenDoc = await authService.destroyToken(_tokenData, next);
        if(_tokenDoc) {
          return res.send({
            success : true,
            title   : 'Logout Successful!',
            message : 'You have successfully logout to Subhendu.io!',
          });
        }
      } else {
        return next({
          status  : 403,
          title   : 'Invalid User',
          message : 'Invalid User Details.'
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;
    const _password = await globalHelper.getDecrypted(_request['password'], process.env.CRYPTO_PUBLIC_KEY);
    const _confirmPassword = await globalHelper.getDecrypted(_request['confirmPassword'], process.env.CRYPTO_PUBLIC_KEY);
    if(!_errors.isEmpty()) {
      return next(_errors);
    } else if(_request['agree'] && _password === _confirmPassword) {
      const _role = await roleService.getRole('USER', next);
      const _user = {
        email      : _request['email'],
        username   : _request['username'],
        firstname  : _request['firstname'],
        lastname   : _request['lastname'],
        phone      : _request['phone'],
        password   : _password,
        roles      : [_role],
        status     : 'active',
        agreements : {
          version  : 'v1',
          agreedOn : new Date(),
          agreedIP : requestIp.getClientIp(req),
        },
        verified: {
          email : false,
          phone : false
        }
      };
      const _encryptedUser = await userService.getEncryptedUser(_user, next);
      const user = await userService.createUser(_encryptedUser, next);

      return res.send({
        success : true,
        title   : 'User register successfully!',
        message : 'User has been register successfully.',
        user    : user
      });
    } else {
      return next({
        status  : 402,
        title   : 'Invalid request',
        message : 'Password and confirm passord dose not match and also make sure agree to our terms and conditions.'
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.sendVerificationEmail = async (req, res, next) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;
    console.log(_request);
    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const result = await userService.sendVerificationEmail({email: _request['email']}, next);
      if(result['success']) {
        return res.send({
          success : true,
          title   : 'Verification email sent!',
          message : 'Please verify your email to complete your registration process.'
        });
      } else {
        return next({
          status  : 500,
          errors  : result,
          title   : 'Unable to send verification email.',
          message : 'Unable to send verification email, due to internal server error.'
        });
      }
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const _request = req.body;
    const _errors = validationResult(req);

    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const user = await userService.verifyEmail(_request, next);
      if(user) {
        return res.send({
          success : true,
          title   : 'Email verified successfully!',
          message : 'Your email has been verified successfully.'
        });
      } else {
        return next({
          status  : 400,
          title   : 'Unable verify email.',
          message : 'Unable verify email, due to invalid request data.'
        });
      }
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.authenticate = (routeRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if(token) {
        const tokenUser = await authService.authenticateToken(token, next);
        if(routeRole) {
          const isUser = await authService.authenticateRole(tokenUser, routeRole, next);
          if(isUser) {
            req.user = tokenUser;
            next();
          } else {
            return next({
              status  : 403,
              title   : 'Unauthorized User Role!',
              message : 'Sorry, we could authenticate user due to unauthorized user role.'
            });
          }
        } else {
          req.user = tokenUser;
          next();
        }
      } else {
        return next({
          status  : 401,
          title   : 'Unauthorized User Token!',
          message : 'Unauthorized Request. Token not fount'
        });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
};