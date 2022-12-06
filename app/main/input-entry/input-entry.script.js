import { entryEntity } from '../../core/entry.entity.js';
import { route } from '../app-routing.js';

window.addEventListener('inputEntryPageLoaded', () => {
  // Event handlers
  cancelUpdateEntryEvent();
  updateEntryEvent();
});

function cancelUpdateEntryEvent() {
  const inputEntryPage = document.querySelector('input-entry-page');
  inputEntryPage.addEventListener('cancelInputEntry', (event) => {
    const newEntry = event.data;
    route.routeToViewEntryPage(inputEntryPage, newEntry);
  });
}

/**
 * Updates the currently view entry
 */
function updateEntryEvent() {
  const inputEntryPage = document.querySelector('input-entry-page');
  inputEntryPage.addEventListener('saveEntry', (event) => {
    const newEntry = event.data;
    console.log('Entry after clicked save entry', newEntry);
    entryEntity.updateEntry(newEntry);
    route.routeToViewEntryPage(inputEntryPage, newEntry);
  });
}
