import { entryEntity } from '../../core/entry.entity.js';
import { route } from '../app-routing.js';

window.addEventListener('homePageLoaded', () => {
  // On Load work
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
    const homePage = document.querySelector('home-page');
    route.routeToInputEntryPage(homePage, newEntryEntity);
  });
}

/**
 * Creates an entry-item-component and appends the component to the entry-list
 * @param {Entry} entry - the entry entity object to set to data of new entry item
 */
function createEntryItem(entry) {
  const entryItem = document.createElement('entry-item-component');
  const entryList = document.querySelector('#entry-list');
  entryItem.setAttribute('data', JSON.stringify(entry));
  entryItem.addEventListener('deleteEntry', () => {
    if (!!entry) {
      entryEntity.deleteEntry(entry.__id);
      entryItem.remove();
    } else {
      console.error(`ERROR: entity data object of this entry does not exist!`);
    }
  });

  // Adds Navigation from entry item to viewpage
  entryItem.addEventListener('viewEntry', () => {
    const homePage = document.querySelector('home-page');
    route.routeToViewEntryPage(homePage, entry);
  });

  entryList.appendChild(entryItem);
}
