import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('DOMContentLoaded', () => {
  // getAllEntries here
  console.log('loaded');
  createEntryItem();
});

function createEntryItem() {
  const newEntryButton = document.querySelector('new-entry-button');
  newEntryButton.addEventListener('addNewEntry', () => {
    const newEntry = entryEntity.createEntry();
  });
}
