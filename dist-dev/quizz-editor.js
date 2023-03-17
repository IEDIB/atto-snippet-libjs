/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module) {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 4 */
/***/ (function(module) {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* eslint-disable @typescript-eslint/no-non-null-assertion */


function genID() {
  return "sd_" + Math.random().toString(32).substring(2);
}
function findContainers(query) {
  return document.querySelectorAll(query);
}
function _bootstrap(classes) {
  classes.forEach(function (clazz) {
    var IB = window.IB;
    if (!clazz.meta) {
      console.error("Missing meta in class ", clazz, ". Annotate it with @Component");
      return;
    }
    var meta = clazz.meta;
    if (IB.sd[meta.name] && typeof IB.sd[meta.name].init === 'function') {
      console.error("Warning: component '".concat(meta.name, "' loaded twice."));
      //Simply bind possibly missing components
      IB.sd[meta.name].init();
      return;
    }
    var _init = function _init() {
      IB.sd[meta.name] = IB.sd[meta.name] || {
        inst: {},
        _class: clazz,
        init: _init,
        dispose: null
      };
      var query = meta.query || "div[role=\"snptd_".concat(meta.name, "\"], div[data-snptd=\"").concat(meta.name, "\"]");
      //Check if is defined as a singleton
      if (query === 'body') {
        if (IB.sd[meta.name].singl) {
          console.error("Singleton already defined");
          return;
        }
        //Singleton instance
        var parent = document.querySelector("body");
        var singleton = new clazz(parent);
        singleton.init();
        // add to the shared variable
        IB.sd[meta.name].singl = singleton;
        console.log("_init: Initialized singleton '".concat(meta.name, "' instance."));
      } else {
        //Multiple instances with parent's
        var containers = findContainers(query);
        var counter = 0;
        containers.forEach(function (p) {
          var parent = p;
          // Create instance of clazz
          var id = parent.getAttribute("id");
          if (!id) {
            id = genID();
            parent.setAttribute("id", id);
          }
          if (parent.dataset.active === "1") {
            console.warn("Warning: Element '".concat(meta.name, "' ").concat(id, " already processed."));
            return;
          }
          var instance = new clazz(parent);
          instance.init();
          // add to the shared variable
          if (IB.sd[meta.name].inst != null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            IB.sd[meta.name].inst[id] = instance;
          }
          counter++;
        });
        console.log("_init: Initialized ".concat(counter, " '").concat(meta.name, "' instances."));
      }
    };
    _init();
    var _dispose = function _dispose() {
      var counter = 0;
      if (!window.IB || !window.IB.sd || !window.IB.sd[meta.name] || !window.IB.sd[meta.name].inst) {
        return;
      }
      Object.keys(window.IB.sd[meta.name].inst).forEach(function (key) {
        var instance = window.IB.sd[meta.name].inst[key];
        if (instance) {
          instance.dispose();
          counter++;
          delete IB.sd[meta.name].inst[key];
        }
      });
      console.log("_dispose: Destroyed ".concat(counter, " '").concat(meta.name, "' instances."));
    };
    IB.sd[meta.name].dispose = _dispose;
  });
}
/* harmony default export */ __webpack_exports__["default"] = ({
  bootstrap: function bootstrap(defs) {
    window.IB = window.IB || {
      sd: {}
    };
    var arrayDefs = defs;
    //check if some of the components to be bootstrap need jQuery
    var use$ = arrayDefs.map(function (d) {
      var _d$meta;
      return ((_d$meta = d.meta) === null || _d$meta === void 0 ? void 0 : _d$meta.use$) || false;
    }).reduce(function (pv, cv) {
      return cv || pv;
    });
    if (use$) {
      (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.onJQueryReady)(function () {
        var _window$IB;
        if (typeof ((_window$IB = window.IB) === null || _window$IB === void 0 ? void 0 : _window$IB.on$Ready) === 'function') {
          window.IB.on$Ready();
        }
        _bootstrap(arrayDefs);
      });
    } else {
      // Do not require $ at startup
      // But make sure that page is already rendered
      if (document.readyState === 'complete') {
        // The page is fully loaded
        _bootstrap(arrayDefs);
      } else {
        window.addEventListener('DOMContentLoaded', function () {
          return _bootstrap(arrayDefs);
        });
      }
    }
  }
});

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "base64Decode": function() { return /* binding */ base64Decode; },
/* harmony export */   "base64Encode": function() { return /* binding */ base64Encode; },
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; }
/* harmony export */ });
/* unused harmony exports parseUrlParams, querySelectorProp, addScript, addLinkSheet, pathJoin, addBaseToUrl, scopedEval */
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Given an url of the form https://....?a=234234&b=dfddfsdf&c=false&opt
 * It returns a map with the values of the parameters
 * {a: '234234', b: 'dfddfsdf', c: 'false', opt: 'true'}
 * @param url 
 * @returns 
 */
function parseUrlParams(url) {
  var params = {};
  var parts = url.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) {
      continue;
    }
    params[nv[0]] = nv[1] || "true";
  }
  return params;
}

/**
 * Obtains the property of the element that matches the query selector
 * If the object or the property is not found, then def value is return
 * or '' if no def value is passed
 * @param query 
 * @param prop 
 * @param def 
 * @returns 
 */
function querySelectorProp(query, prop, def) {
  var ele = document.querySelector(query);
  if (ele != null) {
    return ele.getAttribute(prop) || def || '';
  }
  return def || '';
}

/**
 * Generates a random id for the DOM Elements
 * @returns 
 */
function genID() {
  return 'g' + Math.random().toString(32).substring(2);
}

/**
 * Waits until the object require is a function in window object
 * It performs long polling of 500 ms, up to nattempt times.
 * @param cb 
 * @param nattempt 
 * @returns 
 */
function waitForFunction(funName, cbSuccess, cbError, nattempt) {
  nattempt = nattempt || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var win = window;
  if (win[funName] && typeof win[funName] === 'function') {
    cbSuccess && cbSuccess();
    return;
  } else if (nattempt > 15) {
    cbError && cbError();
    return;
  }
  window.setTimeout(function () {
    waitForFunction(funName, cbSuccess, cbError, nattempt + 1);
  }, 50 * (nattempt + 1));
}
function onJQueryReady(cb) {
  waitForFunction('require', function () {
    //wait for jquery 
    window.require(['jquery'], function () {
      //wait for document ready
      console.info("$ready1");
      $(cb);
    }, function () {
      console.error("Error requiring $. Waiting for $");
      // An error occurred but try to load anyway!
      // Try jQuery directly
      waitForFunction('jQuery', function () {
        console.info("$ready2");
        //wait for document ready
        $(cb);
      }, function () {
        console.error("Cannot find $. Bootstrap anyway!");
        cb();
      }, 35);
    });
  }, function () {
    console.error("Cannot find requirejs. Waiting for $");
    // wait for jQuery directly
    waitForFunction('jQuery', function () {
      console.info("$ready3");
      //wait for document ready
      $(cb);
    }, function () {
      console.error("Cannot find $. Bootstrap anyway!");
      cb();
    }, 35);
  }, 10);
}

/**
 * Safe conversion of a string to integer by handling errors and NaN values
 * In this case, the def number passed is returned
 * @param str 
 * @param def 
 * @returns 
 */
function convertInt(str, def) {
  if (str && typeof str === 'number') {
    return str;
  }
  if (!str || !(str + "").trim()) {
    return def;
  }
  try {
    var val = parseInt(str + "");
    if (!isNaN(val)) {
      return val;
    }
  } catch (ex) {
    //pass
  }
  return def;
}

/**
 * Creates a DOM element with some options that can be passed in order to initialize it
 * @param nodeType 
 * @param opts 
 * @returns 
 */
function createElement(nodeType, opts) {
  var elem = document.createElement(nodeType);
  Object.keys(opts).forEach(function (optName) {
    var value = opts[optName];
    if (optName === "class") {
      value.trim().split(/\s+/).forEach(function (cName) {
        elem.classList.add(cName);
      });
    } else if (optName === "style") {
      value.split(";").forEach(function (pair) {
        var kv = pair.split(":");
        if (kv.length === 2) {
          elem.style.setProperty(kv[0].trim(), kv[1].trim());
        }
      });
    } else if (optName === "html") {
      elem.innerHTML = value;
    } else {
      elem.setAttribute(optName, value);
    }
  });
  return elem;
}

/**
 * Creates a script tag and adds it to the head section. It handles loading and error cases
 * @param url
 * @param id 
 * @param onSuccess 
 * @param onError 
 * @returns 
 */
function addScript(url, id, onSuccess, onError) {
  if (id && document.head.querySelector('script#' + id) != null) {
    //check if already in head
    return;
  }
  var newScript = document.createElement('script');
  newScript.type = "text/javascript";
  newScript.src = url;
  id && newScript.setAttribute("id", id);
  newScript.onload = function () {
    console.info("Loaded ", url);
    onSuccess && onSuccess();
  };
  newScript.onerror = function () {
    console.error("Error loading ", url);
    onError && onError();
  };
  console.log("Added to head the script ", url);
  document.head.append(newScript);
}

/**
  * Creates a link sheet and adds it to the head section. It handles loading and error cases
 * @param href 
 * @param id 
 * @param onSuccess 
 * @param onError 
 * @returns 
 */
function addLinkSheet(href, id, onSuccess, onError) {
  if (id && document.head.querySelector('link#' + id) != null) {
    //check if already in head
    return;
  }
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("type", "text/css");
  css.setAttribute("href", href);
  id && css.setAttribute("id", id);
  css.onload = function () {
    console.info("Loaded ", href);
    onSuccess && onSuccess();
  };
  css.onerror = function () {
    console.error("Error loading ", href);
    onError && onError();
  };
  console.log("Added to head the linksheet ", href);
  document.head.appendChild(css);
}

/**
 * Safely joins two parts of an url
 * @param a 
 * @param b 
 * @returns 
 */
function pathJoin(a, b) {
  a = (a || "").trim();
  b = (b || "").trim();
  if (!a.endsWith('/')) {
    a = a + '/';
  }
  if (b.startsWith('/')) {
    b = b.substring(1);
  }
  return a + b;
}

/**
 * Adds the baseurl if the passed url does not start with http or https
 */
function addBaseToUrl(base, url) {
  url = (url || "").trim();
  if (url.toLowerCase().startsWith("http")) {
    return url;
  }
  // Afegir la base
  var out = pathJoin(base, url);
  return out;
}

/**
 * Evals an expression within a context object
 * @param context 
 * @param {*} expr 
 * @returns 
 */
function scopedEval(context, expr) {
  context = context || {};
  var contextKeys = Object.keys(context);
  var listArgs = [].concat(contextKeys, ['expr', 'return eval(expr)']);
  var evaluator = _construct(Function, _toConsumableArray(listArgs));
  var contextValues = Object.values(context);
  var listVals = [].concat(contextValues, [expr]);
  return evaluator.apply(void 0, _toConsumableArray(listVals));
}
function base64Encode(obj) {
  return btoa(JSON.stringify(obj || {}));
}
function base64Decode(b64) {
  b64 = b64 || '';
  return JSON.parse(atob(b64) || '{}');
}

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": function() { return /* binding */ Component; },
/* harmony export */   "ComponentHTML": function() { return /* binding */ ComponentHTML; }
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var componentMetaDefaults = {
  name: "",
  author: "",
  version: "1.0",
  use$: false
};
function Component(_meta) {
  var meta = Object.assign({}, componentMetaDefaults, _meta);
  if (!meta.query) {
    meta.query = "[role=\"snptd_".concat(meta.name, "\"],[data-snptd=\"").concat(meta.name, "\"]");
  }
  return function (target) {
    target.meta = meta;
  };
}
// Decorator
function ComponentHTML(componentOptions) {
  return function (target) {
    var originalMethod = target.prototype.connectedCallback;
    var elementName = componentOptions.elementName,
      classes = componentOptions.classes,
      styles = componentOptions.styles;

    // function() rather than () => is important because of the scoping of 'this'
    target.prototype.connectedCallback = function () {
      if (classes) {
        var _this$classList;
        (_this$classList = this.classList).add.apply(_this$classList, _toConsumableArray(classes));
      }
      if (styles) {
        Object.assign(this.style, styles);
      }
      originalMethod && originalMethod.apply(this);
    };
    console.log("Calling customElements define for ", elementName, target);
    customElements.define(elementName, target);
  };
}

/***/ }),
/* 25 */,
/* 26 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseComponent": function() { return /* binding */ BaseComponent; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var BaseComponent = /*#__PURE__*/_createClass(function BaseComponent(parent) {
  _classCallCheck(this, BaseComponent);
  this.parent = parent;
});

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSDialog": function() { return /* binding */ BSDialog; },
/* harmony export */   "BSDialogType": function() { return /* binding */ BSDialogType; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _jsPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable @typescript-eslint/ban-ts-comment */




/**
 * Type of dialog
 * CLOSE, Only close button
 * CANCEL_ACCEPT, Accept and cancel buttons
 * CANCEL_ACCEPT_FORM, wraps body and footer into a form element
 * CANCEL_ACCEPT_FORM_VALIDATION, performs validation checks to the form when submitting
 */
var BSDialogType;

/**
 * Simple dialog based on Boostrap dialogs
 * Extend this class to include further functionality
 */
(function (BSDialogType) {
  BSDialogType[BSDialogType["CLOSE"] = 0] = "CLOSE";
  BSDialogType[BSDialogType["CANCEL_ACCEPT"] = 1] = "CANCEL_ACCEPT";
  BSDialogType[BSDialogType["CANCEL_ACCEPT_FORM"] = 2] = "CANCEL_ACCEPT_FORM";
  BSDialogType[BSDialogType["CANCEL_ACCEPT_FORM_VALIDATION"] = 3] = "CANCEL_ACCEPT_FORM_VALIDATION";
})(BSDialogType || (BSDialogType = {}));
var BSDialog = /*#__PURE__*/function () {
  function BSDialog(id, type) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Diàleg";
    _classCallCheck(this, BSDialog);
    this.type = type;
    var hasForm = type === BSDialogType.CANCEL_ACCEPT_FORM || type === BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION;
    this.hasValidation = type === BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION;
    var formBegin = '';
    var formEnd = '';
    if (hasForm) {
      formBegin = "<form".concat(this.hasValidation ? ' class="needs-validation" novalidate' : '', ">");
      formEnd = '</form>';
    }
    var footerContent = "<button type=\"button\" class=\"btn btn-sm btn-secondary\" data-dismiss=\"modal\">".concat(type === BSDialogType.CLOSE ? 'Tancar' : 'Cancel·lar', "</button>");
    if (type !== BSDialogType.CLOSE) {
      footerContent += "<button type=\"".concat(hasForm ? 'submit' : 'button', "\" class=\"btn btn-sm btn-primary\">Acceptar</button>");
    }
    this.elem = $("\n            <div class=\"modal fade moodle-dialogue\" id=\"".concat(id, "\" tabindex=\"-1\" aria-labelledby=\"bsdialog\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                  <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">").concat(title, "</h5>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                      <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                  </div>\n                  ").concat(formBegin, "\n                  <div class=\"modal-body\" style=\"max-height:400px;overflow-y:auto;font-size:90%;\">\n                  </div>\n                  <div class=\"modal-footer\">\n                    ").concat(footerContent, "\n                  </div>\n                  ").concat(formEnd, "\n                </div>\n                </div>"));
    this.body = this.elem.find('div.modal-body');
    this.header = this.elem.find('h5.modal-title');
    this.primaryButton = this.elem.find('button.btn.btn-primary');
    this.form = this.elem.find('form');
    this.validationDiv = this.elem.find('div.alert.alert-danger');
    $('body').append(this.elem);
  }
  _createClass(BSDialog, [{
    key: "resetDialog",
    value: function resetDialog() {
      this.body.html('');
      this.primaryButton && this.primaryButton.off();
      if (this.form) {
        this.form.off();
      }
      this.validationDiv.css('display', 'none');
      this.validationDiv.html('');
    }
  }, {
    key: "setBody",
    value: function setBody(htmlElem) {
      var _this = this;
      this.resetDialog();
      var $htmlElem = $(htmlElem);
      this.validationDiv = $("<div class=\"alert alert-danger\" style=\"display:none;max-height:100px;overflow-y:auto;\"></div>");
      this.body.append(this.validationDiv);
      this.body.append($htmlElem);
      // Check if has primary button
      if (this.primaryButton) {
        if (this.form) {
          //Attach action to formElement because it is of submit type
          this.form.on('submit', function (evt) {
            // Do validation
            evt.preventDefault();
            evt.stopPropagation();
            if (_this.hasValidation) {
              _this.form.addClass('was-validated');
              // Needs validation
              // First check userDefined validation
              _this.updateValues();
              var error = _this.customValidation();
              console.log("Custom validation is ", error);
              if (error && _this.validationDiv != null) {
                _this.validationDiv.css('display', '');
                _this.validationDiv.html(error);
                var offset = _this.validationDiv.offset();
                offset && _this.body.animate({
                  scrollTop: 0
                });
                return;
              }
              // Then build-in validation
              if (_this.form[0].checkValidity()) {
                // close dialog
                //@ts-ignore
                _this.elem.modal('hide');
                // execute succesCb 
                _this.acceptCb && _this.acceptCb(_this.scope);
              }
            } else {
              //No validation required
              _this.updateValues();
              _this.acceptCb && _this.acceptCb(_this.scope);
            }
          });
        } else {
          //Directly attach action to primary button if not of submit type
          this.primaryButton.on('click', function (evt) {
            evt.preventDefault();
            _this.acceptCb && _this.acceptCb();
            //@ts-ignore
            _this.elem.modal('hide');
          });
        }
      }
    }
  }, {
    key: "setValues",
    value: function setValues(scope) {
      this.scope = scope;
      var allBindable = this.body.find('input[id], textarea[id], select[id]');
      allBindable.each(function (i, elem) {
        var idParts = (elem.getAttribute("id") || '').split("_");
        if (idParts.length < 2) {
          return;
        }
        var barPath = (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.splitBar)(idParts[idParts.length - 1]);
        //Seach the value in scope
        var value = (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.getPathValue)(barPath, scope);
        //TODO serialize the value and handle [0] syntax
        if (elem.nodeName === 'TEXTAREA') {
          elem.value = value || '';
        } else {
          var inputElem = elem;
          var t = (inputElem.getAttribute('type') || '').toLowerCase();
          var isCheckRadio = t === 'radio' || t === 'checkbox';
          if (isCheckRadio) {
            inputElem.checked = value === 'true';
          } else {
            inputElem.value = value || '';
          }
        }
      });
    }
  }, {
    key: "updateValues",
    value: function updateValues() {
      var _this2 = this;
      if (this.scope == null) {
        return;
      }
      var allBindable = this.body.find('input[id], textarea[id], select[id]');
      allBindable.each(function (i, elem) {
        var idParts = (elem.getAttribute("id") || '').split("_");
        if (idParts.length < 2) {
          return;
        }
        var barPath = (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.splitBar)(idParts[idParts.length - 1]);
        //Seach the parent bar in scope
        if (elem.nodeName === 'TEXTAREA') {
          var newValue = elem.value || '';
          (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope, newValue);
        } else {
          var inputElem = elem;
          var t = (inputElem.getAttribute('type') || '').toLowerCase();
          var isCheckRadio = t === 'radio' || t === 'checkbox';
          if (isCheckRadio) {
            (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope, inputElem.checked);
          } else {
            (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope, inputElem.value);
          }
        }
      });
    }
  }, {
    key: "setBodyBindings",
    value: function setBodyBindings(bodyHTML, scope) {
      var panel = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        style: 'width:100%;padding:10px',
        html: bodyHTML
      });
      this.setBody(panel);
      console.log('bs-dialog recieved the scope', scope);
      this.setValues(scope);
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      //Overide me! Return the error/s description
      return null;
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.header.html(title);
    }
  }, {
    key: "show",
    value: function show(acceptCb) {
      var _this3 = this;
      this.form.removeClass('was-validated');
      //@ts-ignore
      this.elem.modal('show');
      //It is strange, but it rquires a timeout!!!
      window.setTimeout(function () {
        return _this3.body.scrollTop(0);
      }, 400);
      this.acceptCb = acceptCb;
    }
  }]);
  return BSDialog;
}();

/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPathValue": function() { return /* binding */ getPathValue; },
/* harmony export */   "setPathValue": function() { return /* binding */ setPathValue; },
/* harmony export */   "splitBar": function() { return /* binding */ splitBar; }
/* harmony export */ });
/* unused harmony export searchParentInPath */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * 'a.b[0].c' --> ['a','b','[0]','c']
 * @param bar 
 */
function splitBar(bar) {
  var path = [];
  bar.split('.').forEach(function (p) {
    var parts = p.split('[');
    var pt = parts[0].trim();
    if (pt.length) {
      path.push(pt);
      if (parts.length > 1) {
        path.push('[' + parts[1].trim());
      }
    }
  });
  return path;
}

/**
 * scope ={
 *    a: 'hello',
 *    b: [1,2,3],
 *    c: {
 *       k: 'world'
 *         }
 *      }
 *    a    -> scope
 *    b[0] -> scope.b
 *    c.k  -> scope.c
 *    w    -> null
 *    c.x  -> null
 *    @param barPath 
 *    @param scope 
 *    @returns 
 */
function searchParentInPath(barPath, scope) {
  if (barPath.length === 0) {
    return null;
  } else if (barPath.length === 1) {
    return scope;
  }
  var currentObject = scope;
  var i = 0;
  var barPathLen = barPath.length - 1; //Stop to the parent
  while (currentObject != null && i < barPathLen) {
    var bar = barPath[i];
    if (bar.indexOf('[') >= 0) {
      //Test against array
      var pos = parseInt(bar.replace(/[[\]]/g, ''));
      if (Array.isArray(currentObject)) {
        var cObjLst = currentObject;
        if (pos < cObjLst.length) {
          currentObject = cObjLst[pos];
        } else {
          console.error("Index out of bounds ", barPath.join(''), pos, cObjLst);
          currentObject = null;
        }
      } else {
        console.error("Not an array", barPath.join(''), currentObject);
        currentObject = null;
      }
    } else {
      //Lookup the object
      var cObj = currentObject;
      if (cObj[bar] != null) {
        currentObject = cObj[bar];
      } else {
        currentObject = null;
      }
    }
    i++;
  }
  return currentObject;
}
function getPathValue(barPath, scope) {
  var currentObject = searchParentInPath([].concat(_toConsumableArray(barPath), ['']), scope);
  if (currentObject != null) {
    if (['string', 'boolean', 'number'].includes(_typeof(currentObject))) {
      return currentObject + '';
    } else {
      return JSON.stringify(currentObject);
    }
  }
  return null;
}
function setPathValue(barPath, scope, newValue) {
  var currentObject = searchParentInPath(barPath, scope);
  var applied = false;
  if (currentObject != null) {
    var _key = barPath[barPath.length - 1];
    if (_key.indexOf('[') >= 0) {
      //An array?
      if (Array.isArray(currentObject)) {
        var cObjLst = currentObject;
        var pos = parseInt(_key.replace(/[[\]]/g, ''));
        if (pos < cObjLst.length) {
          cObjLst[pos] = newValue;
          applied = true;
        }
      }
    } else {
      //Set property to the object
      if (_typeof(currentObject) === 'object') {
        var cObj = currentObject;
        cObj[_key] = newValue;
        applied = true;
      }
    }
  }
  return applied;
}

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runIBScript": function() { return /* binding */ runIBScript; },
/* harmony export */   "treatIniPlaceholders": function() { return /* binding */ treatIniPlaceholders; }
/* harmony export */ });
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
//Add all Math utilities
var utilities = {};
Object.getOwnPropertyNames(Math).forEach(function (key) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  utilities[key] = Math[key];
});
Object.defineProperty(utilities, "alea", {
  value: function value() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var na = args.length;
    if (na === 0) {
      //cap argument - retorna un signe [-1 o 1]
      return Math.random() < 0.5 ? -1 : 1;
    } else if (na === 1) {
      //un argument - llista
      if (Array.isArray(args[0])) {
        var indx = Math.floor(Math.random() * args[0].length);
        return args[0][indx];
      }
      //un argument - numeric [-a, a]
      else if (typeof args[0] === 'number') {
        return Math.floor(2 * args[0] * Math.random()) + args[0];
      }
    } else if (na >= 2) {
      var a = args[0];
      var b = args[1];
      var pp = 1;
      var ndec = 0;
      var retVal = (b - a) * Math.random();
      if (na === 3) {
        //The third argument is the number of decimals
        ndec = Math.abs(args[2]);
        ndec = ndec > 8 ? 8 : ndec;
        pp = Math.pow(10, ndec);
      }
      //TODO: Performance issue, but no other way to ensure correct number of decimals!!
      retVal = +(Math.round(retVal * pp) / pp + a).toFixed(ndec);
      return retVal;
    }
  },
  enumerable: true,
  configurable: false,
  writable: false
});
Object.defineProperty(utilities, "dec", {
  value: function value(v) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var pp = Math.pow(10, n);
    return Math.round(v * pp) / pp;
  },
  enumerable: true,
  configurable: false,
  writable: false
});

/**
 * Runs a whole script within a scope
 *  * #bar exports the variable to the scope 
 * while
 * bar is a local variable that is not exported
 * # is a shortcut for this.
 * @param scriptCode The js code to be run
 * @param context The variables that must be passed as argument to Function
 * @param scope Where the execution variables are exported
 * @returns the updated scope
 */
function runInScope(scriptCode, context, scope) {
  context = context || {};
  scope = scope || {};
  var contextKeys = Object.keys(context);
  var contextValues = Object.values(context);
  //By default run in strict mode
  var evaluator = _construct(Function, contextKeys.concat(['"use' + ' strict"\n' + scriptCode]));
  return evaluator.apply(scope, contextValues);
}
function runIBScript(scriptCode, context, scope) {
  context = Object.assign(context || {}, utilities);
  return runInScope('var _this=this;\n' + scriptCode.replace(/#/g, '_this.'), context, scope);
}

/**
* Replace V[N] by (?,?,...,?)
* Replace M[pxq] by matrix pxq with ? elements
* @param iniTxt 
* @returns 
*/
function treatIniPlaceholders(iniTxt) {
  if (!iniTxt) {
    return iniTxt;
  }
  return iniTxt.replace(/V\[(\d+)\]/g, function ($0, $1) {
    var n = parseInt($1);
    return '\\left(' + new Array(n).fill('\\MathQuillMathField{}').join(',') + '\\right)';
  }).replace(/M\[(\d+)x(\d+)\]/g, function ($0, $1, $2) {
    var n = parseInt($1);
    var m = parseInt($2);
    var line = new Array(n).fill('\\MathQuillMathField{}').join(' & ');
    var mtex = new Array(m).fill(line).join(' \\\\ ');
    return '\\begin{pmatrix}' + mtex + '\\end{pmatrix}';
  }).replace(/\?/g, '\\MathQuillMathField{ }');
}

/***/ }),
/* 69 */,
/* 70 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_editor_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_editor_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_editor_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_editor_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_editor_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(72), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(73), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(74), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(75), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body.editing [data-quizz-group]{border:3px dotted lightblue;padding:5px;border-left:3px solid lightblue}body.editing [data-quizz-group]::before{content:\"quizz::group\";display:block;float:right;color:lightblue;font-size:90%}body.editing [data-quizz-group]::after{clear:both}body.editing ib-quizz-dropdown,body.editing ib-quizz-mchoice,body.editing ib-quizz-numeric,body.editing ib-quizz-cloze{display:inline-block;vertical-align:middle;position:relative;margin:4px;min-width:39px}body.editing :not(div[data-quizz-group]) ib-quizz-mchoice::after{content:\"ibquizz::mchoice\";color:lightgray;display:block;background:gray}body.editing :not(div[data-quizz-group]) ib-quizz-dropdown::after{content:\"ibquizz::dropdown\";color:lightgray;display:block;background:gray}body.editing :not(div[data-quizz-group]) ib-quizz-numeric::after{content:\"ibquizz::numeric\";color:lightgray;display:block;background:gray}body.editing :not(div[data-quizz-group]) ib-quizz-cloze::after{content:\"ibquizz::cloze\";color:lightgray;display:block;background:gray}body.editing div[data-quizz-group] ib-quizz-dropdown::after{content:\"\";display:block;width:133px;height:39px;background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");background-size:cover;background-repeat:no-repeat;background-position:center center}body.editing div[data-quizz-group] ib-quizz-mchoice::after{content:\"\";display:block;width:80px;height:86px;background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");background-size:cover;background-repeat:no-repeat;background-position:center center}body.editing div[data-quizz-group] ib-quizz-numeric::after{content:\"\";display:block;width:92px;height:39px;background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");background-repeat:no-repeat;background-position:center center;background-size:cover}body.editing div[data-quizz-group] ib-quizz-cloze::after{content:\"\";display:block;width:96px;height:39px;background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");background-repeat:no-repeat;background-position:center center;background-size:cover}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 72 */
/***/ (function(module) {

module.exports = "data:image/png;base64,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";

/***/ }),
/* 73 */
/***/ (function(module) {

module.exports = "data:image/png;base64,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";

/***/ }),
/* 74 */
/***/ (function(module) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAABICAIAAAAGWpJiAAAK4GlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUk8kWgOf/00NCgAACUkLvSCeAlBBa6NJBVEISSCghJgQEsbO4gquCiAgoS1kVUXB1BWQtiAUrig37giwC6nOxYEPl/cAj7O47773z7jmT+c7NnTv33jPznzsAkP3ZIlE6rABAhjBLHO7nRYuNi6fhhgEE1IECUAMabI5ExAgLCwKIzM5/lfd3EWtEbllO+fr3//+rKHF5Eg4AUALCSVwJJwPhTmQ854jEWQCgDiJ6/Zws0RTfQFhZjASI8O9TnDLDH6c4aZrRpGmbyHAmwjQA8CQ2W5wCAMkC0dOyOSmIH9JUDtZCrkCIcD7C7hw+m4vwCYQtMjIyp3gEYRPEXgQAGakOoCf9yWfKX/wnyfyz2SkynslrWvDeAokonZ37f5bmf0tGunR2DyNkkPhi//CpmiL1u5eWGShjYVJI6CwLuDN1n2K+1D9qljkSZvwsc9negbK16SFBs5ws8GXJ/GSxImeZJ/GJmGVxZrhsr2QxkzHLbPHcvtK0KJmez2PJ/OfxI2NmOVsQHTLLkrSIwDkbpkwvlobL4ucJ/bzm9vWV5Z4h+VO+ApZsbRY/0l+WO3sufp6QMedTEiuLjcvz9pmziZLZi7K8ZHuJ0sNk9rx0P5lekh0hW5uFHM65tWGyGqayA8JmGQQBP0AD/sAbhCOzPUCyz+KtyJpKhJkpyhULUvhZNAZy23g0lpBjZUGztba1A2Dq7s4ch7fh03cSUj01p8tsQI7xe+S+lMzpksoAaCsEQO3BnM5gDwCUAgBauzhScfaMDj31gwFEQAHKyJdBG+gDE2AJbIEjcAWewAcEgFAQCeLAUsABfJABxCAH5IN1oBAUg21gB6gENaAe7AeHwBHQBk6AM+ACuAJugDvgIegHQ+AFGAPvwQQEQTiIDFEhdUgHMoTMIVuIDrlDPlAQFA7FQYlQCiSEpFA+tAEqhkqhSqgWaoR+ho5DZ6BLUC90HxqARqE30GcYBZNgZVgLNoIXwHSYAQfCkfASOAVeDufBBfAWuAKugw/CrfAZ+Ap8B+6HX8DjKICSQ6midFGWKDqKiQpFxaOSUWLUalQRqhxVh2pGdaC6UbdQ/aiXqE9oLJqKpqEt0a5of3QUmoNejl6N3oyuRO9Ht6LPoW+hB9Bj6G8YMkYTY45xwbAwsZgUTA6mEFOO2Ys5hjmPuYMZwrzHYrGqWGOsE9YfG4dNxa7EbsbuxrZgO7G92EHsOA6HU8eZ49xwoTg2LgtXiNuFO4g7jbuJG8J9xMvhdfC2eF98PF6IX48vxx/An8LfxA/jJwgKBEOCCyGUwCXkErYSGggdhOuEIcIEUZFoTHQjRhJTieuIFcRm4nniI+JbOTk5PTlnuUVyArm1chVyh+Uuyg3IfSIpkcxITFICSUraQtpH6iTdJ70lk8lGZE9yPDmLvIXcSD5LfkL+KE+Vt5JnyXPl18hXybfK35R/RSFQDCkMylJKHqWccpRynfJSgaBgpMBUYCusVqhSOK7QpzCuSFW0UQxVzFDcrHhA8ZLiiBJOyUjJR4mrVKBUr3RWaZCKoupTmVQOdQO1gXqeOqSMVTZWZimnKhcrH1LuUR5TUVKxV4lWWaFSpXJSpV8VpWqkylJNV92qekT1rurneVrzGPN48zbNa553c94Htflqnmo8tSK1FrU7ap/Vaeo+6mnqJept6o810BpmGos0cjT2aJzXeDlfeb7rfM78ovlH5j/QhDXNNMM1V2rWa17VHNfS1vLTEmnt0jqr9VJbVdtTO1W7TPuU9qgOVcddR6BTpnNa5zlNhcagpdMqaOdoY7qauv66Ut1a3R7dCT1jvSi99Xoteo/1ifp0/WT9Mv0u/TEDHYNgg3yDJoMHhgRDuiHfcKdht+EHI2OjGKONRm1GI8ZqxizjPOMm40cmZBMPk+UmdSa3TbGmdNM0092mN8xgMwczvlmV2XVz2NzRXGC+27zXAmPhbCG0qLPosyRZMiyzLZssB6xUrYKs1lu1Wb1aYLAgfkHJgu4F36wdrNOtG6wf2ijZBNist+mweWNrZsuxrbK9bUe287VbY9du99re3J5nv8f+ngPVIdhho0OXw1dHJ0exY7PjqJOBU6JTtVMfXZkeRt9Mv+iMcfZyXuN8wvmTi6NLlssRlz9cLV3TXA+4jiw0Xshb2LBw0E3Pje1W69bvTnNPdP/Rvd9D14PtUefx1FPfk+u513OYYcpIZRxkvPKy9hJ7HfP6wHRhrmJ2eqO8/byLvHt8lHyifCp9nvjq+ab4NvmO+Tn4rfTr9Mf4B/qX+PextFgcViNrLMApYFXAuUBSYERgZeDTILMgcVBHMBwcELw9+FGIYYgwpC0UhLJCt4c+DjMOWx726yLsorBFVYuehduE54d3R1AjlkUciHgf6RW5NfJhlEmUNKormhKdEN0Y/SHGO6Y0pj92Qeyq2CtxGnGCuPZ4XHx0/N748cU+i3csHkpwSChMuLvEeMmKJZeWaixNX3pyGWUZe9nRRExiTOKBxC/sUHYdezyJlVSdNMZhcnZyXnA9uWXcUZ4br5Q3nOyWXJo8kuKWsj1llO/BL+e/FDAFlYLXqf6pNakf0kLT9qVNpsekt2TgMxIzjguVhGnCc5namSsye0XmokJR/3KX5TuWj4kDxXslkGSJpD1LGWmSrkpNpN9JB7Lds6uyP+ZE5xxdobhCuOJqrlnuptzhPN+8n1aiV3JWduXr5q/LH1jFWFW7GlqdtLprjf6agjVDa/3W7l9HXJe27tp66/Wl699tiNnQUaBVsLZg8Du/75oK5QvFhX0bXTfWfI/+XvB9zya7Tbs2fSviFl0uti4uL/6ymbP58g82P1T8MLkleUvPVsete7Zhtwm33S3xKNlfqliaVzq4PXh7axmtrKjs3Y5lOy6V25fX7CTulO7srwiqaN9lsGvbri+V/Mo7VV5VLdWa1ZuqP+zm7r65x3NPc41WTXHN5x8FP96r9attrTOqK6/H1mfXP2uIbuj+if5T416NvcV7v+4T7uvfH77/XKNTY+MBzQNbm+AmadPowYSDNw55H2pvtmyubVFtKT4MDksPP/858ee7RwKPdB2lH23+xfCX6mPUY0WtUGtu61gbv62/Pa6993jA8a4O145jv1r9uu+E7omqkyont54inio4NXk67/R4p6jz5ZmUM4Ndy7oeno09e/vconM95wPPX7zge+FsN6P79EW3iycuuVw6fpl+ue2K45XWqw5Xj11zuHasx7Gn9brT9fYbzjc6ehf2nrrpcfPMLe9bF26zbl+5E3Kn927U3Xt9CX3997j3Ru6n33/9IPvBxMO1jzCPih4rPC5/ovmk7jfT31r6HftPDngPXH0a8fThIGfwxe+S378MFTwjPysf1hluHLEdOTHqO3rj+eLnQy9ELyZeFv5D8R/Vr0xe/fKH5x9Xx2LHhl6LX0++2fxW/e2+d/bvusbDxp+8z3g/8aHoo/rH/Z/on7o/x3wensj5gvtS8dX0a8e3wG+PJjMmJ0VsMXu6FUAhA05OBuDNPqQ3jgOAivTlxMUzvfW0QDPvgWkC/4ln+u9pcQSgvg+AyJUABF0DYFcl0s4i/inImyCMguhdAWxnJxv/Ekmyne2ML5IH0po8npx8awIArgSAryWTkxP1k5Nf65FgHwLQmTvT00+JNvK+yMEB/O64B8yPIvA3men3/5Tj32cwFYE9+Pv8T2A3GqUH9TtuAAAAlmVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAJAAAAABAAAAkAAAAAEAA5KGAAcAAAASAAAAhKACAAQAAAABAAAAq6ADAAQAAAABAAAASAAAAABBU0NJSQAAAFNjcmVlbnNob3SiCWX1AAAACXBIWXMAABYlAAAWJQFJUiTwAAAC1mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjI4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6VXNlckNvbW1lbnQ+U2NyZWVuc2hvdDwvZXhpZjpVc2VyQ29tbWVudD4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjk2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MTQ0PC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xNDQ8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgroGMvEAAAL6UlEQVR42u2deWwTVx7HR5VWsH8g8U/3ny5QVWW7K+gSRDgWQUU4QuqEmCRsggILVOXIrhASdLmqbQOFhYQliWMHhSsc5So3ISDOblXKAkl8JRBoEqe2CXHuOD7GdnxlvzPPMSaHE0Jbx/b76aeRMzOylff5zu/9fm9m3mM6qYW3MbQJqAKoUQUM1txu6kPAf00FuHnq1IasDUIQr6EAl8vt+0tmm7O6kZWpDcU17dQD5Wh/VSMLFr5Xput1LlNmgJc+MZvDrWlkLxTXbz5XuTi/LFasnCtSzM6hHjBH+4MCWIAIuKibWDDqRu1NFeDmBeXs7CzTGjKKaiKy5BMypLOz5dE5cgF+PlcRRz1wjvYHBbAAEXCJ2CvPLKop1xpcPuzeSAHkGwwWh/iWelKWfEqmNEGsEEqUcWJFnFhJfSg5xwV0JmdKQQq8jBZH5wDytv5jwNMXptXHnk7MlAlzFQkSZSyvO156ckGOlPPsUt6lXds3/FBKP7zGB4JAJPdyASOQAi9QA7vBxwASQEpr9LPQ02fJE/jr3vMzIqhBnpD/dOFBlbBAIyzQUg+ca0ABLEAEXAggkAKvqCx5lEgBgv67A8YPfigI+Odny4Vdlz60lpBXtujwT9HHm+NO65dcMK66Yk4rZKkHyldeMYMCWIAIuICONx4slCjBDiIgkaAvETB9Zf7o+xFGcPUDv6AL/6IDP8adaEk4b8q+Z7lTZa9pdZpsboeTesAc7Q8KYAEi4AI6YEREIOBFgEgAjkaro6/qgOkVPzJ/pBLoS152/CJ5yhF1zGlD+l22XGd30nGhIWYgUq5zgA4YgVRsVyQAQXAETdcAewEy7IPCD/mkkEv4PVc/h/+M8aTcau0qN11uOj44NMYBeRbEQAeMYr4xgReJBFyNIFaAJkrEXgeLmJ4BwOZwo+7nCj8+AJDgD2Xhq73sqQ1B83LhRHDa4O0OwBElYmZRDRkscvtTAH9Q08hGIPnvyvyRXKB3QXghVz/FP/RFAFLgxWVseWUeiGLFxL1yTRPbc4Sgl0zwQnH9hAypJ/8XybgM87wJfT/FH0QiAC9QAztSIoImmF4oqR9AJuju3HSucna2nGQAqDJRZiDPJKkfFUBQpAUkMQQ1sOPGCfhsAEw3n6vsmbp1V4DZ5lycXxado4jLVXLVf/5T1JooNmgACLowAGpgB4LgGCdWginIgm+fCiDqqG5gY8Vgzw37C3JkCw+qllwwouKkASDowgCogR0IgmMczxRkVY3dU4HuCpCpDXPJHT9OAVJhgWblFbPJRukHn4HaqitmEARH0ARTkJVpDP0ooFjVPjuHv/MIBWSXCgu0aYWs45ccAHLTUYVfxkAN7EAQHLmbh7nc8wTFNe39KaDm11YAtbBWgN1u12i12IZyXuZyORwO55tZCCqABP+6ujqGYbAN4e7AarW2tbW1v5kNonGCQwH19Q1QALYhrACbzQaEhjcwo9EYsjGgvr6eV0B9aCtAr9f7AYyj/Uok6BXgS9fdZVQBBDxOYFnWvwhCJAb4Mna6XGGuAOw0m80Av2PHjvv37yMdRroQsgpQa7SXCq/lSPILjp2QyhUWq+dGc1ceEHYK8OLftm3bmDFjIiIiHj16BBH0FS2CWwE3b9/909Q5DPP25Flxv30/Eh++2rWnTa/nawFdGCoAf5pMJuBPT08fN27ckiVLEhMTx44d+/Dhw75EEJQKIEQfPCz+zXuTUlesUSjLW1vbXtTp8vIPMcy7u/Zk42hjY2O4KQDgLRYL0vudO3dOnz59xYoVKSkpqamp0EFkZGRJSQmq/545QfApgOA0m9mNW7/4YEqUsvyxb338efoOhhlVWVXd3NwSVgoAWlz9Op0uLS0N//j48eOHDx8+cuTIESNGvMMbdt65c4d0EMGtABef6MkUSoZ5JzcvnwB2udxkf9njJwwzZt+Bw3U6rhfQhZMCEADKy8svXrwI0jdftVu3bmF79epVnI8gEQox4PqNWwBcdP2mVxNkf0tL67Q5C9Zv3KpWa8JKAV4ROByOjo4Oe2+GQ0GfBxCWNluHSJL/9h+n3rv/wLuTbJEGfpK2btmnaTjEKUAXXpkgRIDCT9+3hYgCkASk78iI/Gj+02eV3RTAspb0nRmJKcsQHngF6MJ5THAgFpQKMBiNGzb9a25sks5n2J9sEej27T88Ny7pm/OXGOatOqqAkFQAYsAX23dNjRJUVqu6KcBise7cvVeYvLTw2o0wjAHoBfR+LUQUYLXZ9oryfj/+L/978KibAvTt7avXblj6yervvv8h3PIA4EexhzTQ1pthP6rlUBgRIjivFF0D4Os3bvesBaJiF63bsEmlqgmrWgAfALikpGTLli1isTjrVROJRLt375ZIJKFQDRLeJaVSAD5w+Gg3BVRVq5i33s8W7wu38QASA0C3oKAA/3hUVNSkSZMmT54cGRk5c+bMUaNGTZs2raqqKhRGhAjO1jb939d99lHMQlWN2rsTUtiTncswIxRl5U1NzeF5ZwjR/uzZs6NHj166dOmiRYtSU1MFAkFycrJWq8WhnucH5X0B8hryrdvfMsy76zd+rtE+59JDlj17/iIzesJnW750Ol3hqQDy4Bf2nzlzZtiwYcuXL583b15SUpJGo0EfETp3hrzdwYnTZ5nffYiUcPnKf3y8MAXI167f/Lz2RWe43hv0FQEiAVogJSWF4O/rEYFgVYAn7LvdUpni0JHjW7/ckZmVe/P2nZbWVnJC2D4f4H1AyGKxFBUVVVdX47RQfkKEBAOT2YwSkfyJLqCTPifI68But7Ms63/UKOgVQAoBb2AIt+cE/T8D2O+ToqHzrLAXvJe3jldAaFeD9H0BfylCfQOfBzSE8vsC9J2hfnSA1qEvj/4SRt8cpQr4mRSwppCl0wcGo9kHpwCl1hDtO4PEYfWnl816i4s2aNAZqIEdCHpnkIjOVSifG/tWAL/VtlgWSJQfv5xFpnrxeWNF44DmKac2RIyAAjWwA0EyiwyYxouVz1usna9OCNR9JqkOh2vZwfJ5OfI4fibZhH1PYk62Xa3o6KQzSQVR9cGTArWYU20gGMvPJAWmyw+Wg2+3k3uZTW57oWpWlnwBN5ucMl4kExxr3HaHZe1uGgaCIwDwjMAL1MAunptPUAmaYPpVoar/2eRgdx83/2FXqWdOaZE8+VBV9Bnj9yoaBoIpAIAXqIFdbNfEsmAKsj3P72VW2Qa9NTqvLD7XM610vFiReLxhTRHbbOYCiJMmhUPYCB2QAi9Qixd7FpwATTAF2c6BzCqLLzny3fMPdksT8zwzS6MvEZ5q2/lf1mRzEZXRWDAEsz9y9YMRSAn5DIDMLA2OoAmmvV68PWaX5xWibmJjJGUCkYJkA9z04gcr4063b/+WrdU7u4UN6oF1XwMdMAIp8OLxcxkAPsTklambLZ39zi7v2xdcKtF9mClLfHWBkQUnW/922VxYYWulIwRDzEAEXEAHjHyXGQFBcLxU0ue9N8ZPQvHvK6qJ/CoDvAj4aYbzypOO6wSn21dfZfcX2+79ZFc1OeraHDrqgXC0PNofFMACRMAFdMCIXP0CzwIjUnD0k8IzfiqKRkPHmmMVU/ZIk/K8a80oFuTKE/c/SzhaG3u8ac4J/YyTxmknTdQD5Wh/UAALEAGXBdyKY56FIUAN7EAQHP1U8v2sNlfbal379dPxGdIkiTJe7F1xTBabIxMiHuRX/PXAs+SDP1IPlKP9QQEsQETQtdocSIEXqIEdCPofyGH6HVtoMdklN9XvZcjmZ/OrDvI9QqzYUybgVwU51APnaH+yqBRHhKOTwC8yB16gBnb9juMNaNVZ2O2ypsWHHv85QxrNDxgLxcqFEqWQDwzUA+ugwLHg7/6BDhiBFHh1IzhIBfh+Raup43Jp/cojFVHZ8og9MgSZGf+RzcmSz8umHjBH+8/Yy7EAEXABHTACqQHi7xz46vPe77J0uKTq9lM/1GYVVv/z1LNVRyuWFzyhHihH+4MCWICIVG0AnZfjNAMrI5nXGHXq8ZXtFqeu3VbbRj1gjvZvtzr7JfXzKMD3B1xu+mzf0LofOGgi/wekWIduGOkWqAAAAABJRU5ErkJggg==";

/***/ }),
/* 75 */
/***/ (function(module) {

module.exports = "data:image/png;base64,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";

/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
/* harmony import */ var _dropdownDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var IBQuizzDropdown = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-dropdown",
  classes: ["ib-quizz-elem"],
  styles: {
    "display": "inline-block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzDropdown, _WidgetElement);
  var _super = _createSuper(IBQuizzDropdown);
  function IBQuizzDropdown() {
    _classCallCheck(this, IBQuizzDropdown);
    return _super.apply(this, arguments);
  }
  _createClass(IBQuizzDropdown, [{
    key: "successCb",
    value: function successCb(updated) {
      if (!updated) {
        return;
      }
      console.log('Recieved', updated);
      // Set the real ans
      var radiosChecked = updated['right'];
      var selected = [];
      radiosChecked.forEach(function (e, i) {
        e && selected.push(i + '');
      });
      updated['ans'] = selected.join(',');
      updated['vars'] = updated['vars'].filter(function (e) {
        return (e + '').trim().length > 0;
      });
      // Get rid of property right
      delete updated['right'];
      var output = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.base64Encode)(updated);
      console.log("New data-src --> ", output);
      if (output) {
        var _this$editor;
        this.setAttribute("data-src", output);
        var event = new Event('updated');
        (_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.dispatchEvent(event);
        console.info("Event dispatched");
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var group = _registry__WEBPACK_IMPORTED_MODULE_2__["default"].findGroupObject(this);
      if (!group || !group.getAttoEditor()) {
        console.error("Edit: Cannot find group or atto editor");
        return;
      }
      this.editor = group.getAttoEditor();
      this.updateConfig();
      var dialog = (0,_dropdownDialog__WEBPACK_IMPORTED_MODULE_3__.getDropdownDialog)('ib-quizz-editor-dlg', 'Editar "Selecció única"');
      dialog.setBindings(this.config, group.getGroupContext());
      dialog.show(this.successCb.bind(this));
    }
  }]);
  return IBQuizzDropdown;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

// Maps id-HTMLElement into the object of the group
var dictGroups = {};
// Maps id-HTMLElement of the group into the list of widgets that contains
var dictWidgets = {};
function addGroup(quizzComponent) {
  var id = quizzComponent.parent.getAttribute("id");
  if (!id) {
    id = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.genID)();
    quizzComponent.parent.setAttribute("id", id);
  }
  dictGroups[id] = quizzComponent;
}
function addWidget(widgetElement) {
  // Search its closest group
  var groupElem = widgetElement.closest('div[data-quizz-group]');
  if (groupElem && groupElem.getAttribute('id')) {
    var id = groupElem.getAttribute('id') || '';
    var listWidgets = dictWidgets[id];
    if (!listWidgets) {
      listWidgets = [];
      dictWidgets[id] = listWidgets;
    }
    listWidgets.push(widgetElement);
  }
}
function removeWidget(widgetElement) {
  //The problem is that it has been removed from dom so we cannot call closest
  //Then must search on all groups
  Object.keys(dictWidgets).forEach(function (idGroup) {
    var idx = dictWidgets[idGroup].indexOf(widgetElement);
    if (idx >= 0) {
      dictWidgets[idGroup].splice(idx, 1);
    }
  });
}

// To be used by the group to know about widgets
function findWidgetsForGroup(quizzComponent) {
  var id = quizzComponent.parent.getAttribute("id");
  if (id && dictWidgets[id]) {
    return dictWidgets[id];
  }
  return [];
}

// To be used by widgets to know about the group
function findGroupObject(widgetElement) {
  var groupElem = widgetElement.closest('div[data-quizz-group]');
  if (groupElem && groupElem.getAttribute('id')) {
    var id = groupElem.getAttribute('id') || '';
    return dictGroups[id];
  }
  return null;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  addGroup: addGroup,
  addWidget: addWidget,
  removeWidget: removeWidget,
  findWidgetsForGroup: findWidgetsForGroup,
  findGroupObject: findGroupObject
});

/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDropdownDialog": function() { return /* binding */ getDropdownDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var idPrefix = "quizzDD";
var MAX_ELEMS = 6;
var radiosHTML = [];
for (var i = 0; i < MAX_ELEMS; i++) {
  radiosHTML.push("<input type=\"radio\" name=\"".concat(idPrefix, "OptRight\" id=\"").concat(idPrefix, "_right[").concat(i, "]\"> <input type=\"text\" style=\"width:90%\" id=\"").concat(idPrefix, "_vars[").concat(i, "]\">"));
}
var bodyHTML = "<h6>Correcte / Opcions</h6>\n        ".concat(radiosHTML.join('<br>'), "\n        <p><br></p>\n        <div class=\"form-group\">\n            <input type=\"checkbox\" id=\"").concat(idPrefix, "_opts.shuffle\">\n            <label for=\"").concat(idPrefix, "_opts.shuffle\">Barreja les opcions</label>\n        </div>\n        <hr> \n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_hint\">Una pista</label>\n            <textarea id=\"").concat(idPrefix, "_hint\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_fbk\">Feedback global</label>\n            <textarea id=\"").concat(idPrefix, "_fbk\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_pre\">Text abans de l'element</label>\n            <textarea id=\"").concat(idPrefix, "_pre\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        <div>\n         ");
var DropdownDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(DropdownDialog, _BSDialog);
  var _super = _createSuper(DropdownDialog);
  function DropdownDialog(id) {
    _classCallCheck(this, DropdownDialog);
    return _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
  }
  _createClass(DropdownDialog, [{
    key: "setBindings",
    value: function setBindings(scope, groupContext) {
      var _scope$opts;
      this.groupContext = groupContext;
      var defaultScope = {
        ini: scope.ini || '',
        ans: scope.ans || '0',
        right: new Array(MAX_ELEMS).fill(false),
        vars: scope.vars || [],
        hint: scope.hint || '',
        fbk: scope.fbk || '',
        pre: scope.pre || '',
        opts: {
          shuffle: ((_scope$opts = scope.opts) === null || _scope$opts === void 0 ? void 0 : _scope$opts.shuffle) || false
        }
      };
      defaultScope.ans.split(",").forEach(function (spos) {
        if (spos) {
          var pos = parseInt(spos);
          defaultScope.right[pos] = true;
        }
      });
      while (defaultScope.vars.length < MAX_ELEMS) {
        defaultScope.vars.push('');
      }
      this.setBodyBindings(bodyHTML, defaultScope);
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      var _wc$vars;
      if (!this.scope) {
        return null;
      }
      var wc = this.scope;
      var nopts = (wc.vars || []).filter(function (e) {
        return e.trim().length > 0;
      }).length;
      if (nopts < 2) {
        return "Com a mínim calen dues opcions";
      }
      var selectedRadios = this.scope.right;
      var numSelected = 0;
      (_wc$vars = wc.vars) === null || _wc$vars === void 0 ? void 0 : _wc$vars.forEach(function (e, i) {
        if (e.trim() && selectedRadios[i]) {
          numSelected++;
        }
      });
      if (numSelected !== 1) {
        return "Cal marcar exactament una opció com a vàlida";
      }
      return null;
    }
  }]);
  return DropdownDialog;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);
var _cachedDlg = null;
function getDropdownDialog(id, title) {
  if (!_cachedDlg) {
    _cachedDlg = new DropdownDialog(id);
  }
  _cachedDlg.setTitle(title);
  return _cachedDlg;
}

/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetElement": function() { return /* binding */ WidgetElement; }
/* harmony export */ });
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */


var WidgetElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(WidgetElement, _HTMLElement);
  var _super = _createSuper(WidgetElement);
  function WidgetElement() {
    var _this;
    _classCallCheck(this, WidgetElement);
    _this = _super.call(this);
    _this.innerHTML = "";
    _this.config = {
      ans: ''
    };
    return _this;
  }
  _createClass(WidgetElement, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _registry__WEBPACK_IMPORTED_MODULE_0__["default"].removeWidget(this);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      //Register myself as widget
      _registry__WEBPACK_IMPORTED_MODULE_0__["default"].addWidget(this);
      this.addEventListener("click", this.edit);
    }
  }, {
    key: "updateConfig",
    value: function updateConfig() {
      //Parse the data-src property
      try {
        var raw64Src = this.getAttribute("data-src") || '';
        var rawSrc = atob(raw64Src) || '{}';
        this.config = JSON.parse(rawSrc);
        // Make sure that ans is not an array
        if (Array.isArray(this.config.ans)) {
          this.config.ans = JSON.stringify(this.config.ans);
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  }]);
  return WidgetElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _numericDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(81);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var IBQuizzNumeric = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-numeric",
  classes: ["ib-quizz-elem"],
  styles: {
    "display": "inline-block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzNumeric, _WidgetElement);
  var _super = _createSuper(IBQuizzNumeric);
  function IBQuizzNumeric() {
    _classCallCheck(this, IBQuizzNumeric);
    return _super.apply(this, arguments);
  }
  _createClass(IBQuizzNumeric, [{
    key: "successCb",
    value: function successCb(updated) {
      if (!updated) {
        return;
      }
      var output = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.base64Encode)(updated);
      console.log("New data-src --> ", output);
      if (output) {
        var _this$editor;
        this.setAttribute("data-src", output);
        var event = new Event('updated');
        (_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.dispatchEvent(event);
        console.info("Event dispatched");
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var group = _registry__WEBPACK_IMPORTED_MODULE_2__["default"].findGroupObject(this);
      if (!group || !group.getAttoEditor()) {
        console.error("Edit: Cannot find group or atto editor");
        return;
      }
      this.editor = group.getAttoEditor();
      this.updateConfig();
      var dialog = (0,_numericDialog__WEBPACK_IMPORTED_MODULE_3__.getNumericDialog)('ib-quizz-editor-dlg', 'Editar "Numèric"');
      dialog.setBindings(this.config, group.getGroupContext());
      dialog.show(this.successCb.bind(this));
    }
  }]);
  return IBQuizzNumeric;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNumericDialog": function() { return /* binding */ getNumericDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var _quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var idPrefix = "quizzNum";
var bodyHTML = "\n<div class=\"form-group\">\n    <label for=\"".concat(idPrefix, "_ini\">Contingut inicial</label>\n    <input id=\"").concat(idPrefix, "_ini\" class=\"form-control\" type=\"text\" placeholder=\"E.g. 0\"> \n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_ans\">Resposta correcta</label>\n    <textarea id=\"").concat(idPrefix, "_ans\" class=\"form-control\" type=\"text\" placeholder=\"E.g. 1.25 o #a*(#b-1), etc.\" rows=\"2\" style=\"width:98%\" required></textarea>\n    <div class=\"invalid-feedback\">\n        Cal especificar una resposta correcta\n    </div>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_opts.err\">Error de precisi\xF3</label>\n    <input id=\"").concat(idPrefix, "_opts.err\" class=\"form-control\" type=\"numeric\" min=\"0\" value=\"0\">\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_opts.errunit\">Tipus de precisi\xF3</label>\n    <select class=\"form-control\" id=\"").concat(idPrefix, "_opts.errunit\">\n        <option value=\"relative\">Relativa</option>\n        <option value=\"absolute\">Absoluta</option>\n        <option value=\"%\">Percentual</option>\n    </select>\n</div>   \n<hr>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_hint\">Una pista</label>\n    <textarea id=\"").concat(idPrefix, "_hint\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_fbk\">Feedback global</label>\n    <textarea id=\"").concat(idPrefix, "_fbk\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_pre\">Text abans de l'element</label>\n    <textarea id=\"").concat(idPrefix, "_pre\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n<div>\n");
var NumericDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(NumericDialog, _BSDialog);
  var _super = _createSuper(NumericDialog);
  function NumericDialog(id) {
    _classCallCheck(this, NumericDialog);
    return _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
  }
  _createClass(NumericDialog, [{
    key: "setBindings",
    value: function setBindings(scope, groupContext) {
      var _scope$opts, _scope$opts2;
      this.groupContext = groupContext;
      console.log("numericDialog-setbindings recieved ", this.groupContext);
      var defaultScope = {
        ini: scope.ini || '',
        ans: scope.ans || '0',
        opts: {
          err: ((_scope$opts = scope.opts) === null || _scope$opts === void 0 ? void 0 : _scope$opts.err) || 0,
          errunit: ((_scope$opts2 = scope.opts) === null || _scope$opts2 === void 0 ? void 0 : _scope$opts2.errunit) || 'absolute'
        },
        hint: scope.hint,
        fbk: scope.fbk,
        pre: scope.pre
      };
      this.setBodyBindings(bodyHTML, defaultScope);
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      var wc = this.scope;
      if (!wc) {
        return null;
      }
      var ans = wc.ans.trim().replace(/^\s*\n/gm, '');
      if (!ans) {
        return "Cal una resposta correcta";
      }
      try {
        var _this$groupContext;
        var evalContext = Object.assign({}, ((_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext._s) || {});
        //For one line expressions must add a return statement if not there!

        if (ans.split('\n').length === 1 && ans.indexOf('return') < 0) {
          ans = 'return ' + ans;
        }
        console.log(evalContext);
        var result = (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.runIBScript)(ans, {}, evalContext);
        if (typeof result !== 'number') {
          //Invalid return type
          return "El tipus de la resposta ha de ser numèric però s'ha obtingut " + _typeof(result);
        }
      } catch (ex) {
        return "La resposta conté una expressió incorrecta.\n" + ex;
      }
      //TODO scopeEval the ans field if everything is ok????
      return null;
    }
  }]);
  return NumericDialog;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);
var _cachedDlg = null;
function getNumericDialog(id, title) {
  if (!_cachedDlg) {
    _cachedDlg = new NumericDialog(id);
  }
  _cachedDlg.setTitle(title);
  return _cachedDlg;
}

/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _mchoiceDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var IBQuizzMchoice = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-mchoice",
  classes: ["ib-quizz-elem"],
  styles: {
    "display": "block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzMchoice, _WidgetElement);
  var _super = _createSuper(IBQuizzMchoice);
  function IBQuizzMchoice() {
    _classCallCheck(this, IBQuizzMchoice);
    return _super.apply(this, arguments);
  }
  _createClass(IBQuizzMchoice, [{
    key: "successCb",
    value: function successCb(updated) {
      if (!updated) {
        return;
      }
      // Set the real ans
      var radiosChecked = updated['right'];
      var selected = [];
      radiosChecked.forEach(function (e, i) {
        e && selected.push(i + '');
      });
      updated['ans'] = selected.join(',');
      updated['vars'] = updated['vars'].filter(function (e) {
        return (e + '').trim().length > 0;
      });
      // Get rid of property right
      delete updated['right'];
      var output = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.base64Encode)(updated);
      console.log("New data-src --> ", output);
      if (output) {
        var _this$editor;
        this.setAttribute("data-src", output);
        var event = new Event('updated');
        (_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.dispatchEvent(event);
        console.info("Event dispatched");
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var group = _registry__WEBPACK_IMPORTED_MODULE_2__["default"].findGroupObject(this);
      if (!group || !group.getAttoEditor()) {
        console.error("Edit: Cannot find group or atto editor");
        return;
      }
      this.editor = group.getAttoEditor();
      this.updateConfig();
      var dialog = (0,_mchoiceDialog__WEBPACK_IMPORTED_MODULE_3__.getMchoiceDialog)('ib-quizz-editor-dlg', 'Editar "Opció múltiple"');
      dialog.setBindings(this.config, group.getGroupContext());
      dialog.show(this.successCb.bind(this));
    }
  }]);
  return IBQuizzMchoice;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMchoiceDialog": function() { return /* binding */ getMchoiceDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var idPrefix = "quizzMC";
var MAX_ELEMS = 6;
var radiosHTML = [];
for (var i = 0; i < MAX_ELEMS; i++) {
  radiosHTML.push("<input type=\"checkbox\" name=\"".concat(idPrefix, "OptRight\" id=\"").concat(idPrefix, "_right[").concat(i, "]\"> <input type=\"text\" style=\"width:90%\" id=\"").concat(idPrefix, "_vars[").concat(i, "]\">"));
}
var bodyHTML = "<h6>Correcte / Opcions</h6>\n        ".concat(radiosHTML.join('<br>'), "\n        <p><br></p>\n        <div class=\"form-group\">\n            <input type=\"checkbox\" id=\"").concat(idPrefix, "_opts.shuffle\">\n            <label for=\"").concat(idPrefix, "_opts.shuffle\">Barreja les opcions</label>\n        </div>\n        <hr> \n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_hint\">Una pista</label>\n            <textarea id=\"").concat(idPrefix, "_hint\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_fbk\">Feedback global</label>\n            <textarea id=\"").concat(idPrefix, "_fbk\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"").concat(idPrefix, "_pre\">Text abans de l'element</label>\n            <textarea id=\"").concat(idPrefix, "_pre\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n        <div>\n         ");
var MchoiceDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(MchoiceDialog, _BSDialog);
  var _super = _createSuper(MchoiceDialog);
  function MchoiceDialog(id) {
    _classCallCheck(this, MchoiceDialog);
    return _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
  }
  _createClass(MchoiceDialog, [{
    key: "setBindings",
    value: function setBindings(scope, groupContext) {
      var _scope$opts;
      this.groupContext = groupContext;
      var defaultScope = {
        ini: scope.ini || '',
        ans: scope.ans || '',
        right: new Array(MAX_ELEMS).fill(false),
        vars: scope.vars || [],
        hint: scope.hint || '',
        fbk: scope.fbk || '',
        pre: scope.pre || '',
        opts: {
          shuffle: ((_scope$opts = scope.opts) === null || _scope$opts === void 0 ? void 0 : _scope$opts.shuffle) || false
        }
      };
      defaultScope.ans.split(",").forEach(function (spos) {
        if (spos) {
          var pos = parseInt(spos);
          defaultScope.right[pos] = true;
        }
      });
      while (defaultScope.vars.length < MAX_ELEMS) {
        defaultScope.vars.push('');
      }
      this.setBodyBindings(bodyHTML, defaultScope);
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      var _wc$vars;
      if (!this.scope) {
        return null;
      }
      var wc = this.scope;
      var nopts = (wc.vars || []).filter(function (e) {
        return e.trim().length > 0;
      }).length;
      if (nopts < 2) {
        return "Com a mínim calen dues opcions";
      }
      var selectedRadios = this.scope.right;
      var numSelected = 0;
      (_wc$vars = wc.vars) === null || _wc$vars === void 0 ? void 0 : _wc$vars.forEach(function (e, i) {
        if (e.trim() && selectedRadios[i]) {
          numSelected++;
        }
      });
      if (numSelected < 1) {
        return "Cal marcar una o més opcions vàlides";
      }
      return null;
    }
  }]);
  return MchoiceDialog;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);
var _cachedDlg = null;
function getMchoiceDialog(id, title) {
  if (!_cachedDlg) {
    _cachedDlg = new MchoiceDialog(id);
  }
  _cachedDlg.setTitle(title);
  return _cachedDlg;
}

/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _clozeDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var IBQuizzCloze = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-cloze",
  classes: ["ib-quizz-elem"],
  styles: {
    "display": "inline-block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzCloze, _WidgetElement);
  var _super = _createSuper(IBQuizzCloze);
  function IBQuizzCloze() {
    _classCallCheck(this, IBQuizzCloze);
    return _super.apply(this, arguments);
  }
  _createClass(IBQuizzCloze, [{
    key: "successCb",
    value: function successCb(updated) {
      if (!updated) {
        return;
      }
      var wc = updated;
      wc.ini = wc.ini || "?";
      wc.ans = (wc.ans || "[0]") + ""; // must be string
      var output = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.base64Encode)(wc);
      console.log("New data-src --> ", output);
      if (output) {
        var _this$editor;
        this.setAttribute("data-src", output);
        var event = new Event('updated');
        (_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.dispatchEvent(event);
        console.info("Event dispatched");
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var group = _registry__WEBPACK_IMPORTED_MODULE_2__["default"].findGroupObject(this);
      if (!group || !group.getAttoEditor()) {
        console.error("Edit: Cannot find group or atto editor");
        return;
      }
      this.editor = group.getAttoEditor();
      this.updateConfig();
      var dialog = (0,_clozeDialog__WEBPACK_IMPORTED_MODULE_3__.getClozeDialog)('ib-quizz-editor-dlg', 'Editar "Cloze fórmula"');
      dialog.setBindings(this.config, group.getGroupContext());
      dialog.show(this.successCb.bind(this));
    }
  }]);
  return IBQuizzCloze;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getClozeDialog": function() { return /* binding */ getClozeDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var _quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var idPrefix = "quizzCloze";
var placeholder_cfn = 'check = (u0==1 && u1==2 && u2==-4)\nreturn check';
var bodyHTML = "\n<div class=\"form-group\">\n    <label for=\"".concat(idPrefix, "_ini\">Contingut inicial</label>\n    <input id=\"").concat(idPrefix, "_ini\" class=\"form-control\" type=\"text\" placeholder=\"V[3], M[2x3], \\sqrt[?]{?}, etc.\" required>\n    <div class=\"invalid-feedback\">\n        Cal un contingut inicial amb <i>placeholders</i> \"?\"\n    </div>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_cfn\">Funci\xF3 de verificaci\xF3</label>\n    <textarea id=\"").concat(idPrefix, "_cfn\" class=\"form-control\" rows=\"2\" style=\"width:98%;\" placeholder=\"").concat(placeholder_cfn, "\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_ans\">o resposta correcta com a llista</label>\n    <input id=\"").concat(idPrefix, "_ans\" class=\"form-control\" type=\"text\" placeholder=\"[1,2,-4]\"><br>\n</div>\n<hr>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_hint\">Una pista</label>\n    <textarea id=\"").concat(idPrefix, "_hint\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_fbk\">Feedback global</label>\n    <textarea id=\"").concat(idPrefix, "_fbk\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label for=\"").concat(idPrefix, "_pre\">Text abans de l'element</label>\n    <textarea id=\"").concat(idPrefix, "_pre\" class=\"form-control\" rows=\"2\" style=\"width:98%\"></textarea>\n<div>\n");
var ClozeDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(ClozeDialog, _BSDialog);
  var _super = _createSuper(ClozeDialog);
  function ClozeDialog(id) {
    _classCallCheck(this, ClozeDialog);
    return _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
  }
  _createClass(ClozeDialog, [{
    key: "setBindings",
    value: function setBindings(scope, groupContext) {
      this.groupContext = groupContext;
      var defaultScope = {
        ini: '',
        cfn: '',
        ans: '',
        hint: '',
        fbk: '',
        pre: ''
      };
      var scope2 = Object.assign(defaultScope, scope);
      this.setBodyBindings(bodyHTML, scope2);
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      var _wc$cfn;
      var wc = this.scope;
      if (!wc) {
        return null;
      }
      if (!wc.ans.trim() && !((_wc$cfn = wc.cfn) !== null && _wc$cfn !== void 0 && _wc$cfn.trim())) {
        return "Cal una funció de verificació o una resposta del tipus ['a',3,...]";
      }
      if (wc.cfn) {
        var ini = (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.treatIniPlaceholders)(wc.ini || '?');
        var countPlaceholders = (ini.match(/MathQuillMathField/g) || []).length;
        var localContext = {
          u: new Array(countPlaceholders).fill('0')
        };
        localContext.u.forEach(function (e, i) {
          return localContext['u' + i] = e;
        });
        // Prova d'executar i a veure si funciona i si retorna un booleà
        try {
          var _this$groupContext;
          var retVal = (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.runIBScript)(wc.cfn, localContext, ((_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext._s) || {});
          if (typeof retVal !== 'boolean') {
            return "El codi de verificació ha de retornar boolèa però ha generat " + _typeof(retVal) + "<br>Segur que no t'has oblidat return check;";
          }
        } catch (ex) {
          return "Hi ha un error en el codi de la funció de verificació<br>" + ex;
        }
      }
      if (wc.ans.trim()) {
        var ansIsArray = false;
        try {
          var tmp = Array.isArray(JSON.parse(wc.ans));
          ansIsArray = true;
        } catch (ex) {
          console.error(ex);
        }
        if (!ansIsArray) {
          return "La resposta s'ha donar com una llista. E.g. [1,2,4]";
        }
      }
      return null;
    }
  }]);
  return ClozeDialog;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);
var _cachedDlg = null;
function getClozeDialog(id, title) {
  if (!_cachedDlg) {
    _cachedDlg = new ClozeDialog(id);
  }
  _cachedDlg.setTitle(title);
  return _cachedDlg;
}

/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ QuizzComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);
/* harmony import */ var _groupDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




//Manually import the customElements that should be loaded 




var SEARCH_QUERY = "ib-quizz-numeric, ib-quizz-dropdown, ib-quizz-mchoice, ib-quizz-cloze";
var QuizzComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.Component)({
  name: "quizz-editor",
  author: "Josep Mulet Pol",
  version: "1.0",
  query: "[data-quizz-group]",
  use$: true
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(QuizzComponent, _BaseComponent);
  var _super = _createSuper(QuizzComponent);
  function QuizzComponent(parent) {
    var _this;
    _classCallCheck(this, QuizzComponent);
    _this = _super.call(this, parent);
    // First register
    _defineProperty(_assertThisInitialized(_this), "groupContext", {
      s: '',
      _s: {},
      o: {
        hint: 2,
        ans: 4
      }
    });
    _registry__WEBPACK_IMPORTED_MODULE_1__["default"].addGroup(_assertThisInitialized(_this));

    // Determine the lang --> Pass to form components
    var searchLang = parent.getAttribute("data-lang");
    if (!searchLang) {
      var _parent$parentElement;
      searchLang = ((_parent$parentElement = parent.parentElement) === null || _parent$parentElement === void 0 ? void 0 : _parent$parentElement.getAttribute("data-lang")) || null;
    }
    // Determine the groupContext --> Pass to form components
    var contextRaw64 = parent.getAttribute("data-quizz-group") || '';
    _this.updateGroupContext(contextRaw64);
    _this.lang = searchLang || "ca";
    // Must generate an instance of the group vars into map _v
    //this.generateGroup();

    // Must find placeholders in the dom by replacing #key by _v[#key]
    //this.findPlaceholders();

    _this.allQuizzElements = _this.parent.querySelectorAll(SEARCH_QUERY);
    console.log(_this.allQuizzElements);
    _this.discoverAttoId();
    if (_this.editor) {
      // This quizzGroup must listen to requests from atto
      _this.parent.addEventListener("editorRequest", function () {
        // Must open a dialog
        var dlg = (0,_groupDialog__WEBPACK_IMPORTED_MODULE_2__.getQuizzConfigDialog)();
        dlg.setBindings(_this.groupContext, _this.parent);
        dlg.show(function (updated) {
          var _this$editor;
          if (!updated) {
            return;
          }
          delete updated['_s'];
          var groupContext = updated;
          groupContext.o.hint = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__.convertInt)(groupContext.o.hint, 2);
          groupContext.o.ans = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__.convertInt)(groupContext.o.ans, 4);
          var b64 = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__.base64Encode)(groupContext);
          _this.parent.setAttribute("data-quizz-group", b64);
          var event = new Event('updated');
          (_this$editor = _this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.dispatchEvent(event);
          console.info("Event dispatched");

          // update changes in the groupContext
          // widgets will pull this new object when needed 
          _this.updateGroupContext(b64);
        });
      });
    } else {
      console.error("groupEdit: Cannot find atto editor");
    }
    return _this;
  }
  _createClass(QuizzComponent, [{
    key: "updateGroupContext",
    value: function updateGroupContext(contextRaw64) {
      try {
        var context = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__.base64Decode)(contextRaw64);
        //Create an instance 
        this.groupContext = Object.assign(this.groupContext, context);
        this.groupContext._s = {};
        //Get a _s instance by running the script
        if (this.groupContext.s) {
          try {
            (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_4__.runIBScript)(this.groupContext.s, {}, this.groupContext._s);
          } catch (ex) {
            console.error(ex);
          }
        }
        console.log(context, this.groupContext);
      } catch (ex) {
        console.error(ex);
      }
    }
  }, {
    key: "getGroupContext",
    value: function getGroupContext() {
      return this.groupContext;
    }
  }, {
    key: "getAttoEditor",
    value: function getAttoEditor() {
      return this.editor;
    }
  }, {
    key: "discoverAttoId",
    value: function discoverAttoId() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var elem = this.parent;
      while (this.attoId == null && elem != null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (elem.classList.contains("editor_atto_content_wrap") || elem.nodeName === 'body' || elem === window) {
          break;
        }
        if (elem.classList.contains("editor_atto_content")) {
          this.attoId = elem.getAttribute("id") || "";
        }
        elem = elem.parentElement;
      }
      console.log("Atto editor discovery ", this.attoId);
      if (this.attoId) {
        this.editor = document.getElementById(this.attoId);
      }
      return this.attoId;
    }
  }, {
    key: "init",
    value: function init() {
      //Everyting is done in the constructor
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var ds = this.parent.dataset;
      if (ds.active === "0") {
        return;
      }
      this.parent.removeAttribute("data-active");
    }
  }]);
  return QuizzComponent;
}(_base__WEBPACK_IMPORTED_MODULE_5__.BaseComponent)) || _class);

/*
function textNodesUnder(el: HTMLElement) {
    const a: Node[] = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n: Node | null = walk.nextNode();
    while (n != null) {
        a.push(n);
        n = walk.nextNode();
    }
    return a;
}
*/
/*
generateGroup() {
  
    try {
        runIBScript(this.groupContext.s, {}, this.groupContext._s); 
    } catch (ex) {
        console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
    }
   
}
 
findPlaceholders() {
    if (this.groupContext.s.trim().length === 0) {
        return; //Nothing to do
    }
    textNodesUnder(this.parent).forEach(textNode => {
        const valor = (textNode.nodeValue || '');
        if (valor.indexOf('#') < 0) {
            return;
        }
        const interpolated = valor.replace(/#([a-zA-Z0-9_]+)/g, ($0, $1) => {
            return this.groupContext._s[$1];
        });
        textNode.nodeValue = interpolated;
    });
}
*/

/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQuizzConfigDialog": function() { return /* binding */ getQuizzConfigDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var _quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var placeholder = '// Això és un comentari\n' + '// a és una variable local. No s\'exporta\n' + 'var a=7\n' + '// Si s\'indica la variable amb #, serà pública. # és un shortcut per indicar this. \n' + '#b=a*alea(-10,20)\n' + '// alea(a,b) i dec(a,n) són funcions predefinides.';
var bodyHTML = "\n        <button type=\"button\" id=\"bsDialogQuizzConfig-save\" class=\"btn btn-sm btn-info\" style=\"float:right;\" title=\"Desa el codi del grup al porta-retalls per tal d'aferrar-lo en un altre lloc\"><i class=\"fas fa fa-save\"></i> Exporta el grup</button>\n        <h6 style=\"clear:both;\">Opcions</h6>\n        <div class=\"form-group row\">\n        <label for=\"bsDialogQuizzConfig_o.hint\" class=\"col-sm-6 col-form-label\">Mostra ajuda a l'intent</label>\n        <div class=\"\"col-sm-6\">\n        <input type=\"numeric\" class=\"form-control\" id=\"bsDialogQuizzConfig_o.hint\" value=\"2\" required/> \n        </div>\n        <div class=\"invalid-feedback\">Proporcionau un valor.</div> \n        </div>\n        <div class=\"form-group row\">\n        <label for=\"bsDialogQuizzConfig_o.ans\" class=\"col-sm-6 col-form-label\">Mostra soluci\xF3 a l'intent</label>\n        <div class=\"\"col-sm-6\">\n        <input type=\"numeric\" class=\"form-control\" id=\"bsDialogQuizzConfig_o.ans\" value=\"4\" required/>\n        </div>\n        <div class=\"invalid-feedback\">Proporcionau un valor.</div> \n        </div>\n        <button type=\"button\" id=\"bsDialogQuizzConfig-exec\" class=\"btn btn-sm btn-secondary\" style=\"float:right;\"><i class=\"fas fa fa-cog\"></i> Executa</button>\n        <h6>Algoritme</h6>\n        <div class=\"form-group\">\n        <textarea id=\"bsDialogQuizzConfig_s\" class=\"form-control\" rows=\"10\" style=\"width:99%;\" \n         placeholder=\"".concat(placeholder, "\"></textarea>\n        <div class=\"invalid-feedback\">Hi ha un error en el codi.</div>\n        </div> \n       \n        <div id=\"bsDialogQuizzConfig-out\" class=\"alert alert-info\" style=\"display:none;font-size:small;\"></div>");
var BSDialogQuizzConfig = /*#__PURE__*/function (_BSDialog) {
  _inherits(BSDialogQuizzConfig, _BSDialog);
  var _super = _createSuper(BSDialogQuizzConfig);
  function BSDialogQuizzConfig() {
    var _this;
    _classCallCheck(this, BSDialogQuizzConfig);
    _this = _super.call(this, 'quizz-config-dlg', _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION, 'Configura àrea de qüestionari');
    _defineProperty(_assertThisInitialized(_this), "groupContext", {
      s: '',
      _s: {},
      o: {
        hint: 2,
        ans: 4
      }
    });
    return _this;
  }
  _createClass(BSDialogQuizzConfig, [{
    key: "setBindings",
    value: function setBindings(groupContext, parent) {
      var _this2 = this;
      this.groupContext = groupContext;
      var defaultScope = {
        s: '',
        _s: {},
        o: {
          hint: 2,
          ans: 4
        }
      };
      var scope2 = Object.assign(defaultScope, groupContext);
      this.setBodyBindings(bodyHTML, scope2);
      this.body.find('#bsDialogQuizzConfig-exec').on("click", function () {
        _this2.body.find('#bsDialogQuizzConfig-out').css('display', '');
        try {
          var context2 = {};
          (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.runIBScript)(_this2.algoritme(), {}, context2);
          _this2.body.find('#bsDialogQuizzConfig-out').html(JSON.stringify(context2));
        } catch (ex) {
          _this2.body.find('#bsDialogQuizzConfig-out').html("Hi ha alguna errada en el codi. T'has oblidat algun var o #?\n" + ex);
        }
        window.setTimeout(function () {
          return _this2.body.scrollTop(_this2.body.height() || 0);
        }, 400);
      });
      this.body.find('#bsDialogQuizzConfig-save').on("click", function () {
        var html = parent.outerHTML.replace(/data-active="1"/gi, '').replace(/^\s+/, ' ');
        navigator.clipboard.writeText(html);
      });
    }
  }, {
    key: "customValidation",
    value: function customValidation() {
      // The code must parse
      try {
        (0,_quizz_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.runIBScript)(this.algoritme(), {}, {});
      } catch (ex) {
        return "Hi ha alguna errada en el codi. T'has oblidat algun var o #?\n" + ex;
      }
      return null;
    }
  }, {
    key: "algoritme",
    value: function algoritme() {
      return (this.body.find("#bsDialogQuizzConfig_s").val() + '' || '').trim();
    }
  }]);
  return BSDialogQuizzConfig;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);
var quizzConfigDialog = null;
function getQuizzConfigDialog() {
  if (!quizzConfigDialog) {
    quizzConfigDialog = new BSDialogQuizzConfig();
  }
  return quizzConfigDialog;
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			7: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/* harmony import */ var _editor_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70);
/* harmony import */ var _dropdownWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _numericWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80);
/* harmony import */ var _mchoiceWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82);
/* harmony import */ var _clozeWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _quizzEditorComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86);







_loader__WEBPACK_IMPORTED_MODULE_5__["default"].bootstrap([_quizzEditorComponent__WEBPACK_IMPORTED_MODULE_6__["default"]]);
}();
/******/ })()
;