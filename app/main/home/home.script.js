import { entryEntity } from '../../core/entry.entity.js';

window.addEventListener('DOMContentLoaded', () => {
  // getAllEntries here
  console.log('loaded');
  addEntryToList();
  // createEntryItem();
  // entryUpdates();
});

function addEntryToList() {
  const newEntryButton = document.querySelector('new-entry-button');
  newEntryButton.addEventListener('addNewEntry', () => {
    const entryItem = createEntryItem();
    const entryList = document.querySelector('#entry-list');
    entryList.appendChild(entryItem);
  });
}

function createEntryItem() {
  const newEntryEntity = entryEntity.createEntry();
  const entryItem = document.createElement('entry-item-component');
  entryItem.setAttribute('data', newEntryEntity);
  entryItem.addEventListener('deleteEntry', () => {
    if (!!newEntryEntity) {
      entryEntity.deleteEntry(newEntryEntity.__id);
    } else {
      console.error(`ERROR: entity data object of this entry does not exist!`);
    }
  });
  return entryItem;
}
