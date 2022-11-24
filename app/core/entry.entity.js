export const entryEntity = {};

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
entryEntity.createId = (startTime) => {
  return startTime.toJSON() + (Math.floor(Math.random() * 90000) + 10000);
};

/**
 * Populate the entry page with a defalut-value entry
 * @returns {Entry} an entry object containing the __id as well
 */
entryEntity.createEntry = () => {
  const now = new Date();
  const later = new Date();
  later.setHours(now.getHours() + 2);

  const entryId = entryEntity.createId(now);

  // Create hardcoded entry to save
  const newEntry = {
    __id: entryId,
    workoutType: 'What is the activity to record?',
    location: 'What is the location of this record?',
    startTime: now.toJSON(),
    endTime: later.toJSON(),
    intensity: 0,
    note: 'Any additional note to record?',
  };

  const entries = entryEntity.getAllEntries();
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
};

/**
 * Retrive the dictionary of entries from localStorage and return all
 * saved entries in a list
 * @returns {Entry[]} a list of Entry objects
 */
entryEntity.getAllEntries = () => {
  const entries = localStorage.getItem('entries');
  if (!entries) {
    return {};
  }
  return JSON.parse(entries);
};

/**
 * Delete the entry component with the key of the index
 * @param {number} __id - The unique key for the entry component
 */
entryEntity.deleteEntry = (__id) => {
  const entries = entryEntity.getAllEntries();
  delete entries[__id];
  localStorage.setItem('entries', JSON.stringify(entries));
};

/**
 * Populate the entry page with the user input, assign new id and update the all
 * entries by passing them in this function
 * @param {Entry} entry - Pass the entry objects that we want to update
 * @returns {number} - if updated correctly, the function will return the ID of the
 * entries that has been updated, if failed, it will return -1
 */
entryEntity.updateEntry = (entry) => {
  const entries = entryEntity.getAllEntries();
  if (typeof entries[entry.__id] === 'undefined') {
    return -1;
  } else {
    entries[entry.__id] = entry;
    localStorage.setItem('entries', JSON.stringify(entries));
    return entry.__id;
  }
};

/**
 * Get a single entry by __id and return it from the local storage
 * @param {number} __id - The ID of the entry that we want to retrieve
 * @returns {Entry} - returns the entry in local storage represented by that ID.
 */
entryEntity.getEntry = (__id) => {
  const entries = entryEntity.getAllEntries();
  return entries[__id];
};
