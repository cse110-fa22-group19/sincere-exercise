import puppeteer from 'puppeteer';

/**
 * View/Edit-Entry Page End to End tests
 * Contains tests that test the View/Edit-Entry page interface functionality.
 * Actions to test: click on an entry to navigate to view-entry page, navigate between view and edit entry pages
 */

describe('View Entry end to end user flows', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    console.log('User must have Live Server running on Port 5500');
    await page.goto('http://localhost:5500'); // Change it to github link.
  });
  /*
User Flow 1
    Click on an entry, then we go to the view entry page
    Click go back, we go back
User Flow 2
    Click to view entry
    Click edit entry, go to edit entry page
    Click Cancel, go back to view entry page
    Click back to go back home
*/
  describe('Navigate between home page and view-entry page', () => {
    let home;
    let EntryElement;

    beforeAll(async () => {
      home = await page.$('home-page');
      EntryElement = await home.$('entry-item-component');
    });

    test('Page changes to view_entry page', async () => {
      const ViewEntry = await page.$('title');
      //console.log();
      const inText = await ViewEntry.getProperty('innerText');
      const innerString = await inText.jsonValue();
      expect(innerString).toBe('View Mode');
    });
  });
});
