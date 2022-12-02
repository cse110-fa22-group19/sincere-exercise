/**
 * File that contains functions to support routing of web application
 */

export const route = {};

/**
 * Routes to the View Entry Page
 * @param {Element} currentPage - the current page node to route out of
 * @param {Entry} entry - the entry object to set attribute of
 */
route.routeToViewEntryPage = (currentPage, entry) => {
  const viewEntryPage = document.createElement('view-entry-page');
  viewEntryPage.setAttribute('data', JSON.stringify(entry));
  currentPage.replaceWith(viewEntryPage);
};

/**
 * Routes to the Input Entry Page
 * @param {Element} currentPage - the current page node to route out of
 * @param {Entry} entry - the entry object to set attribute of
 */
route.routeToInputEntryPage = (currentPage, entry) => {
  const inputEntryPage = document.createElement('input-entry-page');
  inputEntryPage.setAttribute('data', JSON.stringify(entry));
  currentPage.replaceWith(inputEntryPage);
};

/**
 * Routes to the Home Page
 * @param {Element} currentPage - the current page node to route out of
 */
route.routeToHomePage = (currentPage) => {
  const homePage = document.createElement('home-page');
  currentPage.replaceWith(homePage);
};
