/**
 * Maps a duration in minutes to a human-readable time string.
 *
 * @param {int} input - The duration in minutes.
 * @returns {string} - The formatted time string.
 */
export function mapMinutesToTimeString(input) {
    if (typeof input !== 'number' || input < 0) {
        return '0 min';
    }

    const hours = Math.floor(input / 60);
    const minutes = input % 60;
    const result = [];

    if (hours > 0) {
        result.push(`${hours} tim`);
    }

    if (minutes > 0) {
        result.push(`${minutes} min`);
    }

    return result.join(' ');
}
