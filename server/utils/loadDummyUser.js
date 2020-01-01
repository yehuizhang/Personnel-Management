const dummyUsers = require('./dummyusers');
const User = require('../models/users');

const loadDummyUser = async (numOfUsers = 10) => {
  const docCount = await User.estimatedDocumentCount();
  if (docCount === 0) {
    const users = dummyUsers(numOfUsers);
    users.map(async user => {
      const u = new User(user);
      await u.save();
    });
  }
};

module.exports = loadDummyUser;
