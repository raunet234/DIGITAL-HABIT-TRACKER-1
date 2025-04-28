// src/services/localCacheService.js

import { get, set } from 'idb-keyval';

/**
 * Load data for a given key from localStorage.
 * Returns parsed JSON or null if none exists.
 */
export function loadData(key) {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}

/**
 * Save data under a given key to localStorage as JSON.
 */
export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get a value from IndexedDB via idb-keyval.
 * Returns the stored value or undefined if none set.
 */
export async function getFromDb(key) {
  return await get(key);
}

/**
 * Set a value in IndexedDB via idb-keyval.
 */
export async function setToDb(key, value) {
  await set(key, value);
}
