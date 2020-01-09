import React from 'react';

import UserForm from '../layout/UserForm';

// const rankNameToLevel = new Map([
//   ['Private', 0],
//   ['Specialist', 1],
//   ['Corporal', 2],
//   ['Sergeant', 3],
//   ['Warrant Officer', 4],
//   ['Lieutenant', 5],
//   ['Captain', 6],
//   ['Major', 7],
//   ['Colonel', 8],
//   ['General', 9],
// ]);

// const rankLevels = [
//   ['Private', 'https://i.ibb.co/wSjWFhy/rank-0.jpg'],
//   ['Specialist', 'https://i.ibb.co/8rNRX7h/rank-1.jpg'],
//   ['Corporal', 'https://i.ibb.co/GW18ZW2/rank-2.jpg'],
//   ['Sergeant', 'https://i.ibb.co/fFS560p/rank-3.jpg'],
//   ['Warrant Officer', 'https://i.ibb.co/pdDhmp1/rank-4.jpg'],
//   ['Lieutenant', 'https://i.ibb.co/p1PWjD4/rank-5.jpg'],
//   ['Captain', 'https://i.ibb.co/PGZXVXm/rank-6.jpg'],
//   ['Major', 'https://i.ibb.co/xqgzDHG/rank-7.jpg'],
//   ['Colonel', 'https://i.ibb.co/LdbrgQW/rank-8.jpg'],
//   ['General', 'https://i.ibb.co/xqnKFnm/rank-9.jpg'],
// ];

const CreateUser = () => {
  return <UserForm userData={{ minRank: 0 }} />;
};

export default CreateUser;
