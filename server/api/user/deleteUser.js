const User = require('../../models/users');
const { removeUserFromSuperior } = require('./util');

const deleteUser = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .send('Unable to delete user. The user does not exist.');
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
    return res.status(500).send('Delete failed. Internal error.');
  }
};

module.exports = deleteUser;
