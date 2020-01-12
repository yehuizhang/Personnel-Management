const User = require('../../models/users');
const { addUserToSuperior } = require('./util');

const addUser = async (userInfo, res) => {
  let user;
  try {
    user = new User({ ...userInfo });
    await user.save();
    if (user.superior) {
      await addUserToSuperior(user.id, user.rank, user.superior);
    }
    return res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error.message);
    await user.remove();
    return res.status(500).send('Unable to add user at this time.');
  }
};

module.exports = addUser;
