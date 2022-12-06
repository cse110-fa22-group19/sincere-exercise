/**
 * Helper function for formatting Date values to displayable strings
 */

export const dateHelper = {};

/**
 * Takes in the date and time and transforms it into a stringified
 * Date object
 * @param {string} date
 * @param {string} time
 * @returns JSON string Date object
 */
dateHelper.buildDateObject = (date, time) => {
  return new Date(`${date} ${time}`).toJSON();
};

/**
 * Takes in a JSON Stringified Date object and returns a string parsable
 * by input element value attribute for the date.
 * @param {string} dateString
 * @returns yyyy-mm-dd format of the JSON Stringified Date object
 */
dateHelper.formatDateValue = (dateString) => {
  const date = new Date(dateString);
  const [month, day, year] = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
    })
    .split('/');
  return `${year}-${month}-${day}`;
};

/**
 * Takes in a JSON Stringified Date object and returns a string parsable
 * by input element value attribute for the time.
 * @param {string} dateString
 * @returns HH:mm:ss, formate of the time string
 */
dateHelper.formatTimeValue = (dateString) => {
  const date = new Date(dateString);
  return date.toTimeString().split(' ')[0];
};

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
dateHelper.formatFullDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
};

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
dateHelper.formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date);
};

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
dateHelper.formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
  }).format(date);
};
