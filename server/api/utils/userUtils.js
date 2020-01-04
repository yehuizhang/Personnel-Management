const User = require('../../models/users');

const errorHandling = (res, code, message) => {
  return res.status(500).json({
    message,
  });
};

const getUserList = async (sort, direction, page, res) => {
  const options = {
    sort: { [sort]: direction },
    page,
    limit: 5,
  };
  try {
    const result = await User.paginate({}, options);
    return res.json(result);
  } catch (error) {
    errorHandling(res, 500, 'Unable to retrieve user list from db');
  }
};

const getUserById = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return errorHandling(res, 400, 'The user does not exist');
    }
    return res.json(user);
  } catch (error) {
    return errorHandling(res, 500, 'Unable to retrieve user from db');
  }
};

const getUsersWithHigherRank = async (level, res) => {
  const options = {
    sort: { rank: 'asc' },
  };
  try {
    const users = await User.find({ rank: { $gt: level } }, null, options);
    return res.json(users);
  } catch (error) {
    return errorHandling(res, 500, 'Unable to retrieve users from db');
  }
};

module.exports = {
  getUserList,
  getUserById,
  getUsersWithHigherRank,
};
