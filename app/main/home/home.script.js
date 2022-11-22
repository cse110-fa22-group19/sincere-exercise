import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('DOMContentLoaded', () => {
  // Initialization work
  getAllEntries();

  // Event handlers
  addEntryEvent();
});

/**
 * Gets all entries from localStorage and displays them on the home page.
 */
function getAllEntries() {
  const existingEntries = Object.values(entryEntity.getAllEntries());
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
    createEntryItem(newEntryEntity);
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
