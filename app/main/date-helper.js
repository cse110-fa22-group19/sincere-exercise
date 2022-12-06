/**
 * Helper function for formatting Date values to displayable strings
 */

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
function formatFullDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
}

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date);
}

/**
 * Takes in a JSON Stringified Date object and returns a formatted string
 * of a date
 * @param {string} dateString - JSONed string of the date object
 */
function formatTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
  }).format(date);
}
