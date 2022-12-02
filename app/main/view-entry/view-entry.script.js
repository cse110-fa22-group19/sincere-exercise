import { route } from '../app-routing.js';

window.addEventListener('viewEntryPageLoaded', () => {
  // Event handlers
  editEntryEvent();
  backHomeEvent();
});

function editEntryEvent() {
  const viewEntryPage = document.querySelector('view-entry-page');
  viewEntryPage.addEventListener('editEntry', (event) => {
    const entry = event.data;
    route.routeToInputEntryPage(viewEntryPage, entry);
  });
}

function backHomeEvent() {
  const viewEntryPage = document.querySelector('view-entry-page');
  viewEntryPage.addEventListener('backHome', () => {
    route.routeToHomePage(viewEntryPage);
  });
}
