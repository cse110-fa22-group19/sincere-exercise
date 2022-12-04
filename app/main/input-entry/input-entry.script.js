import { entryEntity } from '../../core/entry.entity.js';
import { route } from '../app-routing.js';

/**
 * The file that contains all of the input entry's event handling and
 * functionality
 */

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
    entryEntity.updateEntry(newEntry);
    route.routeToViewEntryPage(inputEntryPage, newEntry);
  });
}
