var _utils = (function (exports) {
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

  /**
   * Returns an object value or default value if undefined
   * @param {*} arg object
   * @param {*} value default value
   * @param {boolean} isNullable indicates whether the value can be assigned the value *NULL*
   * @memberof TYPE
   */
  function valOrDefault(arg, value, isNullable) {
    if (isNullable === true) {
      return isUndefined(arg) ? value : arg;
    }

    return isNullOrUndefined(arg) ? value : arg;
  }
  /**
   * Converts the received boolean value to an integer
   * @param {boolean} value 
   * @returns {number} 1 or 0
   * @memberof TYPE
   */

  function boolToInt(value) {
    return value ? 1 : 0;
  }
  /**
   * Converts the received value to a boolean
   * @param {*} value
   * @returns {boolean} A boolean equivalent of the received value
   * @memberof TYPE
   */

  function toBoolean(value) {
    var val = valOrDefault(value, false);
    return val === true || val.toString().toLowerCase() === 'true';
  }
  /**
   * Determines whether the value is an *integer*
   * @param {*} value Tested value
   * @returns {boolean}  A value indicating whether or not the given value is an *integer*.
   * @memberof TYPE
   */

  function isInt(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && value % 1 === 0;
  }
  /**
   * Returns a value indicating whether the value is empty
   * @param {Object[]|string} arr array
   * @memberof TYPE
   */

  function isEmpty(val) {
    return (Array.isArray(val) || isString(val)) && val.length === 0;
  }
  /**
   * Returns a value indicating whether the variable is a Date
   * @param {*} value 
   * @memberof TYPE
   */

  function isDate(value) {
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
  }
  /**
   * Returns a value indicating whether the variable is a String
   * @returns {boolean}
   * @memberof TYPE
   */

  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }
  /**
   * Returns a value indicating whether the value is a Function
   * @returns {boolean}
   * @memberof TYPE
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Returns a value indicating whether the value is an Object
   * @returns {boolean}
   * @memberof TYPE
   */

  function isObject(value) {
    return !isNull(value) && _typeof(value) === 'object';
  }
  /**
   * Returns a value indicating whether the value is null
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNull(value) {
    return value === null;
  }
  /**
   * Returns a value indicating whether the value is undefined
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
   * Returns a value indicating whether a string is null or made of whitespace.
   * @param {string} str string
   * @memberof TYPE
   */

  function isNullOrWhitespace(str) {
    return !str || isString(str) && (str.length === 0 || /^\s*$/.test(str));
  }
  /**
   * Capitalizes all words in a sequence
   * @param {string} str Sequence
   * @returns {string} Capitalized sequence
   * @memberof TYPE
   */

  function capitalize(str) {
    return str.replace(/\b\w/g, function (s) {
      return s.toUpperCase();
    });
  }
  /**
   * Capitalizes the first letter of a sequence
   * @param {string} str Sequence
   * @returns {string} Sequence with its first letter capitalized
   * @memberof TYPE
   */

  function capitalizeFirstLetter(str) {
    return isNullOrWhitespace(str) ? str : str.charAt(0).toUpperCase() + str.slice(1);
  }
  /**
   * Removes all accents from a string
   * @param {*} str string
   * @returns {string}
   * @memberof TYPE
   */

  function removeAccents(str) {
    if (String.prototype.normalize) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    return str.replace(/[àâäæ]/gi, 'a').replace(/[ç]/gi, 'c').replace(/[éèê]/gi, 'e').replace(/[îï]/gi, 'i').replace(/[ôœ]/gi, 'o').replace(/[ùûü]/gi, 'u');
  }

  var isClassName = function isClassName(selector) {
    return /^\.[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Returns the first Element within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [el] Container queried
   * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */


  function getElement(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
      el.querySelector(selector);
    }

    if (/^#[a-zA-Z0-9_-]+$/.test(selector)) {
      return document.getElementById(selector.substring(1));
    }

    if (isClassName(selector)) {
      return el.getElementsByClassName(selector.substring(1))[0];
    }

    return el.querySelector(selector);
  }
  /**
   * Returns all elements that match the selector query.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [el] Container queried
   * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
   * @memberof DOM
   */

  function getElements(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
      el.querySelectorAll(selector);
    }

    return isClassName(selector) ? el.getElementsByClassName(selector.substring(1)) : el.querySelectorAll(selector);
  }
  /**
   * Returns the first Template within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement} [el] Container queried
   * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */

  function getTemplate(selector, el) {
    return 'content' in document.createElement('template') ? getElement(selector, el) : null;
  }
  /**
   * Returns a duplicate of the template.
   * @param {HTMLTemplateElement} template 
   * @param {boolean} deep used to decide whether the children of the template should also be clone
   * @returns {DocumentFragment} The template's clone.
   * @memberof DOM
   */

  function cloneTemplate(template, deep) {
    return template ? document.importNode(template.content, valOrDefault(deep, true)) : template;
  }
  /**
   * Gets the window's width
   * @memberof DOM
   */

  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  /**
   * Gets the previous element of the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @returns {(Element|null)} Element or null if the specified element is the first one in the list
   * @memberof DOM
   */

  function getPreviousElementSibling(el) {
    return getElementSibling(el, "previousElementSibling");
  }
  /**
   * Gets the element following the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @returns {(Element|null)} Element or null if the specified element is the last one in the list
   * @memberof DOM
   */

  function getNextElementSibling(el) {
    return getElementSibling(el, "nextElementSibling");
  }
  /**
   * Inserts a given element before the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function insertBeforeElement(target, el) {
    target.insertAdjacentElement('beforebegin', el);
  }
  /**
   * Inserts a given element after the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function insertAfterElement(target, el) {
    target.insertAdjacentElement('afterend', el);
  }
  /**
   * Inserts a givern element as the first children of the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function preprendChild(target, el) {
    target.insertAdjacentElement('afterbegin', el);
  }
  /**
   * Verifies that an element has a class
   * @param {HTMLElement} e element
   * @param {string} c class
   * @memberof DOM
   */

  function hasClass(e, c) {
    return e.className.split(" ").indexOf(c) !== -1;
  }
  /**
   * Removes a class from an element if it exists
   * @param {HTMLElement} e element
   * @param {string|Array} c class
   * @memberof DOM
   */

  function removeClass(e, c) {
    if (Array.isArray(c)) {
      c.forEach(function (val) {
        return _removeClass(e, val);
      });
    }

    _removeClass(e, c);
  }

  function _removeClass(e, c) {
    if (hasClass(e, c)) {
      e.className = e.className.replace(c, '');
    }
  }
  /**
   * Adds one or many classes to an element if it doesn't exist
   * @param {HTMLElement} el Element
   * @param {string} c classes
   * @memberof DOM
   */


  function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
      c = c.map(function (c) {
        return valOrDefault(c.class, c);
      }).join(' ');
    }

    var strClass = valOrDefault(c.class, c);

    if (isNullOrWhitespace(el.className)) {
      el.className = strClass;
    } else if (!hasClass(el, c)) {
      el.className += " " + strClass;
    }
  }
  /**
   * Adds or removes a class from an element depending on the class's presence.
   * @param {HTMLElement} el 
   * @param {string} c ClassName
   * @memberof DOM
   */

  function toggleClass(el, c) {
    if (hasClass(el, c)) {
      removeClass(el, c);
    } else {
      addClass(el, c);
    }
  }
  /**
   * Removes all children of a node from the DOM
   * @param {Node} node 
   * @memberof DOM
   */

  function removeChildren(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
  /**
   * Gets the previous or next element of the specified element
   * @param {HTMLElement} el element
   * @param {string} dir sibling direction
   * @returns {(Element|null)} Element or null
   * @memberof DOM
   */

  function getElementSibling(el, dir) {
    var sibling = el[dir];

    while (sibling && hasClass(sibling, "autocomplete")) {
      sibling = sibling[dir];
    }

    return sibling;
  }
  /**
   * Changes the selected option of a `<select>` element
   * @param {HTMLSelectElement} select
   * @param {string} val option value to select
   * @returns {boolean} value indicating whether the option was found and selected
   * @memberof DOM
   */

  function changeSelectValue(select, val) {
    var found = false;
    var options = select.options;

    for (var i = 0; !found && i < options.length; i++) {
      var option = options[i];

      if (option.value == val) {
        option.selected = true;
        found = true;
      }
    }

    return found;
  }
  /**
   * Verifies that an object is an *Element*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Element*
   * @memberof DOM
   */

  function isElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof Element;
  }
  /**
   * Verifies that an object is an *HTMLElement*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Element*
   * @memberof DOM
   */

  function isHTMLElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof HTMLElement;
  }
  /**
   * Copy to clipboard
   * @param {HTMLElement|string} value 
   * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
   */

  function copytoClipboard(value) {
    var el = document.createElement('textarea');
    el.value = isHTMLElement(value) ? value.textContent : value;
    el.readOnly = true;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
    return true;
  }
  /**
   * Finds an ancestor of an element
   * @param {Element} target 
   * @param {*} callback 
   * @param {number} max 
   * @returns {Element|null}
   * @memberof DOM
   */

  function findAncestor(target, callback, max) {
    if (!isElement(target)) {
      return null;
    }

    var parent = target.parentElement;

    if (max > 0) {
      return findAncestorIter(parent, callback, max);
    }

    return findAncestorInf(parent, callback);
  }

  function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorInf(target.parentElement, callback);
  }

  function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
  }

  var Elements = ['BUTTON', 'COMMAND', 'FIELDSET', 'INPUT', 'KEYGEN', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];
  /** 
   * @enum 
   * @ignore
   * @memberof DOM
   */

  var UI = {
    COLLAPSE: 'collapse',
    CHECKED: 'checked',
    DISABLED: 'disabled',
    EMPTY: 'empty',
    HIDDEN: 'hidden',
    SELECTED: 'selected'
  };
  /**
   * Shows an element
   * @param {Element} el Element
   * @memberof DOM
   */

  function show(el) {
    removeClass(el, UI.HIDDEN);
  }
  /**
   * Hides an element
   * @param {Element} el element
   * @memberof DOM
   */

  function hide(el) {
    addClass(el, UI.HIDDEN);
  }
  /**
   * Moves an element out of screen
   * @param {HTMLElement} el Element
   * @memberof DOM
   */

  function conceal(el) {
    return Object.assign(el, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px'
    });
  }
  /**
   * Applies highlighting style to an element
   * @param {HTMLElement} el Element
   * @memberof DOM
   */

  function highlight(el) {
    addClass(el, UI.SELECTED);
  }
  /**
   * Removes highlighting style of an element
   * @param {HTMLElement} el Element
   * @memberof DOM
   */

  function unhighlight(el) {
    removeClass(el, UI.SELECTED);
  }
  /**
   * Enable an element
   * @param {HTMLElement} el Element
   * @memberof DOM
   */

  function enable(el, val) {
    if (Elements.indexOf(el.tagName) !== -1) {
      el.disabled = val === false;
    }

    el.dataset.disabled = val === false;
  }
  /**
   * Disable an element
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function disable(el, val) {
    if (Elements.indexOf(el.tagName) !== -1) {
      el.disabled = val !== false;
    }

    el.dataset.disabled = val !== false;
  }

  var create = function create(tagName) {
    return document.createElement(tagName);
  };

  var addClass$1 = function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
      c = c.join(' ');
    }

    if (isString(c)) {
      el.className = c;
    }
  };
  /**
   * Creates the element for the specified tagName
   * @param {string} tagName element
   * @returns {HTMLElement}
   * @memberof DOM
   */


  function createElement(tagName, eId, eClass) {
    var el = document.createElement(tagName);

    if (eId) {
      el.id = eId;
    }

    if (eClass) {
      addClass$1(el, eClass);
    }

    return el;
  }
  /**
   * Creates a document fragment
   * @returns {DocumentFragment}
   * @memberof DOM
   */

  function createDocFragment() {
    return document.createDocumentFragment();
  }
  function createTextNode(str) {
    return document.createTextNode(str);
  }
  /**
   * Creates a `<link>` element with some attributes
   * @param {string} rel 
   * @param {string} href 
   * @param {object} attr 
   * @memberof DOM
   */

  function createLink(rel, href, attr) {
    var link = create("link");
    link.rel = rel;
    link.href = href;

    if (attr) {
      addAttributes(link, attr);
    }

    return link;
  }
  function createHeader(attr) {
    var header = create('header');

    if (attr) {
      addAttributes(header, attr);
    }

    return header;
  }
  /**
   * Creates a `<div>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  function createDiv(attr, children) {
    var div = create("div");

    if (attr) {
      addAttributes(div, attr);
    }

    if (children) {
      addChildren(div, children);
    }

    return div;
  }
  /**
   * Creates an `<aside>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function createAside(attr) {
    var aside = create('aside');

    if (attr) {
      addAttributes(aside, attr);
    }

    return aside;
  }
  function createLineBreak() {
    return create('br');
  }
  /**
   * Creates a `<h[1..6]>` (heading) element with some attributes
   * @param {string} lvl Level
   * @param {Object} [attr] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  function createHeading(lvl, attr) {
    var h = create(lvl);

    if (attr) {
      addAttributes(h, attr);
    }

    return h;
  }
  /**
   * Creates a `<p>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  function createP(attr) {
    var p = create("p");

    if (attr) {
      addAttributes(p, attr);
    }

    return p;
  }
  /**
   * Creates a `<ul>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  function createUl(attr) {
    var ul = create("ul");

    if (attr) {
      addAttributes(ul, attr);
    }

    return ul;
  }
  /**
   * Creates a `<li>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createLi(attr, el) {
    var li = create('li');

    if (attr) {
      addAttributes(li, attr);
    }

    if (el) {
      addChildren(li, el);
    }

    return li;
  } // Inline Element

  /**
   * Creates an `<a>` element with some attributes
   * @param {string} href URL or a URL fragment that the hyperlink points to
   * @param {Object} [attr] attributes
   * @returns {HTMLAnchorElement}
   * @memberof DOM
   */

  function createAnchor(href, attr) {
    var a = create('a');

    if (href) {
      a.href = href;
    }

    if (attr) {
      addAttributes(a, attr);
    }

    return a;
  }
  /**
    * Creates a `<img>` element with some attributes
    * @param {string} src
    * @param {string} alt
    * @param {Object} [attr] attributes
    * @returns {HTMLImageElement}
    * @memberof DOM
    */

  function createImage(src, alt, attr) {
    var img = create('img');

    if (src) {
      img.src = src;
    }

    if (alt) {
      img.alt = alt;
    }

    if (attr) {
      addAttributes(img, attr);
    }

    return img;
  }
  /**
   * Creates a `<span>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createSpan(attr) {
    var span = create("span");

    if (attr) {
      addAttributes(span, attr);
    }

    return span;
  }
  /**
   * Creates a `<strong>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createStrong(attr) {
    var strong = create("strong");

    if (attr) {
      addAttributes(strong, attr);
    }

    return strong;
  }
  /**
   * Creates a `<em>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createEm(attr) {
    var em = create("em");

    if (attr) {
      addAttributes(em, attr);
    }

    return em;
  } // Form Element

  /**
   * Creates a `<input>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLInputElement}
   * @memberof DOM
   */

  function createInput(attr) {
    var input = create('input');

    if (attr) {
      addAttributes(input, attr);
    }

    return input;
  }
  ["checkbox", "hidden", "file"].forEach(function (type) {
    createInput[type] = function (attr) {
      var input = createInput(attr);
      input.type = type;
      return input;
    };
  });
  /**
   * Creates a `<label>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  function createLabel(attr) {
    var label = create('label');

    if (attr) {
      addAttributes(label, attr);
    }

    return label;
  }
  /**
   * Creates a `<textarea>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  function createTextArea(attr) {
    var textArea = create('textarea');

    if (attr) {
      addAttributes(textArea, attr);
    }

    return textArea;
  }
  /**
   * Creates a `<button>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createButton(attr) {
    var btn = create("button");
    btn.type = "button";

    if (attr) {
      addAttributes(btn, attr);
    }

    return btn;
  }
  /**
   * Creates a `<table>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTable(attr) {
    var table = create("table");

    if (attr) {
      addAttributes(table, attr);
    }

    return table;
  }
  /**
   * Creates a `<thead>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableHeader(attr) {
    var thead = create("thead");

    if (attr) {
      addAttributes(thead, attr);
    }

    return thead;
  }
  /**
   * Creates a `<tbody>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableBody(attr) {
    var tbody = create("tbody");

    if (attr) {
      addAttributes(tbody, attr);
    }

    return tbody;
  }
  /**
   * Creates a `<tfoot>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableFooter(attr) {
    var tfoot = create("tfoot");

    if (attr) {
      addAttributes(tfoot, attr);
    }

    return tfoot;
  }
  /**
   * Creates a `<tr>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableRow(attr) {
    var tr = create("tr");

    if (attr) {
      addAttributes(tr, attr);
    }

    return tr;
  }
  /**
   * Creates a `<th>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableHeaderCell(attr) {
    var th = create("th");

    if (attr) {
      addAttributes(th, attr);
    }

    return th;
  }
  /**
   * Creates a `<td>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableCell(attr) {
    var td = create("td");

    if (attr) {
      addAttributes(td, attr);
    }

    return td;
  }
  /**
   * Sets the attributes of an element
   * @param {HTMLElement} el element
   * @param {Object} attr attribute
   * @memberof DOM
   */

  function addAttributes(el, attr) {
    var ATTR_MAP = {
      id: [assign],
      text: [assign, 'textContent'],
      html: [assign, 'innerHTML'],
      accept: [assign],
      disabled: [disable, el],
      class: [addClass$1, el],
      value: [assign],
      placeholder: [assign],
      readonly: [assign, 'readOnly'],
      data: [Object.assign, el.dataset]
    };
    var DEFAULT_MAP = [echo, '']; // HTML attributes

    var _arr = Object.keys(attr);

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      var val = ATTR_MAP[key] || DEFAULT_MAP;
      val[0](val[1] || key, attr[key]);
    }

    function assign(key, val) {
      el[key] = val;
    }
  }
  /**
   * Appends the children to the element
   * @param {HTMLElement} el element
   * @param {HTMLCollection} children children elements
   * @memberof DOM
   */

  function addChildren(el, children) {
    if (Array.isArray(children)) {
      appendChildren(el, children);
    } else if (children instanceof Element) {
      el.appendChild(children);
    }

    return el;
  }
  /**
   * Append a list of elements to a node.
   * @param {HTMLElement} parent
   * @param {HTMLElement[]} children
   * @memberof DOM
   */


  function appendChildren(parent, children) {
    var fragment = createDocFragment();
    children.forEach(function (element) {
      fragment.appendChild(element);
    });
    parent.appendChild(fragment);
    fragment = null;
    return parent;
  }

  function echo(o) {
  }

  /** @namespace DOM */

  var index = /*#__PURE__*/Object.freeze({
    getElement: getElement,
    getElements: getElements,
    getTemplate: getTemplate,
    cloneTemplate: cloneTemplate,
    windowWidth: windowWidth,
    getPreviousElementSibling: getPreviousElementSibling,
    getNextElementSibling: getNextElementSibling,
    insertBeforeElement: insertBeforeElement,
    insertAfterElement: insertAfterElement,
    preprendChild: preprendChild,
    hasClass: hasClass,
    removeClass: removeClass,
    addClass: addClass,
    toggleClass: toggleClass,
    removeChildren: removeChildren,
    getElementSibling: getElementSibling,
    changeSelectValue: changeSelectValue,
    isElement: isElement,
    isHTMLElement: isHTMLElement,
    copytoClipboard: copytoClipboard,
    findAncestor: findAncestor,
    createElement: createElement,
    createDocFragment: createDocFragment,
    createTextNode: createTextNode,
    createLink: createLink,
    createHeader: createHeader,
    createDiv: createDiv,
    createAside: createAside,
    createLineBreak: createLineBreak,
    createHeading: createHeading,
    createP: createP,
    createUl: createUl,
    createLi: createLi,
    createAnchor: createAnchor,
    createImage: createImage,
    createSpan: createSpan,
    createStrong: createStrong,
    createEm: createEm,
    createInput: createInput,
    createLabel: createLabel,
    createTextArea: createTextArea,
    createButton: createButton,
    createTable: createTable,
    createTableHeader: createTableHeader,
    createTableBody: createTableBody,
    createTableFooter: createTableFooter,
    createTableRow: createTableRow,
    createTableHeaderCell: createTableHeaderCell,
    createTableCell: createTableCell,
    addAttributes: addAttributes,
    appendChildren: appendChildren,
    show: show,
    hide: hide,
    conceal: conceal,
    highlight: highlight,
    unhighlight: unhighlight,
    enable: enable,
    disable: disable
  });

  /**
   * Inserts an item in an array at the specified index
   * @param {Object[]} arr array
   * @param {number} index 
   * @param {object} item 
   * @returns {number} The new length of the array
   * @memberof TYPE
   */
  function insert(arr, index, item) {
    arr.splice(index, 0, item);
    return arr.length;
  }
  /**
   * Returns last element of array.
   * @param {Object[]} arr array
   * @memberof TYPE
   */

  function last(arr) {
    if (Array.isArray(arr) && arr.length - 1) {
      return arr[arr.length - 1];
    }

    return undefined;
  }

  /**
   * Returns a value indicating the day of the week with monday = 0
   * @param {Date} date 
   * @memberof TYPE
   */

  function dayOfWeek(date) {
    var d = date.getDay();
    return d == 0 ? 6 : d - 1;
  } // Compare 2 times and returns
  //  1 if t1 > t2
  //  0 if t1 = t2
  // -1 if t1 < t2

  function compareTime(t1, t2) {
    var arr1 = t1.split(':');
    var arr2 = t2.split(':'); // hour comparison

    if (+arr1[0] > +arr2[0]) return 1;else if (+arr1[0] < +arr2[0]) return -1;else {
      // minute comparison
      if (+arr1[1] > +arr2[1]) return 1;else if (+arr1[1] < +arr2[1]) return -1;else {
        if (arr1.length == arr2.length && arr1.length == 3) {
          // second comparison
          if (+arr1[2] > +arr2[2]) return 1;else if (+arr1[2] < +arr2[2]) return -1;
        }

        return 0;
      }
    }
  }
  function parseTime(n) {
    var hh = +n | 0;
    var mm = '00';
    if (!isInt(+n)) mm = (n + '').split('.')[1] * 6;
    return hh + ':' + mm;
  } // Returns a date using the format "YYYY-mm-dd"

  function shortDate(myDate) {
    var d = new Date(myDate);
    var dd = d.getDate();
    var mm = d.getMonth() + 1; // January = 0

    var yyyy = d.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    d = yyyy + '-' + mm + '-' + dd;
    return d;
  } // Returns a date and time using the format "YYYY-mm-dd hh:MM"

  function longDate(myDate) {
    var d = new Date(myDate);
    var hh = d.getHours();
    var MM = d.getMinutes();
    if (MM < 10) MM = '0' + MM;
    d = shortDate(d) + ' ' + hh + ':' + MM;
    return d;
  } // Convertie une date de string (YYYY-MM-DD) en format Date

  function parseDate(strDate) {
    var arrDate = strDate.split('-');
    return new Date(arrDate[0], arrDate[1] - 1, arrDate[2], 0, 0, 0, 0);
  } // Convertie une date de string (YYYY-MM-DD hh:mm) en format Date

  function parseDateTime(strDate) {
    var arrDateTime = strDate.split(' ');
    var arrTime = arrDateTime[1].split(':');
    var d = parseDate(arrDateTime[0]).setHours(+arrTime[0], +arrTime[1]);
    return new Date(d);
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

  function timeAgo(time, callback) {
    callback = valOrDefault(callback, timeAgoResponse);
    var seconds = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
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

  /**
   * Returns the index or value of the first element in the object
   * @param {Object|Array} obj 
   * @param {any} value 
   * @memberof TYPE
   */
  function find(obj, value) {
    if (Array.isArray(obj)) {
      var index = obj.indexOf(value);
      if (index !== -1) return index;
    } else {
      var _arr = Object.keys(obj);

      for (var _i = 0; _i < _arr.length; _i++) {
        var e = _arr[_i];

        if (obj[e] === value || obj[e].val === value) {
          return e;
        }
      }
    }

    return undefined;
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
   * @memberof TYPE
   */

  var hasOwn = function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  };
  /**
   * Returns a boolean indicating whether the object (child) inherit from another (parent)
   * @param {*} child 
   * @param {*} parent 
   * @memberof TYPE
   */

  var isDerivedOf = function isDerivedOf(child, parent) {
    return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
  };
  /**
   * 
   * @param {*} obj 
   * @memberof TYPE
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

  /** @namespace TYPE */

  var index$1 = /*#__PURE__*/Object.freeze({
    valOrDefault: valOrDefault,
    boolToInt: boolToInt,
    toBoolean: toBoolean,
    isInt: isInt,
    isEmpty: isEmpty,
    isDate: isDate,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    isNull: isNull,
    isUndefined: isUndefined,
    isNullOrUndefined: isNullOrUndefined,
    insert: insert,
    last: last,
    dayOfWeek: dayOfWeek,
    compareTime: compareTime,
    parseTime: parseTime,
    shortDate: shortDate,
    longDate: longDate,
    parseDate: parseDate,
    parseDateTime: parseDateTime,
    timeAgo: timeAgo,
    find: find,
    defProp: defProp,
    hasOwn: hasOwn,
    isDerivedOf: isDerivedOf,
    cloneObject: cloneObject,
    isNullOrWhitespace: isNullOrWhitespace,
    capitalize: capitalize,
    capitalizeFirstLetter: capitalizeFirstLetter,
    removeAccents: removeAccents
  });

  /** 
   * Ajax namespace
   * @namespace AJAX 
   */
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

          if (xhr.status >= 200 && xhr.status < 300) {
            callback = isNullOrUndefined(passCb) ? failureCb : passCb;
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
   * @memberof AJAX
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
   * @memberof AJAX
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
   * @memberof AJAX
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
   * @memberof AJAX
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

  var ajaxUtils = /*#__PURE__*/Object.freeze({
    GET: GET,
    POST: POST,
    PUT: PUT,
    DELETE: DELETE
  });

  /**
   * @namespace MATH
   */

  /**
   * Return a random integer between min and max (inclusive).
   * @param {number} min 
   * @param {number} [max] 
   * @memberof MATH
  */
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
  }

  var mathUtils = /*#__PURE__*/Object.freeze({
    random: random
  });

  /**
   * @namespace PATH
   */
  /**
   * Append the path to the current path
   * @param {string} target 
   * @param {string} path 
   * @memberof PATH
   */

  function addPath(target, path) {
    return isNullOrWhitespace(target) ? path : target + '.' + path;
  }
  /**
   * Returns the directory of the path
   * @param {string} path 
   * @memberof PATH
   */

  function getDir(path) {
    return path.substring(0, path.lastIndexOf('.'));
  }
  /**
   * Returns the directory of the path from the target
   * @param {string} path 
   * @memberof PATH
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
   * @memberof PATH
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

  var pathUtils = /*#__PURE__*/Object.freeze({
    addPath: addPath,
    getDir: getDir,
    getDirTarget: getDirTarget,
    findByPath: findByPath
  });

  /**
   * @namespace URI
   */
  var encode = encodeURIComponent;
  /**
   * Extracts and returns the protocol and host of a given url
   * @param {string} url 
   * @memberof URI
   */

  function getRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^/?#]*).*$/, "$1");
  }
  /**
   * Extracts and returns the parameters of a URL
   * @param {string} [prop] Searched parameter
   * @memberof URI
   */

  function getUrlPrams(prop) {
    var href = window.location.href;
    var search = decodeURIComponent(href.slice(href.indexOf('?') + 1));

    if (this.isNullOrWhiteSpace(search)) {
      return undefined;
    }

    var defs = search.split('&');
    var params = {};
    defs.forEach(function (val) {
      var parts = val.split('=', 2);
      params[parts[0]] = parts[1];
    });

    if (prop) {
      return params[prop];
    }

    return params;
  }
  /**
   * Creates a query string
   * @param {Object} query 
   * @returns {string} Query string
   * @memberof URI
   */

  function queryBuilder(query) {
    var str = [];

    for (var key in query) {
      if (hasOwn(query, key)) {
        str.push("".concat(encode(key), "=").concat(encode(query[key])));
      }
    }

    return str.join('&');
  }

  var uriUtils = /*#__PURE__*/Object.freeze({
    getRootUrl: getRootUrl,
    getUrlPrams: getUrlPrams,
    queryBuilder: queryBuilder
  });

  // export * from './datatype/index.js';
  // export * from './ajax-utils.js';
  // export * from './math-utils.js';
  // export * from './path-utils.js';
  // export * from './uri-utils.js';

  exports.AJAX = ajaxUtils;
  exports.DOM = index;
  exports.MATH = mathUtils;
  exports.PATH = pathUtils;
  exports.TYPE = index$1;
  exports.URI = uriUtils;

  return exports;

}({}));