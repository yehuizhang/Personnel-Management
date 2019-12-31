const firstNames = require('./firstNames-50');
const lastNames = require('./lastNames-30');

const randomPick = list => {
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
};

module.exports = function(numOfNames = 10) {
  const names = [];
  for (let i = 0; i < numOfNames; i++) {
    const first = randomPick(firstNames);
    const last = randomPick(lastNames);
    names.push({
      firstName: first[0],
      lastName: last,
      sex: first[1],
    });
  }
  return names;
};
