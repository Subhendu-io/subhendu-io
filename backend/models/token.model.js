const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  accessToken: {
    type     : String,
    required : 'Access Token can\'t be empty.'
  },
  refreshToken: {
    type     : String,
    required : 'Refresh Token can\'t be empty.'
  },
  expiresIn: {
    type     : String,
    required : 'Expires In can\'t be empty.'
  },
  active: {
    type     : Boolean,
    required : 'Active In can\'t be empty.'
  },
  loginIp: {
    type     : Object,
    required : 'Active In can\'t be empty.'
  },
  loginUser: {
    type     : Object,
    required : 'Active In can\'t be empty.'
  },
  oAuthData: {
    type: Object
  },
}, {
  timestamps: true,
});

const Token = mongoose.model('Token', tokenSchema, 'app_token');

module.exports = Token;