const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async (_user, _email, next) => {
  try {
    return new Promise(async resolve => {
      console.log(_email);
      const _emailData = {
        to      : _email['to'],
        from    : _email['from'],
        cc      : _email['cc'],
        subject : _email['subject'],
        html    : _email['html'],
      };
      try {
        const _response = await sendGridMail.send(_emailData);
        if(_response[0]['statusCode'] === 202 || _response[0]['statusCode'] === 200) {
          return resolve({
            success  : true,
            response : _response[0]
          });
        }
      } catch (error) {
        return next({
          status  : 500,
          errors  : error.response.body,
          title   : 'Internel server error',
          message : 'Unable to send verification email, due to internel server error'
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};