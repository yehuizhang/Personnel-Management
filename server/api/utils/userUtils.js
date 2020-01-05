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

const addUser = async (userInfo, res) => {
  try {
    const user = new User({ ...userInfo });
    if (userInfo.superior) {
      const superior = await User.findById(userInfo.superior).populate(
        'dsList',
        ['id', 'rank']
      );
      if (!superior) {
        return errorHandling(res, 400, "User's superior does not exist");
      }
      await user.save();
      superior.dsList = [...superior.dsList, user]
        .sort((a, b) => Number(b.rank) - Number(a.rank))
        .map(u => u.id);
      await superior.save();
    } else {
      await user.save();
    }
    return res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error.message);
    return errorHandling(res, 500, 'Unable to add user at this time.');
  }
};

const deleteUser = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return errorHandling(res, 400, 'Delete Failed. The user does not exist');
    }
    if (user.superior) {
      const superior = await User.findById(user.superior);
      superior.dsList = superior.dsList.filter(
        id => id.toString() !== user.id.toString()
      );
      await superior.save();
    }
    if (user.dsList.length > 0) {
      const dsIds = user.dsList.map(id => ({
        _id: id,
      }));
      await User.updateMany({ $or: dsIds }, { $unset: { superior: '' } });
    }
    await user.remove();
    return res.json({ message: 'Delete success' });
  } catch (error) {
    console.error(error.message);
    return errorHandling(res, 500, 'Delete Failed. Internal error!');
  }
};

module.exports = {
  getUserList,
  getUserById,
  getUsersWithHigherRank,
  addUser,
  deleteUser,
};
