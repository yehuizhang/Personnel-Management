const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
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

// Index all files of type of string
userSchema.index({
  name: 'text',
  sex: 'text',
  rank: 'text',
  phone: 'text',
  email: 'text',
});
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
