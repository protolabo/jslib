var zstd = (function (exports) {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   * Returns an object value or default value if undefined
   * @param {*} arg object
   * @param {*} value default value
   * @param {boolean} [isNullable] indicates whether the value can be assigned the value *NULL*
   * @memberof TYPE
   */
  function valOrDefault(arg, value, isNullable) {
    if (isNullable === true) {
      return isUndefined(arg) ? value : arg;
    }

    return isNullOrUndefined(arg) ? value : arg;
  }
  /**
   * Returns a value indicating whether the value is empty
   * @param {Object[]|string} arr array
   * @returns {boolean}
   * @memberof TYPE
   */

  function isEmpty(obj) {
    return (Array.isArray(obj) || isString(obj)) && obj.length === 0;
  }
  /**
   * Returns a value indicating whether the variable is a Date
   * @param {*} value 
   * @returns {boolean}
   * @memberof TYPE
   */

  function isDate(value) {
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
  }
  /**
   * Returns a value indicating whether the variable is a String
   * @param {*} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isString(value) {
    return typeof value === 'string' || value instanceof String;
  }
  /**
   * Returns a value indicating whether the value is a Function
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Returns a value indicating whether the value is an Object
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isObject(value) {
    return !isNullOrUndefined(value) && _typeof(value) === 'object';
  }
  /**
   * Returns a value indicating whether the object is iterable
   * @param {*} obj
   * @returns {boolean}
   * @memberof TYPE
   */

  function isIterable(obj) {
    return !isNullOrUndefined(obj) && typeof obj[Symbol.iterator] === 'function';
  }
  /**
   * Returns a value indicating whether the value is null
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNull(value) {
    return value === null;
  }
  /**
   * Returns a value indicating whether a string is null or made of whitespace.
   * @param {string} str string
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNullOrWhitespace(str) {
    return !str || isString(str) && (str.length === 0 || /^\s*$/.test(str));
  }
  /**
   * Returns a value indicating whether the value is undefined
   * @param {*} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Returns a value indicating whether the value is null or undefined
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
  }

  /**
   * Inserts an item in an array at the specified index
   * @param {*[]} arr array
   * @param {number} index 
   * @param {object} item 
   * @returns {number} The new length of the array
   * @memberof STD
   */

  function insert(arr, index, item) {
    arr.splice(index, 0, item);
    return arr.length;
  }
  /**
   * Returns last element of array.
   * @param {*[]} arr array
   * @memberof STD
   */

  function last(arr) {
    if (!Array.isArray(arr) || isEmpty(arr)) {
      return undefined;
    }

    return arr[arr.length - 1];
  }

  var HttpResponse = {
    // Successful
    OK: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    // Client Error
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    UnsupportedMediaType: 415,
    // Server Error
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavaible: 503,
    GatewayTimeout: 504
  };
  var State = {
    OPENED: 1,
    RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  /**
   * An XHR resposne
   * @private
   * @typedef {Object} xhrResponse
   * @property {number} status - The response status code
   * @property {string} message - The response content
   */

  /**
   * @callback xhrCallback
   * @param  {xhrResponse} response - The XHR response object
   * @private
   */

  /**
   * This function creates and arranges the XMLHttpRequest object
   * @param {('GET'|'POST'|'PUT'|'DELETE')} type The HTTP method
   * @param {string} url The URL to send the request 
   * @param {*} successPred The success condition
   * @param {xhrCallback} successCb A callback function to handle a successful request
   * @param {xhrCallback} passCb A callback function to handle a valid request
   * @param {xhrCallback} failureCb A callback function to handle a failed request
   * @private
   */

  var xhrHandler = function xhrHandler(type, url, successPred, successCb, failureCb, passCb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      var callback;

      if (xhr.readyState === State.DONE) {
        var response = createResponse(xhr.status, xhr.responseText);

        if (successPred(xhr.status)) {
          callback = successCb;
        } else {
          callback = failureCb;

          if (xhr.status >= 200 && xhr.status < 300 && isFunction(passCb)) {
            callback = passCb;
          }
        }

        if (isFunction(callback)) {
          callback(response);
        }
      }
    };

    xhr.open(type, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return xhr;
  };

  function createResponse(status, content) {
    return {
      status: status,
      message: content
    };
  }
  /**
   * Sends a GET request
   * @param {string} url The URL to send the request 
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof STD
   */


  function GET(url, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return status === HttpResponse.OK;
    };
    var xhr = xhrHandler('GET', url, successPred, success, fail, options.pass);
    xhr.send();
  }
  /**
   * Sends a POST request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof STD
   */

  function POST(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.Created].includes(status);
    };
    var xhr = xhrHandler('POST', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }
  /**
   * Sends a PUT request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof STD
   */

  function PUT(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.NoContent].includes(status);
    };
    var xhr = xhrHandler('PUT', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }
  /**
   * Sends a DELETE request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof STD
   */

  function DELETE(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.Accepted, HttpResponse.NoContent].includes(status);
    };
    var xhr = xhrHandler('DELETE', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }

  /**
   * Compare 2 times
   * @param {string} t1 time 1
   * @param {string} t2 time 2
   * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
   * @memberof STD
   */

  function compareTime(t1, t2) {
    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(":") || !t2.includes(":")) {
      return null;
    }

    var arr1 = t1.split(':');
    var arr2 = t2.split(':'); // hour comparison

    if (+arr1[0] > +arr2[0]) {
      return 1;
    } else if (+arr1[0] < +arr2[0]) {
      return -1;
    } else {
      // minute comparison
      if (+arr1[1] > +arr2[1]) {
        return 1;
      } else if (+arr1[1] < +arr2[1]) {
        return -1;
      } else {
        if (arr1.length == arr2.length && arr1.length == 3) {
          // second comparison
          if (+arr1[2] > +arr2[2]) {
            return 1;
          } else if (+arr1[2] < +arr2[2]) {
            return -1;
          }
        }

        return 0;
      }
    }
  }
  /**
   * Resolves a date value
   * @param {*} [date] 
   * @returns {Date}
   * @private
   */

  function resolveDate(date) {
    if (isNullOrUndefined(date)) {
      return new Date();
    } else if (isDate(date)) {
      return date;
    }

    var _date = new Date(date);

    return new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
  }
  /**
   * Formats a date
   * @param {!Date} date 
   * @param {!string} format 
   * @returns {string} Formatted date
   * @memberof STD
   */


  function formatDate(date, format) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // January = 0

    var yyyy = date.getFullYear().toString();
    var hh = date.getHours();
    var MM = date.getMinutes();
    var ss = date.getSeconds();

    var twoDigits = function twoDigits(val) {
      return val < 10 ? "0".concat(val) : val;
    };

    return format.replace('yyyy', yyyy).replace('yy', yyyy.slice(-2)).replace('mm', twoDigits(mm)).replace('m', mm).replace('dd', twoDigits(dd)).replace('d', dd).replace('hh', twoDigits(hh)).replace('h', hh).replace('MM', twoDigits(MM)).replace('M', MM).replace('ss', twoDigits(ss)).replace('s', ss);
  }
  /**
   * Returns a date and time using the format "YYYY-mm-dd"
   * @param {*} _date 
   * @returns {string}
   * @memberof STD
   */

  function shortDate(_date) {
    var date = resolveDate(_date);
    return formatDate(date, 'yyyy-mm-dd');
  }
  /**
   * Returns a date and time using the format "YYYY-mm-dd hh:MM"
   * @param {*} _date 
   * @returns {string}
   * @memberof STD
   */

  function shortDateTime(_date) {
    var date = resolveDate(_date);
    return formatDate(new Date(date + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd hh:MM');
  }
  function parseTime(n) {
    var hh = +n | 0;
    var mm = '00';

    if (!Number.isInteger(+n)) {
      mm = (n + '').split('.')[1] * 6;
    }

    return hh + ':' + mm;
  }
  var DICT = {
    'en': {
      'second': 'second(s)',
      'minute': 'minute(s)',
      'hour': 'hour(s)',
      'day': 'day(s)',
      'week': 'week(s)',
      'month': 'month(s)',
      'year': 'year(s)'
    },
    'fr': {
      'second': 'seconde(s)',
      'minute': 'minute(s)',
      'hour': 'heure(s)',
      'day': 'jour(s)',
      'week': 'semaine(s)',
      'month': 'mois',
      'year': 'année(s)'
    }
  };

  var trans = function translation(lang, key, isPlural) {
    var value = DICT[lang][key];

    if (value === undefined) {
      return undefined;
    }

    if (isPlural) {
      return value.replace(/\(([a-z]+)\)/g, '$1');
    }

    return value.replace(/\([a-z]+\)/g, '');
  };

  var timeAgoResponse = function timeAgoResponseBuilder(time, unit, _lang) {
    var lang = valOrDefault(_lang, 'en');
    var isPlural = time === 1;
    var msg = {
      en: "".concat(time, " ").concat(trans('en', unit, isPlural), " ago"),
      fr: "il y a ".concat(time, " ").concat(trans('fr', unit, isPlural))
    };
    return msg[lang];
  };
  /**
   * Returns the ellapsed time between now and a point in time
   * @param {*} time 
   * @param {*} _callback 
   * @returns {string}
   * @memberof STD
   */


  function timeAgo(time, _callback) {
    var callback = valOrDefault(_callback, timeAgoResponse);
    var seconds = Math.floor((Date.now() - resolveDate(time).getTime()) / 1000);
    var MINUTE = 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var WEEK = DAY * 7;
    var MONTH = DAY * 30;
    var YEAR = WEEK * 52;

    if (seconds < MINUTE) {
      return callback(seconds, 'second');
    } else if (seconds < HOUR) {
      return callback(~~(seconds / MINUTE), 'minute');
    } else if (seconds < DAY) {
      return callback(~~(seconds / HOUR), 'hour');
    } else if (seconds < WEEK) {
      return callback(~~(seconds / DAY), 'day');
    } else if (seconds < MONTH) {
      return callback(~~(seconds / WEEK), 'week');
    } else if (seconds < YEAR) {
      return callback(~~(seconds / MONTH), 'month');
    } else {
      return callback(~~(seconds / YEAR), 'year');
    }
  }

  /** @private */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /** @private */

  var isPrototypeOf = Object.prototype.isPrototypeOf;
  var defProp = Object.defineProperty;
  /**
   * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
   * @param {*} obj target object
   * @param {string} key name of the property
   * @memberof STD
   */

  var hasOwn = function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  };
  /**
   * Returns a boolean indicating whether the object (child) inherit from another object (parent)
   * @param {*} child 
   * @param {*} parent 
   * @memberof STD
   */

  var isDerivedOf = function isDerivedOf(child, parent) {
    return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
  };
  /**
   * 
   * @param {*} obj 
   * @memberof STD
   */

  function cloneObject(obj) {
    if (obj === null || _typeof(obj) !== 'object') {
      return obj;
    }

    var temp = obj.constructor(); // changed

    for (var key in obj) {
      if (hasOwn(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = cloneObject(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

  /**
   * Capitalizes all words in a sequence
   * @param {string} str Sequence
   * @returns {string} Capitalized sequence
   * @memberof STD
   */

  function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, function (s) {
      return s.toUpperCase();
    });
  }
  /**
   * Capitalizes the first letter of a sequence
   * @param {string} str Sequence
   * @returns {string} Sequence with its first letter capitalized
   * @memberof STD
   */

  function capitalizeFirstLetter(str) {
    return isNullOrWhitespace(str) ? str : str.charAt(0).toUpperCase() + str.slice(1);
  }
  var CaseHandler = {
    'camel': function camel(str) {
      return camelCase(str);
    },
    'pascal': function pascal(str) {
      return pascalCase(str);
    },
    'upper': function upper(str) {
      return str.toUpperCase();
    },
    'lower': function lower(str) {
      return str.toLowerCase();
    }
  };
  /**
   * Format a sequence according to a specified case
   * @param {!string} str Sequence
   * @param {!string} casing Sequence
   * @returns {string} Formatted sequence
   * @memberof STD
   */

  function formatCase(str, casing) {
    if (isNullOrWhitespace(str)) {
      return str;
    }

    if (!hasOwn(CaseHandler, casing)) {
      return str;
    }

    return CaseHandler[casing](str);
  }
  /**
   * Capitalizes all words in a sequence except the first one and 
   * removes spaces or punctuation
   * @param {!string} str Sequence
   * @returns {string} camelCased sequence
   * @memberof STD
   */

  function camelCase(str) {
    if (isNullOrWhitespace(str)) {
      return str;
    }

    var ccString = pascalCase(str);
    return ccString.charAt(0).toLowerCase() + ccString.slice(1);
  }
  /**
   * Capitalizes all words in a sequence and removes spaces or punctuation
   * @param {!string} str Sequence
   * @returns {string} PascalCased sequence
   * @memberof STD
   */

  function pascalCase(str) {
    if (isNullOrWhitespace(str)) {
      return str;
    }

    var ccString = str.replace(/[_-]+/g, " ").replace(/\s+/g, ' ').trim();
    return capitalize(ccString).replace(/\s+/g, '');
  }
  /**
   * Removes all accents from a string
   * @param {!string} str A string
   * @returns {string} A string without accents
   * @memberof STD
   */

  function removeAccents(str) {
    if (String.prototype.normalize) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    return str.replace(/[àâäæ]/gi, 'a').replace(/[ç]/gi, 'c').replace(/[éèê]/gi, 'e').replace(/[îï]/gi, 'i').replace(/[ôœ]/gi, 'o').replace(/[ùûü]/gi, 'u');
  }

  /**
   * Converts the received boolean value to an integer
   * @param {boolean} value 
   * @returns {number} 1 or 0
   * @memberof STD
   */

  function boolToInt(value) {
    return value ? 1 : 0;
  }
  /**
   * Converts the received value to a boolean
   * @param {*} value
   * @returns {boolean} A boolean equivalent of the received value
   * @memberof STD
   */

  function toBoolean(value) {
    var val = valOrDefault(value, false);
    return val === true || val.toString().toLowerCase() === 'true';
  }

  /**
   * Verifies that at least one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether at least one value satisfies the condition
   * @memberof STD
   */

  var some = function some(values, pred) {
    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
        return true;
      }
    }

    return false;
  };
  /**
   * Verifies that at the condition is satisfied for a a number of value
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @param {number} [min=1] Minimum number of values that must satisfy the condition
   * @param {number} [max=-1] Minimum number of values that must satisfy the condition
   * @returns {boolean} A value indicating whether at least one value satisfies the condition
   * @memberof STD
   */

  var assert = function assert(values, pred, min, max) {
    if (max < min) {
      console.error("`max` must be greater than `min`");
      return;
    }

    var hitCount = getHitCount(values, pred);

    if (all([min, max], Number.isInteger)) {
      return hitCount >= min && hitCount <= max;
    }

    if (Number.isInteger(min)) {
      return hitCount >= min;
    }

    if (Number.isInteger(max)) {
      return hitCount <= max;
    }

    return false;
  };
  /**
   * Verifies that all the values satisfy the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether all the values satisfy the condition
   * @memberof STD
   */

  var all = function all(values, pred) {
    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (!pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
        return false;
      }
    }

    return true;
  };
  /**
   * Verifies that exactly one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether exactly one value satisfies the condition
   * @memberof STD
   */

  var one = function one(values, pred) {
    return getHitCount(values, pred) === 1;
  };
  /**
   * Verifies that no value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether no value satisfies the condition
   * @memberof STD
   */

  var no = function no(values, pred) {
    return getHitCount(values, pred) === 0;
  };
  /**
   * Verifies that at most one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether at most one value satisfies the condition
   * @memberof STD
   */

  var lone = function lone(values, pred) {
    return getHitCount(values, pred) <= 1;
  };
  /**
   * 
   * @param {*} values 
   * @param {*} pred 
   * @private
   */

  /* istanbul ignore next */

  function getHitCount(values, pred) {
    var counter = 0;

    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
        counter++;
      }
    }

    return counter;
  }

  /**
   * Return a random integer between min and max (inclusive).
   * @param {number} min 
   * @param {number} [max] 
   * @param {boolean} [secure] 
   * @memberof STD
  */

  function random(min, max) {
    var secure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (isNullOrUndefined(max)) {
      max = min;
      min = 0;
    }

    return min + Math.floor((secure ? secureMathRandom() : Math.random()) * (max - min + 1));
  }
  /**
   * More secure implementation of `Math.random`
   * @private
   */

  function secureMathRandom() {
    // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
  }

  /**
   * Append the path to the current path
   * @param {string} target 
   * @param {string} path 
   * @memberof STD
   */

  function addPath(target, path) {
    return isNullOrWhitespace(target) ? path : target + '.' + path;
  }
  /**
   * Returns the directory of the path
   * @param {string} path 
   * @memberof STD
   */

  function getDir(path) {
    return path.substring(0, path.lastIndexOf('.'));
  }
  /**
   * Returns the directory of the path from the target
   * @param {string} path 
   * @memberof STD
   */

  function getDirTarget(path, target) {
    return path.substring(0, path.lastIndexOf(target) - 1);
  }

  function findByIndex(obj, match, prop) {
    var REGEX_DIGIT = /\d+/g;
    var index = +match[0].match(REGEX_DIGIT);
    return obj[prop][index];
  }
  /**
   * Returns an element in an object using its path
   * @param {Object} obj
   * @param {string} path  
   * @param {string} [_separator=.]
   * @memberof STD
   */


  function findByPath(obj, path, _separator) {
    var REGEX_BRACKET_DIGIT = /\[\d+\]/g;
    var separator = valOrDefault(_separator, '.');
    var me = cloneObject(obj);

    var findHandler = function findHandler(part, regex, callback) {
      var match = part.match(regex);
      var prop = part.substring(0, part.indexOf('['));
      return callback(me, match, prop);
    };

    var parts = path.split(separator);

    for (var i = 0, len = parts.length; i < len; i++) {
      var part = parts[i];

      if (REGEX_BRACKET_DIGIT.test(part)) {
        me = findHandler(part, REGEX_BRACKET_DIGIT, findByIndex);
      } else {
        me = me[part];
      }

      if (isNullOrUndefined(me)) {
        return undefined;
      }
    }

    return me;
  }

  exports.DELETE = DELETE;
  exports.GET = GET;
  exports.POST = POST;
  exports.PUT = PUT;
  exports.addPath = addPath;
  exports.all = all;
  exports.assert = assert;
  exports.boolToInt = boolToInt;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.cloneObject = cloneObject;
  exports.compareTime = compareTime;
  exports.defProp = defProp;
  exports.findByPath = findByPath;
  exports.formatCase = formatCase;
  exports.formatDate = formatDate;
  exports.getDir = getDir;
  exports.getDirTarget = getDirTarget;
  exports.hasOwn = hasOwn;
  exports.insert = insert;
  exports.isDate = isDate;
  exports.isDerivedOf = isDerivedOf;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isIterable = isIterable;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNullOrWhitespace = isNullOrWhitespace;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.last = last;
  exports.lone = lone;
  exports.no = no;
  exports.one = one;
  exports.parseTime = parseTime;
  exports.pascalCase = pascalCase;
  exports.random = random;
  exports.removeAccents = removeAccents;
  exports.shortDate = shortDate;
  exports.shortDateTime = shortDateTime;
  exports.some = some;
  exports.timeAgo = timeAgo;
  exports.toBoolean = toBoolean;
  exports.valOrDefault = valOrDefault;

  return exports;

}({}));