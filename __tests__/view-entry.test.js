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
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    console.log('User must have Live Server running on Port 5500');
    await page.goto('http://localhost:5500'); // Change it to github link.
  });

  describe('Navigate between home page and view-entry page', () => {
    let home;
    let entryElement;
    let newEntryButtonElement;
    let newEntryButton;
    let backButton;
    let viewEntrypage;
    let homePage;
    let viewEntry;

    beforeAll(async () => {
      home = await page.$('home-page');
      newEntryButtonElement = await home.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
      await newEntryButton.click();
    });

    test('Page changes to view_entry page', async () => {
      entryElement = await home.$('entry-item-component');
      await entryElement.click();
      viewEntry = await page.$('view-entry-page');
      homePage = await page.$('home-page');
      expect(homePage === null && viewEntry !== null).toBe(true);
    });

    test('Page changes back to home page', async () => {
      viewEntrypage = await page.$('#top_flexbox');
      backButton = await viewEntrypage.$('#back_button');
      await backButton.click();
      await page.waitForNavigation();
      homePage = await page.$('home-page');
      viewEntry = await page.$('view-entry-page');
      expect(homePage !== null && viewEntry === null).toBe(true);
    });
  });

  describe('Navigate between home page and view-entry page and edit-entry page', () => {
    let home;
    let entryElement;
    let newEntryButtonElement;
    let newEntryButton;
    let backButton;
    let viewEntrypage;
    let homePage;
    let viewEntry;
    let edit_button;
    let inputEntry;

    beforeAll(async () => {
      home = await page.$('home-page');
      newEntryButtonElement = await home.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
      await newEntryButton.click();
    });

    test('Page changes to view_entry page', async () => {
      entryElement = await home.$('entry-item-component');
      await entryElement.click();
      viewEntry = await page.$('view-entry-page');
      homePage = await page.$('home-page');
      expect(homePage === null && viewEntry !== null).toBe(true);
    });

    test('Page changes to edit_entry page', async () => {
      viewEntrypage = await page.$('#top_flexbox');
      edit_button = await viewEntrypage.$('#edit_button');
      await edit_button.click();
      inputEntry = await page.$('input-entry-page');
      viewEntry = await page.$('view-entry-page');
      expect(inputEntry !== null && viewEntry === null).toBe(true);
    });

    test('Page changes from edit_entry to view-entry page', async () => {
      edit_button = await page.$('#cancel_button');
      await edit_button.click();
      inputEntry = await page.$('input-entry-page');
      viewEntry = await page.$('view-entry-page');
      expect(inputEntry === null && viewEntry !== null).toBe(true);
    });

    test('Page changes back to home page', async () => {
      viewEntrypage = await page.$('#top_flexbox');
      backButton = await viewEntrypage.$('#back_button');
      await backButton.click();
      await page.waitForNavigation();
      homePage = await page.$('home-page');
      viewEntry = await page.$('view-entry-page');
      expect(homePage !== null && viewEntry === null).toBe(true);
    });
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});
