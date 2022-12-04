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
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    console.log('Running test on GitHub Pages site');
    await page.goto('https://cse110-fa22-group19.github.io/sincere-exercise/');
    localStorage.clear();
  });

  describe('Create and delete entries', () => {
    let home;
    let newEntryButtonElement;
    let newEntryButton;
    let inputEntryPage;
    let cancel_button;
    let viewEntryPage;
    let back_button;

    beforeAll(async () => {
      home = await page.$('home-page');
      newEntryButtonElement = await home.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');
    });

    test('when click Add New Entry button, new entry item is shown', async () => {
      await newEntryButton.click();
      inputEntryPage = await page.$('input-entry-page');
      cancel_button = await page.$('#cancel-button');
      await cancel_button.click();
      viewEntryPage = await page.$('view-entry-page');
      back_button = await page.$('#back-button');
      await back_button.click();
      home = await page.$('home-page');
      newEntryButtonElement = await home.$('new-entry-button');
      newEntryButton = await newEntryButtonElement.$('button');

      const numEntries = await home.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.length
      );
      expect(numEntries).toBe(1);
    });

    test('if new entry item contains accurate entry data', async () => {
      const entryItemData = await home.$eval(
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
        await newEntryButton.click();
        inputEntryPage = await page.$('input-entry-page');
        cancel_button = await page.$('#cancel-button');
        await cancel_button.click();
        viewEntryPage = await page.$('view-entry-page');
        back_button = await page.$('#back-button');
        await back_button.click();
        home = await page.$('home-page');
        newEntryButtonElement = await home.$('new-entry-button');
        newEntryButton = await newEntryButtonElement.$('button');
      }
      const numEntries = await home.$$eval(
        'entry-item-component',
        (entryItems) => entryItems.length
      );
      const entryItemData = await home.$$eval(
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
      const entryItemToDelete = await home.$('entry-item-component');
      const deleteButton = await entryItemToDelete.$('button');
      await deleteButton.evaluate((b) => b.click());

      const entryItemData = await home.$$eval(
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
      const entryItems = await home.$$('entry-item-component');
      for (let entryItem of entryItems) {
        const deleteButton = await entryItem.$('button');
        await deleteButton.evaluate((b) => b.click());
      }
      const entryItemData = await home.$$eval(
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
