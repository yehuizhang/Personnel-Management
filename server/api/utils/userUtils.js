const User = require('../../models/users');

const errorHandling = (res, message) => {
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
    errorHandling(res, 'Unable to retrieve user list');
  }
};

module.exports = {
  getUserList,
};
