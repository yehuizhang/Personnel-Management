const User = require('../../models/users');

// sort by length of dsList
// https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array

const getUserList = ({ sortBy, sortDirection, search, page, users }, res) => {
  // console.time('Measure getUserList time');
  const options = {
    lean: true,
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
  if (users) {
    query['$or'] = users.map(user => ({
      _id: user,
    }));
  }

  User.paginate(query, options, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Unable to retrieve user list from db');
    }
    res.json(resultProcess(result));
  });
};

const resultProcess = result => {
  const { docs, page, totalPages, totalDocs } = result;
  const users = docs.map(doc => {
    const user = { ...doc, id: doc._id };
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
  // console.timeEnd('Measure getUserList time');
  return {
    users,
    page,
    totalPages,
    totalDocs,
  };
};

module.exports = getUserList;
