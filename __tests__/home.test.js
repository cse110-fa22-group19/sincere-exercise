import puppeteer from 'puppeteer';

// TODO: https://levelup.gitconnected.com/running-puppeteer-with-jest-on-github-actions-for-automated-testing-with-coverage-6cd15bc843b0

describe('Home end to end user flows', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5500');
    localStorage.clear();
  });

  describe('Create and delete entries', () => {
    let home;
    let newEntryButton;
    let button;

    beforeAll(async () => {
      home = await page.$('home-page');
      newEntryButton = await home.$('new-entry-button');
      button = await newEntryButton.$('button');
    });

    test('when click Add New Entry button, new entry item is shown', async () => {
      await button.click();
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

    test('when more entries are added, number of entries and entry data are accurate', async () => {
      for (let i = 0; i < 9; i++) {
        await button.click();
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
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});
