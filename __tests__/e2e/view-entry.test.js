import puppeteer from 'puppeteer';

/**
 * View/Input-Entry Page End to End tests
 * Contains tests that test the View/Input-Entry page interface functionality.
 *
 * Actions to test:
 *
 * Click on new entry button to navigate to input-entry page, click on cancel button
 * to go to view-entry page, click back button to go back to home page.
 *
 * Click on new entry button to navigate to input-entry page, click on save button
 * to go to view-entry page, click back button to go back to home page.
 *
 * Click on new entry button to navigate to input-entry page, click on save button
 * to go to view-entry page, click edit button to go back to input-entry page, click
 * on save button to go to view-entry page, click back button to go back to home page.
 */

describe('View Entry end to end user flows', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    console.log('User must have Live Server running on Port 5500');
    await page.goto('https://cse110-fa22-group19.github.io/sincere-exercise/');
  });

  describe('Navigate between home page and input-entry page', () => {
    let homePage;
    let newEntryButtonElement;
    let newEntryButton;
    let inputEntryPage;
    let viewEntryPage;
    let cancel_button;
    let back_button;

    beforeAll(async () => {
      homePage = await page.$('home-page');
      newEntryButtonElement = await homePage.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
      await newEntryButton.click();
    });

    test('Page changes to input_entry page', async () => {
      inputEntryPage = await page.$('input-entry-page');
      homePage = await page.$('home-page');
      expect(homePage === null && inputEntryPage !== null).toBe(true);
    });

    test('Page changes to view_entry page', async () => {
      cancel_button = await page.$('#cancel-button');
      await cancel_button.click();
      viewEntryPage = await page.$('view-entry-page');
      inputEntryPage = await page.$('input-entry-page');
      expect(inputEntryPage === null && viewEntryPage !== null).toBe(true);
    });

    test('Page changes to home page', async () => {
      back_button = await page.$('#back-button');
      await back_button.click();
      viewEntryPage = await page.$('view-entry-page');
      homePage = await page.$('home-page');
      expect(viewEntryPage === null && homePage !== null).toBe(true);
    });
  });

  describe('Navigate between home page, input-entry page, and save to view-entry page', () => {
    let homePage;
    let newEntryButtonElement;
    let newEntryButton;
    let inputEntryPage;
    let viewEntryPage;
    let save_button;
    let back_button;
    let edit_button;

    beforeAll(async () => {
      homePage = await page.$('home-page');
      newEntryButtonElement = await homePage.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
      await newEntryButton.click();
    });

    test('Page changes to input_entry page', async () => {
      inputEntryPage = await page.$('input-entry-page');
      homePage = await page.$('home-page');
      expect(homePage === null && inputEntryPage !== null).toBe(true);
    });

    test('Page changes to view_entry page', async () => {
      save_button = await page.$('#save-button');
      await save_button.click();
      viewEntryPage = await page.$('view-entry-page');
      inputEntryPage = await page.$('input-entry-page');
      expect(inputEntryPage === null && viewEntryPage !== null).toBe(true);
    });

    test('Page changes back to input_entry page', async () => {
      edit_button = await page.$('#edit-button');
      await edit_button.click();
      viewEntryPage = await page.$('view-entry-page');
      inputEntryPage = await page.$('input-entry-page');
      expect(viewEntryPage === null && inputEntryPage !== null).toBe(true);
    });

    test('Page changes back to view_entry page', async () => {
      save_button = await page.$('#save-button');
      await save_button.click();
      viewEntryPage = await page.$('view-entry-page');
      inputEntryPage = await page.$('input-entry-page');
      expect(inputEntryPage === null && viewEntryPage !== null).toBe(true);
    });

    test('Page changes to home page', async () => {
      back_button = await page.$('#back-button');
      await back_button.click();
      viewEntryPage = await page.$('view-entry-page');
      homePage = await page.$('home-page');
      expect(viewEntryPage === null && homePage !== null).toBe(true);
    });
  });

  describe('Navigate between home page, input-entry page, save to view-entry page, and back to home page', () => {
    let homePage;
    let newEntryButtonElement;
    let newEntryButton;
    let inputEntryPage;
    let viewEntryPage;
    let save_button;
    let back_button;

    beforeAll(async () => {
      homePage = await page.$('home-page');
      newEntryButtonElement = await homePage.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
      await newEntryButton.click();
    });

    test('Page changes to input_entry page', async () => {
      inputEntryPage = await page.$('input-entry-page');
      homePage = await page.$('home-page');
      expect(homePage === null && inputEntryPage !== null).toBe(true);
    });

    test('Page changes to view_entry page', async () => {
      save_button = await page.$('#save-button');
      await save_button.click();
      viewEntryPage = await page.$('view-entry-page');
      inputEntryPage = await page.$('input-entry-page');
      expect(inputEntryPage === null && viewEntryPage !== null).toBe(true);
    });

    test('Page changes to home page', async () => {
      back_button = await page.$('#back-button');
      await back_button.click();
      viewEntryPage = await page.$('view-entry-page');
      homePage = await page.$('home-page');
      expect(viewEntryPage === null && homePage !== null).toBe(true);
    });
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});