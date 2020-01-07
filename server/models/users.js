const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    type: Number,
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

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
