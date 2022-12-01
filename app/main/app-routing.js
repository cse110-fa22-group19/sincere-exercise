/**
 * File that contains functions to support routing of web application
 */

/**
 * Routes to the View Entry Page
 * @param {Node} currentPage - the current page node to route out of
 * @param {Entry} entry - the entry object to set attribute of
 */
export function routeToViewEntryPage(currentPage, entry) {
  const viewEntryPage = document.createElement('view-entry-page');
  viewEntryPage.setAttribute('data', JSON.stringify(entry));
  currentPage.replaceWith(viewEntryPage);
}

/**
 * Routes to the Input Entry Page
 * @param {Node} currentPage - the current page node to route out of
 * @param {Entry} entry - the entry object to set attribute of
 */
export function routeToInputEntryPage(currentPage, entry) {
  const inputEntryPage = document.createElement('input-entry-page');
  inputEntryPage.setAttribute('data', JSON.stringify(entry));
  currentPage.replaceWith(inputEntryPage);
}

/**
 * Routes to the Home Page
 * @param {Node} currentPage - the current page node to route out of
 * @param {Entry} entry - the entry object to set attribute of
 */
export function routeToHomePage(currentPage, entry) {
  const homePage = document.createElement('home-entry-page');
  currentPage.replaceWith(inputPage);
}
