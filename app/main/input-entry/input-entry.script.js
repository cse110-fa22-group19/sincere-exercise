import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('inputEntryPageLoaded', () => {
  // Event handlers
  cancelUpdateEntryEvent();
  updateEntryEvent();
});

function cancelUpdateEntryEvent() {
  const entryInputPage = document.querySelector('input-entry-page');
  entryInputPage.addEventListener('cancelInputEntry', (event) => {
    const newEntry = event.data;
    routeToViewPage(newEntry);
  });
}

/**
 * Updates the currently view entry
 */
function updateEntryEvent() {
  const entryInputPage = document.querySelector('input-entry-page');
  entryInputPage.addEventListener('saveEntry', (event) => {
    const newEntry = event.data;
    console.log('new entry', newEntry);
    entryEntity.updateEntry(newEntry);
    routeToViewPage(newEntry);
  });
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
