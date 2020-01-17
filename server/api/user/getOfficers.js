const User = require('../../models/users');
const { rankToNumber } = require('./util');

const getOfficers = res => {
  // console.time('Get officer time');
  User.find(
    { rank: { $ne: 'Private' } },
    'name rank',
    { lean: true },
    (err, docs) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Can't get officers now. Internal error");
      }
      docs.sort((a, b) => rankToNumber[a.rank] - rankToNumber[b.rank]);
      docs = docs.map(doc => ({ id: doc._id, rank: doc.rank, name: doc.name }));
      // console.timeEnd('Get officer time');
      return res.json({ officers: docs });
    }
  );
};

module.exports = getOfficers;
