/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 24:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; },
/* harmony export */   "parseUrlParams": function() { return /* binding */ parseUrlParams; }
/* harmony export */ });
/* unused harmony exports querySelectorProp, genID, createElement, addScript, addLinkSheet, pathJoin, addBaseToUrl, scopedEval, base64Encode, base64Decode */
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
      var _meta$query;
      IB.sd[meta.name] = IB.sd[meta.name] || {
        inst: {},
        _class: clazz,
        init: _init,
        dispose: null
      };
      var query = (_meta$query = meta.query) !== null && _meta$query !== void 0 ? _meta$query : "div[role=\"snptd_".concat(meta.name, "\"], div[data-snptd=\"").concat(meta.name, "\"]");
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

/***/ 44:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SmartTabMenu; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var SmartTabMenu = /*#__PURE__*/function () {
  function SmartTabMenu(parent, pi, forceDifferent, workingMode, seed) {
    _classCallCheck(this, SmartTabMenu);
    //Here the parent is the tabmenu
    this.pi = pi;
    this.forceDifferent = forceDifferent || [];
    this.workingMode = workingMode || 'urandom';
    this.seed = seed || 1;
    parent.style.border = 'none';
    this.theTabMenu = parent.querySelector("ul.nav.nav-tabs");
    this.theLinks = this.theTabMenu.querySelector("li");
    this.theContentOpts = parent.querySelectorAll("div.tab-content > div");
    this.numOpts = this.theContentOpts.length;
    if (this.numOpts === 0) {
      console.error("ERROR: SmartTabMenu, theContentOpts is Empty!");
      this.numOpts = 1; //Avoid NAN
    }
  }
  _createClass(SmartTabMenu, [{
    key: "showUser",
    value: function showUser(random, userId) {
      if (this.pi.isTeacher) {
        this.theTabMenu.style.display = 'none';
      } else {
        this.theTabMenu.remove();
      }

      // Check if the current user is forced to be different from another one
      //const userId = this.pi.userId;
      var found = -1;
      for (var i = 0, len = this.forceDifferent.length; i < len; i++) {
        var alist = this.forceDifferent[i];
        for (var j = 0, len2 = alist.length; j < len2; j++) {
          if (alist[j] == userId) {
            found = j;
            break;
          }
        }
        if (found >= 0) {
          break;
        }
      }
      var which = 0;
      if (this.workingMode === 'urandom' || this.workingMode === 'lrandom') {
        if (found >= 0) {
          // The option is set based on its position in the list
          which = found % this.numOpts;
        } else if (random != null) {
          // The option is set at random
          which = Math.floor(random() * this.numOpts);
        }
      } else if (this.workingMode.startsWith('fixed')) {
        if (this.workingMode.indexOf(":") > 0) {
          var val = this.workingMode.split(":")[1].trim();
          which = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.convertInt)(val, 0);
        }
      } else {
        console.error("ERROR: Unknown working mode ", this.workingMode, ", choosing first element");
      }
      for (var _i = 0, _len = this.theContentOpts.length; _i < _len; _i++) {
        var panel = this.theContentOpts[_i];
        var link = this.theLinks[_i];
        if (_i == which) {
          panel.classList.add('active');
          panel.style.display = '';
          if (link) {
            link.classList.add('active');
          }
        } else {
          panel.classList.remove('active');
          if (this.pi.isTeacher) {
            panel.style.display = 'none';
          } else {
            panel.remove();
          }
          if (link) {
            link.classList.remove('active');
          }
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.theTabMenu.style.display = '';
      var which = 0;
      for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
        var panel = this.theContentOpts[i];
        var link = this.theLinks[i];
        panel.style.display = '';
        if (i == which) {
          panel.classList.add('active');
          if (link) {
            link.style.display = '';
            link.classList.add('active');
          }
        } else {
          panel.classList.remove('active');
          if (link) {
            link.style.display = '';
            link.classList.remove('active');
          }
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.clear();
    }
  }]);
  return SmartTabMenu;
}();


/***/ }),

/***/ 42:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TaleaComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _smartTabMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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






/**
 * Converteix els menús de pestanyes div.iedib-tabmenu:not(.talea-skip) dins la pàgina com a
 * opcions de preguntes aleatòries.
 * Cal que els menús estiguin dins un contenidor div amb
 * role="snptd_talea"
 */
var TaleaComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.Component)({
  name: 'talea',
  author: 'Josep Mulet Pol',
  version: '2.2',
  use$: false
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(TaleaComponent, _BaseComponent);
  var _super = _createSuper(TaleaComponent);
  function TaleaComponent(parent) {
    var _this;
    _classCallCheck(this, TaleaComponent);
    _this = _super.call(this, parent);
    _defineProperty(_assertThisInitialized(_this), "seed", 1);
    _defineProperty(_assertThisInitialized(_this), "workingMode", "urandom");
    _defineProperty(_assertThisInitialized(_this), "smartMenus", []);
    _defineProperty(_assertThisInitialized(_this), "mapStudents", {});
    _this.pi = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getPageInfo)();
    // Print debug info
    if (_this.pi.isTeacher && parent.dataset.debug) {
      var debug = JSON.parse(parent.dataset.debug);
      //Overwrite debug
      var debugKeys = Object.keys(debug);
      for (var i = 0, len = debugKeys.length; i < len; i++) {
        var kk = debugKeys[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        _this.pi[kk] = debug[kk];
      }
      console.log(_this.pi);
      var newDiv = document.createElement("div");
      newDiv.innerHTML = '<p>DEBUG INFO::<br>  ' + JSON.stringify(_this.pi) + '</p>';
      parent.append(newDiv);
    }
    if (_this.pi.userId > 1) {
      try {
        (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.onJQueryReady)(function () {
          var payload = _objectSpread({}, _this.pi);
          payload.isTeacher = payload.isTeacher ? 1 : 0;
          $.ajax({
            method: "POST",
            url: "https://piworld.es/iedibapi/p1/users/create",
            data: payload,
            dataType: 'json'
          }).done(function (res) {
            console.log(res);
          });
        });
      } catch (ex) {
        console.error(ex);
      }
    }
    _this.parent = parent;
    return _this;
  }
  _createClass(TaleaComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";
      this.seed = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.convertInt)(ds.seed || "1", 1);
      var forceDifferent = JSON.parse(ds.different || "[]");
      this.workingMode = ds.mode || 'urandom'; //fixed: 0-n; urandom; lrandom

      //skip those tabmenus with class .talea-skip
      var componentparents = this.parent.querySelectorAll('div.iedib-tabmenu:not(.talea-skip)');
      this.smartMenus = [];
      for (var i = 0, len = componentparents.length; i < len; i++) {
        this.smartMenus.push(new _smartTabMenu__WEBPACK_IMPORTED_MODULE_3__["default"](componentparents[i], this.pi, forceDifferent, this.workingMode, this.seed));
      }
      var headerP = document.createElement("p");
      headerP.id = 'talea_name_' + this.parent.id;
      headerP.style.setProperty('font-weight', 'bold');
      this.parent.prepend(headerP);
      if (this.pi.isTeacher) {
        headerP.innerText = 'Sense filtre';
        var payload = _objectSpread({}, this.pi);
        payload.isTeacher = payload.isTeacher ? 1 : 0;
        this.setupTeacher();
        try {
          (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.onJQueryReady)(function () {
            $.ajax({
              method: "POST",
              url: "https://piworld.es/iedibapi/p1/users/list",
              data: payload,
              dataType: 'json'
            }).done(function (res) {
              var $dataList = $('#list_controls_userid_' + _this2.parent.id);
              // add options to dataList
              _this2.mapStudents = {};
              _this2.mapStudents[-1] = 'Sense filtre';
              for (var _i = 0, _len = res.length; _i < _len; _i++) {
                var user = res[_i];
                var idUser = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.convertInt)(user.userid, 0);
                _this2.mapStudents[idUser] = user.userfullname;
                $dataList.append($('<option value="' + user.userid + '">' + user.userfullname + '</option>'));
              }
            });
          });
        } catch (ex) {
          console.error(ex);
        }
      } else {
        headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???');
        this.showUser(this.pi.userId);
      }
    }
  }, {
    key: "showUser",
    value: function showUser(idUser) {
      if (this.pi.isTeacher) {
        var ele = document.querySelector('#talea_name_' + this.parent.id);
        if (ele && this.mapStudents && this.mapStudents[idUser]) {
          ele.innerHTML = 'Tasca de ' + this.mapStudents[idUser];
        } else if (ele) {
          ele.innerHTML = 'Tasca d\'usuari #' + idUser;
        }
      }
      var randomGen = null;
      if (this.workingMode === "urandom") {
        randomGen = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.pran)(idUser * this.seed);
      } else if (this.workingMode === "lrandom") {
        randomGen = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.pran)(this.seed);
      }
      this.smartMenus.forEach(function (sm) {
        return sm.showUser(randomGen, idUser);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.pi.isTeacher) {
        var ele = document.querySelector('#talea_name_' + this.parent.id);
        ele && (ele.innerHTML = 'Sense filtre');
      }
      this.smartMenus.forEach(function (sm) {
        return sm.clear();
      });
    }
  }, {
    key: "setupTeacher",
    value: function setupTeacher() {
      var _this3 = this;
      var controlsDiv = document.createElement('div');
      var pid = this.parent.id;
      controlsDiv.id = 'talea_controls_' + pid;
      this.parent.prepend(controlsDiv);

      // crea els controls
      var contentText = '<input type="text" class="form-control" placeholder="Nom o id de l\'estudiant..." list="list_controls_userid_' + pid + '" id="controls_userid_' + pid + '"><br>';
      contentText += '<datalist id="list_controls_userid_' + pid + '">';
      contentText += '<option value="-1">Sense filtre</option>';
      contentText += '</datalist>';
      controlsDiv.innerHTML = contentText;
      var elem = document.querySelector("#controls_userid_" + pid);
      if (elem) {
        this.controlsListener = function () {
          var current_userId = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.convertInt)(elem.value + "", -2);
          if (current_userId === -2) {
            return;
          }
          if (current_userId < 0) {
            // clear all 
            _this3.clear();
          } else {
            // refresh all instances with the new generator
            _this3.showUser(current_userId);
          }
        };
        elem.addEventListener('change', this.controlsListener);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.parent.dataset.active !== "1") {
        return;
      }
      this.clear();
      var pid = this.parent.id;
      var taleaNameElem = document.querySelector("#talea_name_" + pid);
      taleaNameElem && taleaNameElem.remove();
      if (this.controlsListener) {
        var controlsElemUser = document.querySelector('#controls_userid_' + pid);
        controlsElemUser && controlsElemUser.removeEventListener('change', this.controlsListener);
        this.controlsListener = undefined;
      }
      var controlsElem = document.querySelector('#talea_controls_' + pid);
      controlsElem && controlsElem.remove();
      this.parent.removeAttribute("data-active");
    }
  }]);
  return TaleaComponent;
}(_base__WEBPACK_IMPORTED_MODULE_4__.BaseComponent)) || _class);


/***/ }),

/***/ 43:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPageInfo": function() { return /* binding */ getPageInfo; },
/* harmony export */   "pran": function() { return /* binding */ pran; }
/* harmony export */ });
/* unused harmony exports shuffleArray, reflowLatex, sanitizeLaTeX, sum, items, zip, hasValue, copyPropsFromTo, isNumeric */
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);


/**
 * Returns a PageInfo object that is obtained by analyzing the Moodle's page
 * In this way, we can identity the user info, the course info, etc.
 * @returns 
 */
function getPageInfo() {
  if (!document.querySelector) {
    return {
      userId: 1,
      userFullname: '',
      courseId: 1,
      isTeacher: false,
      courseName: '',
      site: ''
    };
  }
  // Get current user information
  var userId = null;
  var userFullname = null;
  var dataUserId = document.querySelector('[data-userid]');
  if (dataUserId) {
    userId = dataUserId.getAttribute('data-userid');
  }
  var userText = document.getElementsByClassName("usertext");
  if (userText && userText.length) {
    userFullname = userText[0].innerText;
  } else {
    //Moodle4.1
    var logininfo = document.querySelector("div.logininfo > a");
    if (logininfo) {
      userFullname = logininfo.innerText;
    }
  }
  if (!userId) {
    //TODO:: check if the current user is guest
    userId = '1';
    userFullname = "Usuari convidat";
  }
  var isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null ? 1 : 0;
  if (!isTeacher) {
    //Moodle 4.1
    isTeacher = document.querySelector('form.editmode-switch-form') != null ? 1 : 0;
  }
  if (!isTeacher) {
    // Boost theme
    isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;
  }

  // Get information about the course
  var courseId = '';
  var courseName = '';
  var footer = document.querySelector(".homelink > a");
  if (footer != null) {
    courseName = footer.innerText;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var hrefVal = "?" + ((footer.getAttribute('href') || " ? ").split("?")[1] || "");
    courseId = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.parseUrlParams)(hrefVal).id;
  } else {
    //Moodle 4.1
    if (window.M && window.M.cfg) {
      courseId = window.M.cfg.courseId;
    }
    var nav = document.querySelector("#page-navbar ol > li:first-child > a");
    if (nav != null) {
      courseName = nav.innerText; //short name
    }
  }

  var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
  return {
    userId: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.convertInt)(userId, 1),
    userFullname: userFullname || 'test-user',
    isTeacher: isTeacher > 0,
    site: site,
    courseName: courseName || 'test-course',
    courseId: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.convertInt)(courseId, 1)
  };
}

/**
 * Algorithm called Fisher-Yates shuffle. 
 * The idea is to walk the array in the reverse order and swap each element with a random one before it:
 * @param array The array is modified in memory
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Seeded random number generator
// https://gist.github.com/blixt/f17b47c62508be59987b
function pran(seed) {
  seed = seed % 2147483647;
  var ranGen = function ranGen() {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  };
  ranGen();
  ranGen();
  ranGen();
  return ranGen;
}
function reflowLatex() {
  if (window.MathJax) {
    window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    window.MathJax.Hub && window.MathJax.Hub.Queue && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }
}
function sanitizeLaTeX(tex) {
  return tex.replace(/·/g, '*');
}
function sum(iter) {
  var total = 0;
  for (var i = 0, len = iter.length; i < len; i++) {
    total += iter[i];
  }
  return total;
}
function items(obj, cb) {
  if (Array.isArray(obj)) {
    for (var i = 0, len = obj.length; i < len; i++) {
      cb(i, obj[i]);
    }
  } else {
    var keys = Object.keys(obj);
    for (var _i = 0, _len = keys.length; _i < _len; _i++) {
      var _key = keys[_i];
      cb(_key, obj[_key]);
    }
  }
}
function zip(l1, l2) {
  var n = Math.min(l1.length, l2.length);
  var l = [];
  for (var i = 0; i < n; i++) {
    l.push([l1[i], l2[i]]);
  }
  return l;
}
function hasValue(dict, target) {
  var found = false;
  var keys = Object.keys(dict);
  var i = 0;
  while (!found && i < keys.length) {
    var k = keys[i];
    found = dict[k] == target;
    i++;
  }
  return found;
}
function copyPropsFromTo(source, target) {
  var props = Object.keys(source);
  for (var i = 0, len = props.length; i < len; i++) {
    var prop = props[i];
    target[prop] = source[prop];
  }
}
function isNumeric(str) {
  return (str || '').replace(/\s+/g, '').match(/^[+-]?[0-9]+\.?[0-9]*$/) != null;
}

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media print and (color){.pw-tasca-solucio,.pw-tasca-nprt{display:none !important}}", ""]);
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

/***/ 9:
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 109:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_talea_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(110);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_talea_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_talea_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_talea_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_talea_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _talea_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(109);
/* harmony import */ var _taleaComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);



_loader__WEBPACK_IMPORTED_MODULE_1__["default"].bootstrap([_taleaComponent__WEBPACK_IMPORTED_MODULE_2__["default"]]);
}();
/******/ })()
;