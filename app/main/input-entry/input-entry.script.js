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
    for (var prop in newEntry){
      // console.log(prop +" "+newEntry[prop]);
      if(newEntry[prop] == null || newEntry[prop] == ''){
        alert("All Prompts Not Filled!");
        return;
      }
    }
    entryEntity.updateEntry(newEntry);
    route.routeToViewEntryPage(inputEntryPage, newEntry);
  });
}
