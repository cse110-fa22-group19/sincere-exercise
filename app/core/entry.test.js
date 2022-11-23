import { entryEntity } from './entry.entity.js';
import { mockLocalStorage } from './setupTests.js';

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
    expect(entries).toEqual({ 3: 5 });
  });
});
