/**
 * Populate the entry page with a defalut-value entry
 */
function createEntry() {
  const now = new Date();
  const later = new Date();
  later.setHours(now.getHours() + 2);

  // get localstorage entries
  const newEntry = {
    __id: now,
    workoutType: 'Soccer',
    location: 'UCSD Soccer Field',
    startTime: now,
    endTime: later,
    intensity: 3,
    note: 'This was a pretty long match, so I ended up running a lot.',
  };
  const entries = getAllEntries();
  // if no entries exist
  if (entries.keys().length === 0) {
    let entries = {
      [now.toJSON()]: newEntry,
    };
    localStorage.setItem('entries', JSON.stringify(entries));
  }
  // if there are existing entries
  else {
    entries[now.toJSON()] = newEntry;
    localStorage.setItem('entries', JSON.stringify(entries));
  }
}

/**
 * Retrive the dictionary of entries from localStorage
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
 * @param {integer} __id - The unique key for the entry component in the localStorage
 */
function deleteEntry(__id) {
  const entries = getAllEntries();
  delete entries[__id];
  localStorage.setItem('entries', JSON.stringify(entries));
}
