import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('inputEntryPageLoaded', () => {
  // Event handlers
  cancelUpdateEntryEvent();
  updateEntryEvent();
});

function cancelUpdateEntryEvent() {
  document.querySelector('input-entry-page').addEventListener('cancelInputEntry', (event) => {
    const newEntry = event.data;
    routeToViewPage(newEntry);
  });
}

/**
 * Updates the currently view entry
 */
function updateEntryEvent() {
  document.addEventListener('saveEntry', (event) => {
    const newEntry = event.data;
    updateEntryItem(newEntry);
  });
}

/**
 * Updates the entry with the new entry using the newEntry's __id value
 * If newEntry DNE in database, don't update the dom.
 * @param {Entry} newEntry - the new entry value to update to
 */
function updateEntryItem(newEntry) {
  entryEntity.updateEntry(newEntry);
  // replace child from input entry to view entry
  routeToViewPage(newEntry);
}

/**
 * Switches Input Entry Page with View Entry Page
 * @param {Entry} entry - the entry object to set attribute of
 */
function routeToViewPage(entry) {
  const inputPage = document.querySelector('input-entry-page');
  const viewEntryPage = document.createElement('view-entry-page');
  viewEntryPage.setAttribute('data', JSON.stringify(entry));
  inputPage.replaceWith(viewEntryPage);
}
