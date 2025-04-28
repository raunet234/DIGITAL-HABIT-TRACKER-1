// src/utils/pointsUtils.js

export const POINTS_PER_LOG = 10;
export const POINTS_THRESHOLD = 100;
export const MIOTA_PER_BATCH = 10;

/**
 * Calculate points earned for a number of logs
 */
export function calculatePoints(logCount) {
  return logCount * POINTS_PER_LOG;
}

/**
 * Determine if conversion is allowed
 */
export function canConvert(points) {
  return points >= POINTS_THRESHOLD;
}
