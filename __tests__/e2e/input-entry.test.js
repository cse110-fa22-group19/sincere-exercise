import puppeteer from 'puppeteer';
import { dateHelper } from '../../app/main/date-helper.js';

/**
 * Input-Entry Page End to End tests
 * Contains test that test teh Input Entry page interface functionality
 *
 * Flows to test:
 *
 * Input no values in entry
 * Go to view entry, confirm the page shows desired information
 *
 * Input all values in an entry
 * Go to view entry, confirm all entries show correctly
 *
 * Input some value in that same entry
 * Go to view entry, confirm only edited entries show correctly
 *
 * Input wrong intensity in the same entry
 * Go to view entry, confirm intensity is same value as before edited
 */

describe('Input Entry end to end user flows', () => {
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
    console.log('path', process.env.PUPPETEER_EXEC_PATH);
    await page.goto(process.env.PUPPETEER_EXEC_PATH);
    // await page.goto('https://cse110-fa22-group19.github.io/sincere-exercise/');
  });

  describe('No input of values', () => {
    beforeAll(async () => {
      // Navigate to input entry
      const newEntryButtonElement = await page.$('new-entry-button');
      await newEntryButtonElement.click();
    });

    test('When we go back to view entry, all values are correct', async () => {
      const save_button = await page.$('#save-button');
      await save_button.click();

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      const entryData = await page.$eval(
        'view-entry-page',
        (entryItem) => entryItem.entryData
      );

      const expectedHTMLValues = {
        workout_type_value: 'What is the activity to record?',
        location_value: 'What is the location of this record?',
        date_value: dateHelper.formatDate(entryData.startTime),
        start_time_value: dateHelper.formatTime(entryData.startTime),
        end_time_value: dateHelper.formatTime(entryData.endTime),
        intensity_value: '0',
        note_value: 'Any additional note to record?',
      };

      expect(entryHTMLValues).toEqual(expectedHTMLValues);
    });
  });

  describe('Standard input of values', () => {
    beforeEach(async () => {
      // Navigate to input entry
      const editButtonElement = await page.$('#edit-button');
      await editButtonElement.click();
    });

    test('When values are inputted into entry, entry is correctly saved', async () => {
      await page.$eval('#workout-name', (element) => {
        element.value = 'Soccer';
      });
      await page.$eval('#location-name', (element) => {
        element.value = 'Field';
      });
      await page.$eval('#exercise-date', (element) => {
        element.value = '2012-01-07';
      });
      await page.$eval('#start-time', (element) => {
        element.value = '10:05:01';
      });
      await page.$eval('#end-time', (element) => {
        element.value = '12:00:00';
      });
      await page.$eval('#intensity', (element) => {
        element.value = '3';
      });
      await page.$eval('#note', (element) => {
        element.value = 'I fell a lot';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      console.log('Entry values', entryHTMLValues);

      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('When some values are intputted into entry, entry is correctly saved', async () => {
      await page.$eval('#end-time', (element) => {
        element.value = '14:00:00';
      });
      await page.$eval('#intensity', (element) => {
        element.value = '5';
      });
      await page.$eval('#note', (element) => {
        element.value = 'I actually ended at 2pm and it was really intense.';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      console.log('Entry values', entryHTMLValues);

      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('When the rest of the values are intputted into entry, entry is correctly saved', async () => {
      await page.$eval('#workout-name', (element) => {
        element.value = 'Soccer';
      });
      await page.$eval('#location-name', (element) => {
        element.value = 'Field';
      });
      await page.$eval('#exercise-date', (element) => {
        element.value = '2012-01-07';
      });
      await page.$eval('#start-time', (element) => {
        element.value = '10:05:01';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      console.log('Entry values', entryHTMLValues);

      expect(entryHTMLValues).toEqual(localStorageValues);
    });
  });

  describe('Test edge cases for intensity value', () => {
    let originalIntensity;

    beforeEach(async () => {
      originalIntensity = await page.$eval(
        '#intensity_value',
        (element) => +element.innerHTML
      );
      // Navigate to input entry
      const editButtonElement = await page.$('#edit-button');
      await editButtonElement.click();
    });

    test('When the intensity is 0, original intensity is saved', async () => {
      await page.$eval('#intensity', (element) => {
        element.value = '0';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      expect(entryHTMLValues.intensity_value).toBe(originalIntensity);
      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('When the intensity is wrong type, original intensity is saved', async () => {
      await page.$eval('#intensity', (element) => {
        element.value = 'e';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      expect(entryHTMLValues.intensity_value).toBe(originalIntensity);
      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('When the intensity is empty, original intensity is saved', async () => {
      await page.$eval('#intensity', (element) => {
        element.value = 'e';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      expect(entryHTMLValues.intensity_value).toBe(originalIntensity);
      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('When the intensity is empty, original intensity is saved', async () => {
      await page.$eval('#intensity', (element) => {
        element.value = '';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      expect(entryHTMLValues.intensity_value).toBe(originalIntensity);
      expect(entryHTMLValues).toEqual(localStorageValues);
    });

    test('That intensity still saves to correct value', async () => {
      await page.$eval('#intensity', (element) => {
        element.value = '1';
      });

      const save_button = await page.$('#save-button');
      await save_button.click();

      const localStorageEntity = await page.evaluate(() => {
        const entryData = JSON.parse(
          document.querySelector('view-entry-page').getAttribute('data')
        );
        return JSON.parse(localStorage.getItem('entries'))[entryData.__id];
      });

      const localStorageValues = {
        workout_type_value: localStorageEntity.workoutType,
        location_value: localStorageEntity.location,
        date_value: dateHelper.formatDate(localStorageEntity.startTime),
        start_time_value: dateHelper.formatTime(localStorageEntity.startTime),
        end_time_value: dateHelper.formatTime(localStorageEntity.endTime),
        intensity_value: localStorageEntity.intensity,
        note_value: localStorageEntity.note,
      };

      const entryHTMLValues = {
        workout_type_value: await page.$eval(
          '#workout_value',
          (element) => element.innerHTML
        ),
        location_value: await page.$eval(
          '#location_value',
          (element) => element.innerHTML
        ),
        date_value: await page.$eval(
          '#dates_value',
          (element) => element.innerHTML
        ),
        start_time_value: await page.$eval(
          '#start_time',
          (element) => element.innerHTML
        ),
        end_time_value: await page.$eval(
          '#end_time',
          (element) => element.innerHTML
        ),
        intensity_value: await page.$eval(
          '#intensity_value',
          (element) => +element.innerHTML
        ),
        note_value: await page.$eval(
          '#note_value',
          (element) => element.innerHTML
        ),
      };

      expect(entryHTMLValues.intensity_value).toBe(1);
      expect(entryHTMLValues).toEqual(localStorageValues);
    });
  });

  afterAll(async () => {
    localStorage.clear();
    await page.close();
    await browser.close();
  });
});
