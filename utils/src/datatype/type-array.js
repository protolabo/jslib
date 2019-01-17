/** @module type/array */

/**
 * Inserts an item in an array at the specified index
 * @param {Object[]} arr array
 * @param {number} index 
 * @param {object} item 
 */
export function insert(arr, index, item) { arr.splice(index, 0, item); }

/**
 * Returns last element of array.
 * @param {Object[]} arr array
 */
export function last(arr) {
    if (Array.isArray(arr) && arr.length - 1) {
        return arr[arr.length - 1];
    }

    return undefined;
}

/**
 * Returns a value indicating whether the array is empty or not
 * @param {Object[]} arr array
 */
export function isEmpty(arr) { return !arr.length; }