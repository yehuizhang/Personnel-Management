const User = require('../../models/users');
const { rankToNumber, numberToRank } = require('./util');

const getUserById = async (id, res) => {
  try {
    const user = await User.findById(id)
      .populate('superior', ['id', 'name'])
      .populate('dsList', ['name', 'rank'])
      .exec();
    if (!user) {
      return res
        .status(400)
        .send('Unable to get user. The user does not exist.');
    }

    const processedUser = await resultProcess(user);
    return res.json(processedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Unable to retrieve user from db');
  }
};

const resultProcess = async result => {
  const user = result.toObject();
  if (user.__v) delete user.__v;
  user.id = user._id;
  delete user._id;
  if (user.superior) {
    user.superior.id = user.superior._id;
    delete user.superior._id;
  }
  user.potentialSuperiors = await getPotentialSuperiors(user.dsList);
  if (user.dsList.length === 0) {
    user.minRank = 0;
  } else {
    user.minRank = rankToNumber[user.dsList[0].rank] + 1;
  }

  if (user.dsList.length === 0) {
    delete user.dsList;
  }
  if (user.startDate) {
    user.startDate = user.startDate.toISOString().substring(0, 10);
  }
  return user;
};

const getPotentialSuperiors = async dsList => {
  let sups = [];
  if (dsList.length === 0) {
    sups = await User.find({ rank: { $ne: 'Private' } }, 'name rank');
  } else {
    const supMinLevel = rankToNumber[dsList[0].rank] + 1;
    if (supMinLevel >= numberToRank.length) {
      return sups;
    }
    const supRanks = numberToRank
      .filter((val, i) => i >= supMinLevel)
      .map(val => ({ rank: val }));
    sups = await User.find({ $or: supRanks }, 'name rank');
  }

  sups.sort((a, b) => rankToNumber[a.rank] - rankToNumber[b.rank]);
  sups = sups.map(sup => {
    return { id: sup._id, rank: sup.rank, name: sup.name };
  });

  return sups;
};

module.exports = getUserById;
