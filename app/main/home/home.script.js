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
    routeToInputPage(newEntryEntity);
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

  //Adds Navigation from entry item to viewpage
  entryItem.addEventListener('navToView', () => {
    // get current id
    const homePage = document.querySelector('home-page');
    const viewEntryPage = document.createElement('view-entry-page');
    // function x(id) to fill out page
    viewEntryPage.setAttribute('data', JSON.stringify(entry));
    const parentNode = homePage.parentNode;
    parentNode.replaceChild(viewEntryPage, homePage);
  });

  entryList.appendChild(entryItem);
}

/**
 * Switches Input Entry Page with View Entry Page
 * @param {Entry} entry - the entry object to set attribute of
 */
function routeToInputPage(entry) {
  const homePage = document.querySelector('home-page');
  const inputEntryPage = document.createElement('input-entry-page');
  inputEntryPage.setAttribute('data', JSON.stringify(entry));
  homePage.replaceWith(inputEntryPage);
}
