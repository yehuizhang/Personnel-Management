const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/army-registry');
  } catch (error) {
    console.error('Unable to connect to database.\n', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
