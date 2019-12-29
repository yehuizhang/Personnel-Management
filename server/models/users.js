const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  superior: {
    type: types.ObjectId,
    ref: 'User',
  },
  dsList: [
    {
      type: types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
