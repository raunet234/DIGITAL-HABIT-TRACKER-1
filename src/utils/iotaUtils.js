// src/utils/pointsUtils.js

// Constants for point economics
export const POINTS_PER_LOG = 10;       // Points awarded per habit completion
export const POINTS_THRESHOLD = 100;    // Points needed to trigger a conversion
export const MIOTA_PER_BATCH = 10;      // MIOTA awarded per batch conversion

/**
 * Calculate total points earned for a given number of logs.
 * @param {number} logCount – how many times the habit was logged
 * @returns {number}
 */
export function calculatePoints(logCount) {
  return logCount * POINTS_PER_LOG;
}

/**
 * Determine whether the user has enough points to convert to MIOTA.
 * @param {number} points – current point balance
 * @returns {boolean}
 */
export function canConvert(points) {
  return points >= POINTS_THRESHOLD;
}
