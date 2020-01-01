const randomNames = require('./randomNames');

const randomPhoneNumber = numOfNumbers => {
  const numbers = [];
  const min = 2000000000;
  const max = 9999999999;
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
  return names.map((n, i) => ({
    name: `${n.firstName} ${n.lastName}`,
    sex: n.sex,
    phone: phoneNumbers[i],
    email: emailGenerator(n.firstName, n.lastName, n.dob),
    rank: Math.floor(Math.random() * 9),
  }));
};

module.exports = dummyUserBasic;
