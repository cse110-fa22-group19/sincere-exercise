import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('DOMContentLoaded', () => {
  // getAllEntries here
  console.log('loaded');
  addEntryEvent();
  getAllEntriesEvent();
});

/**
 * Gets all entries from localStorage and displays them on the home page.
 */
function getAllEntriesEvent() {
  const existingEntries = entryEntity.getAllEntries();
  existingEntries.forEach((entry) => {
    createEntryItem(entry);
  });
}

/**
 * Creates a new entry entity and displays the saved entry on the home page.
 */
function addEntryEvent() {
  const newEntryButton = document.querySelector('new-entry-button');
  newEntryButton.addEventListener('addNewEntry', () => {
    const newEntryEntity = entryEntity.createEntry();
    const newEntryItem = createEntryItem(newEntryEntity);
    appendEntryToList(newEntryItem);
  });
}

/**
 * Creates an entry-item-component and appends the component to the entry-list
 * @param {Entry} entry - the entry entity object to set to data of new entry item
 */
function createEntryItem(entry) {
  const entryItem = document.createElement('entry-item-component');
  const entryList = document.querySelector('#entry-list');
  entryItem.setAttribute('data', entry);
  entryItem.addEventListener('deleteEntry', () => {
    if (!!entry) {
      entryEntity.deleteEntry(entry.__id);
      entryItem.remove();
    } else {
      console.error(`ERROR: entity data object of this entry does not exist!`);
    }
  });
  entryList.appendChild(entryItem);
}
