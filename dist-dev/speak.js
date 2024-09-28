/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 24:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBaseToUrl": function() { return /* binding */ addBaseToUrl; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; }
/* harmony export */ });
/* unused harmony exports parseUrlParams, querySelectorProp, convertInt, createElement, addScript, addLinkSheet, pathJoin, scopedEval, base64Encode, base64Decode */
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
    window.require(['jquery'], function (jQuery) {
      var $ = jQuery;
      // Share this object into the window if not set
      if (!window['$']) {
        window['$'] = $;
      }
      if (!window['jQuery']) {
        window['jQuery'] = $;
      }
      //wait for document ready
      console.info("$ready1");
      $(cb);
    }, function () {
      console.error("Error requiring $. Waiting for $");
      // An error occurred but try to load anyway!
      // Try jQuery directly
      waitForFunction('jQuery', function () {
        if (!window['$']) {
          window['$'] = jQuery;
        }
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

/***/ 28:
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

/***/ 26:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": function() { return /* binding */ Component; }
/* harmony export */ });
/* unused harmony export ComponentHTML */
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

/***/ 23:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
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

/***/ 33:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["default"] = ({
  "language": "ca",
  "defaultRegion": "ca-ES",
  "testUtterance": "Hola, em dic {name} i sóc una veu catalana",
  "voices": [{
    "label": "Joana (Català)",
    "name": "Microsoft Joana Online (Natural) - Catalan (Spain)",
    "language": "ca-ES",
    "otherLanguages": ["es"],
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Enric (Català)",
    "name": "Microsoft Enric Online (Natural) - Catalan (Spain)",
    "language": "ca-ES",
    "otherLanguages": ["es"],
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Montse (Català)",
    "name": "Montse",
    "localizedName": "apple",
    "language": "ca-ES",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Pau (Valencià)",
    "name": "Pau",
    "localizedName": "apple",
    "language": "ca-ES-u-sd-esvc",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Jordi (Català)",
    "name": "Jordi",
    "localizedName": "apple",
    "language": "ca-ES",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Herena (Català)",
    "name": "Microsoft Herena - Catalan (Spain)",
    "language": "ca-ES",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Veu femenina catalana",
    "name": "Android Speech Recognition and Synthesis from Google ca-es-x-caf-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google ca-es-x-caf-local", "Android Speech Recognition and Synthesis from Google ca-ES-language"],
    "language": "ca-ES",
    "otherLanguages": ["es"],
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Veu catalana",
    "name": "català Espanya",
    "localizedName": "android",
    "language": "ca-ES",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }]
});

/***/ }),

/***/ 36:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["default"] = ({
  "language": "de",
  "defaultRegion": "de-DE",
  "testUtterance": "Hallo, mein Name ist {name} und ich bin eine deutsche Stimme.",
  "voices": [{
    "label": "Seraphina (Deutschland)",
    "name": "Microsoft SeraphinaMultilingual Online (Natural) - German (Germany)",
    "language": "de-DE",
    "multiLingual": true,
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Amala (Deutschland)",
    "name": "Microsoft Amala Online (Natural) - German (Germany)",
    "language": "de-DE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Katja (Deutschland)",
    "name": "Microsoft Katja Online (Natural) - German (Germany)",
    "language": "de-DE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Florian (Deutschland)",
    "name": "Microsoft FlorianMultilingual Online (Natural) - German (Germany)",
    "language": "de-DE",
    "multiLingual": true,
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Conrad (Deutschland)",
    "name": "Microsoft Conrad Online (Natural) - German (Germany)",
    "language": "de-DE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Killian (Deutschland)",
    "name": "Microsoft Killian Online (Natural) - German (Germany)",
    "language": "de-DE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ingrid (Österreich)",
    "name": "Microsoft Ingrid Online (Natural) - German (Austria)",
    "language": "de-AT",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Jonas (Österreich)",
    "name": "Microsoft Jonas Online (Natural) - German (Austria)",
    "language": "de-AT",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Leni (Schweiz)",
    "name": "Microsoft Leni Online (Natural) - German (Switzerland)",
    "language": "de-CH",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Jan (Schweiz)",
    "name": "Microsoft Jan Online (Natural) - German (Switzerland)",
    "language": "de-CH",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Petra (Deutschland)",
    "name": "Petra",
    "localizedName": "apple",
    "language": "de-DE",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Anna (Deutschland)",
    "name": "Anna",
    "localizedName": "apple",
    "language": "de-DE",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Helena (Deutschland)",
    "name": "Helena",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "de-DE",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Markus (Deutschland)",
    "name": "Markus",
    "localizedName": "apple",
    "language": "de-DE",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Viktor (Deutschland)",
    "name": "Viktor",
    "localizedName": "apple",
    "language": "de-DE",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Yannick (Deutschland)",
    "name": "Yannick",
    "localizedName": "apple",
    "language": "de-DE",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Martin (Deutschland)",
    "name": "Martin",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "de-DE",
    "gender": "male",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Weibliche Google-Stimme (Deutschland)",
    "name": "Google Deutsch",
    "language": "de-DE",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Hedda (Deutschland)",
    "name": "Microsoft Hedda - German (Germany)",
    "language": "de-DE",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Katja (Deutschland)",
    "name": "Microsoft Katja - German (Germany)",
    "language": "de-DE",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Stefan (Deutschland)",
    "name": "Microsoft Stefan - German (Germany)",
    "language": "de-DE",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Michael (Österreich)",
    "name": "Microsoft Michael - German (Austria)",
    "language": "de-AT",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Karsten (Schweiz)",
    "name": "Microsoft Karsten - German (Switzerland)",
    "language": "de-CH",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Weibliche Stimme 1 (Deutschland)",
    "name": "Google Deutsch 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google de-de-x-dea-network", "Chrome OS Deutsch 2", "Android Speech Recognition and Synthesis from Google de-de-x-dea-local", "Android Speech Recognition and Synthesis from Google de-DE-language"],
    "language": "de-DE",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Weibliche Stimme 2 (Deutschland)",
    "name": "Google Deutsch 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google de-de-x-nfh-network", "Chrome OS Deutsch 1", "Android Speech Recognition and Synthesis from Google de-de-x-nfh-local"],
    "language": "de-DE",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Männliche Stimme 1 (Deutschland)",
    "name": "Google Deutsch 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google de-de-x-deb-network", "Chrome OS Deutsch 3", "Android Speech Recognition and Synthesis from Google de-de-x-deb-local"],
    "language": "de-DE",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Männliche Stimme 2 (Deutschland)",
    "name": "Google Deutsch 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google de-de-x-deg-network", "Chrome OS Deutsch 4", "Android Speech Recognition and Synthesis from Google de-de-x-deg-local"],
    "language": "de-DE",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Deutsche Stimme",
    "name": "Deutsch Deutschland",
    "localizedName": "android",
    "language": "de-DE",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }]
});

/***/ }),

/***/ 35:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["default"] = ({
  "language": "en",
  "defaultRegion": "en-US",
  "testUtterance": "Hello, my name is {name} and I am an English voice.",
  "voices": [{
    "label": "Emma (US)",
    "name": "Microsoft EmmaMultilingual Online (Natural) - English (United States)",
    "altNames": ["Microsoft Emma Online (Natural) - English (United States)"],
    "language": "en-US",
    "multiLingual": true,
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Microsoft Ava (US)",
    "name": "Microsoft AvaMultilingual Online (Natural) - English (United States)",
    "altNames": ["Microsoft Ava Online (Natural) - English (United States)"],
    "language": "en-US",
    "multiLingual": true,
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Jenny (US)",
    "name": "Microsoft Jenny Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Aria (US)",
    "name": "Microsoft Aria Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Michelle (US)",
    "name": "Microsoft Michelle Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ana (US)",
    "name": "Microsoft Ana Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "female",
    "children": true,
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Andrew (US)",
    "name": "Microsoft AndrewMultilingual Online (Natural) - English (United States)",
    "altNames": ["Microsoft Andrew Online (Natural) - English (United States)"],
    "language": "en-US",
    "multiLingual": true,
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Brian (US)",
    "name": "Microsoft BrianMultilingual Online (Natural) - English (United States)",
    "altNames": ["Microsoft Brian Online (Natural) - English (United States)"],
    "language": "en-US",
    "multiLingual": true,
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Guy (US)",
    "name": "Microsoft Guy Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Eric (US)",
    "name": "Microsoft Eric Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Steffan (US)",
    "name": "Microsoft Steffan Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Christopher (US)",
    "name": "Microsoft Christopher Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Roger (US)",
    "name": "Microsoft Roger Online (Natural) - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Sonia (UK)",
    "name": "Microsoft Sonia Online (Natural) - English (United Kingdom)",
    "language": "en-GB",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Libby (UK)",
    "name": "Microsoft Libby Online (Natural) - English (United Kingdom)",
    "language": "en-GB",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Maisie (UK)",
    "name": "Microsoft Maisie Online (Natural) - English (United Kingdom)",
    "language": "en-GB",
    "gender": "female",
    "children": true,
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ryan (UK)",
    "name": "Microsoft Ryan Online (Natural) - English (United Kingdom)",
    "language": "en-GB",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Thomas (UK)",
    "name": "Microsoft Thomas Online (Natural) - English (United Kingdom)",
    "language": "en-GB",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Natasha (Australia)",
    "name": "Microsoft Natasha Online (Natural) - English (Australia)",
    "language": "en-AU",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Hayley (Australia)",
    "name": "Microsoft Hayley Online - English (Australia)",
    "language": "en-AU",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "William (Australia)",
    "name": "Microsoft William Online (Natural) - English (Australia)",
    "language": "en-AU",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Clara (Canada)",
    "name": "Microsoft Clara Online (Natural) - English (Canada)",
    "language": "en-CA",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Heather (Canada)",
    "name": "Microsoft Heather Online - English (Canada)",
    "language": "en-CA",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Liam (Canada)",
    "name": "Microsoft Liam Online (Natural) - English (Canada)",
    "language": "en-CA",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Neerja (India)",
    "name": "Microsoft Neerja Online (Natural) - English (India)",
    "altNames": ["Microsoft Neerja Online (Natural) - English (India) (Preview)"],
    "language": "en-IN",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Prabhat (India)",
    "name": "Microsoft Prabhat Online (Natural) - English (India)",
    "language": "en-IN",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Emily (Ireland)",
    "name": "Microsoft Emily Online (Natural) - English (Ireland)",
    "language": "en-IE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Connor (Ireland)",
    "name": "Microsoft Connor Online (Natural) - English (Ireland)",
    "language": "en-IE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Leah (South Africa)",
    "name": "Microsoft Leah Online (Natural) - English (South Africa)",
    "language": "en-ZA",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Luke (South Africa)",
    "name": "Microsoft Luke Online (Natural) - English (South Africa)",
    "language": "en-ZA",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Yan (Hongkong)",
    "name": "Microsoft Yan Online (Natural) - English (Hongkong)",
    "language": "en-HK",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Sam (Hongkong)",
    "name": "Microsoft Sam Online (Natural) - English (Hongkong)",
    "language": "en-HK",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Asilia (Kenya)",
    "name": "Microsoft Asilia Online (Natural) - English (Kenya)",
    "language": "en-KE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Chilemba (Kenya)",
    "name": "Microsoft Chilemba Online (Natural) - English (Kenya)",
    "language": "en-KE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Molly (New Zealand)",
    "name": "Microsoft Molly Online (Natural) - English (New Zealand)",
    "language": "en-NZ",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Mitchell (New Zealand)",
    "name": "Microsoft Mitchell Online (Natural) - English (New Zealand)",
    "language": "en-NZ",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ezinne (Nigeria)",
    "name": "Microsoft Ezinne Online (Natural) - English (Nigeria)",
    "language": "en-NG",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Abeo (Nigeria)",
    "name": "Microsoft Abeo Online (Natural) - English (Nigeria)",
    "language": "en-NG",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Luna (Singapore)",
    "name": "Microsoft Luna Online (Natural) - English (Singapore)",
    "language": "en-SG",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Wayne (Singapore)",
    "name": "Microsoft Wayne Online (Natural) - English (Singapore)",
    "language": "en-SG",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Imani (Tanzania)",
    "name": "Microsoft Imani Online (Natural) - English (Tanzania)",
    "language": "en-TZ",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Elimu (Tanzania)",
    "name": "Microsoft Elimu Online (Natural) - English (Tanzania)",
    "language": "en-TZ",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Apple Ava (US)",
    "name": "Ava",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Zoe (US)",
    "name": "Zoe",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Allison (US)",
    "name": "Allison",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Nicky (US)",
    "name": "Nicky",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS. Unlike other Siri voices, a higher quality version can be installed and used.",
    "language": "en-US",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Samantha (US)",
    "name": "Samantha",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Joelle (US)",
    "name": "Joelle",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "female",
    "children": true,
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Evan (US)",
    "name": "Evan",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Nathan (US)",
    "name": "Nathan",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Tom (US)",
    "name": "Tom",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Alex (US)",
    "name": "Alex",
    "localizedName": "apple",
    "language": "en-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Aaron (US)",
    "name": "Aaron",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "en-US",
    "gender": "male",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Kate (UK)",
    "name": "Kate",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Stephanie (UK)",
    "name": "Stephanie",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Serena (UK)",
    "name": "Serena",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Martha (UK)",
    "name": "Martha",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "en-GB",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Jamie (UK)",
    "name": "Jamie",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "male",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Oliver (UK)",
    "name": "Oliver",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Daniel (UK)",
    "name": "Daniel",
    "localizedName": "apple",
    "language": "en-GB",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Arthur (UK)",
    "name": "Arthur",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "en-GB",
    "gender": "male",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Matilda (Australia)",
    "name": "Matilda",
    "localizedName": "apple",
    "language": "en-AU",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Karen (Australia)",
    "name": "Karen",
    "localizedName": "apple",
    "language": "en-AU",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Catherine (Australia)",
    "name": "Catherine",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "en-AU",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Lee (Australia)",
    "name": "Lee",
    "localizedName": "apple",
    "language": "en-AU",
    "gender": "male",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Gordon (Australia)",
    "name": "Gordon",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "en-AU",
    "gender": "male",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Isha (India)",
    "name": "Isha",
    "localizedName": "apple",
    "language": "en-IN",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Sangeeta (India)",
    "name": "Sangeeta",
    "localizedName": "apple",
    "language": "en-IN",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Rishi (India)",
    "name": "Rishi",
    "localizedName": "apple",
    "language": "en-IN",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Moira (Ireland)",
    "name": "Moira",
    "localizedName": "apple",
    "language": "en-IE",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Tessa (South Africa)",
    "name": "Tessa",
    "localizedName": "apple",
    "language": "en-ZA",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Fiona (Scotland)",
    "name": "Fiona",
    "localizedName": "apple",
    "language": "en-GB-u-sd-gbsct",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Female Google voice (US)",
    "name": "Google US English",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "en-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Female Google voice (UK)",
    "name": "Google UK English Female",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "en-GB",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Male Google voice (UK)",
    "name": "Google UK English Male",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "en-GB",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Zira (US)",
    "name": "Microsoft Zira - English (United States)",
    "language": "en-US",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "David (US)",
    "name": "Microsoft David - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Mark (US)",
    "name": "Microsoft Mark - English (United States)",
    "language": "en-US",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Hazel (UK)",
    "name": "Microsoft Hazel - English (Great Britain)",
    "language": "en-GB",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Susan (UK)",
    "name": "Microsoft Susan - English (Great Britain)",
    "language": "en-GB",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "George (UK)",
    "name": "Microsoft George - English (Great Britain)",
    "language": "en-GB",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Catherine (Australia)",
    "name": "Microsoft Catherine - English (Austalia)",
    "language": "en-AU",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "James (Australia)",
    "name": "Microsoft Richard - English (Australia)",
    "language": "en-AU",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Linda (Canada)",
    "name": "Microsoft Linda - English (Canada)",
    "language": "en-CA",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Richard (Canada)",
    "name": "Microsoft Richard - English (Canada)",
    "language": "en-CA",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Heera (India)",
    "name": "Microsoft Heera - English (India)",
    "language": "en-IN",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Ravi (India)",
    "name": "Microsoft Ravi - English (India)",
    "language": "en-IN",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Sean (Ireland)",
    "name": "Microsoft Sean - English (Ireland)",
    "language": "en-IE",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Female voice 1 (US)",
    "name": "Google US English 5 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-tpc-network", "Chrome OS US English 5", "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local", "Android Speech Recognition and Synthesis from Google en-US-language"],
    "language": "en-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 2 (US)",
    "name": "Google US English 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-iob-network", "Chrome OS US English 1", "Android Speech Recognition and Synthesis from Google en-us-x-iob-local"],
    "language": "en-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 3 (US)",
    "name": "Google US English 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-iog-network", "Chrome OS US English 2", "Android Speech Recognition and Synthesis from Google en-us-x-iog-local"],
    "language": "en-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 4 (US)",
    "name": "Google US English 7 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-tpf-network", "Chrome OS US English 7", "Android Speech Recognition and Synthesis from Google en-us-x-tpf-local"],
    "language": "en-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 5 (US)",
    "name": "Android Speech Recognition and Synthesis from Google en-us-x-sfg-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-sfg-local"],
    "language": "en-US",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 6 (US)",
    "name": "Chrome OS US English 8",
    "language": "en-US",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 1 (US)",
    "name": "Google US English 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-iom-network", "Chrome OS US English 4", "Android Speech Recognition and Synthesis from Google en-us-x-iom-local"],
    "language": "en-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 2 (US)",
    "name": "Google US English 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-iol-network", "Chrome OS US English 3", "Android Speech Recognition and Synthesis from Google en-us-x-iol-local"],
    "language": "en-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 3 (US)",
    "name": "Google US English 6 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-us-x-tpd-network", "Chrome OS US English 6", "Android Speech Recognition and Synthesis from Google en-us-x-tpd-local"],
    "language": "en-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 1 (UK)",
    "name": "Google UK English 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-gba-network", "Chrome OS UK English 2", "Android Speech Recognition and Synthesis from Google en-gb-x-gba-local", "Android Speech Recognition and Synthesis from Google en-GB-language"],
    "language": "en-GB",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 2 (UK)",
    "name": "Google UK English 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-gbc-network", "Chrome OS UK English 4", "Android Speech Recognition and Synthesis from Google en-gb-x-gbc-local"],
    "language": "en-GB",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 3 (UK)",
    "name": "Google UK English 6 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-gbg-network", "Chrome OS UK English 6", "Android Speech Recognition and Synthesis from Google en-gb-x-gbg-local"],
    "language": "en-GB",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 4 (UK)",
    "name": "Chrome OS UK English 7",
    "language": "en-GB",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 1 (UK)",
    "name": "Google UK English 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-rjs-network", "Chrome OS UK English 1", "Android Speech Recognition and Synthesis from Google en-gb-x-rjs-local"],
    "language": "en-GB",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 2 (UK)",
    "name": "Google UK English 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-gbb-network", "Chrome OS UK English 3", "Android Speech Recognition and Synthesis from Google en-gb-x-gbb-local"],
    "language": "en-GB",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 3 (UK)",
    "name": "Google UK English 5 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-gb-x-gbd-network", "Chrome OS UK English 5", "Android Speech Recognition and Synthesis from Google en-gb-x-gbd-local"],
    "language": "en-GB",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 1 (Australia)",
    "name": "Google Australian English 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-au-x-aua-network", "Chrome OS Australian English 1", "Android Speech Recognition and Synthesis from Google en-au-x-aua-local", "Android Speech Recognition and Synthesis from Google en-AU-language"],
    "language": "en-AU",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 2 (Australia)",
    "name": "Google Australian English 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-au-x-auc-network", "Chrome OS Australian English 3", "Android Speech Recognition and Synthesis from Google en-au-x-auc-local"],
    "language": "en-AU",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 1 (Australia)",
    "name": "Google Australian English 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-au-x-aub-network", "Chrome OS Australian English 2", "Android Speech Recognition and Synthesis from Google en-au-x-aub-local"],
    "language": "en-AU",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 2 (Australia)",
    "name": "Google Australian English 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-au-x-aud-network", "Chrome OS Australian English 4", "Android Speech Recognition and Synthesis from Google en-au-x-aud-local"],
    "language": "en-AU",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 3 (Australia)",
    "name": "Chrome OS Australian English 5",
    "language": "en-AU",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 1 (India)",
    "name": "Android Speech Recognition and Synthesis from Google en-in-x-ena-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-in-x-ena-local", "Android Speech Recognition and Synthesis from Google en-IN-language"],
    "language": "en-IN",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Female voice 2 (India)",
    "name": "Android Speech Recognition and Synthesis from Google en-in-x-enc-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-in-x-enc-local"],
    "language": "en-IN",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 1 (India)",
    "name": "Android Speech Recognition and Synthesis from Google en-in-x-end-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-in-x-end-local"],
    "language": "en-IN",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Male voice 2 (India)",
    "name": "Android Speech Recognition and Synthesis from Google en-in-x-ene-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google en-in-x-ene-local"],
    "language": "en-IN",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "US voice",
    "name": "English United States",
    "localizedName": "android",
    "language": "en-US",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }, {
    "label": "UK voice",
    "name": "English United Kingdom",
    "localizedName": "android",
    "language": "en-GB",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }, {
    "label": "Australian voice",
    "name": "English Australia",
    "localizedName": "android",
    "language": "en-AU",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }, {
    "label": "Indian voice",
    "name": "English India",
    "localizedName": "android",
    "language": "en-IN",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }]
});

/***/ }),

/***/ 34:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["default"] = ({
  "language": "es",
  "defaultRegion": "es-ES",
  "testUtterance": "Hola, mi nombre es {name} y soy una voz española.",
  "voices": [{
    "label": "Elvira (España)",
    "name": "Microsoft Elvira Online (Natural) - Spanish (Spain)",
    "language": "es-ES",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Alvaro (España)",
    "name": "Microsoft Alvaro Online (Natural) - Spanish (Spain)",
    "language": "es-ES",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Dalia (México)",
    "name": "Microsoft Dalia Online (Natural) - Spanish (Mexico)",
    "language": "es-MX",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Microsoft Jorge (México)",
    "name": "Microsoft Jorge Online (Natural) - Spanish (Mexico)",
    "language": "es-MX",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Elena (Argentina)",
    "name": "Microsoft Elena Online (Natural) - Spanish (Argentina)",
    "language": "es-AR",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Tomas (Argentina)",
    "name": "Microsoft Tomas Online (Natural) - Spanish (Argentina)",
    "language": "es-AR",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Sofia (Bolivia)",
    "name": "Microsoft Sofia Online (Natural) - Spanish (Bolivia)",
    "language": "es-BO",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Marcelo (Bolivia)",
    "name": "Microsoft Marcelo Online (Natural) - Spanish (Bolivia)",
    "language": "es-BO",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Catalina (Chile)",
    "name": "Microsoft Catalina Online (Natural) - Spanish (Chile)",
    "language": "es-CL",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Lorenzo (Chile)",
    "name": "Microsoft Lorenzo Online (Natural) - Spanish (Chile)",
    "language": "es-CL",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ximena (Colombia)",
    "name": "Microsoft Ximena Online (Natural) - Spanish (Colombia)",
    "language": "es-CO",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Salome (Colombia)",
    "name": "Microsoft Salome Online (Natural) - Spanish (Colombia)",
    "language": "es-CO",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Gonzalo (Colombia)",
    "name": "Microsoft Gonzalo Online (Natural) - Spanish (Colombia)",
    "language": "es-CO",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Maria (Costa Rica)",
    "name": "Microsoft Maria Online (Natural) - Spanish (Costa Rica)",
    "language": "es-CR",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Juan (Costa Rica)",
    "name": "Microsoft Juan Online (Natural) - Spanish (Costa Rica)",
    "language": "es-CR",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Belkys (Cuba)",
    "name": "Microsoft Belkys Online (Natural) - Spanish (Cuba)",
    "language": "es-CU",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Manuel (Cuba)",
    "name": "Microsoft Manuel Online (Natural) - Spanish (Cuba)",
    "language": "es-CU",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Andrea (Ecuador)",
    "name": "Microsoft Andrea Online (Natural) - Spanish (Ecuador)",
    "language": "es-EC",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Luis (Ecuador)",
    "name": "Microsoft Luis Online (Natural) - Spanish (Ecuador)",
    "language": "es-EC",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Lorena (El Salvador)",
    "name": "Microsoft Lorena Online (Natural) - Spanish (El Salvador)",
    "language": "es-SV",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Rodrigo (El Salvador)",
    "name": "Microsoft Rodrigo Online (Natural) - Spanish (El Salvador)",
    "language": "es-SV",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Paloma (Estados Unidos)",
    "name": "Microsoft Paloma Online (Natural) - Spanish (United States)",
    "language": "es-US",
    "otherLanguages": ["en"],
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Alonso (Estados Unidos)",
    "name": "Microsoft Alonso Online (Natural) - Spanish (United States)",
    "language": "es-US",
    "otherLanguages": ["en"],
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Marta (Guatemala)",
    "name": "Microsoft Marta Online (Natural) - Spanish (Guatemala)",
    "language": "es-GT",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Andres (Guatemala)",
    "name": "Microsoft Andres Online (Natural) - Spanish (Guatemala)",
    "language": "es-GT",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Teresa (Guinea Ecuatorial)",
    "name": "Microsoft Teresa Online (Natural) - Spanish (Equatorial Guinea)",
    "language": "es-GQ",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Javier (Guinea Ecuatorial)",
    "name": "Microsoft Javier Online (Natural) - Spanish (Equatorial Guinea)",
    "language": "es-GQ",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Karla (Honduras)",
    "name": "Microsoft Karla Online (Natural) - Spanish (Honduras)",
    "language": "es-HN",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Carlos (Honduras)",
    "name": "Microsoft Carlos Online (Natural) - Spanish (Honduras)",
    "language": "es-HN",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Yolanda (Nicaragua)",
    "name": "Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)",
    "language": "es-NI",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Federico (Nicaragua)",
    "name": "Microsoft Federico Online (Natural) - Spanish (Nicaragua)",
    "language": "es-NI",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Margarita (Panamá)",
    "name": "Microsoft Margarita Online (Natural) - Spanish (Panama)",
    "language": "es-PA",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Roberto (Panamá)",
    "name": "Microsoft Roberto Online (Natural) - Spanish (Panama)",
    "language": "es-PA",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Tania (Paraguay)",
    "name": "Microsoft Tania Online (Natural) - Spanish (Paraguay)",
    "language": "es-PY",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Mario (Paraguay)",
    "name": "Microsoft Mario Online (Natural) - Spanish (Paraguay)",
    "language": "es-PY",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Camila (Perú)",
    "name": "Microsoft Camila Online (Natural) - Spanish (Peru)",
    "language": "es-PE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Alex (Perú)",
    "name": "Microsoft Alex Online (Natural) - Spanish (Peru)",
    "language": "es-PE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Karina (Puerto Rico)",
    "name": "Microsoft Karina Online (Natural) - Spanish (Puerto Rico)",
    "language": "es-PR",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Victor (Puerto Rico)",
    "name": "Microsoft Victor Online (Natural) - Spanish (Puerto Rico)",
    "language": "es-PR",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ramona (República Dominicana)",
    "name": "Microsoft Ramona Online (Natural) - Spanish (Dominican Republic)",
    "language": "es-DO",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Emilio (República Dominicana)",
    "name": "Microsoft Emilio Online (Natural) - Spanish (Dominican Republic)",
    "language": "es-DO",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Valentina (Uruguay)",
    "name": "Microsoft Valentina Online (Natural) - Spanish (Uruguay)",
    "language": "es-UY",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Mateo (Uruguay)",
    "name": "Microsoft Mateo Online (Natural) - Spanish (Uruguay)",
    "language": "es-UY",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Paola (Venezuela)",
    "name": "Microsoft Paola Online (Natural) - Spanish (Venezuela)",
    "language": "es-VE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Sebastian (Venezuela)",
    "name": "Microsoft Sebastian Online (Natural) - Spanish (Venezuela)",
    "language": "es-VE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Marisol (España)",
    "name": "Marisol",
    "localizedName": "apple",
    "language": "es-ES",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Mónica (España)",
    "name": "Mónica",
    "localizedName": "apple",
    "language": "es-ES",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Apple Jorge (España)",
    "name": "Jorge",
    "localizedName": "apple",
    "language": "es-ES",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Angelica (México)",
    "name": "Angelica",
    "localizedName": "apple",
    "language": "es-MX",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Paulina (México)",
    "name": "Paulina",
    "localizedName": "apple",
    "language": "es-MX",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Juan (México)",
    "name": "Juan",
    "localizedName": "apple",
    "language": "es-MX",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Isabela (Argentina)",
    "name": "Isabela",
    "localizedName": "apple",
    "language": "es-AR",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Diego (Argentina)",
    "name": "Diego",
    "localizedName": "apple",
    "language": "es-AR",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Francesca (Chile)",
    "name": "Francesca",
    "localizedName": "apple",
    "language": "es-CL",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Soledad (Colombia)",
    "name": "Soledad",
    "localizedName": "apple",
    "language": "es-CO",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Jimena (Colombia)",
    "name": "Jimena",
    "localizedName": "apple",
    "language": "es-CO",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Carlos (Colombia)",
    "name": "Carlos",
    "localizedName": "apple",
    "language": "es-CO",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Voz Google masculina (España)",
    "name": "Google español",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "es-ES",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Voz Google femenina (Estados Unidos)",
    "name": "Google español de Estados Unidos",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "es-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Helena (España)",
    "name": "Microsoft Helena - Spanish (Spain)",
    "language": "es-ES",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Laura (España)",
    "name": "Microsoft Laura - Spanish (Spain)",
    "language": "es-ES",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Pablo (España)",
    "name": "Microsoft Pablo - Spanish (Spain)",
    "language": "es-ES",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Sabina (México)",
    "name": "Microsoft Sabina - Spanish (Mexico)",
    "language": "es-MX",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Raul (México)",
    "name": "Microsoft Raul - Spanish (Mexico)",
    "language": "es-MX",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Voz femenina 1 (España)",
    "name": "Google español 4 (Natural)",
    "altNames": ["Chrome OS español 4", "Android Speech Recognition and Synthesis from Google es-es-x-eee-local", "Android Speech Recognition and Synthesis from Google es-ES-language"],
    "language": "es-ES",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz femenina 2 (España)",
    "name": "Google español 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-es-x-eea-network", "Chrome OS español 1", "Android Speech Recognition and Synthesis from Google es-es-x-eea-local"],
    "language": "es-ES",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz femenina 3 (España)",
    "name": "Google español 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-es-x-eec-network", "Chrome OS español 2", "Android Speech Recognition and Synthesis from Google es-es-x-eec-local"],
    "language": "es-ES",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz masculina 1 (España)",
    "name": "Google español 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-es-x-eed-network", "Chrome OS español 3", "Android Speech Recognition and Synthesis from Google es-es-x-eed-local"],
    "language": "es-ES",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz masculina 2 (España)",
    "name": "Google español 5 (Natural)",
    "altNames": ["Chrome OS español 5", "Android Speech Recognition and Synthesis from Google es-es-x-eef-local"],
    "language": "es-ES",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz femenina 1 (Estados Unidos)",
    "name": "Google español de Estados Unidos 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-us-x-esc-network", "Chrome OS español de Estados Unidos", "Android Speech Recognition and Synthesis from Google es-us-x-esc-local", "Android Speech Recognition and Synthesis from Google es-US-language"],
    "language": "es-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz femenina 2 (Estados Unidos)",
    "name": "Google español de Estados Unidos 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-us-x-sfb-network", "Android Speech Recognition and Synthesis from Google es-us-x-sfb-local"],
    "language": "es-US",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz masculina 1 (Estados Unidos)",
    "name": "Google español de Estados Unidos 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-us-x-esd-network", "Android Speech Recognition and Synthesis from Google es-us-x-esd-local"],
    "language": "es-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz masculina 2 (Estados Unidos)",
    "name": "Google español de Estados Unidos 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google es-us-x-esf-network", "Android Speech Recognition and Synthesis from Google es-us-x-esf-local"],
    "language": "es-US",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voz de España",
    "name": "español España",
    "localizedName": "android",
    "language": "es-ES",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }, {
    "label": "Voz de Estados Unidos",
    "name": "español Estados Unidos",
    "localizedName": "android",
    "language": "es-US",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }]
});

/***/ }),

/***/ 37:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["default"] = ({
  "language": "fr",
  "defaultRegion": "fr-FR",
  "testUtterance": "Bonjour, mon nom est {name} et je suis une voix française.",
  "voices": [{
    "label": "Vivienne (France)",
    "name": "Microsoft VivienneMultilingual Online (Natural) - French (France)",
    "language": "fr-FR",
    "multiLingual": true,
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Denise (France)",
    "name": "Microsoft Denise Online (Natural) - French (France)",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Charline (Belgique)",
    "name": "Microsoft Charline Online (Natural) - French (Belgium)",
    "language": "fr-BE",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Ariane (Suisse)",
    "name": "Microsoft Ariane Online (Natural) - French (Switzerland)",
    "language": "fr-CH",
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Eloise (France)",
    "name": "Microsoft Eloise Online (Natural) - French (France)",
    "language": "fr-FR",
    "gender": "female",
    "children": true,
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Remy (France)",
    "name": "Microsoft RemyMultilingual Online (Natural) - French (France)",
    "language": "fr-FR",
    "multiLingual": true,
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Henri (France)",
    "name": "Microsoft Henri Online (Natural) - French (France)",
    "language": "fr-FR",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Gerard (Belgique)",
    "name": "Microsoft Gerard Online (Natural) - French (Belgium)",
    "language": "fr-BE",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Fabrice (Suisse)",
    "name": "Microsoft Fabrice Online (Natural) - French (Switzerland)",
    "language": "fr-CH",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Sylvie (Canada)",
    "name": "Microsoft Sylvie Online (Natural) - French (Canada)",
    "language": "fr-CA",
    "otherLanguages": ["en"],
    "gender": "female",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Antoine (Canada)",
    "name": "Microsoft Antoine Online (Natural) - French (Canada)",
    "language": "fr-CA",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Jean (Canada)",
    "name": "Microsoft Jean Online (Natural) - French (Canada)",
    "language": "fr-CA",
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Thierry (Canada)",
    "name": "Microsoft Thierry Online (Natural) - French (Canada)",
    "language": "fr-CA",
    "otherLanguages": ["en"],
    "gender": "male",
    "quality": ["veryHigh"],
    "rate": 1,
    "pitchControl": false,
    "browser": ["Edge"],
    "preloaded": true
  }, {
    "label": "Audrey (France)",
    "name": "Audrey",
    "localizedName": "apple",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["low", "normal", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Aurélie (France)",
    "name": "Aurélie",
    "localizedName": "apple",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 0.9,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Marie (France)",
    "name": "Marie",
    "localizedName": "apple",
    "note": "This is a compact version of a preloaded Siri voice on macOS.",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["low"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Thomas (France)",
    "name": "Thomas",
    "localizedName": "apple",
    "language": "fr-FR",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Aude (Belgique)",
    "name": "Aude",
    "localizedName": "apple",
    "language": "fr-BE",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Chantal (Canada)",
    "name": "Chantal",
    "localizedName": "apple",
    "language": "fr-CA",
    "gender": "female",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Amélie (Canada)",
    "name": "Amélie",
    "localizedName": "apple",
    "language": "fr-CA",
    "gender": "female",
    "quality": ["low", "high"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"],
    "preloaded": true
  }, {
    "label": "Nicolas (Canada)",
    "name": "Nicolas",
    "localizedName": "apple",
    "language": "fr-CA",
    "gender": "male",
    "quality": ["low", "normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["macOS", "iOS", "iPadOS"]
  }, {
    "label": "Voix Google féminine (France)",
    "name": "Google français",
    "note": "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "browser": ["ChromeDesktop"],
    "preloaded": true
  }, {
    "label": "Julie (France)",
    "name": "Microsoft Julie - French (France)",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Hortence (France)",
    "name": "Microsoft Hortence - French (France)",
    "language": "fr-FR",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Paul (France)",
    "name": "Microsoft Paul - French (France)",
    "language": "fr-FR",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Caroline (Canada)",
    "name": "Microsoft Caroline - French (Canada)",
    "language": "fr-CA",
    "gender": "female",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Claude (Canada)",
    "name": "Microsoft Claude - French (Canada)",
    "language": "fr-CA",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Guillaume (Suisse)",
    "name": "Microsoft Claude - French (Switzerland)",
    "language": "fr-CH",
    "gender": "male",
    "quality": ["normal"],
    "rate": 1,
    "pitch": 1,
    "os": ["Windows"],
    "preloaded": true
  }, {
    "label": "Voix féminine 1 (France)",
    "name": "Google français 4 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-fr-x-frc-network", "Chrome OS français 4", "Android Speech Recognition and Synthesis from Google fr-fr-x-frc-local", "Android Speech Recognition and Synthesis from Google fr-FR-language"],
    "language": "fr-FR",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix féminine 2 (France)",
    "name": "Google français 2 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-fr-x-fra-network", "Chrome OS français 2", "Android Speech Recognition and Synthesis from Google fr-fr-x-fra-local"],
    "language": "fr-FR",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix féminine 3 (France)",
    "name": "Google français 1 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-network", "Chrome OS français 1", "Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-local"],
    "language": "fr-FR",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix masculine 1 (France)",
    "name": "Google français 5 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-fr-x-frd-network", "Chrome OS français 5", "Android Speech Recognition and Synthesis from Google fr-fr-x-frd-local"],
    "language": "fr-FR",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix masculine 2 (France)",
    "name": "Google français 3 (Natural)",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-fr-x-frb-network", "Chrome OS français 3", "Android Speech Recognition and Synthesis from Google fr-fr-x-frb-local"],
    "language": "fr-FR",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix féminine 1 (Canada)",
    "name": "Android Speech Recognition and Synthesis from Google fr-ca-x-caa-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-ca-x-caa-local", "Android Speech Recognition and Synthesis from Google fr-CA-language"],
    "language": "fr-CA",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix féminine 2 (Canada)",
    "name": "Android Speech Recognition and Synthesis from Google fr-ca-x-cac-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-ca-x-cac-local"],
    "language": "fr-CA",
    "gender": "female",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix masculine 1 (Canada)",
    "name": "Android Speech Recognition and Synthesis from Google fr-ca-x-cab-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-ca-x-cab-local"],
    "language": "fr-CA",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix masculine 2 (Canada)",
    "name": "Android Speech Recognition and Synthesis from Google fr-ca-x-cad-network",
    "altNames": ["Android Speech Recognition and Synthesis from Google fr-ca-x-cad-local"],
    "language": "fr-CA",
    "gender": "male",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["ChromeOS"],
    "preloaded": true
  }, {
    "label": "Voix française",
    "name": "français France",
    "localizedName": "android",
    "language": "fr-FR",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }, {
    "label": "Voix canadienne",
    "name": "français Canada",
    "localizedName": "android",
    "language": "fr-CA",
    "quality": ["high"],
    "rate": 1,
    "pitch": 1,
    "os": ["Android"],
    "preloaded": true
  }]
});

/***/ }),

/***/ 40:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GTTSPlayer; }
/* harmony export */ });
/* harmony import */ var easy_speech__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var MAX_GTTS_LEN = 1000;
var GTTS_URL = "https://speech.ibsuite.es/api/gtts?t=";
var GTTSPlayer = /*#__PURE__*/function () {
  function GTTSPlayer(elem) {
    var _this = this;
    _classCallCheck(this, GTTSPlayer);
    _defineProperty(this, "url", "");
    this._elem = elem;
    var idioma = elem.getAttribute("href") || elem.dataset.lang || "en_us";
    idioma = idioma.replace("#speak_", "");
    var sText = elem.innerText.trim();
    if (sText.length > MAX_GTTS_LEN) {
      console.warn("GTTS: Max length supported is " + MAX_GTTS_LEN + " characters.");
      elem.removeAttribute("href");
      return;
    }
    //decide what to do with the title
    if (elem.title == "-") {
      //remove it
      elem.removeAttribute("title");
    }
    elem.classList.add("sd-speak-enabled");
    this.url = GTTS_URL + encodeURIComponent(sText) + "&l=" + idioma;
    this.audio = null;
    this.handler = function (evt) {
      evt.preventDefault(); // Evita que executi el link    
      _this.play();
    };
    elem.addEventListener("click", this.handler);
    if (!this.handler) {
      this._elem.removeEventListener("click", this.handler);
    }
  }
  _createClass(GTTSPlayer, [{
    key: "cancel",
    value: function cancel() {
      if (!this.audio) {
        return;
      }
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }, {
    key: "isUtterance",
    value: function isUtterance() {
      return false;
    }
  }, {
    key: "play",
    value: function play() {
      var _window$IB$sd$speak$i, _window$IB, _window$IB$sd$speak;
      // Cancel all possible utterances
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].cancel();
      // Cancel all AudioPlayers
      Object.values((_window$IB$sd$speak$i = (_window$IB = window.IB) === null || _window$IB === void 0 ? void 0 : (_window$IB$sd$speak = _window$IB.sd["speak"]) === null || _window$IB$sd$speak === void 0 ? void 0 : _window$IB$sd$speak.inst) !== null && _window$IB$sd$speak$i !== void 0 ? _window$IB$sd$speak$i : []).filter(function (e) {
        return !e.isUtterance();
      }).forEach(function (e) {
        return e.cancel();
      });
      if (!this.audio) {
        this.audio = new Audio(this.url);
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.audio.src = this.url;
      //this is async
      this.audio.play();
    }
  }, {
    key: "setSrc",
    value: function setSrc(src) {
      if (this.audio) {
        this.audio.src = src;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.audio) {
        this.audio.pause();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.audio != null) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = "";
        this.audio = null;
      }
      if (this.handler) {
        this._elem.classList.remove("sd-speak-enabled");
        this._elem.removeAttribute('data-active');
        this._elem.removeEventListener("click", this.handler);
        this.handler = null;
      }
    }
  }]);
  return GTTSPlayer;
}();


/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavigatorPlayer; }
/* harmony export */ });
/* harmony import */ var easy_speech__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var NavigatorPlayer = /*#__PURE__*/function () {
  function NavigatorPlayer(elem, voice) {
    var _this = this;
    _classCallCheck(this, NavigatorPlayer);
    _defineProperty(this, "_voice", null);
    this._elem = elem;
    this._voice = voice;
    //decide what to do with the title
    if (elem.title == "-") {
      //remove it
      elem.removeAttribute("title");
    }
    this.handler = null;
    if (this._voice) {
      elem.classList.add("sd-speak-enabled");
      this.handler = function (evt) {
        evt.preventDefault(); // Evita que executi el link    
        _this.play();
      };
      elem.addEventListener("click", this.handler);
    } else {
      //Get rid of the a link since browser does not support this feature
      elem.removeAttribute("href");
    }
  }
  _createClass(NavigatorPlayer, [{
    key: "cancel",
    value: function cancel() {
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].cancel();
    }
  }, {
    key: "isUtterance",
    value: function isUtterance() {
      return true;
    }
  }, {
    key: "play",
    value: function play() {
      var _window$IB$sd$speak$i, _window$IB, _window$IB$sd$speak;
      if (!this._voice) {
        console.info("Voice is not set in navigatorPlayer. Cannot play");
        return;
      }
      // Cancel any previous speech
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].cancel();
      // Cancel all AudioPlayers
      Object.values((_window$IB$sd$speak$i = (_window$IB = window.IB) === null || _window$IB === void 0 ? void 0 : (_window$IB$sd$speak = _window$IB.sd["speak"]) === null || _window$IB$sd$speak === void 0 ? void 0 : _window$IB$sd$speak.inst) !== null && _window$IB$sd$speak$i !== void 0 ? _window$IB$sd$speak$i : []).filter(function (e) {
        return !e.isUtterance();
      }).forEach(function (e) {
        return e.cancel();
      });
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].speak({
        text: this._elem.innerText,
        voice: this._voice,
        pitch: 1,
        rate: 0.95,
        volume: 1
      });
    }
  }, {
    key: "setSrc",
    value: function setSrc(src) {
      //Do nothing
    }
  }, {
    key: "pause",
    value: function pause() {
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].pause();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._elem.removeEventListener("click", this.handler);
      this._elem.classList.remove("sd-speak-enabled");
      this._elem.removeAttribute('data-active');
    }
  }]);
  return NavigatorPlayer;
}();


/***/ }),

/***/ 31:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SpeakComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40);
/* harmony import */ var _navigatorPlayer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41);
/* harmony import */ var _urlPlayer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38);
/* harmony import */ var _wordreferencePlayer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(39);
/* harmony import */ var easy_speech__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _ca__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }












var recommendedVoices = {
  "ca": _ca__WEBPACK_IMPORTED_MODULE_1__["default"],
  "es": _es__WEBPACK_IMPORTED_MODULE_2__["default"],
  "en": _en__WEBPACK_IMPORTED_MODULE_3__["default"],
  "de": _de__WEBPACK_IMPORTED_MODULE_4__["default"],
  "fr": _fr__WEBPACK_IMPORTED_MODULE_5__["default"]
};

/**
 * Is the recommended voice in the list of local voices?
 * @param recommendedVoice 
 * @param voices 
 */
function findSystemVoice(recommendedVoice, voices) {
  var n = voices.length;
  var i = 0;
  var found = -1;
  while (found < 0 && i < n) {
    var _recommendedVoice$alt;
    if (recommendedVoice.name === voices[i].name || ((_recommendedVoice$alt = recommendedVoice.altNames) !== null && _recommendedVoice$alt !== void 0 ? _recommendedVoice$alt : []).includes(voices[i].name)) {
      found = i;
    } else {
      i++;
    }
  }
  return found;
}

/**
 * Sort the voices by lang and quality
 * @param voices 
 */
function sortVoices(voices) {
  var sorted = {};
  voices.forEach(function (v) {
    var mainLang = v.lang.split("-")[0];
    var lst = sorted[mainLang];
    if (!lst) {
      lst = [];
      sorted[mainLang] = lst;
    }
    lst.push(v);
  });
  // For every lang in the local voices
  Object.keys(sorted).forEach(function (mainLang) {
    var langRec = recommendedVoices[mainLang];
    if (!langRec) {
      return;
    }
    var foundVoicesList = [];
    langRec.voices.forEach(function (recommendation) {
      var indxFound = findSystemVoice(recommendation, sorted[mainLang]);
      if (indxFound >= 0) {
        // Added to foundVoicesList
        foundVoicesList.push(sorted[mainLang][indxFound]);
        // Remove it from sorted[mainLang]
        sorted[mainLang].splice(indxFound, 1);
      }
    });
    // Move best voices first
    sorted[mainLang] = [].concat(foundVoicesList, _toConsumableArray(sorted[mainLang]));
  });
  return sorted;
}

/**
 * Improve selection of several voices of one lang by using recommendations and quality properties
 * on voice if any
 * @param lang 
 * @param voices 
 * @returns 
 */
var findVoice = function findVoice(lang, sortedVoices) {
  lang = (lang || "").toLowerCase();
  var mainLang = lang.split("-")[0];
  var voices = sortedVoices[mainLang];
  if (!voices) {
    return null;
  }
  var k = 0;
  var voice = null;
  var len = (voices || []).length;
  while (k < len && voice == null) {
    // If the lang does not have a variant, then pick the first one found
    if (voices[k].lang.toLowerCase() == lang || lang.indexOf("-") < 0 && voices[k].lang.toLowerCase().startsWith(lang + "-")) {
      voice = voices[k];
    }
    k++;
  }
  return voice;
};
var SpeakComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_6__.Component)({
  name: 'speak',
  author: 'Josep Mulet Pol',
  version: '2.6',
  query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
  use$: true //May require $ajax
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(SpeakComponent, _BaseComponent);
  var _super = _createSuper(SpeakComponent);
  function SpeakComponent(parent) {
    var _this;
    _classCallCheck(this, SpeakComponent);
    _this = _super.call(this, parent);
    _defineProperty(_assertThisInitialized(_this), "unloadListener", null);
    _defineProperty(_assertThisInitialized(_this), "sortedVoices", null);
    return _this;
  }
  _createClass(SpeakComponent, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$parent$getAttri;
        var ds, internal, supported, _this$parent$getAttri2, lang, voice;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              ds = this.parent.dataset;
              if (!(ds.active === "1")) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              ds.active = "1";
              if (!ds.src) {
                _context.next = 7;
                break;
              }
              this.audioPlayer = new _urlPlayer__WEBPACK_IMPORTED_MODULE_7__["default"](this.parent);
              return _context.abrupt("return");
            case 7:
              if (!((_this$parent$getAttri = this.parent.getAttribute('href')) !== null && _this$parent$getAttri !== void 0 && _this$parent$getAttri.endsWith("#speak_en-wr"))) {
                _context.next = 15;
                break;
              }
              if (!(this.parent.innerText.trim().indexOf(" ") < 0)) {
                _context.next = 13;
                break;
              }
              //use wordreference
              this.audioPlayer = new _wordreferencePlayer__WEBPACK_IMPORTED_MODULE_8__["default"](this.parent);
              return _context.abrupt("return");
            case 13:
              console.error("WordReference only works for single words.");
              //turn into speech synthesis for american english 
              this.parent.setAttribute('href', '#speak_en-US');
            case 15:
              // Check if the speechSynthesis API is available
              internal = easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].status();
              supported = internal.initialized && internal.speechSynthesis && internal.speechSynthesisUtterance;
              this.audioPlayer = null;
              if (!supported) {
                console.warn("Web Speech Synthesis is not supported. Fallback on GTTS player.");
                this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__["default"](this.parent);
              } else if (internal.voices.length === 0) {
                console.warn("EasySpeech.voices returns no voices. Fallback on GTTS player.");
                this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__["default"](this.parent);
              } else {
                // Sort local voices by lang and quality
                if (!this.sortedVoices) {
                  this.sortedVoices = sortVoices(internal.voices);
                }
                // Check if the required voice is found
                lang = ((_this$parent$getAttri2 = this.parent.getAttribute("href")) !== null && _this$parent$getAttri2 !== void 0 ? _this$parent$getAttri2 : "_").split("_")[1];
                voice = findVoice(lang, this.sortedVoices);
                if (!voice) {
                  console.warn("Cannot find a voice for lang ".concat(lang, ". Fallback on GTTS player."));
                  this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__["default"](this.parent);
                } else {
                  // Stop voices on page change.
                  if (!this.unloadListener) {
                    this.unloadListener = function () {
                      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].cancel();
                    };
                    window.addEventListener('unload', this.unloadListener);
                  }
                  // Finally, we are sure we can use navigatorPlayer
                  this.audioPlayer = new _navigatorPlayer__WEBPACK_IMPORTED_MODULE_10__["default"](this.parent, voice);
                }
              }
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.parent.dataset.active !== "1") {
        return;
      }
      this.parent.removeAttribute("data-active");
      this.audioPlayer && this.audioPlayer.dispose();
      this.audioPlayer = null;
    }
  }, {
    key: "play",
    value: function play() {
      this.audioPlayer && this.audioPlayer.play();
    }
  }, {
    key: "setSrc",
    value: function setSrc(src) {
      //
    }
  }, {
    key: "pause",
    value: function pause() {
      this.audioPlayer && this.audioPlayer.pause();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var _this$audioPlayer;
      (_this$audioPlayer = this.audioPlayer) === null || _this$audioPlayer === void 0 ? void 0 : _this$audioPlayer.cancel();
    }
  }, {
    key: "isUtterance",
    value: function isUtterance() {
      var _this$audioPlayer$isU, _this$audioPlayer2;
      return (_this$audioPlayer$isU = (_this$audioPlayer2 = this.audioPlayer) === null || _this$audioPlayer2 === void 0 ? void 0 : _this$audioPlayer2.isUtterance()) !== null && _this$audioPlayer$isU !== void 0 ? _this$audioPlayer$isU : false;
    }
  }]);
  return SpeakComponent;
}(_base__WEBPACK_IMPORTED_MODULE_11__.BaseComponent)) || _class);


/***/ }),

/***/ 38:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UrlPlayer; }
/* harmony export */ });
/* harmony import */ var easy_speech__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var UrlPlayer = /*#__PURE__*/function () {
  function UrlPlayer(elem, src) {
    _classCallCheck(this, UrlPlayer);
    this.src = "";
    if (elem != null) {
      var ds = elem.dataset;
      this.src = ds.src || "";
    }
    if (!this.src && src) {
      this.src = src;
    }
    this.elem = elem;
  }
  _createClass(UrlPlayer, [{
    key: "play",
    value: function play() {
      var _window$IB$sd$speak$i, _window$IB, _window$IB$sd$speak;
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].cancel();
      // Cancel all AudioPlayers
      Object.values((_window$IB$sd$speak$i = (_window$IB = window.IB) === null || _window$IB === void 0 ? void 0 : (_window$IB$sd$speak = _window$IB.sd["speak"]) === null || _window$IB$sd$speak === void 0 ? void 0 : _window$IB$sd$speak.inst) !== null && _window$IB$sd$speak$i !== void 0 ? _window$IB$sd$speak$i : []).filter(function (e) {
        return !e.isUtterance();
      }).forEach(function (e) {
        return e.cancel();
      });
      if (this.audioElement) {
        this.audioElement.play();
        return;
      }
      this.audioElement = new Audio(this.src);
      this.audioElement.play();
      if (!this.elem) {
        this.bindHandler();
      }
    }
  }, {
    key: "setSrc",
    value: function setSrc(url) {
      if (this.audioElement) {
        this.audioElement.src = url;
      }
    }
  }, {
    key: "bindHandler",
    value: function bindHandler() {
      var _this = this;
      this.handler = function (evt) {
        evt.preventDefault();
        _this.play();
      };
      this.elem && this.elem.addEventListener("click", this.handler);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.audioElement && this.audioElement.pause();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (!this.audioElement) {
        return;
      }
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }, {
    key: "isUtterance",
    value: function isUtterance() {
      return false;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.audioElement = null;
      this.handler && this.elem && this.elem.removeEventListener("click", this.handler);
    }
  }]);
  return UrlPlayer;
}();


/***/ }),

/***/ 39:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WordReferencePlayer; }
/* harmony export */ });
/* harmony import */ var _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _urlPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var definition = {
  'en': 'definition',
  'ca': 'definicio',
  'es': 'definicion'
};
var wordReferencePrefix = 'https://www.wordreference.com/';
var variantNames = {
  "us": "United States",
  "uk": "United Kingdom",
  "irish": "Irish",
  "scot": "Scottish",
  "jamaica": "Jamaica",
  "es": "España",
  "castellano": "España",
  "ca": "Catalunya",
  "mexico": "México",
  "argentina": "Argentina"
};
function nameOfVariant(variant) {
  return variantNames[variant] || variant;
}
function parseAudioFiles(extracted, lang) {
  var map = {};
  extracted.forEach(function (asource) {
    //asource
    /*[
        "/audio/en/us/us/en005736.mp3",
        "/audio/en/uk/general/en005736.mp3",
        "/audio/en/uk/rp/en005736.mp3",
        "/audio/en/uk/Yorkshire/en005736-55.mp3",
        "/audio/en/Irish/en005736.mp3",
        "/audio/en/scot/en005736.mp3",
        "/audio/en/Jamaica/en005736.mp3"
    ]*/
    var parts = asource.split("/");
    var variant = parts[parts.indexOf(lang) + 1].toLowerCase();
    if (!map[variant]) {
      map[variant] = {
        name: nameOfVariant(variant),
        url: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.addBaseToUrl)(wordReferencePrefix, asource)
      };
    }
  });
  return map;
}
var wr_define = function wr_define(from, word) {
  // Make the request
  return new Promise(function (resolve, reject) {
    if (!(from in definition)) {
      reject(new Error("Missing from lang in wr_define"));
      return;
    }
    var url2 = wordReferencePrefix + definition[from] + '/' + encodeURIComponent(word);
    if (!definition[from]) {
      reject(new Error("Cannot find definition from lang"));
      return;
    }
    $.ajax({
      method: 'GET',
      dataType: 'html',
      url: url2
    }).done(function (data) {
      var matches = data.match(/<script>var\s+audioFiles\s+=(.*?)\]/m);
      if (matches && matches.length == 2) {
        var found = matches[1].trim().replace(/'/g, '"');
        if (found.endsWith(",")) {
          found = found.substring(0, found.length - 1);
        }
        var audioList = JSON.parse(found + "]");
        var audioMap = parseAudioFiles(audioList, from);
        resolve(audioMap);
        return;
      }
      reject(new Error("Cannot find audioFiles in page " + url2));
    }).fail(function (err) {
      reject(new Error(err.statusText));
    });
  });
};
var WordReferencePlayer = /*#__PURE__*/function () {
  function WordReferencePlayer(elem) {
    _classCallCheck(this, WordReferencePlayer);
    this.elem = elem;
    elem.classList.add("sd-speak-enabled");
    this.init();
  }
  _createClass(WordReferencePlayer, [{
    key: "lazyLoad",
    value:
    //Show dropdown but do lazy wordreference loading
    function lazyLoad(mustPlay) {
      var _this$$dropdown,
        _this = this;
      if (this.audioElement != null) {
        return; //Already loaded
      }
      // Defer the search of sources until the first click
      //TODO if no region specified show dropdown with variants

      var $menu = (_this$$dropdown = this.$dropdown) === null || _this$$dropdown === void 0 ? void 0 : _this$$dropdown.find(".dropdown-menu");
      var lang = "en";
      wr_define(lang, this.elem.innerText).then(function (audioMap) {
        var variants = Object.keys(audioMap);
        if (variants.length > 0) {
          //Agafa la primera variant
          var theURL = audioMap[variants[0]];
          var url = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.addBaseToUrl)(wordReferencePrefix, theURL.url);
          _this.audioElement = new _urlPlayer__WEBPACK_IMPORTED_MODULE_1__["default"](undefined, url);
          if (variants.length > 1) {
            // Add a dropdown to change variant                      
            variants.forEach(function (variant) {
              var varDef = audioMap[variant];
              var $menuItem = $("<a class=\"dropdown-item\" data-variant=\"".concat(variant, "\" href=\"#\">").concat(varDef.name, "</a>"));
              $menuItem.on("click", function (evt) {
                evt.preventDefault();
                var variant2 = evt.target.dataset.variant || '';
                var varDef = audioMap[variant2];
                if (_this.audioElement) {
                  _this.audioElement.setSrc(varDef.url);
                  _this.audioElement.cancel();
                  _this.audioElement.play();
                }
              });
              $menu && $menu.append($menuItem);
            });
          } else {
            var _this$$dropdown2;
            // We can hide the dropdown
            (_this$$dropdown2 = _this.$dropdown) === null || _this$$dropdown2 === void 0 ? void 0 : _this$$dropdown2.hide();
          }
        } else {
          // Fallback on google
          console.warn("Fallback on GTTSPlayer US");
          _this.elem.setAttribute('href', '#speak_en-US');
          _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this.elem);
        }
        mustPlay && _this.audioElement.play();
      }, function (err) {
        var _this$$dropdown3;
        console.warn("Fallback on GTTSPlayer US. Err: ", err);
        // We can hide the dropdown
        (_this$$dropdown3 = _this.$dropdown) === null || _this$$dropdown3 === void 0 ? void 0 : _this$$dropdown3.hide();
        // Fallback on google
        _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this.elem);
        _this.elem.setAttribute('href', '#speak_en-US');
        _this.audioElement.play();
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;
      var id = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.genID)();
      // data-boundary="window" 
      this.$dropdown = $("\n        <div class=\"dropdown\" style=\"display:inline-block;\">\n          <button class=\"btn btn-secondary btn-sm\" style=\"margin:2px;padding:4px;height:15px;\" type=\"button\" id=\"dmb_".concat(id, "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n          <i class=\"fas fa fa-globe\" style=\"transform: translateY(-9px);font-size:90%;\"></i>\n          </button>\n          <div class=\"dropdown-menu\" aria-labelledby=\"dmb_").concat(id, "\"> \n          </div>\n        </div>"));
      this.$dropdown.insertAfter($(this.elem));
      this.$dropdown.find("button").on("click", function () {
        _this2.lazyLoad();
      });

      //Lazy load
      this.handler = function (evt) {
        evt.preventDefault(); // Evita que executi el link  
        if (_this2.audioElement != null) {
          _this2.play();
          // Ja ha estat iniciat
          return;
        }
        _this2.lazyLoad(true);
      };
      this.elem.addEventListener("click", this.handler);
    }
  }, {
    key: "play",
    value: function play() {
      this.audioElement && this.audioElement.play();
    }
  }, {
    key: "setSrc",
    value: function setSrc(src) {
      if (this.audioElement) {
        this.audioElement.src = src;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.audioElement && this.audioElement.pause();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$$dropdown4;
      this.pause();
      this.elem.classList.remove("sd-speak-enabled");
      if (this.handler) {
        this.elem.removeEventListener("click", this.handler);
        this.handler = null;
      }
      (_this$$dropdown4 = this.$dropdown) === null || _this$$dropdown4 === void 0 ? void 0 : _this$$dropdown4.find("button").off();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (!this.audioElement) {
        return;
      }
      this.audioElement.cancel();
    }
  }, {
    key: "isUtterance",
    value: function isUtterance() {
      return false;
    }
  }]);
  return WordReferencePlayer;
}();


/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(18), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sd-speak-enabled{position:relative;background:whitesmoke;text-decoration:none}@keyframes speakicon_anim{0%{opacity:0;left:-10px}100%{opacity:1;left:-5px}}.sd-speak-enabled:hover:after{content:\"\";padding:2px;border-radius:50%;width:14px;height:14px;position:absolute;background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");background-repeat:no-repeat;background-position:center;background-size:contain;left:-5px;top:-16px;z-index:1000;font-size:70%;margin:0 5px;font-weight:700;vertical-align:top;animation:speakicon_anim 1s ease}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 10:
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

/***/ 17:
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

/***/ 9:
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 106:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_speak_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(107);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_speak_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_speak_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_speak_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_speak_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ 2:
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

/***/ 4:
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

/***/ 6:
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

/***/ 5:
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

/***/ 3:
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

/***/ 7:
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

/***/ 18:
/***/ (function(module) {

module.exports = "data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 style=%27background:white%27 viewBox=%270 0 512 512%27%3E%3Cpath fill=%27%232a84f9%27 d=%27M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z%27/%3E%3C/svg%3E";

/***/ }),

/***/ 32:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EasySpeech; }
/* harmony export */ });
/**
 * @module EasySpeech
 * @typicalname EasySpeech
 */

/**
 * Cross browser Speech Synthesis with easy API.
 * This project was created, because it's always a struggle to get the synthesis
 * part of `Web Speech API` running on most major browsers.
 *
 * Setup is very straight forward (see example).
 *
 * @example
 * import EasySpeech from 'easy-speech'
 *
 * const example = async () => {
 *   await EasySpeech.init() // required
 *   await EasySpeech.speak({ 'Hello, world' })
 * }
 *
 * @see https://wicg.github.io/speech-api/#tts-section
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 * @type {Object}
 */
const EasySpeech = {};

/**
 * To support multiple environments (browser, node) we define scope, based
 * on what's available with window as priority, since Browsers are main target.
 * @private
 */
const scope = typeof globalThis === 'undefined' ? window : globalThis;

/**
 * @private
 * @type {{
 *  status: String,
    initialized: Boolean,
    speechSynthesis: null|SpeechSynthesis,
    speechSynthesisUtterance: null|SpeechSynthesisUtterance,
    speechSynthesisVoice: null|SpeechSynthesisVoice,
    speechSynthesisEvent: null|SpeechSynthesisEvent,
    speechSynthesisErrorEvent: null|SpeechSynthesisErrorEvent,
    voices: null|Array<SpeechSynthesisVoice>,
    maxLengthExceeded: string,
    defaults: {
      pitch: Number,
      rate: Number,
      volume: Number,
      voice: null|SpeechSynthesisVoice
    },
    handlers: {}
 * }}
 */
const internal = {
  status: 'created'
};

const patches = {};

/*******************************************************************************
 *
 * AVAILABLE WITHOUT INIT
 *
 ******************************************************************************/

/**
 * Enable module-internal debugging by passing your own callback function.
 * Debug will automatically pass through all updates to `status`
 *
 * @example
 * import EasySpeech from 'easy-speech'
 * import Log from '/path/to/my/Log'
 *
 * EasySpeech.debug(arg => Log.debug('EasySpeech:', arg))
 *
 * @param {Function} fn A function, which always receives one argument, that
 *  represents a current debug message
 */
EasySpeech.debug = fn => {
  debug = typeof fn === 'function' ? fn : () => {};
};

let debug = () => {};

/**
 * Detects all possible occurrences of the main Web Speech API components
 * in the global scope.
 *
 * The returning object will have the following structure (see example).
 *
 * @example
 * EasySpeech.detect()
 *
 * {
 *     speechSynthesis: SpeechSynthesis|undefined,
 *     speechSynthesisUtterance: SpeechSynthesisUtterance|undefined,
 *     speechSynthesisVoice: SpeechSynthesisVoice|undefined,
 *     speechSynthesisEvent: SpeechSynthesisEvent|undefined,
 *     speechSynthesisErrorEvent: SpeechSynthesisErrorEvent|undefined,
 *     onvoiceschanged: Boolean,
 *     onboundary: Boolean,
 *     onend: Boolean,
 *     onerror: Boolean,
 *     onmark: Boolean,
 *     onpause: Boolean,
 *     onresume: Boolean,
 *     onstart: Boolean
 * }
 *
 * @returns {object} An object containing all possible features and their status
 */
EasySpeech.detect = () => detectFeatures();

/** @private **/
const detectFeatures = () => {
  const features = {}
  ;[
    'speechSynthesis',
    'speechSynthesisUtterance',
    'speechSynthesisVoice',
    'speechSynthesisEvent',
    'speechSynthesisErrorEvent'
  ].forEach(feature => {
    features[feature] = detect(feature);
  });

  features.onvoiceschanged = hasProperty(features.speechSynthesis, 'onvoiceschanged');

  const hasUtterance = hasProperty(features.speechSynthesisUtterance, 'prototype');

  utteranceEvents.forEach(event => {
    const name = `on${event}`;
    features[name] = hasUtterance && hasProperty(features.speechSynthesisUtterance.prototype, name);
  });

  // not published to the outside
  patches.isAndroid = isAndroid();
  patches.isFirefox = isFirefox() || isKaiOS();
  patches.isSafari = isSafari();

  debug(`is android: ${!!patches.isAndroid}`);
  debug(`is firefox: ${!!patches.isFirefox}`);
  debug(`is safari: ${!!patches.isSafari}`);

  return features
};

/** @private **/
const hasProperty = (target = {}, prop) => Object.hasOwnProperty.call(target, prop) || prop in target || !!target[prop];

/** @private **/
const getUA = () => (scope.navigator || {}).userAgent || '';

/** @private **/
const isAndroid = () => /android/i.test(getUA());

/** @private **/
const isKaiOS = () => /kaios/i.test(getUA());

/** @private **/
const isFirefox = () => {
  // InstallTrigger will soon be deprecated
  if (typeof scope.InstallTrigger !== 'undefined') {
    return true
  }

  return /firefox/i.test(getUA())
};

/** @private **/
const isSafari = () => typeof scope.GestureEvent !== 'undefined';

/**
 * Common prefixes for browsers that tend to implement their custom names for
 * certain parts of their API.
 * @private
 **/
const prefixes = ['webKit', 'moz', 'ms', 'o'];

/**
 * Make the first character of a String uppercase
 * @private
 **/
const capital = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

/**
 * Find a feature in global scope by checking for various combinations and
 * variations of the base-name
 * @param {String} baseName name of the component to look for, must begin with
 *   lowercase char
 * @return {Object|undefined} The component from global scope, if found
 * @private
 **/
const detect = baseName => {
  const capitalBaseName = capital(baseName);
  const baseNameWithPrefixes = prefixes.map(p => `${p}${capitalBaseName}`);
  const found = [baseName, capitalBaseName]
    .concat(baseNameWithPrefixes)
    .find(inGlobalScope);

  return scope[found]
};

/**
 * Returns, if a given name exists in global scope
 * @private
 * @param name
 * @return {boolean}
 */
const inGlobalScope = name => scope[name];

/**
 * Returns a shallow copy of the current internal status. Depending of the
 * current state this might return an object with only a single field `status`
 * or a complete Object, including detected features, `defaults`, `handlers`
 * and supported `voices`.
 *
 * @example
 * import EasySpeech from 'easy-speech'
 *
 * // uninitialized
 * EasySpeech.status() // { status: 'created' }
 *
 * // after EasySpeech.init
 * EasySpeech.status()
 *
 * {
 *   status: 'init: complete',
 *   initialized: true,
 *   speechSynthesis: speechSynthesis,
 *   speechSynthesisUtterance: SpeechSynthesisUtterance,
 *   speechSynthesisVoice: SpeechSynthesisVoice,
 *   speechSynthesisEvent: SpeechSynthesisEvent,
 *   speechSynthesisErrorEvent: SpeechSynthesisErrorEvent,
 *   voices: [...],
 *   defaults: {
 *     pitch: 1,
 *     rate: 1,
 *     volume: 1,
 *     voice: null
 *   },
 *   handlers: {}
 * }
 *
 * @return {Object} the internal status
 */
EasySpeech.status = () => ({ ...internal });

/**
 * Returns a filtered subset of available voices by given
 * parameters. Multiple parameters can be used.
 * @param name {string=} a string that is expected to occur in the voices name; does not need to be the full name
 * @param voiceURI {string=} a string that is expected to occur in the voices voiceURI; does not need to be the full URI
 * @param language {string=} a language code to filter by .lang; short and long-form are accepted
 * @param localService {boolean=} use true/false to include/exclude local/remote voices
 * @return {SpeechSynthesisVoice[]} a list of voices, matching the given rules
 */
EasySpeech.filterVoices = ({ name, language, localService, voiceURI }) => {
  const voices = internal.voices || [];
  const hasName = typeof name !== 'undefined';
  const hasVoiceURI = typeof voiceURI !== 'undefined';
  const hasLocalService = typeof localService !== 'undefined';
  const hasLang = typeof language !== 'undefined';
  const langCode = hasLang && language.split(/[-_]+/g)[0].toLocaleLowerCase();

  return voices.filter(v => {
    if (
      (hasName && v.name.includes(name)) ||
      (hasVoiceURI && v.voiceURI.includes(voiceURI)) ||
      (hasLocalService && v.localService === localService)
    ) {
      return true
    }

    if (hasLang) {
      const compareLang = v.lang && v.lang.toLocaleLowerCase();
      return compareLang && (
        compareLang === langCode ||
        compareLang.indexOf(`${langCode}-`) > -1 ||
        compareLang.indexOf(`${langCode}_`) > -1
      )
    }
    return false
  })
};

/**
 * Updates the internal status
 * @private
 * @param {String} s the current status to set
 */
const status = s => {
  debug(s);
  internal.status = s;
};

/**
 * This is the function you need to run, before being able to speak.
 * It includes:
 * - feature detection
 * - feature assignment (into internal state)
 * - voices loading
 * - state update
 * - inform caller about success
 *
 * It will load voices by a variety of strategies:
 *
 * - detect and that SpeechSynthesis is basically supported, if not -> fail
 * - load voices directly
 * - if not loaded but `onvoiceschanged` is available: use `onvoiceschanged`
 * - if `onvoiceschanged` is not available: fallback to timeout
 * - if `onvoiceschanged` is fired but no voices available: fallback to timeout
 * - timeout reloads voices in a given `interval` until a `maxTimeout` is reached
 * - if voices are loaded until then -> complete
 * - if no voices found -> fail
 *
 * Note: if once initialized you can't re-init (will skip and resolve to
 * `false`) unless you run `EasySpeech.reset()`.
 *
 * @param maxTimeout {number}[5000] the maximum timeout to wait for voices in ms
 * @param interval {number}[250] the interval in ms to check for voices
 * @param quiet {boolean=} prevent rejection on errors, e.g. if no voices
 * @param maxLengthExceeded {string=} defines what to do, if max text length (4096 bytes) is exceeded:
 * - 'error' - throw an Error
 * - 'none' - do nothing; note that some voices may not speak the text at all without any error or warning
 * - 'warn' - default, raises a warning
 * @return {Promise<Boolean>}
 * @fulfil {Boolean} true, if initialized, false, if skipped (because already
 *   initialized)
 * @reject {Error} - The error `message` property will always begin with
 *   `EasySpeech: ` and contain one of the following:
 *
 *   - `browser misses features` - The browser will not be able to use speech
 *      synthesis at all as it misses crucial features
 *   - `browser has no voices (timeout)` - No voice could be loaded with neither
 *      of the given strategies; chances are high the browser does not have
 *      any voices embedded (example: Chromium on *buntu os')
 */

EasySpeech.init = function ({ maxTimeout = 5000, interval = 250, quiet, maxLengthExceeded } = {}) {
  return new Promise((resolve, reject) => {
    if (internal.initialized) { return resolve(false) }
    EasySpeech.reset();
    status('init: start');

    // there may be the case, that the browser needs to load using a timer
    // so we declare it at the top to make sure the interval is always cleared
    // when we exit the Promise via fail / complete
    let timer;
    let voicesChangedListener;
    let completeCalled = false;

    internal.maxLengthExceeded = maxLengthExceeded || 'warn';

    const fail = (errorMessage) => {
      status(`init: failed (${errorMessage})`);
      clearInterval(timer);
      internal.initialized = false;

      // we have the option to fail quiet here
      return quiet
        ? resolve(false)
        : reject(new Error(`EasySpeech: ${errorMessage}`))
    };

    const complete = () => {
      // avoid race-conditions between listeners and timeout
      if (completeCalled) { return }
      status('init: complete');

      // set flags immediately
      completeCalled = true;
      internal.initialized = true;

      // cleanup events and timer
      clearInterval(timer);
      speechSynthesis.onvoiceschanged = null;

      if (voicesChangedListener) {
        speechSynthesis.removeEventListener('voiceschanged', voicesChangedListener);
      }

      // all done
      return resolve(true)
    };

    // before initializing we force-detect all required browser features
    const features = detectFeatures();
    const hasAllFeatures = !!features.speechSynthesis && !!features.speechSynthesisUtterance;

    if (!hasAllFeatures) {
      return fail('browser misses features')
    }

    // assign all detected features to our internal definitions
    Object.keys(features).forEach(feature => {
      internal[feature] = features[feature];
    });

    // start initializing
    const { speechSynthesis } = internal;
    const voicesLoaded = () => {
      const voices = speechSynthesis.getVoices() || [];
      if (voices.length > 0) {
        internal.voices = voices;
        status(`voices loaded: ${voices.length}`);

        // if we find a default voice, set it as default
        internal.defaultVoice = voices.find(v => v.default);

        // otherwise let's stick to the first one we can find by locale
        if (!internal.defaultVoice) {
          const language = (scope.navigator || {}).language || '';
          const filtered = EasySpeech.filterVoices({ language });

          if (filtered.length > 0) {
            internal.defaultVoice = filtered[0];
          }
        }

        // otherwise let's use the first element in the array
        if (!internal.defaultVoice) {
          internal.defaultVoice = voices[0];
        }

        return true
      }
      return false
    };

    status('init: voices');

    // best case: detect if voices can be loaded directly
    if (voicesLoaded()) { return complete() }

    // last possible fallback method: run a timer until max. timeout and reload
    const loadViaTimeout = () => {
      status('init: voices (timer)');
      let timeout = 0;
      timer = setInterval(() => {
        if (voicesLoaded()) {
          return complete()
        }

        if (timeout > maxTimeout) {
          return fail('browser has no voices (timeout)')
        }

        timeout += interval;
      }, interval);
    };

    // detect if voices can be loaded after onveoiceschanged,
    // but only if the browser supports this event
    if (features.onvoiceschanged) {
      status('init: voices (onvoiceschanged)');

      speechSynthesis.onvoiceschanged = () => {
        if (voicesLoaded()) { return complete() }

        // xxx: some browsers (like chrome on android still have not all
        // voices loaded at this point, whichs is why we need to enter
        // the timeout-based method here.
        return loadViaTimeout()
      };

      // xxx: there is an edge-case where browser provide onvoiceschanged,
      // but they never load the voices, so init would never complete
      // in such case we need to fail after maxTimeout
      setTimeout(() => {
        if (voicesLoaded()) {
          return complete()
        }
        return fail('browser has no voices (timeout)')
      }, maxTimeout);
    } else {
      // this is a very problematic case, since we don't really know, whether
      // this event will fire at all, so we need to setup both a listener AND
      // run the timeout and make sure on of them "wins"
      // affected browsers may be: MacOS Safari
      if (hasProperty(speechSynthesis, 'addEventListener')) {
        status('init: voices (addEventListener)');

        voicesChangedListener = () => {
          if (voicesLoaded()) { return complete() }
        };

        speechSynthesis.addEventListener('voiceschanged', voicesChangedListener);
      }

      // for all browser not supporting onveoiceschanged we start a timer
      // until we reach a certain timeout and try to get the voices
      loadViaTimeout();
    }
  })
};

/**
 * Placed as first line in functions that require `EasySpeech.init` before they
 * can run.
 * @param {boolean=} force set to true to force-skip check
 * @private
 */
const ensureInit = ({ force } = {}) => {
  if (!force && !internal.initialized) {
    throw new Error('EasySpeech: not initialized. Run EasySpeech.init() first')
  }
};

/*******************************************************************************
 *
 * AVAILABLE ONLY AFTER INIT
 *
 ******************************************************************************/

/**
 * Returns all available voices.
 *
 * @condition `EasySpeech.init` must have been called and resolved to `true`
 * @return {Array<SpeechSynthesisVoice>}
 */
EasySpeech.voices = () => {
  ensureInit();
  return internal.voices
};

/**
 * Attaches global/default handlers to every utterance instance. The handlers
 * will run in parallel to any additional handlers, attached when calling
 * `EasySpeech.speak`
 *
 * @condition `EasySpeech.init` must have been called and resolved to `true`
 *
 * @param {Object} handlers
 * @param {function=} handlers.boundary - optional, event handler
 * @param {function=} handlers.end - optional, event handler
 * @param {function=} handlers.error - optional, event handler
 * @param {function=} handlers.mark - optional, event handler
 * @param {function=} handlers.pause - optional, event handler
 * @param {function=} handlers.resume - optional, event handler
 * @param {function=} handlers.start - optional, event handler
 *
 * @return {Object} a shallow copy of the Object, containing all global handlers
 */
EasySpeech.on = (handlers) => {
  ensureInit();

  utteranceEvents.forEach(name => {
    const handler = handlers[name];
    if (validate.handler(handler)) {
      internal.handlers[name] = handler;
    }
  });

  return { ...internal.handlers }
};

/**
 * We use these keys to search for these events in handler objects and defaults
 * @private
 */
const utteranceEvents = [
  'boundary',
  'end',
  'error',
  'mark',
  'pause',
  'resume',
  'start'
];

/**
 * Internal validation of passed parameters
 * @private
 */
const validate = {
  isNumber: n => typeof n === 'number' && !Number.isNaN(n),
  pitch: p => validate.isNumber(p) && p >= 0 && p <= 2,
  volume: v => validate.isNumber(v) && v >= 0 && v <= 1,
  rate: r => validate.isNumber(r) && r >= 0.1 && r <= 10,
  text: t => typeof t === 'string',
  handler: h => typeof h === 'function',
  // we prefer duck typing here, mostly because there are cases where
  // SpeechSynthesisVoice is not defined on global scope but is supported
  // when using getVoices().
  voice: v => v && v.lang && v.name && v.voiceURI
};

/**
 * Sets defaults for utterances. Invalid values will be ignored without error
 * or warning.
 *
 * @see https://wicg.github.io/speech-api/#utterance-attributes
 * @param {object=} options - Optional object containing values to set values
 * @param {object=} options.voice - Optional `SpeechSynthesisVoice` instance or
 *  `SpeechSynthesisVoice`-like Object
 * @param {number=} options.pitch - Optional pitch value >= 0 and <= 2
 * @param {number=} options.rate - Optional rate value >= 0.1 and <= 10
 * @param {number=} options.volume - Optional volume value >= 0 and <= 1
 *
 * @return {object} a shallow copy of the current defaults
 */
EasySpeech.defaults = (options) => {
  ensureInit();

  if (options) {
    internal.defaults = internal.defaults || {}

    ;['voice', 'pitch', 'rate', 'volume'].forEach(name => {
      const value = options[name];
      const isValid = validate[name];

      if (isValid(value)) {
        internal.defaults[name] = value;
      }
    });
  }

  return { ...internal.defaults }
};

/**
 * Determines the current voice and makes sure, there is always a voice returned
 * @private
 * @param voice
 * @return {*|SpeechSynthesisVoice|{}}
 */
const getCurrentVoice = voice => voice ||
  internal.defaults?.voice ||
  internal.defaultVoice ||
  internal.voices?.[0];

/**
 * Creates a new `SpeechSynthesisUtterance` instance
 * @private
 * @param text
 */
const createUtterance = text => {
  const UtteranceClass = internal.speechSynthesisUtterance;
  return new UtteranceClass(text)
};

/**
 * Speaks a voice by given parameters, constructs utterance by best possible
 * combinations of parameters and defaults.
 *
 * If the given utterance parameters are missing or invalid, defaults will be
 * used as fallback.
 *
 * @example
 * const voice = EasySpeech.voices()[10] // get a voice you like
 *
 * EasySpeech.speak({
 *   text: 'Hello, world',
 *   voice: voice,
 *   pitch: 1.2,  // a little bit higher
 *   rate: 1.7, // a little bit faster
 *   boundary: event => console.debug('word boundary reached', event.charIndex),
 *   error: e => notify(e)
 * })
 *
 * @param {object} options - required options
 * @param {string} text - required text to speak
 * @param {object=} voice - optional `SpeechSynthesisVoice` instance or
 *   structural similar object (if `SpeechSynthesisUtterance` is not supported)
 * @param {number=} options.pitch - Optional pitch value >= 0 and <= 2
 * @param {number=} options.rate - Optional rate value >= 0.1 and <= 10
 * @param {number=} options.volume - Optional volume value >= 0 and <= 1
 * @param {boolean=} options.force - Optional set to true to force speaking, no matter the internal state
 * @param {boolean=} options.infiniteResume - Optional, force or prevent internal resumeInfinity pattern
 * @param {boolean=} options.noStop - Optional, if true will not stop current voices
 * @param {object=} handlers - optional additional local handlers, can be
 *   directly added as top-level properties of the options
 * @param {function=} handlers.boundary - optional, event handler
 * @param {function=} handlers.end - optional, event handler
 * @param {function=} handlers.error - optional, event handler
 * @param {function=} handlers.mark - optional, event handler
 * @param {function=} handlers.pause - optional, event handler
 * @param {function=} handlers.resume - optional, event handler
 * @param {function=} handlers.start - optional, event handler
 *
 * @return {Promise<SpeechSynthesisEvent|SpeechSynthesisErrorEvent>}
 * @fulfill {SpeechSynthesisEvent} Resolves to the `end` event
 * @reject {SpeechSynthesisEvent} rejects using the `error` event
 */
EasySpeech.speak = ({ text, voice, pitch, rate, volume, force, infiniteResume, noStop, ...handlers }) => {
  ensureInit({ force });

  if (!validate.text(text)) {
    throw new Error('EasySpeech: at least some valid text is required to speak')
  }

  if ((new TextEncoder().encode(text)).length > 4096) {
    const message = 'EasySpeech: text exceeds max length of 4096 bytes, which will not work with some voices.';
    switch (internal.maxLengthExceeded) {
      case 'none':
        break
      case 'error':
        throw new Error(message)
      case 'warn':
      default:
        console.warn(message);
    }
  }

  const getValue = options => {
    const [name, value] = Object.entries(options)[0];

    if (validate[name](value)) {
      return value
    }

    return internal.defaults?.[name]
  };

  return new Promise((resolve, reject) => {
    status('init speak');

    const utterance = createUtterance(text);
    const currentVoice = getCurrentVoice(voice);

    // XXX: if we force-speak, we may not get a current voice!
    // This may occur when the browser won't load voices but
    // provides SpeechSynth and SpeechSynthUtterance.
    // We then might at least try to speak something with defaults
    if (currentVoice) {
      utterance.voice = currentVoice;
      utterance.lang = currentVoice.lang;
      utterance.voiceURI = currentVoice.voiceURI;
    }

    utterance.text = text;
    utterance.pitch = getValue({ pitch });
    utterance.rate = getValue({ rate });
    utterance.volume = getValue({ volume });

    const isMsNatural =
      utterance.voice &&
      utterance.voice.name &&
      utterance.voice.name
        .toLocaleLowerCase()
        .includes('(natural)');
    debugUtterance(utterance, { isMsNatural });

    utteranceEvents.forEach(name => {
      const fn = handlers[name];

      if (validate.handler(fn)) {
        utterance.addEventListener(name, fn);
      }

      if (internal.handlers?.[name]) {
        utterance.addEventListener(name, internal.handlers[name]);
      }
    });

    // always attached are start, end and error listeners

    // XXX: chrome won't play longer tts texts in one piece and stops after a few
    // words. We need to add an intervall here in order prevent this. See:
    // https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts
    //
    // XXX: this apparently works only on chrome desktop, while it breaks chrome
    // mobile (android), so we need to detect chrome desktop
    //
    // XXX: resumeInfinity breaks on firefox macOs so we need to avoid it there
    // as well. Since we don't need it in FF anyway, we can safely skip there
    //
    // XXX: resumeInfinity is also incompatible with older safari ios versions
    // so we skip it on safari, too.
    //
    // XXX: we can force-enable or force-disable infiniteResume via flag now and
    // use the deterministic approach if it's not a boolean value
    utterance.addEventListener('start', () => {
      patches.paused = false;
      patches.speaking = true;

      const defaultResumeInfinity = (
        !isMsNatural &&
        !patches.isFirefox &&
        !patches.isSafari &&
        patches.isAndroid !== true
      );
      const useResumeInfinity = typeof infiniteResume === 'boolean'
        ? infiniteResume
        : defaultResumeInfinity;

      if (useResumeInfinity) {
        resumeInfinity(utterance);
      }
    });

    utterance.addEventListener('end', endEvent => {
      status('speak complete');
      patches.paused = false;
      patches.speaking = false;
      clearTimeout(timeoutResumeInfinity);
      resolve(endEvent);
    });

    utterance.addEventListener('error', (errorEvent = {}) => {
      status(`speak failed: ${errorEvent.message}`);
      patches.paused = false;
      patches.speaking = false;
      clearTimeout(timeoutResumeInfinity);
      reject(errorEvent);
    });

    // make sure we have no mem-leak
    clearTimeout(timeoutResumeInfinity);

    // do not cancel currently playing voice, if noStop option is true explicitly.
    if (!(noStop === true)) {
      internal.speechSynthesis.cancel();
    }

    setTimeout(() => internal.speechSynthesis.speak(utterance), 10);
  })
};

/** @private **/
const debugUtterance = ({ voice, pitch, rate, volume }, { isMsNatural = false } = {}) => {
  debug(`utterance: voice=${voice?.name} volume=${volume} rate=${rate} pitch=${pitch} isMsNatural=${isMsNatural}`);
};

/**
 * Timer variable to clear interval
 * @private
 */
let timeoutResumeInfinity;

/**
 * Fixes long texts in some browsers
 * @private
 * @param target
 */
function resumeInfinity (target) {
  // prevent memory-leak in case utterance is deleted, while this is ongoing
  if (!target && timeoutResumeInfinity) {
    debug('force-clear timeout');
    return scope.clearTimeout(timeoutResumeInfinity)
  }

  // only execute on speaking utterances, otherwise paused
  // utterances will get resumed, thus breaking user experience
  // include internal patching, since some systems have problems with
  // pause/resume and updateing the internal state on speechSynthesis
  const { paused, speaking } = internal.speechSynthesis;
  const isSpeaking = speaking || patches.speaking;
  const isPaused = paused || patches.paused;
  debug(`resumeInfinity isSpeaking=${isSpeaking} isPaused=${isPaused}`);

  if (isSpeaking && !isPaused) {
    internal.speechSynthesis.pause();
    internal.speechSynthesis.resume();
  }
  timeoutResumeInfinity = scope.setTimeout(function () {
    resumeInfinity(target);
  }, 5000);
}

/**
 * Cancels the current speaking, if any running
 */
EasySpeech.cancel = () => {
  ensureInit();
  status('cancelling');
  internal.speechSynthesis.cancel();
  patches.paused = false;
  patches.speaking = false;
};

/**
 * Resumes to speak, if any paused
 */
EasySpeech.resume = () => {
  ensureInit();
  status('resuming');

  patches.paused = false;
  patches.speaking = true;
  internal.speechSynthesis.resume();
};

/**
 * Pauses the current speaking, if any running
 */
EasySpeech.pause = () => {
  ensureInit();
  status('pausing');

  // exec pause on Android causes speech to end but not to fire end-event
  // se we simply do it manually instead of pausing
  if (patches.isAndroid) {
    debug('patch pause on Android with cancel');
    return internal.speechSynthesis.cancel()
  }

  internal.speechSynthesis.pause();
  // in some cases, pause does not update the internal state,
  // so we need to update it manually using an own state
  patches.paused = true;
  patches.speaking = false;
};

/**
 * Resets the internal state to a default-uninitialized state
 */
EasySpeech.reset = () => {
  Object.assign(internal, {
    status: 'reset',
    initialized: false,
    speechSynthesis: null,
    speechSynthesisUtterance: null,
    speechSynthesisVoice: null,
    speechSynthesisEvent: null,
    speechSynthesisErrorEvent: null,
    voices: null,
    defaultVoice: null,
    defaults: {
      pitch: 1,
      rate: 1,
      volume: 1,
      voice: null
    },
    handlers: {}
  });
};




/***/ })

/******/ 	});
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
/* harmony import */ var easy_speech__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _speak_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(106);
/* harmony import */ var _speakComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





// Make sure that SpeechSyntesis is available and initialized from the very beginning
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var detection, enabled;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        detection = easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].detect();
        enabled = detection.speechSynthesis && detection.speechSynthesisUtterance;
        if (!enabled) {
          _context.next = 11;
          break;
        }
        _context.prev = 3;
        _context.next = 6;
        return easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].init({
          maxTimeout: 5000,
          interval: 250,
          quiet: true
        });
      case 6:
        _context.next = 11;
        break;
      case 8:
        _context.prev = 8;
        _context.t0 = _context["catch"](3);
        console.error(_context.t0);
      case 11:
        _loader__WEBPACK_IMPORTED_MODULE_2__["default"].bootstrap([_speakComponent__WEBPACK_IMPORTED_MODULE_3__["default"]]);
      case 12:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[3, 8]]);
}))();
}();
/******/ })()
;