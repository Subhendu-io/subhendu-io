const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Token = mongoose.model('Token');
const globalHelper = require('../helpers/global.helper');
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

module.exports.createToken = async (_user, next) => {
  try {
    return new Promise(resolve => {
      const tokenUser = {
        _id      : _user['_id'],
        email    : _user['email'],
        roles    : _user['roles'],
        username : _user['username'],
        verified : _user['verified'],
        scia     : globalHelper.getEncrypted(_user.currentIp, process.env.CRYPTO_PRIVATE_KEY)
      };
      const _expiresIn = '2h';
      const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { 'expiresIn': _expiresIn });
      const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET);

      const _tokenData = {
        active       : true,
        accessToken  : accessToken,
        refreshToken : refreshToken,
        expiresIn    : _expiresIn,
        loginIp      : _user.currentIp,
        loginUser    : tokenUser,
      };

      Token.create(_tokenData, (errToken, docToken) => {
        if(errToken) {
          return next(errToken);
        } else {
          return resolve(docToken);
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.authenticateToken = async (_token, next) => {
  try {
    return jwt.verify(_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        return next({
          status  : 401,
          errors  : err,
          title   : 'Unauthorized User Token!',
          message : 'Sorry, we could authenticate user due to unauthorized user token.'
        });
      } else {
        return user;
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.authenticateRole = async (user, _role, next) => {
  try {
    if(user && user['email'] && user['roles']) {
      for(let i = 0; i < user['roles'].length; i++) {
        if(user['roles'][i].role === _role) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return next(error);
  }
};

module.exports.refreshToken = async (_tokenData, next) => {
  try {
    return new Promise(resolve => {
      Token.findOne({refreshToken: _tokenData.refreshToken, active: true}, (errToken, docToken) => {
        if(errToken) {
          return next(errToken);
        } else if(docToken && docToken.refreshToken === _tokenData.refreshToken) {
          jwt.verify(docToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) {
              return next({
                status  : 403,
                errors  : err,
                title   : 'Unauthorized Request!',
                message : 'Unauthorized Request User.'
              });
            } else if(user.email == undefined || user.email == null || emailRegex.test(user.email) == false) {
              return next({
                status  : 403,
                title   : 'Unauthorized Request!',
                message : 'Unauthorized Request User.'
              });
            } else {
              const userData = {
                _id      : user._id,
                email    : user.email,
                name     : user.name,
                roles    : user.roles,
                verified : user.verified,
                scia     : user.scia
              };

              const _expiresIn = '2h';
              const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: _expiresIn });

              const _tokenData = {
                accessToken: accessToken,
              };

              Token.findOneAndUpdate({refreshToken: docToken.refreshToken, active: true}, _tokenData, {new: true}, (tokenErr, tokenDoc) => {
                if(tokenErr) {
                  return next(tokenErr);
                } else if(tokenDoc) {
                  return resolve(tokenDoc);
                } else {
                  return next({
                    status  : 403,
                    title   : 'Internal server error!',
                    message : 'Sorry, due an internal error, we could not refresh token at this time.'
                  });
                }
              });
            }
          });
        } else {
          return next({
            status  : 403,
            title   : 'Unauthorized Request!',
            message : 'Unauthorized Request User.'
          });
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.destroyToken = async (_tokenData, next) => {
  try {
    return new Promise(resolve => {
      Token.findOne({refreshToken: _tokenData.refreshToken, active: true}, (errToken, docToken) => {
        if(errToken) {
          return next(errToken);
        } else if(docToken && docToken.refreshToken === _tokenData.refreshToken) {
          jwt.verify(docToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) {
              return next({
                status  : 403,
                errors  : err,
                title   : 'Unauthorized Request!',
                message : 'Unauthorized Request User.'
              });
            } else if(user.email == undefined || user.email == null || emailRegex.test(user.email) == false) {
              return next({
                status  : 403,
                title   : 'Unauthorized Request!',
                message : 'Unauthorized Request User.'
              });
            } else {
              const _tokenData = {
                active: false
              };

              Token.findOneAndUpdate({refreshToken: docToken.refreshToken, active: true}, _tokenData, {new: true}, (tokenErr, tokenDoc) => {
                if(tokenErr) {
                  return next(tokenErr);
                } else if(tokenDoc) {
                  return resolve(tokenDoc);
                } else {
                  return next({
                    status  : 403,
                    title   : 'Internal server error!',
                    message : 'Sorry, due an internal error, we could not refresh token at this time.'
                  });
                }
              });
            }
          });
        } else {
          return next({
            status  : 403,
            title   : 'Unauthorized Request!',
            message : 'Unauthorized Request User.'
          });
        }
      });
    });
  } catch (error) {
    next(error);
  }
};