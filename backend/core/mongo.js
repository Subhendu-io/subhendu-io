const mongoose = require('mongoose');

const generateMongoUrl = () => {
  let mongoURL = 'mongodb+srv://' +
  (process.env.DB_USER_NAME && process.env.DB_PASSWORD ? process.env.DB_USER_NAME + ':' + process.env.DB_PASSWORD + '@' : '') +
  (process.env.DB_HOST ? process.env.DB_HOST : '') +
  (process.env.DB_HOST && process.env.DB_PORT ? ':' + process.env.DB_PORT : '') +
  (process.env.REPLICA_HOST && process.env.REPLICA_PORT ? ',' + process.env.REPLICA_HOST + ':' + process.env.REPLICA_PORT + '/' : '/') +
  (process.env.DB_DATABASE_NAME ? process.env.DB_DATABASE_NAME : '') +
  (process.env.REPLICA_SET ? '?replicaSet=' + process.env.REPLICA_SET : '') + '?retryWrites=true&w=majority';

  return mongoURL;
};

mongoose.connect(generateMongoUrl(), { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if(err) {
    console.log('MongoDB Initialization Failed : ', err);
  }
});

require('@app/models/user.model');
require('@app/models/role.model');
require('@app/models/token.model');