const randomNames = require('./randomNames');
const randomDates = require('./randomDates');

const ranks = [
  ['Private', 0],
  ['Specialist', 1],
  ['Corporal', 2],
  ['Sergeant', 3],
  ['Warrant Officer', 4],
  ['Lieutenant', 5],
  ['Captain', 6],
  ['Major', 7],
  ['Colonel', 8],
  ['General', 9],
];

const randomPhoneNumber = numOfNumbers => {
  const numbers = [];
  const min = 4080000000;
  const max = 4099999999;
  while (numbers.length < numOfNumbers) {
    const n = min + Math.floor((max - min) * Math.random());
    if (!numbers.includes(n)) {
      numbers.push(n);
    }
  }

  return numbers.map(num => {
    const numString = String(num);
    return `${numString.substring(0, 3)}-${numString.substring(
      3,
      6
    )}-${numString.substring(6)}`;
  });
};

const emailGenerator = (firstName, lastName, dob) => {
  return `${firstName.substring(0, 4)}${lastName.substring(
    0,
    2
  )}${dob.substring(0, 4)}@dod.gov`.toLowerCase();
};

const dummyUserBasic = (numOfUsers = 10) => {
  const names = randomNames(numOfUsers);
  const phoneNumbers = randomPhoneNumber(numOfUsers);
  const startDates = randomDates(numOfUsers, '1975-01-01', '2020-01-01');
  return names.map((n, i) => ({
    _id: i,
    name: `${n.firstName} ${n.lastName}`,
    sex: n.sex,
    phone: phoneNumbers[i],
    email: emailGenerator(n.firstName, n.lastName, n.dob),
    rank: ranks[Math.floor(Math.random() * 9)][0],
    startDate: startDates[i],
  }));
};

module.exports = dummyUserBasic;
