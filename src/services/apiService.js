// src/services/apiService.js

const API_BASE = import.meta.env.VITE_API_URL || ''; // e.g. "https://api.example.com"

/**
 * Fetches the list of habits from the backend API.
 * @returns {Promise<Array<{ id: number; title: string; logs: number[] }>>}
 * @throws {Error} if the network request fails or returns a non-2xx status.
 */
export async function fetchHabitsFromServer() {
  const url = `${API_BASE}/habits`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch habits: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Sends the updated habit list to the backend for syncing.
 * @param {Array<{ id: number; title: string; logs: number[] }>} habits
 * @returns {Promise<{ success: boolean }>}
 * @throws {Error} if the network request fails or returns a non-2xx status.
 */
export async function syncHabitsToServer(habits) {
  const url = `${API_BASE}/habits`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habits),
  });
  if (!res.ok) {
    throw new Error(`Failed to sync habits: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}
