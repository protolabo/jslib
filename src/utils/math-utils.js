/**
 * @namespace MATH
 */

/**
 * Return a random integer between min and max (inclusive).
 * @param {number} min 
 * @param {number} [max] 
 * @param {boolean} [secure] 
 * @memberof MATH
*/
export function random(min, max, secure = false) {
    if (max == null) {
        max = min;
        min = 0;
    }

    return min + Math.floor((secure ? secureMathRandom() : Math.random()) * (max - min + 1));
}

/**
 * More secure implementation of `Math.random`
 */
function secureMathRandom() {
    // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}