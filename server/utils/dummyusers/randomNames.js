const firstNames = require('./firstNames-50');
const lastNames = require('./lastNames-30');
const randomDates = require('./randomDates');

const randomPick = list => {
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
};

module.exports = function(numOfNames = 10) {
  const dobs = randomDates('1970-01-01', '1999-12-25', numOfNames);
  return dobs.map(dob => {
    const user = {};
    const firstAndSex = randomPick(firstNames);
    user.firstName = firstAndSex[0];
    user.sex = firstAndSex[1];
    user.dob = dob;
    user.lastName = randomPick(lastNames);
    return user;
  });
};
