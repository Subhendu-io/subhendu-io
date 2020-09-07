const rp = require('request-promise');

module.exports.post = async (url, headers, data, next) => {
  try {
    var options = {
      'method'  : 'POST',
      'uri'     : url,
      'headers' : headers || {
        'Content-type': 'application/json'
      },
      'body' : data,
      'json' : true
    };
    return rp(options);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.get = async (url, headers, next) => {
  try {
    var options = {
      'method'  : 'POST',
      'uri'     : url,
      'headers' : headers || {
        'Content-type': 'application/json'
      },
      'json': true
    };
    console.log(options);
    return rp(options);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};