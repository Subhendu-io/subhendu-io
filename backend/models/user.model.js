const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type      : String,
    required  : 'Email can\'t be empty.',
    lowercase : true,
    unique    : true,
    trim      : true,
  },
  username: {
    type      : String,
    required  : 'Username can\'t be empty.',
    unique    : true,
    trim      : true,
    minlength : 3
  },
  firstname: {
    type     : String,
    required : 'First name can\'t be empty.',
  },
  lastname: {
    type     : String,
    required : 'Last name can\'t be empty.',
  },
  password: {
    type: String,
  },
  phone: {
    type     : String,
    required : 'Phone can\'t be empty.',
    unique   : true,
    trim     : true
  },
  roles: {
    type: [Object],
  },
  verified: {
    type     : Object,
    required : 'Internal Failure!'
  },
  verification: {
    type: Object
  },
  status: {
    type     : String,
    required : 'Internal Failure!'
  },
  agreements: {
    type     : Object,
    required : 'Internal Failure!'
  },
  saltSecret: {
    type     : String,
    required : 'Internal Failure!'
  }
}, {
  timestamps: true,
});

userSchema.path('email').validate((val) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid email, please enter a valid email.');

const User = mongoose.model('User', userSchema, 'app_user');

module.exports = User;