import { valOrDefault } from "./type-parse.js";

/**
 * Converts the received boolean value to an integer
 * @param {boolean} value 
 * @returns {number} 1 or 0
 * @memberof TYPE
 */
export function boolToInt(value) { return value ? 1 : 0; }

/**
 * Converts the received value to a boolean
 * @param {*} value
 * @returns {boolean} A boolean equivalent of the received value
 * @memberof TYPE
 */
export function toBoolean(value) {
    var val = valOrDefault(value, false);

    return val === true || val.toString().toLowerCase() === 'true';
}
