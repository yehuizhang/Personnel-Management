const User = require('../../models/users');

const rankToNumber = {
  Private: 0,
  Specialist: 1,
  Corporal: 2,
  Sergeant: 3,
  'Warrant Officer': 4,
  Lieutenant: 5,
  Captain: 6,
  Major: 7,
  Colonel: 8,
  General: 9,
};

const numberToRank = [
  'Private',
  'Specialist',
  'Corporal',
  'Sergeant',
  'Warrant Officer',
  'Lieutenant',
  'Captain',
  'Major',
  'Colonel',
  'General',
];

const addUserToSuperior = async (id, rank, superiorId) => {
  const superior = await User.findById(superiorId).populate('dsList', [
    'id',
    'rank',
  ]);
  if (!superior) {
    throw { message: "User's new superior does not exist" };
  }
  superior.dsList = [...superior.dsList, { id, rank }]
    .sort((a, b) => rankToNumber[b.rank] - rankToNumber[a.rank])
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

module.exports = {
  addUserToSuperior,
  removeUserFromSuperior,
  rankToNumber,
  numberToRank,
};
