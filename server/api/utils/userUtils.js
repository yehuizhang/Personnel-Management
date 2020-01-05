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

const addUserToSuperior = async (user, superiorId) => {
  const superior = await User.findById(superiorId).populate('dsList', [
    'id',
    'rank',
  ]);
  if (!superior) {
    throw { message: "User's new superior does not exist" };
  }
  superior.dsList = [...superior.dsList, { id: user.id, rank: user.rank }]
    .sort((a, b) => Number(b.rank) - Number(a.rank))
    .map(u => u.id);
  await superior.save();
};

const removeUserFromSuperior = async (userId, superiorId) => {
  const superior = await User.findById(superiorId);
  if (!superior) {
    throw { message: "User's previous superior does not exist" };
  }
  superior.dsList = superior.dsList.filter(id => id.toString() !== userId);
  await superior.save();
};

const addUser = async (userInfo, res) => {
  let user;
  try {
    user = new User({ ...userInfo });
    await user.save();
    await addUserToSuperior(user, user.superior);
    return res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error.message);
    await user.remove();
    return errorHandling(res, 500, 'Unable to add user at this time.');
  }
};

const updateUser = async (updatedUserInfo, res) => {
  try {
    let user = await User.findById(updatedUserInfo.id);
    if (!user) {
      return errorHandling(res, 400, 'Unable to update user info.');
    }
    if (user.superior) {
      if (updatedUserInfo.superior) {
        if (user.superior.toString() !== updatedUserInfo.superior.toString()) {
          await removeUserFromSuperior(
            user.id.toString(),
            user.superior.toString()
          );
          await addUserToSuperior(user, updatedUserInfo.superior.toString());
        }
      } else {
        await removeUserFromSuperior(
          user.id.toString(),
          user.superior.toString()
        );
      }
    } else if (updatedUserInfo.superior) {
      await addUserToSuperior(user, updatedUserInfo.superior.toString());
    }
    Object.assign(user, { ...updatedUserInfo });
    console.log(user);
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return errorHandling(res, 500, error.message);
  }
};

const deleteUser = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return errorHandling(res, 400, 'Delete Failed. The user does not exist');
    }
    if (user.superior) {
      await removeUserFromSuperior(
        user.id.toString(),
        user.superior.toString()
      );
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
  updateUser,
  deleteUser,
};
