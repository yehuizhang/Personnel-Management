const User = require('../models/users');

const getUserList = async (sort, direction, page, perPage, res) => {
  try {
    const list = await User.find;
  } catch (error) {}
};

module.exports = {
  getUserList,
};
