module.exports = { createId, createEntry, getAllEntries, deleteEntry };

/**
 * Entry Entity
 * Contains the methods for the CRUD functionality of the Entry entity
 * Functions: createId(startTime), createEntity(), getAllEntries(), deleteEntry(__id)
 *
 * Entry {
 *   __id: string,
 *   workoutType: string,
 *   location: string,
 *   startTime: string, (JSON parsable to Date)
 *   endTime: string, (JSON parsable to Date)
 *   intensity: number,
 *   note: string,
 * }
 */

/**
 * Creates a unique id for an entry. Concats the startTime and 5 digit
 * random number together.
 * @returns {string} a string value as the id of the entry
 */
function createId(startTime) {
  return startTime.toJSON() + (Math.floor(Math.random() * 90000) + 10000);
}

/**
 * Populate the entry page with a defalut-value entry
 * @returns {Entry} an entry object containing the __id as well
 */
function createEntry() {
  const now = new Date();
  const later = new Date();
  later.setHours(now.getHours() + 2);

  const entryId = createId(now);

  // Create hardcoded entry to save
  const newEntry = {
    __id: entryId,
    workoutType: 'Soccer',
    location: 'UCSD Soccer Field',
    startTime: now.toJSON(),
    endTime: later.toJSON(),
    intensity: 3,
    note: 'This was a pretty long match, so I ended up running a lot.',
  };

  const entries = getAllEntries();
  if (entries === {}) {
    let entries = {
      [entryId]: newEntry,
    };
    localStorage.setItem('entries', JSON.stringify(entries));
  } else {
    entries[entryId] = newEntry;
    localStorage.setItem('entries', JSON.stringify(entries));
  }
  return newEntry;
}

/**
 * Retrive the dictionary of entries from localStorage and return all
 * saved entries in a list
 * @returns {Entry[]} a list of Entry objects
 */
function getAllEntries() {
  const entries = localStorage.getItem('entries');
  if (!entries) {
    return {};
  }
  return JSON.parse(entries);
}

/**
 * Delete the entry component with the key of the index
 * @param {integer} __id - The unique key for the entry component
 */
function deleteEntry(__id) {
  const entries = getAllEntries();
  delete entries[__id];
  localStorage.setItem('entries', JSON.stringify(entries));
}
