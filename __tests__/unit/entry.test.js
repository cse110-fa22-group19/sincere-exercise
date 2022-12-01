import { entryEntity } from '../../app/core/entry.entity.js';
import { mockLocalStorage } from '../mock-localstorage.js';

/**
 * Entry Entity Tests
 * Contains tests that test the CRUD functionality of the Entry entity.
 * Functions to test: createEntry(), getAllEntries(), deleteEntry()
 */

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
});

describe('createId tests', () => {
  test('when an id is generated', () => {
    const today = new Date();
    const id = entryEntity.createId(today);
    const date = id.slice(0, today.toJSON().length);
    const number = id.slice(-5);
    expect(date).toEqual(today.toJSON()); // Matches date string
    expect(number).toMatch(/\d{5}/); // Checks for 5 digits at the end
  });
});

describe('createEntry tests', () => {
  test('when one entry is created', () => {
    const newEntry = entryEntity.createEntry();
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(1);
    expect(entries[newEntry.__id]).toEqual(newEntry);
  });

  test('when another entry is created', () => {
    const newEntry = entryEntity.createEntry();
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(2);
    expect(entries[newEntry.__id]).toEqual(newEntry);
  });

  test('when 98 more entries are created', () => {
    for (let i = 0; i < 98; i++) {
      entryEntity.createEntry();
    }
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(100);
  });
});

describe('create and getAll entries flow', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  test('when getting an empty localStorage returns an empty object', () => {
    const entries = entryEntity.getAllEntries();
    expect(Object.keys(entries).length).toBe(0);
  });

  test('when creating 5 entries gets 5 entries', () => {
    for (let i = 0; i < 5; i++) {
      entryEntity.createEntry();
    }
    const gottenEntries = entryEntity.getAllEntries();
    const parsedEntries = JSON.parse(localStorage.getItem('entries'));
    expect(gottenEntries).toEqual(parsedEntries);
  });
});

describe('create and delete entries flow', () => {
  const createdEntries = [];

  beforeAll(() => {
    localStorage.clear();
    for (let i = 0; i < 10; i++) {
      createdEntries.push(entryEntity.createEntry());
    }
  });

  test('when one entry is deleted', () => {
    const fourthEntry = createdEntries[3];
    entryEntity.deleteEntry(fourthEntry.__id);
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(9);
    expect(entries[fourthEntry.__id]).toBe(undefined);
  });

  test('when same entry is deleted', () => {
    const fourthEntry = createdEntries[3];
    entryEntity.deleteEntry(fourthEntry.__id);
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(9);
    expect(entries[fourthEntry.__id]).toBe(undefined);
  });

  test('when another entry is deleted', () => {
    const secondEntry = createdEntries[1];
    entryEntity.deleteEntry(secondEntry.__id);
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(8);
    expect(entries[secondEntry.__id]).toBe(undefined);
  });

  test('when all created entries are deleted', () => {
    createdEntries.forEach((entry) => {
      entryEntity.deleteEntry(entry.__id);
    });
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(Object.keys(entries).length).toBe(0);
    expect(entries).toEqual({});
  });
});

/**
 * Test for updating entries.
 * We try to test entries flow with different test cases to check if the function return the true test when calling.
 * When there is no entry test should return -1.
 * when updating an exsiting entry test should return the updated entry from user.
 * when update a non-existing we expect entry test to return -1.
 */

describe('Create and update entries flow', () => {
  const createdEntries = [];
  beforeAll(() => {
    localStorage.clear();
  });

  test('when there is no entry', () => {
    const now = new Date();
    const testEntry = {
      __id: 0,
      workoutType: 'Soccer',
      location: 'UCSD Soccer Field',
      startTime: now.toJSON(),
      endTime: now.toJSON(),
      intensity: 3,
      note: 'This was a pretty long match, so I ended up running a lot.',
    };
    expect(entryEntity.updateEntry(testEntry)).toBe(-1);
  });

  beforeAll(() => {
    localStorage.clear();
    for (let i = 0; i < 10; i++) {
      createdEntries.push(entryEntity.createEntry());
    }
  });

  test('when updating an exsiting entry', () => {
    const fourthEntry = createdEntries[3];
    const now = new Date();
    const testEntry = {
      __id: fourthEntry.__id,
      workoutType: 'Soccer',
      location: 'UCSD Soccer Field',
      startTime: now.toJSON(),
      endTime: now.toJSON(),
      intensity: 3,
      note: 'This was a pretty long match, so I ended up running a lot.',
    };
    entryEntity.updateEntry(testEntry);
    const entries = JSON.parse(localStorage.getItem('entries'));
    expect(JSON.stringify(entries[fourthEntry.__id])).toBe(
      JSON.stringify(testEntry)
    );
  });

  test('when update a non-existing entry', () => {
    const now = new Date();
    const testEntry = {
      __id: 19,
      workoutType: 'Soccer',
      location: 'UCSD Soccer Field',
      startTime: now.toJSON(),
      endTime: now.toJSON(),
      intensity: 3,
      note: 'This was a pretty long match, so I ended up running a lot.',
    };

    expect(entryEntity.updateEntry(testEntry)).toBe(-1);
  });
});

/**
 * Test for get entry.
 * We tend to test get entry function using different test cases
 * when there is no entry exist we expect the test to return undefined.
 */
describe('Create and get one entry flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('when get a non-existing entry', () => {
    expect(entryEntity.getEntry(0)).toBe(undefined);
  });

  test('when get a placeholder entry, correct values exist', () => {
    entryEntity.createEntry();
    const entries = JSON.parse(localStorage.getItem('entries'));
    const entry = entryEntity.getEntry(Object.keys(entries)[0]);
    expect(entry.workoutType).toBe('What is the activity to record?');
    expect(entry.location).toBe('What is the location of this record?');
    expect(entry.intensity).toBe(0);
  });
});
