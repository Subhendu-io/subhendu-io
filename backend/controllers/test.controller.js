const bcrypt = require('bcryptjs');
const globalHelper = require('../helpers/global.helper');

module.exports.sendHello = async (req, res, next) => {
  try {
    console.log(req.user);
    return res.send({
      success : true,
      data    : 'Hello World!',
      title   : 'Wellcome to Subhendu.io™!',
      message : 'This is an MEAN-Stack based nodejs app architecture',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.test = async (req, res, next) => {
  try {
    bcrypt.genSalt(10, async (err, secrate) => {
      const password = 'subhendu@2020';
      const _encrypted = await globalHelper.encryptPassword(password, secrate);
      console.log(secrate, _encrypted);
      const _decrypt = await globalHelper.decryptPassword(_encrypted, secrate);
      console.log(secrate, _decrypt);
      return res.end();
    });
  } catch (error) {
    return next(error);
  }
};