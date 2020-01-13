const User = require('../../models/users');
const { addUserToSuperior, removeUserFromSuperior } = require('./util');

const editUser = async (updatedUserInfo, res) => {
  const { id, superior, rank } = updatedUserInfo;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .send('Unable to update user. The user does not exist.');
    }
    if (user.superior) {
      const prevSupId = user.superior.toString();
      if (prevSupId !== superior) {
        await removeUserFromSuperior(id, prevSupId);
      }
      if (superior) {
        await addUserToSuperior(id, rank, superior);
      }
    } else if (superior) {
      await addUserToSuperior(id, rank, superior);
    }

    Object.assign(user, { ...updatedUserInfo });
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Edit failed. Internal error.');
  }
};

module.exports = editUser;
