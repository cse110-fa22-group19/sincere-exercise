// Mock of a localStorage object for testing
// Source: https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

export const mockLocalStorage = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();
