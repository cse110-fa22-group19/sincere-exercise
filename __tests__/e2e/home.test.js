import puppeteer from 'puppeteer';

/**
 * Home Page End to End tests
 * Contains tests that test the Home page interface functionality.
 * Actions to test: click add new entry, delete entry
 */

describe('Home end to end user flows', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
      headless: false,
    });
    page = await browser.newPage();
    // Local Testing
    // await page.goto('http://127.0.0.1:5500/');
    // await page.goto('https://cse110-fa22-group19.github.io/sincere-exercise/');
    localStorage.clear();
  });

  describe('Create and delete entries', () => {
    test('when click cancel adding new entry button, entry is still shown', async () => {
      const newEntryButtonElement = await page.$('new-entry-button');
      await newEntryButtonElement.click();
      const cancel_button = await page.$('#cancel-button');
      await cancel_button.click();
      const view = await page.$('view-entry-page');
      const back_button = await view.$('#back-button');
      await back_button.click();
      const numEntries = await page.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.length
      );
      expect(numEntries).toBe(1);
    });

    test('if new entry item contains accurate entry data', async () => {
      const entryItemData = await page.$eval(
        'entry-item-component',
        (entryItem) => entryItem.entryData
      );
      const entity = await page.evaluate(
        () => Object.values(JSON.parse(localStorage.getItem('entries')))[0]
      );
      expect(entryItemData).toEqual(entity);
    });

    test('when more entries are added, entry count and data are accurate', async () => {
      for (let i = 0; i < 9; i++) {
        const home = await page.$('home-page');
        const newEntryButtonElement = await home.$('new-entry-button');
        await newEntryButtonElement.click();
        const cancel_button = await page.$('#cancel-button');
        await cancel_button.click();
        const back_button = await page.$('#back-button');
        await back_button.click();
      }
      const numEntries = await page.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.length
      );
      const entryItemData = await page.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.map((entryItem) => entryItem.entryData)
      );
      const entities = await page.evaluate(() =>
        Object.values(JSON.parse(localStorage.getItem('entries')))
      );
      expect(numEntries).toBe(10);
      expect(entryItemData).toEqual(entities);
    });

    test('when entry is deleted, correct entry is deleted', async () => {
      const entryItemToDelete = await page.$('entry-item-component');
      const deleteButton = await entryItemToDelete.$('button');
      await deleteButton.evaluate((b) => b.click());

      const entryItemData = await page.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.map((entryItem) => entryItem.entryData)
      );
      const entities = await page.evaluate(() =>
        Object.values(JSON.parse(localStorage.getItem('entries')))
      );
      expect(entryItemData.length).toBe(9);
      expect(entryItemData).toEqual(entities);
    });

    test('when all entries are deleted, no entries in localStorage', async () => {
      const entryItems = await page.$$('entry-item-component');
      for (let entryItem of entryItems) {
        const deleteButton = await entryItem.$('button');
        await deleteButton.evaluate((b) => b.click());
      }
      const entryItemData = await page.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.map((entryItem) => entryItem.entryData)
      );
      const entities = await page.evaluate(() =>
        Object.values(JSON.parse(localStorage.getItem('entries')))
      );
      expect(entryItemData.length).toBe(0);
      expect(entryItemData).toEqual(entities);
    });
  });

  afterAll(async () => {
    localStorage.clear();
    await page.close();
    await browser.close();
  });
});
