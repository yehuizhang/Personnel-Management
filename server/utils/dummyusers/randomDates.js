const moment = require('moment');

/**
 * Generate a list of random dates between the start and end dates (inclusive)
 * @param {String} start
 * @param {String} end
 * @param {String} format
 * @param {Number} numOfDates
 */

module.exports = function(
  numOfDates = 50,
  start = '1980-01-01',
  end = '2020-01-01',
  format = 'YYYY-MM-DD'
) {
  const range = moment(end).diff(moment(start), 'days');
  const dates = [];

  for (let i = 0; i < numOfDates; i++) {
    const days = Math.floor(Math.random() * (range + 1));
    const date = moment(start)
      .add(days, 'days')
      .format(format);
    dates.push(date);
  }
  return dates;
};
