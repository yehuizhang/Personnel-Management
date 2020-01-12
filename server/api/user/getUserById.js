const User = require('../../models/users');
const { rankToNumber } = require('./util');

const getUserById = async (id, res) => {
  try {
    const user = await User.findById(id)
      .populate('superior', ['id', 'name'])
      .populate('dsList', 'rank')
      .exec();
    if (!user) {
      return res
        .status(400)
        .send('Unable to get user. The user does not exist.');
    }

    return res.json(resultProcess(user));
  } catch (error) {
    console.error(error);
    return res.status(500).send('Unable to retrieve user from db');
  }
};

const resultProcess = result => {
  const user = result.toObject();
  if (user.__v) delete user.__v;
  user.id = user._id;
  delete user._id;
  if (user.superior) {
    user.superior.id = user.superior._id;
    delete user.superior._id;
  }

  if (user.dsList.length === 0) {
    user.minRank = 0;
  } else {
    user.dsList = user.dsList.map(ds => ({ id: ds._id, rank: ds.rank }));
    user.minRank = rankToNumber[user.dsList[0].rank] + 1;
  }
  if (user.startDate) {
    user.startDate = user.startDate.toISOString().substring(0, 10);
  }
  return user;
};

module.exports = getUserById;
