const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString);

module.exports = connection;
