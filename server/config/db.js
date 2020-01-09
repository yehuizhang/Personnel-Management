const mongoose = require('mongoose');
const loadDummyUser = require('../utils/loadDummyUser');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/army-registry');
    loadDummyUser();
  } catch (error) {
    console.error('Unable to connect to database.\n', error);
    process.exit(1);
  }
};

module.exports = connectDB;
