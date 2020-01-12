const User = require('../../models/users');

// sort by length of dsList
// https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array

const getUserList = async (
  { sortBy, sortDirection, search, page, dsList },
  res
) => {
  const options = {
    page: page || 1,
    limit: 5,
    populate: { path: 'superior', select: ['id', 'name'] },
  };

  if (sortBy) {
    options.sort = {
      [sortBy]: sortDirection || 'asc',
    };
  }

  const query = {};
  if (search) {
    query['$text'] = {
      $search: search,
    };
  }
  if (dsList) {
    query['$or'] = dsList.map(ds => ({
      _id: ds,
    }));
  }

  try {
    const result = await User.paginate(query, options);
    return res.json(resultProcess(result));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Unable to retrieve user list from db');
  }
};

const resultProcess = result => {
  const { docs, page, totalPages } = result;
  const users = docs.map(doc => {
    doc = doc.toObject();
    const user = { ...doc, id: doc._id };
    delete user.__v;
    delete user._id;
    if (user.superior) {
      user.superior = {
        id: user.superior._id,
        name: user.superior.name,
      };
    }
    if (user.startDate) {
      user.startDate = user.startDate.toISOString().substring(0, 10);
    }
    return user;
  });
  return {
    users,
    page,
    totalPages,
  };
};

module.exports = getUserList;
