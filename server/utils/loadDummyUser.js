const User = require('../models/users');
let preDefinedUsers = require('../utils/predefinedUsers');
const ObjectId = require('mongoose').Types.ObjectId;

const loadDummyUser = async () => {
  const ids = [];
  for (let i = 0; i < preDefinedUsers.length; i++) {
    ids.push(ObjectId());
  }

  try {
    const docCount = await User.estimatedDocumentCount();
    if (docCount === 0) {
      preDefinedUsers = preDefinedUsers.map(raw => {
        const user = { ...raw, _id: ids[raw._id] };
        if (raw.superior !== undefined) {
          user.superior = ids[raw.superior];
        }
        if (raw.dsList !== undefined) {
          user.dsList = raw.dsList.map(ds => ids[ds]);
        }
        return user;
      });
      await User.insertMany(preDefinedUsers);
    }
  } catch (error) {
    console.error('Load dummy user failed.\n', error);
  }
};

module.exports = loadDummyUser;
