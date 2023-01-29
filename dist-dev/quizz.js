/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module) {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ (function(module) {

"use strict";


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
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
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
      //wait for requirejs
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitForRequire)(function () {
        //wait for jquery
        requirejs(['jquery'], function () {
          //wait for document ready
          $(function () {
            if (typeof window.ibComponentLoader === 'function') {
              window.ibComponentLoader();
            }
            _bootstrap(arrayDefs);
          });
        });
      }, 15);
    } else {
      _bootstrap(arrayDefs);
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; },
/* harmony export */   "waitForRequire": function() { return /* binding */ waitForRequire; }
/* harmony export */ });
/* unused harmony exports parseUrlParams, querySelectorProp, getPageInfo, pran, convertInt, pathJoin, addBaseToUrl */
function parseUrlParams(url) {
  var params = {};
  var parts = url.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || "true";
  }
  return params;
}
function querySelectorProp(query, prop, def) {
  var ele = document.querySelector(query);
  if (ele != null) {
    return ele.getAttribute(prop) || def || '';
  }
  return def || '';
}

// Identifies the user and role from page
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
    courseId = parseUrlParams(hrefVal).id;
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
    userId: convertInt(userId, 1),
    userFullname: userFullname || 'test-user',
    isTeacher: isTeacher > 0,
    site: site,
    courseName: courseName || 'test-course',
    courseId: convertInt(courseId, 1)
  };
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
function waitForRequire(cb, nattempt) {
  nattempt = nattempt || 0;
  if (window.require && typeof window.require === 'function') {
    cb();
    return;
  } else if (nattempt > 15) {
    console.error("ERROR: Cannot find requirejs");
    return;
  }
  window.setTimeout(function () {
    waitForRequire(cb, nattempt + 1);
  }, 500);
}
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
  return pathJoin(base, url);
}
function genID() {
  return "i" + Math.random().toString(32).substring(2);
}
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

// Algorithm called Fisher-Yates shuffle. 
// The idea is to walk the array in the reverse order and swap each element with a random one before it:
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* 23 */,
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* 25 */,
/* 26 */,
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
/* 42 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(43);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ib-quizz-right {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(67, 140, 67);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n}\n.ib-quizz-wrong {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(164, 60, 60);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n}\n.ib-quizz-error {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(114, 57, 90);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n} \n.ib-quizz-hint, .ib-quizz-feedback {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(163, 163, 163);\n    color: black;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n    cursor: pointer;\n} ", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n   * MathQuill v0.10.1, by Han, Jeanine, and Mary\n   * http://mathquill.com | maintainers@mathquill.com\n   *\n   * This Source Code Form is subject to the terms of the\n   * Mozilla Public License, v. 2.0. If a copy of the MPL\n   * was not distributed with this file, You can obtain\n   * one at http://mozilla.org/MPL/2.0/.\n   */\n@font-face {\n    font-family: Symbola;\n    src: url(https://piworld.es/iedib/mqwidgets2/fonts/Symbola.eot);\n    src: local(\"Symbola Regular\"), local(\"Symbola\"), url(https://piworld.es/iedib/mqwidgets2/fonts/Symbola.woff2) format(\"woff2\"), url(https://piworld.es/iedib/mqwidgets2/fonts/Symbola.woff) format(\"woff\"), url(https://piworld.es/iedib/mqwidgets2/fonts/Symbola.ttf) format(\"truetype\"), url(https://piworld.es/iedib/mqwidgets2/fonts/Symbola.svg#Symbola) format(\"svg\");\n}\n\n.mq-editable-field {\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-editable-field .mq-cursor {\n    border-left: 1px solid black;\n    margin-left: -1px;\n    position: relative;\n    z-index: 1;\n    padding: 0;\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-editable-field .mq-cursor.mq-blink {\n    visibility: hidden;\n}\n\n.mq-editable-field,\n.mq-math-mode .mq-editable-field {\n    border: 1px solid gray;\n}\n\n.mq-editable-field.mq-focused,\n.mq-math-mode .mq-editable-field.mq-focused {\n    -webkit-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;\n    -moz-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;\n    box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;\n    border-color: #709AC0;\n    border-radius: 1px;\n}\n\n.mq-math-mode .mq-editable-field {\n    margin: 1px;\n}\n\n.mq-editable-field .mq-latex-command-input {\n    color: inherit;\n    font-family: \"Courier New\", monospace;\n    border: 1px solid gray;\n    padding-right: 1px;\n    margin-right: 1px;\n    margin-left: 2px;\n}\n\n.mq-editable-field .mq-latex-command-input.mq-empty {\n    background: transparent;\n}\n\n.mq-editable-field .mq-latex-command-input.mq-hasCursor {\n    border-color: ActiveBorder;\n}\n\n.mq-editable-field.mq-empty:after,\n.mq-editable-field.mq-text-mode:after,\n.mq-math-mode .mq-empty:after {\n    visibility: hidden;\n    content: 'c';\n}\n\n.mq-editable-field .mq-cursor:only-child:after,\n.mq-editable-field .mq-textarea+.mq-cursor:last-child:after {\n    visibility: hidden;\n    content: 'c';\n}\n\n.mq-editable-field .mq-text-mode .mq-cursor:only-child:after {\n    content: '';\n}\n\n.mq-editable-field.mq-text-mode {\n    overflow-x: auto;\n    overflow-y: hidden;\n}\n\n.mq-root-block,\n.mq-math-mode .mq-root-block {\n    display: -moz-inline-box;\n    display: inline-block;\n    width: 100%;\n    padding: 2px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    white-space: nowrap;\n    overflow: hidden;\n    vertical-align: middle;\n}\n\n.mq-math-mode {\n    font-variant: normal;\n    font-weight: normal;\n    font-style: normal;\n    font-size: 115%;\n    line-height: 1;\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-math-mode .mq-non-leaf,\n.mq-math-mode .mq-scaled {\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-math-mode var,\n.mq-math-mode .mq-text-mode,\n.mq-math-mode .mq-nonSymbola {\n    font-family: \"Times New Roman\", Symbola, serif;\n    line-height: .9;\n}\n\n.mq-math-mode * {\n    font-size: inherit;\n    line-height: inherit;\n    margin: 0;\n    padding: 0;\n    border-color: black;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none;\n    box-sizing: border-box;\n}\n\n.mq-math-mode .mq-empty {\n    background: #ccc;\n}\n\n.mq-math-mode .mq-empty.mq-root-block {\n    background: transparent;\n}\n\n.mq-math-mode.mq-empty {\n    background: transparent;\n}\n\n.mq-math-mode .mq-text-mode {\n    display: inline-block;\n    white-space: pre;\n}\n\n.mq-math-mode .mq-text-mode.mq-hasCursor {\n    box-shadow: inset darkgray 0 .1em .2em;\n    padding: 0 .1em;\n    margin: 0 -0.1em;\n    min-width: 1ex;\n}\n\n.mq-math-mode .mq-font {\n    font: 1em \"Times New Roman\", Symbola, serif;\n}\n\n.mq-math-mode .mq-font * {\n    font-family: inherit;\n    font-style: inherit;\n}\n\n.mq-math-mode b,\n.mq-math-mode b.mq-font {\n    font-weight: bolder;\n}\n\n.mq-math-mode var,\n.mq-math-mode i,\n.mq-math-mode i.mq-font {\n    font-style: italic;\n}\n\n.mq-math-mode var.mq-f {\n    margin-right: 0.2em;\n    margin-left: 0.1em;\n}\n\n.mq-math-mode .mq-roman var.mq-f {\n    margin: 0;\n}\n\n.mq-math-mode big {\n    font-size: 200%;\n}\n\n.mq-math-mode .mq-int>big {\n    display: inline-block;\n    -webkit-transform: scaleX(0.7);\n    -moz-transform: scaleX(0.7);\n    -ms-transform: scaleX(0.7);\n    -o-transform: scaleX(0.7);\n    transform: scaleX(0.7);\n    vertical-align: -0.16em;\n}\n\n.mq-math-mode .mq-int>.mq-supsub {\n    font-size: 80%;\n    vertical-align: -1.1em;\n    padding-right: .2em;\n}\n\n.mq-math-mode .mq-int>.mq-supsub>.mq-sup>.mq-sup-inner {\n    vertical-align: 1.3em;\n}\n\n.mq-math-mode .mq-int>.mq-supsub>.mq-sub {\n    margin-left: -0.35em;\n}\n\n.mq-math-mode .mq-roman {\n    font-style: normal;\n}\n\n.mq-math-mode .mq-sans-serif {\n    font-family: sans-serif, Symbola, serif;\n}\n\n.mq-math-mode .mq-monospace {\n    font-family: monospace, Symbola, serif;\n}\n\n.mq-math-mode .mq-overline {\n    border-top: 1px solid black;\n    margin-top: 1px;\n}\n\n.mq-math-mode .mq-underline {\n    border-bottom: 1px solid black;\n    margin-bottom: 1px;\n}\n\n.mq-math-mode .mq-binary-operator {\n    padding: 0 0.2em;\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-math-mode .mq-supsub {\n    text-align: left;\n    font-size: 90%;\n    vertical-align: -0.5em;\n}\n\n.mq-math-mode .mq-supsub.mq-sup-only {\n    vertical-align: .5em;\n}\n\n.mq-math-mode .mq-supsub.mq-sup-only .mq-sup {\n    display: inline-block;\n    vertical-align: text-bottom;\n}\n\n.mq-math-mode .mq-supsub .mq-sup {\n    display: block;\n}\n\n.mq-math-mode .mq-supsub .mq-sub {\n    display: block;\n    float: left;\n}\n\n.mq-math-mode .mq-supsub .mq-binary-operator {\n    padding: 0 .1em;\n}\n\n.mq-math-mode .mq-supsub .mq-fraction {\n    font-size: 70%;\n}\n\n.mq-math-mode sup.mq-nthroot {\n    font-size: 80%;\n    vertical-align: 0.8em;\n    margin-right: -0.6em;\n    margin-left: .2em;\n    min-width: .5em;\n}\n\n.mq-math-mode .mq-paren {\n    padding: 0 .1em;\n    vertical-align: top;\n    -webkit-transform-origin: center .06em;\n    -moz-transform-origin: center .06em;\n    -ms-transform-origin: center .06em;\n    -o-transform-origin: center .06em;\n    transform-origin: center .06em;\n}\n\n.mq-math-mode .mq-paren.mq-ghost {\n    color: silver;\n}\n\n.mq-math-mode .mq-paren+span {\n    margin-top: .1em;\n    margin-bottom: .1em;\n}\n\n.mq-math-mode .mq-array {\n    vertical-align: middle;\n    text-align: center;\n}\n\n.mq-math-mode .mq-array>span {\n    display: block;\n}\n\n.mq-math-mode .mq-operator-name {\n    font-family: Symbola, \"Times New Roman\", serif;\n    line-height: .9;\n    font-style: normal;\n}\n\n.mq-math-mode var.mq-operator-name.mq-first {\n    padding-left: .2em;\n}\n\n.mq-math-mode var.mq-operator-name.mq-last,\n.mq-math-mode .mq-supsub.mq-after-operator-name {\n    padding-right: .2em;\n}\n\n.mq-math-mode .mq-fraction {\n    font-size: 90%;\n    text-align: center;\n    vertical-align: -0.4em;\n    padding: 0 .2em;\n}\n\n.mq-math-mode .mq-fraction,\n.mq-math-mode .mq-large-operator,\n.mq-math-mode x:-moz-any-link {\n    display: -moz-groupbox;\n}\n\n.mq-math-mode .mq-fraction,\n.mq-math-mode .mq-large-operator,\n.mq-math-mode x:-moz-any-link,\n.mq-math-mode x:default {\n    display: inline-block;\n}\n\n.mq-math-mode .mq-numerator,\n.mq-math-mode .mq-denominator,\n.mq-math-mode .mq-dot-recurring {\n    display: block;\n}\n\n.mq-math-mode .mq-numerator {\n    padding: 0 0.1em;\n}\n\n.mq-math-mode .mq-denominator {\n    border-top: 1px solid;\n    float: right;\n    width: 100%;\n    padding: 0.1em;\n}\n\n.mq-math-mode .mq-dot-recurring {\n    text-align: center;\n    height: 0.3em;\n}\n\n.mq-math-mode .mq-sqrt-prefix {\n    padding-top: 0;\n    position: relative;\n    top: 0.1em;\n    vertical-align: top;\n    -webkit-transform-origin: top;\n    -moz-transform-origin: top;\n    -ms-transform-origin: top;\n    -o-transform-origin: top;\n    transform-origin: top;\n}\n\n.mq-math-mode .mq-sqrt-stem {\n    border-top: 1px solid;\n    margin-top: 1px;\n    padding-left: .15em;\n    padding-right: .2em;\n    margin-right: .1em;\n    padding-top: 1px;\n}\n\n.mq-math-mode .mq-diacritic-above {\n    display: block;\n    text-align: center;\n    line-height: .4em;\n}\n\n.mq-math-mode .mq-diacritic-stem {\n    display: block;\n    text-align: center;\n}\n\n.mq-math-mode .mq-hat-prefix {\n    display: block;\n    text-align: center;\n    line-height: .95em;\n    margin-bottom: -0.7em;\n    transform: scaleX(1.5);\n    -moz-transform: scaleX(1.5);\n    -o-transform: scaleX(1.5);\n    -webkit-transform: scaleX(1.5);\n}\n\n.mq-math-mode .mq-hat-stem {\n    display: block;\n}\n\n.mq-math-mode .mq-large-operator {\n    vertical-align: -0.2em;\n    padding: .2em;\n    text-align: center;\n}\n\n.mq-math-mode .mq-large-operator .mq-from,\n.mq-math-mode .mq-large-operator big,\n.mq-math-mode .mq-large-operator .mq-to {\n    display: block;\n}\n\n.mq-math-mode .mq-large-operator .mq-from,\n.mq-math-mode .mq-large-operator .mq-to {\n    font-size: 80%;\n}\n\n.mq-math-mode .mq-large-operator .mq-from {\n    float: right;\n    /* take out of normal flow to manipulate baseline */\n    width: 100%;\n}\n\n.mq-math-mode,\n.mq-math-mode .mq-editable-field {\n    cursor: text;\n    font-family: Symbola, \"Times New Roman\", serif;\n}\n\n.mq-math-mode .mq-overarc {\n    border-top: 1px solid black;\n    -webkit-border-top-right-radius: 50% .3em;\n    -moz-border-radius-topright: 50% .3em;\n    border-top-right-radius: 50% .3em;\n    -webkit-border-top-left-radius: 50% .3em;\n    -moz-border-radius-topleft: 50% .3em;\n    border-top-left-radius: 50% .3em;\n    margin-top: 1px;\n    padding-top: 0.15em;\n}\n\n.mq-math-mode .mq-overarrow {\n    min-width: .5em;\n    border-top: 1px solid black;\n    margin-top: 1px;\n    padding-top: 0.2em;\n    text-align: center;\n}\n\n.mq-math-mode .mq-overarrow:before {\n    display: block;\n    position: relative;\n    top: -0.34em;\n    font-size: 0.5em;\n    line-height: 0em;\n    content: '\\27A4';\n    text-align: right;\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-left:before {\n    -moz-transform: scaleX(-1);\n    -o-transform: scaleX(-1);\n    -webkit-transform: scaleX(-1);\n    transform: scaleX(-1);\n    filter: FlipH;\n    -ms-filter: \"FlipH\";\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-both {\n    vertical-align: text-bottom;\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-both.mq-empty {\n    min-height: 1.23em;\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-both.mq-empty:after {\n    top: -0.34em;\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-both:before {\n    -moz-transform: scaleX(-1);\n    -o-transform: scaleX(-1);\n    -webkit-transform: scaleX(-1);\n    transform: scaleX(-1);\n    filter: FlipH;\n    -ms-filter: \"FlipH\";\n}\n\n.mq-math-mode .mq-overarrow.mq-arrow-both:after {\n    display: block;\n    position: relative;\n    top: -2.3em;\n    font-size: 0.5em;\n    line-height: 0em;\n    content: '\\27A4';\n    visibility: visible;\n    text-align: right;\n}\n\n.mq-math-mode .mq-matrix {\n    vertical-align: middle;\n    margin-left: 0.1em;\n    margin-right: 0.1em;\n}\n\n.mq-math-mode .mq-matrix table {\n    width: auto;\n    border-bottom: none;\n    border-spacing: 3px;\n    border-collapse: separate;\n}\n\n.mq-math-mode .mq-matrix table.mq-rows-1 {\n    /* better alignment when there's just one row */\n    vertical-align: middle;\n    margin-bottom: 1px;\n}\n\n.mq-math-mode .mq-matrix td {\n    border: none;\n    width: auto;\n    /* defensive resets */\n    padding: 0.1em 0.3em;\n    vertical-align: baseline;\n}\n\n.mq-math-mode .mq-selection,\n.mq-editable-field .mq-selection,\n.mq-math-mode .mq-selection .mq-non-leaf,\n.mq-editable-field .mq-selection .mq-non-leaf,\n.mq-math-mode .mq-selection .mq-scaled,\n.mq-editable-field .mq-selection .mq-scaled {\n    background: #B4D5FE !important;\n    background: Highlight !important;\n    color: HighlightText;\n    border-color: HighlightText;\n}\n\n.mq-math-mode .mq-selection .mq-matrixed,\n.mq-editable-field .mq-selection .mq-matrixed {\n    background: #39F !important;\n}\n\n.mq-math-mode .mq-selection .mq-matrixed-container,\n.mq-editable-field .mq-selection .mq-matrixed-container {\n    filter: progid:DXImageTransform.Microsoft.Chroma(color='#3399FF') !important;\n}\n\n.mq-math-mode .mq-selection.mq-blur,\n.mq-editable-field .mq-selection.mq-blur,\n.mq-math-mode .mq-selection.mq-blur .mq-non-leaf,\n.mq-editable-field .mq-selection.mq-blur .mq-non-leaf,\n.mq-math-mode .mq-selection.mq-blur .mq-scaled,\n.mq-editable-field .mq-selection.mq-blur .mq-scaled,\n.mq-math-mode .mq-selection.mq-blur .mq-matrixed,\n.mq-editable-field .mq-selection.mq-blur .mq-matrixed {\n    background: #D4D4D4 !important;\n    color: black;\n    border-color: black;\n}\n\n.mq-math-mode .mq-selection.mq-blur .mq-matrixed-container,\n.mq-editable-field .mq-selection.mq-blur .mq-matrixed-container {\n    filter: progid:DXImageTransform.Microsoft.Chroma(color='#D4D4D4') !important;\n}\n\n.mq-editable-field .mq-textarea,\n.mq-math-mode .mq-textarea {\n    position: relative;\n    -webkit-user-select: text;\n    -moz-user-select: text;\n    user-select: text;\n}\n\n.mq-editable-field .mq-textarea *,\n.mq-math-mode .mq-textarea *,\n.mq-editable-field .mq-selectable,\n.mq-math-mode .mq-selectable {\n    -webkit-user-select: text;\n    -moz-user-select: text;\n    user-select: text;\n    position: absolute;\n    clip: rect(1em 1em 1em 1em);\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0);\n    resize: none;\n    width: 1px;\n    height: 1px;\n    box-sizing: content-box;\n}\n\n.mq-math-mode .mq-matrixed {\n    background: white;\n    display: -moz-inline-box;\n    display: inline-block;\n}\n\n.mq-math-mode .mq-matrixed-container {\n    filter: progid:DXImageTransform.Microsoft.Chroma(color='white');\n    margin-top: -0.1em;\n}\n\n/* Josep fixes */\n\ntable.mq-non-leaf td[mathquill-block-id] {\n    padding: 4px 8px;\n    text-align: center;\n}\n\n.mq-math-mode sup.mq-nthroot {\n    font-size: 75%;\n    vertical-align: 0.4em;\n}\n\n.mq-root-block {\n    padding: 5px;\n}\n\n.mq-root-block,\n.mq-math-mode .mq-root-block {\n    padding: 5px;\n}\n\n/*\n  .mq-math-mode .mq-supsub.mq-sup-only {\n    vertical-align: .5em!important;\n  }\n  */\n.mq-math-mode .mq-supsub.mq-sup-only>.mq-sup {\n    font-size: 90%;\n}\n\n.mq-nthroot.mq-non-leaf {\n    padding: 8px 0 !important;\n}\n\n\n/*larger editor on pygen*/\n/*TODO: must be reduced to standard in cloze*/\ndiv[data-pygen] span.mq-editable-field {\n    min-width: 250px;\n}\n\ndiv[data-pygen] .pygen-cloze span.mq-editable-field {\n    min-width: initial;\n}\n\ndiv[data-pygen] .pw-me-editorinput {\n    margin-bottom: 40px;\n}\n\n/* Power in palette */\ndiv.pw-me-tabmenu .mq-supsub.mq-non-leaf.mq-sup-only {\n    vertical-align: super !important;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 46 */
/***/ (function() {

/**
 * MathQuill v0.10.1, by Han, Jeanine, and Mary
 * http://mathquill.com | maintainers@mathquill.com
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 */
window.ibComponentLoader = function(){function t(){}function e(t){var e=t.length-1;return function(){var n=g.call(arguments,0,e),i=g.call(arguments,e);return t.apply(this,n.concat([i]))}}function n(t){return e(function(e,n){"function"!=typeof e&&(e=b(e));var i=function(t){return e.apply(t,[t].concat(n))};return t.call(this,i)})}function i(t){var e=g.call(arguments,1);return function(){return t.apply(this,e)}}function s(t,e){if(!e)throw new Error("prayer failed: "+t)}function r(t){s("a direction was passed",t===w||t===q)}function o(t,e,n){s("a parent is always present",t),s("leftward is properly set up",function(){return e?e[q]===n&&e.parent===t:t.ends[w]===n}()),s("rightward is properly set up",function(){return n?n[w]===e&&n.parent===t:t.ends[q]===e}())}function a(){window.console&&console.warn('You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. Easiest fix is to do the following before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide')}function l(t){return a(),zt(t)}function c(e){function n(t){var e,n;return t&&t.nodeType?(e=x(t).children(".mq-root-block").attr(Ft),n=e&&O.byId[e].controller,n?s[n.KIND_OF_MQ](n):null):null}function i(t,e){var n,i,r;e&&e.handlers&&(e.handlers={fns:e.handlers,APIClasses:s});for(n in e)e.hasOwnProperty(n)&&(i=e[n],r=E[n],t[n]=r?r(i):i)}var s,r,o;if(!(R<=e&&e<=z))throw"Only interface versions between "+R+" and "+z+" supported. You specified: "+e;s={},n.L=w,n.R=q,n.saneKeyboardEvents=M,n.config=function(t){return i(D.p,t),this},n.registerEmbed=function(t,e){if(!/^[a-z][a-z0-9]*$/i.test(t))throw"Embed name must start with letter and be only letters and digits";A[t]=e},r=s.AbstractMathQuill=v(L,function(t){t.init=function(t){this.__controller=t,this.__options=t.options,this.id=t.id,this.data=t.data},t.__mathquillify=function(t){var e,n=this.__controller,i=n.root,s=n.container;n.createTextarea(),e=s.addClass(t).contents().detach(),i.jQ=x('<span class="mq-root-block"/>').attr(Ft,i.id).appendTo(s),this.latex(e.text()),this.revert=function(){return s.empty().unbind(".mathquill").removeClass("mq-editable-field mq-math-mode mq-text-mode").append(e)}},t.config=function(t){return i(this.__options,t),this},t.el=function(){return this.__controller.container[0]},t.text=function(){return this.__controller.exportText()},t.latex=function(t){return arguments.length>0?(this.__controller.renderLatexMath(t),this.__controller.blurred&&this.__controller.cursor.hide().parent.blur(),this):this.__controller.exportLatex()},t.html=function(){return this.__controller.root.jQ.html().replace(/ mathquill-(?:command|block)-id="?\d+"?/g,"").replace(/<span class="?mq-cursor( mq-blink)?"?>.?<\/span>/i,"").replace(/ mq-hasCursor|mq-hasCursor ?/,"").replace(/ class=(""|(?= |>))/g,"")},t.reflow=function(){return this.__controller.root.postOrder("reflow"),this}}),n.prototype=r.prototype,s.EditableField=v(r,function(e,n){e.__mathquillify=function(){return n.__mathquillify.apply(this,arguments),this.__controller.editable=!0,this.__controller.delegateMouseEvents(),this.__controller.editablesTextareaEvents(),this},e.focus=function(){return this.__controller.textarea.focus(),this},e.blur=function(){return this.__controller.textarea.blur(),this},e.write=function(t){return this.__controller.writeLatex(t),this.__controller.scrollHoriz(),this.__controller.blurred&&this.__controller.cursor.hide().parent.blur(),this},e.empty=function(){var t=this.__controller.root,e=this.__controller.cursor;return t.eachChild("postOrder","dispose"),t.ends[w]=t.ends[q]=0,t.jQ.empty(),delete e.selection,e.insAtRightEnd(t),this},e.cmd=function(t){var e,n=this.__controller.notify(),i=n.cursor;return/^\\[a-z]+$/i.test(t)?(t=t.slice(1),(e=j[t]||bt[t])&&(t=e(t),i.selection&&t.replaces(i.replaceSelection()),t.createLeftOf(i.show()),this.__controller.scrollHoriz())):i.parent.write(i,t),n.blurred&&i.hide().parent.blur(),this},e.select=function(){var t=this.__controller;for(t.notify("move").cursor.insAtRightEnd(t.root);t.cursor[w];)t.selectLeft();return this},e.clearSelection=function(){return this.__controller.cursor.clearSelection(),this},e.moveToDirEnd=function(t){return this.__controller.notify("move").cursor.insAtDirEnd(t,this.__controller.root),this},e.moveToLeftEnd=function(){return this.moveToDirEnd(w)},e.moveToRightEnd=function(){return this.moveToDirEnd(q)},e.keystroke=function(e){var n;for(e=e.replace(/^\s+|\s+$/g,"").split(/\s+/),n=0;n<e.length;n+=1)this.__controller.keystroke(e[n],{preventDefault:t});return this},e.typedText=function(t){for(var e=0;e<t.length;e+=1)this.__controller.typedText(t.charAt(e));return this},e.dropEmbedded=function(t,e,n){var i,s=t-x(window).scrollLeft(),r=e-x(window).scrollTop(),o=document.elementFromPoint(s,r);this.__controller.seek(x(o),t,e),i=gt().setOptions(n),i.createLeftOf(this.__controller.cursor)},e.clickAt=function(t,e,n){n=n||document.elementFromPoint(t,e);var i=this.__controller,s=i.root;return Mt.contains(s.jQ[0],n)||(n=s.jQ[0]),i.seek(x(n),t+pageXOffset,e+pageYOffset),i.blurred&&this.focus(),this},e.ignoreNextMousedown=function(t){return this.__controller.cursor.options.ignoreNextMousedown=t,this}}),n.EditableField=function(){throw"wtf don't call me, I'm 'abstract'"},n.EditableField.prototype=s.EditableField.prototype;for(o in _)!function(t,i){var r=s[t]=i(s);n[t]=function(i,s){var o,a=n(i);return a instanceof r||!i||!i.nodeType?a:(o=S(r.RootBlock(),x(i),D()),o.KIND_OF_MQ=t,r(o).__mathquillify(s,e))},n[t].prototype=r.prototype}(o,_[o]);return n}function h(t){var e,n="moveOutOf deleteOutOf selectOutOf upOutOf downOutOf".split(" ");for(e=0;e<n.length;e+=1)!function(e){t[e]=function(t){this.controller.handle(e,t)}}(n[e]);t.reflow=function(){this.controller.handle("reflow"),this.controller.handle("edited"),this.controller.handle("edit")}}function u(t,e,n){return v(G,{ctrlSeq:t,htmlTemplate:"<"+e+" "+n+">&0</"+e+">"})}function f(t){var e=this.parent,n=t;do{if(n[q])return t.insLeftOf(e);n=n.parent.parent}while(n!==e);t.insRightOf(e)}function p(t,e){t.jQadd=function(){e.jQadd.apply(this,arguments),this.delimjQs=this.jQ.children(":first").add(this.jQ.children(":last")),this.contentjQ=this.jQ.children(":eq(1)")},t.reflow=function(){var t=this.contentjQ.outerHeight()/parseFloat(this.contentjQ.css("fontSize"));Z(this.delimjQs,$t(1+.2*(t-1),1.2),1.2*t)}}function d(t,e){var e=e||t,n=dt[t],s=dt[e];Q[t]=i(pt,w,t,n,e,s),Q[n]=i(pt,q,t,n,e,s)}var m,g,b,v,w,q,x,y,O,k,j,Q,T,C,S,_,D,E,L,A,R,z,I,M,B,F,$,P,N,W,U,V,H,G,K,Y,X,Z,J,tt,et,nt,it,st,rt,ot,at,lt,ct,ht,ut,ft,pt,dt,mt,gt,bt,vt,wt,qt,xt,yt,Ot,kt,jt,Qt,Tt,Ct,St,_t,Dt,Et,Lt,At,Rt,zt,It,Mt=window.jQuery,Bt="mathquill-command-id",Ft="mathquill-block-id",$t=Math.min,Pt=Math.max;if(!Mt)throw"MathQuill requires jQuery 1.5.2+ to be loaded first";g=[].slice,b=e(function(t,n){return e(function(e,i){if(t in e)return e[t].apply(e,n.concat(i))})}),v=function(t,e,n){function i(t){return"object"==typeof t}function s(t){return"function"==typeof t}function r(){}return function t(n,o){function a(){var t=new l;return s(t.init)&&t.init.apply(t,arguments),t}function l(){}var c,h,u;return void 0===o&&(o=n,n=Object),a.Bare=l,c=r.prototype=n.prototype,h=l.prototype=a.prototype=a.p=new r,h.constructor=a,a.extend=function(e){return t(a,e)},(a.open=function(t){if(u={},s(t)?u=t.call(a,h,c,a,n):i(t)&&(u=t),i(u))for(var r in u)e.call(u,r)&&(h[r]=u[r]);return s(h.init)||(h.init=n),a})(o)}}(0,{}.hasOwnProperty),w=-1,q=1,x=v(Mt,function(t){t.insDirOf=function(t,e){return t===w?this.insertBefore(e.first()):this.insertAfter(e.last())},t.insAtDirEnd=function(t,e){return t===w?this.prependTo(e):this.appendTo(e)}}),y=v(function(t){t.parent=0,t[w]=0,t[q]=0,t.init=function(t,e,n){this.parent=t,this[w]=e,this[q]=n},this.copy=function(t){return y(t.parent,t[w],t[q])}}),O=v(function(t){function e(){return i+=1}t[w]=0,t[q]=0,t.parent=0;var i=0;this.byId={},t.init=function(){this.id=e(),O.byId[this.id]=this,this.ends={},this.ends[w]=0,this.ends[q]=0},t.dispose=function(){delete O.byId[this.id]},t.toString=function(){return"{{ MathQuill Node #"+this.id+" }}"},t.jQ=x(),t.jQadd=function(t){return this.jQ=this.jQ.add(t)},t.jQize=function(t){function e(t){var n,i;for(t.getAttribute&&(n=t.getAttribute("mathquill-command-id"),i=t.getAttribute("mathquill-block-id"),n&&O.byId[n].jQadd(t),i&&O.byId[i].jQadd(t)),t=t.firstChild;t;t=t.nextSibling)e(t)}var n;for(t=x(t||this.html()),n=0;n<t.length;n+=1)e(t[n]);return t},t.createDir=function(t,e){r(t);var n=this;return n.jQize(),n.jQ.insDirOf(t,e.jQ),e[t]=n.adopt(e.parent,e[w],e[q]),n},t.createLeftOf=function(t){return this.createDir(w,t)},t.selectChildren=function(t,e){return C(t,e)},t.bubble=n(function(t){var e;for(e=this;e&&!1!==t(e);e=e.parent);return this}),t.postOrder=n(function(t){return function e(n){n.eachChild(e),t(n)}(this),this}),t.isEmpty=function(){return 0===this.ends[w]&&0===this.ends[q]},t.isStyleBlock=function(){return!1},t.children=function(){return k(this.ends[w],this.ends[q])},t.eachChild=function(){var t=this.children();return t.each.apply(t,arguments),this},t.foldChildren=function(t,e){return this.children().fold(t,e)},t.withDirAdopt=function(t,e,n,i){return k(this,this).withDirAdopt(t,e,n,i),this},t.adopt=function(t,e,n){return k(this,this).adopt(t,e,n),this},t.disown=function(){return k(this,this).disown(),this},t.remove=function(){return this.jQ.remove(),this.postOrder("dispose"),this.disown()}}),k=v(function(t){t.init=function(t,e,n){if(n===m&&(n=w),r(n),s("no half-empty fragments",!t==!e),this.ends={},t){s("withDir is passed to Fragment",t instanceof O),s("oppDir is passed to Fragment",e instanceof O),s("withDir and oppDir have the same parent",t.parent===e.parent),this.ends[n]=t,this.ends[-n]=e;var i=this.fold([],function(t,e){return t.push.apply(t,e.jQ.get()),t});this.jQ=this.jQ.add(i)}},t.jQ=x(),t.withDirAdopt=function(t,e,n,i){return t===w?this.adopt(e,n,i):this.adopt(e,i,n)},t.adopt=function(t,e,n){var i,s,r;return o(t,e,n),i=this,i.disowned=!1,(s=i.ends[w])?(r=i.ends[q],e||(t.ends[w]=s),n?n[w]=r:t.ends[q]=r,i.ends[q][q]=n,i.each(function(n){n[w]=e,n.parent=t,e&&(e[q]=n),e=n}),i):this},t.disown=function(){var t,e,n=this,i=n.ends[w];return!i||n.disowned?n:(n.disowned=!0,t=n.ends[q],e=i.parent,o(e,i[w],i),o(e,t,t[q]),i[w]?i[w][q]=t[q]:e.ends[w]=t[q],t[q]?t[q][w]=i[w]:e.ends[q]=i[w],n)},t.remove=function(){return this.jQ.remove(),this.each("postOrder","dispose"),this.disown()},t.each=n(function(t){var e=this,n=e.ends[w];if(!n)return e;for(;n!==e.ends[q][q]&&!1!==t(n);n=n[q]);return e}),t.fold=function(t,e){return this.each(function(n){t=e.call(this,t,n)}),t}}),j={},Q={},T=v(y,function(t){t.init=function(t,e){this.parent=t,this.options=e;var n=this.jQ=this._jQ=x('<span class="mq-cursor">&#8203;</span>');this.blink=function(){n.toggleClass("mq-blink")},this.upDownCache={}},t.show=function(){return this.jQ=this._jQ.removeClass("mq-blink"),"intervalId"in this?clearInterval(this.intervalId):(this[q]?this.selection&&this.selection.ends[w][w]===this[w]?this.jQ.insertBefore(this.selection.jQ):this.jQ.insertBefore(this[q].jQ.first()):this.jQ.appendTo(this.parent.jQ),this.parent.focus()),this.intervalId=setInterval(this.blink,500),this},t.hide=function(){return"intervalId"in this&&clearInterval(this.intervalId),delete this.intervalId,this.jQ.detach(),this.jQ=x(),this},t.withDirInsertAt=function(t,e,n,i){var s=this.parent;this.parent=e,this[t]=n,this[-t]=i,s!==e&&s.blur&&s.blur(this)},t.insDirOf=function(t,e){return r(t),this.jQ.insDirOf(t,e.jQ),this.withDirInsertAt(t,e.parent,e[t],e),this.parent.jQ.addClass("mq-hasCursor"),this},t.insLeftOf=function(t){return this.insDirOf(w,t)},t.insRightOf=function(t){return this.insDirOf(q,t)},t.insAtDirEnd=function(t,e){return r(t),this.jQ.insAtDirEnd(t,e.jQ),this.withDirInsertAt(t,e,0,e.ends[t]),e.focus(),this},t.insAtLeftEnd=function(t){return this.insAtDirEnd(w,t)},t.insAtRightEnd=function(t){return this.insAtDirEnd(q,t)},t.jumpUpDown=function(t,e){var n,i,s=this;s.upDownCache[t.id]=y.copy(s),n=s.upDownCache[e.id],n?n[q]?s.insLeftOf(n[q]):s.insAtRightEnd(n.parent):(i=s.offset().left,e.seek(i,s))},t.offset=function(){var t=this,e=t.jQ.removeClass("mq-cursor").offset();return t.jQ.addClass("mq-cursor"),e},t.unwrapGramp=function(){var t=this.parent.parent,e=t.parent,n=t[q],i=this,s=t[w];if(t.disown().eachChild(function(i){i.isEmpty()||(i.children().adopt(e,s,n).each(function(e){e.jQ.insertBefore(t.jQ.first())}),s=i.ends[q])}),!this[q])if(this[w])this[q]=this[w][q];else for(;!this[q];){if(this.parent=this.parent[q],!this.parent){this[q]=t[q],this.parent=e;break}this[q]=this.parent.ends[w]}this[q]?this.insLeftOf(this[q]):this.insAtRightEnd(e),t.jQ.remove(),t[w].siblingDeleted&&t[w].siblingDeleted(i.options,q),t[q].siblingDeleted&&t[q].siblingDeleted(i.options,w)},t.startSelection=function(){var t,e=this.anticursor=y.copy(this),n=e.ancestors={};for(t=e;t.parent;t=t.parent)n[t.parent.id]=t},t.endSelection=function(){delete this.anticursor},t.select=function(){var t,e,n,i,r,o,a,l=this.anticursor;if(this[w]===l[w]&&this.parent===l.parent)return!1;for(t=this;t.parent;t=t.parent)if(t.parent.id in l.ancestors){e=t.parent;break}if(s("cursor and anticursor in the same tree",e),n=l.ancestors[e.id],o=q,t[w]!==n)for(a=t;a;a=a[q])if(a[q]===n[q]){o=w,i=t,r=n;break}return o===q&&(i=n,r=t),i instanceof y&&(i=i[q]),r instanceof y&&(r=r[w]),this.hide().selection=e.selectChildren(i,r),this.insDirOf(o,this.selection.ends[o]),this.selectionChanged(),!0},t.clearSelection=function(){return this.selection&&(this.selection.clear(),delete this.selection,this.selectionChanged()),this},t.deleteSelection=function(){this.selection&&(this[w]=this.selection.ends[w][w],this[q]=this.selection.ends[q][q],this.selection.remove(),this.selectionChanged(),delete this.selection)},t.replaceSelection=function(){var t=this.selection;return t&&(this[w]=t.ends[w][w],this[q]=t.ends[q][q],delete this.selection),t}}),C=v(k,function(t,e){t.init=function(){e.init.apply(this,arguments),this.jQ=this.jQ.wrapAll('<span class="mq-selection"></span>').parent()},t.adopt=function(){return this.jQ.replaceWith(this.jQ=this.jQ.children()),e.adopt.apply(this,arguments)},t.clear=function(){return this.jQ.replaceWith(this.jQ[0].childNodes),this},t.join=function(t){return this.fold("",function(e,n){return e+n[t]()})}}),S=v(function(t){t.init=function(t,e,n){this.id=t.id,this.data={},this.root=t,this.container=e,this.options=n,t.controller=this,this.cursor=t.cursor=T(t,n)},t.handle=function(t,e){var n,i=this.options.handlers;i&&i.fns[t]&&(n=i.APIClasses[this.KIND_OF_MQ](this),e===w||e===q?i.fns[t](e,n):i.fns[t](n))};var e=[];this.onNotify=function(t){e.push(t)},t.notify=function(){for(var t=0;t<e.length;t+=1)e[t].apply(this.cursor,arguments);return this}}),_={},D=v(),E={},L=v(),A={},l.prototype=L.p,l.VERSION="v0.10.1",l.interfaceVersion=function(t){if(1!==t)throw"Only interface version 1 supported. You specified: "+t;return a=function(){window.console&&console.warn('You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide')},a(),l},l.getInterface=c,R=c.MIN=1,z=c.MAX=2,l.noConflict=function(){return window.MathQuill=I,l},I=window.MathQuill,window.MathQuill=l,M=function(){function e(t){var e,i=t.which||t.keyCode,s=n[i],r=[];return t.ctrlKey&&r.push("Ctrl"),t.originalEvent&&t.originalEvent.metaKey&&r.push("Meta"),t.altKey&&r.push("Alt"),t.shiftKey&&r.push("Shift"),e=s||String.fromCharCode(i),r.length||s?(r.push(e),r.join("-")):e}var n={8:"Backspace",9:"Tab",10:"Enter",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Esc",32:"Spacebar",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Del",144:"NumLock"};return function(n,i){function s(t){y=t,clearTimeout(g),g=setTimeout(t)}function r(e){s(function(n){y=t,clearTimeout(g),e(n)})}function o(e){y(),y=t,clearTimeout(g),q.val(e),e&&q[0].select&&q[0].select(),b=!!e}function a(){var t=q[0];return"selectionStart"in t&&t.selectionStart!==t.selectionEnd}function l(){i.keystroke(e(v),v)}function c(t){v=t,w=null,b&&r(function(t){t&&"focusout"===t.type||!q[0].select||q[0].select()}),l()}function h(t){v&&w&&l(),w=t,s(f)}function u(t){v&&!w&&s(f)}function f(){if(!a()){var t=q.val();1===t.length?(q.val(""),i.typedText(t)):t&&q[0].select&&q[0].select()}}function p(){v=w=null}function d(t){q.focus(),s(m)}function m(){var t=q.val();q.val(""),t&&i.paste(t)}var g,b,v=null,w=null,q=Mt(n),x=Mt(i.container||q),y=t;return x.bind("keydown keypress input keyup focusout paste",function(t){y(t)}),b=!1,x.bind({keydown:c,keypress:h,keyup:u,focusout:p,cut:function(){r(function(){i.cut()})},copy:function(){r(function(){i.copy()})},paste:d}),{select:o}}}(),B=v(function(t,e,n){function i(t,e){throw t=t?"'"+t+"'":"EOF","Parse Error: "+e+" at "+t}var r,o,a;t.init=function(t){this._=t},t.parse=function(t){function e(t,e){return e}return this.skip(a)._(""+t,e,i)},t.or=function(t){s("or is passed a parser",t instanceof n);var e=this;return n(function(n,i,s){function r(e){return t._(n,i,s)}return e._(n,i,r)})},t.then=function(t){var e=this;return n(function(i,r,o){function a(e,i){var a=t instanceof n?t:t(i);return s("a parser is returned",a instanceof n),a._(e,r,o)}return e._(i,a,o)})},t.many=function(){var t=this;return n(function(e,n,i){function s(t,n){return e=t,o.push(n),!0}function r(){return!1}for(var o=[];t._(e,s,r););return n(e,o)})},t.times=function(t,e){arguments.length<2&&(e=t);var i=this;return n(function(n,s,r){function o(t,e){return u.push(e),n=t,!0}function a(t,e){return c=e,n=t,!1}function l(t,e){return!1}var c,h,u=[],f=!0;for(h=0;h<t;h+=1)if(!(f=i._(n,o,a)))return r(n,c);for(;h<e&&f;h+=1)f=i._(n,o,l);return s(n,u)})},t.result=function(t){return this.then(o(t))},t.atMost=function(t){return this.times(0,t)},t.atLeast=function(t){var e=this;return e.times(t).then(function(t){return e.many().map(function(e){return t.concat(e)})})},t.map=function(t){return this.then(function(e){return o(t(e))})},t.skip=function(t){return this.then(function(e){return t.result(e)})},this.string=function(t){var e=t.length,i="expected '"+t+"'";return n(function(n,s,r){var o=n.slice(0,e);return o===t?s(n.slice(e),o):r(n,i)})},r=this.regex=function(t){s("regexp parser is anchored","^"===t.toString().charAt(1));var e="expected "+t;return n(function(n,i,s){var r,o=t.exec(n);return o?(r=o[0],i(n.slice(r.length),r)):s(n,e)})},o=n.succeed=function(t){return n(function(e,n){return n(e,t)})},n.fail=function(t){return n(function(e,n,i){return i(e,t)})},n.letter=r(/^[a-z]/i),n.letters=r(/^[a-z]*/i),n.digit=r(/^[0-9]/),n.digits=r(/^[0-9]*/),n.whitespace=r(/^\s+/),n.optWhitespace=r(/^\s*/),n.any=n(function(t,e,n){return t?e(t.slice(1),t.charAt(0)):n(t,"expected any character")}),n.all=n(function(t,e,n){return e("",t)}),a=n.eof=n(function(t,e,n){return t?n(t,"expected EOF"):e(t,t)})}),F=function(){function t(t){var e=V();return t.adopt(e,0,0),e}function e(t){var e,n=t[0]||V();for(e=1;e<t.length;e+=1)t[e].children().adopt(n,n.ends[q],0);return n}var n=B.string,i=B.regex,s=B.letter,r=B.any,o=B.optWhitespace,a=B.succeed,l=B.fail,c=s.map(function(t){return Ot(t)}),h=i(/^[^${}\\_^]/).map(function(t){return W(t)}),u=i(/^[^\\a-eg-zA-Z]/).or(n("\\").then(i(/^[a-z]+/i).or(i(/^\s+/).result(" ")).or(r))).then(function(t){var e=j[t];return e?e(t).parser():l("unknown command: \\"+t)}),f=u.or(c).or(h),p=n("{").then(function(){return m}).skip(n("}")),d=o.then(p.or(f.map(t))),m=d.many().map(e).skip(o),g=n("[").then(d.then(function(t){return"]"!==t.join("latex")?a(t):l()}).many().map(e).skip(o)).skip(n("]")),b=m;return b.block=d,b.optBlock=g,b}(),S.open(function(t,e){t.exportLatex=function(){return this.root.latex().replace(/(\\[a-z]+) (?![a-z])/gi,"$1")},t.writeLatex=function(t){var e,n=this.notify("edit").cursor,i=B.all,s=B.eof,r=F.skip(s).or(i.result(!1)).parse(t);return r&&!r.isEmpty()&&(r.children().adopt(n.parent,n[w],n[q]),e=r.jQize(),e.insertBefore(n.jQ),n[w]=r.ends[q],r.finalizeInsert(n.options,n),r.ends[q][q].siblingCreated&&r.ends[q][q].siblingCreated(n.options,w),r.ends[w][w].siblingCreated&&r.ends[w][w].siblingCreated(n.options,q),n.parent.bubble("reflow")),this},t.renderLatexMath=function(t){var e,n,i=this.root,s=this.cursor,r=B.all,o=B.eof,a=F.skip(o).or(r.result(!1)).parse(t);i.eachChild("postOrder","dispose"),i.ends[w]=i.ends[q]=0,a&&a.children().adopt(i,0,0),e=i.jQ,a?(n=a.join("html"),e.html(n),i.jQize(e.children()),i.finalizeInsert(s.options)):e.empty(),delete s.selection,s.insAtRightEnd(i)},t.renderLatexText=function(t){var e,n,i,s,r,o,a,l,c,h,u=this.root,f=this.cursor;if(u.jQ.children().slice(1).remove(),u.eachChild("postOrder","dispose"),u.ends[w]=u.ends[q]=0,delete f.selection,f.show().insAtRightEnd(u),e=B.regex,n=B.string,i=B.eof,s=B.all,r=n("$").then(F).skip(n("$").or(i)).map(function(t){var e,n=Y(f);return n.createBlocks(),e=n.ends[w],t.children().adopt(e,0,0),n}),o=n("\\$").result("$"),a=o.or(e(/^[^$]/)).map(W),l=r.or(a).many(),c=l.skip(i).or(s.result(!1)).parse(t)){for(h=0;h<c.length;h+=1)c[h].adopt(u,u.ends[q],0);u.jQize().appendTo(u.jQ),u.finalizeInsert(f.options)}}}),S.open(function(t){t.focusBlurEvents=function(){function t(){clearTimeout(n),r.selection&&r.selection.jQ.addClass("mq-blur"),e()}function e(){r.hide().parent.blur(),i.container.removeClass("mq-focused"),x(window).unbind("blur",t)}var n,i=this,s=i.root,r=i.cursor;i.textarea.focus(function(){i.blurred=!1,clearTimeout(n),i.container.addClass("mq-focused"),r.parent||r.insAtRightEnd(s),r.selection?(r.selection.jQ.removeClass("mq-blur"),i.selectionChanged()):r.show()}).blur(function(){i.blurred=!0,n=setTimeout(function(){s.postOrder("intentionalBlur"),r.clearSelection().endSelection(),e()}),x(window).bind("blur",t)}),i.blurred=!0,r.hide().parent.blur()}}),S.open(function(t,e){t.exportText=function(){return this.root.foldChildren("",function(t,e){return t+e.text()})}}),S.open(function(t){t.keystroke=function(t,e){this.cursor.parent.keystroke(t,e,this)}}),O.open(function(t){t.keystroke=function(t,e,n){var i=n.cursor;switch(t){case"Ctrl-Shift-Backspace":case"Ctrl-Backspace":n.ctrlDeleteDir(w);break;case"Shift-Backspace":case"Backspace":n.backspace();break;case"Esc":case"Tab":return void n.escapeDir(q,t,e);case"Shift-Tab":case"Shift-Esc":return void n.escapeDir(w,t,e);case"End":n.notify("move").cursor.insAtRightEnd(i.parent);break;case"Ctrl-End":n.notify("move").cursor.insAtRightEnd(n.root);break;case"Shift-End":for(;i[q];)n.selectRight();break;case"Ctrl-Shift-End":for(;i[q]||i.parent!==n.root;)n.selectRight();break;case"Home":n.notify("move").cursor.insAtLeftEnd(i.parent);break;case"Ctrl-Home":n.notify("move").cursor.insAtLeftEnd(n.root);break;case"Shift-Home":for(;i[w];)n.selectLeft();break;case"Ctrl-Shift-Home":for(;i[w]||i.parent!==n.root;)n.selectLeft();break;case"Left":n.moveLeft();break;case"Shift-Left":n.selectLeft();break;case"Ctrl-Left":break;case"Right":n.moveRight();break;case"Shift-Right":n.selectRight();break;case"Ctrl-Right":break;case"Up":n.moveUp();break;case"Down":n.moveDown();break;case"Shift-Up":if(i[w])for(;i[w];)n.selectLeft();else n.selectLeft();case"Shift-Down":if(i[q])for(;i[q];)n.selectRight();else n.selectRight();case"Ctrl-Up":case"Ctrl-Down":break;case"Ctrl-Shift-Del":case"Ctrl-Del":n.ctrlDeleteDir(q);break;case"Shift-Del":case"Del":n.deleteForward();break;case"Meta-A":case"Ctrl-A":for(n.notify("move").cursor.insAtRightEnd(n.root);i[w];)n.selectLeft();break;default:return}e.preventDefault(),n.scrollHoriz()},t.moveOutOf=t.moveTowards=t.deleteOutOf=t.deleteTowards=t.unselectInto=t.selectOutOf=t.selectTowards=function(){s("overridden or never called on this node")}}),S.open(function(t){function e(t,e){var n=t.notify("upDown").cursor,i=e+"Into",s=e+"OutOf";return n[q][i]?n.insAtLeftEnd(n[q][i]):n[w][i]?n.insAtRightEnd(n[w][i]):n.parent.bubble(function(t){var e=t[s];if(e&&("function"==typeof e&&(e=t[s](n)),e instanceof O&&n.jumpUpDown(t,e),!0!==e))return!1}),t}this.onNotify(function(t){"move"!==t&&"upDown"!==t||this.show().clearSelection()}),t.escapeDir=function(t,e,n){r(t);var i=this.cursor;if(i.parent!==this.root&&n.preventDefault(),i.parent!==this.root)return i.parent.moveOutOf(t,i),this.notify("move")},E.leftRightIntoCmdGoes=function(t){if(t&&"up"!==t&&"down"!==t)throw'"up" or "down" required for leftRightIntoCmdGoes option, got "'+t+'"';return t},t.moveDir=function(t){r(t);var e=this.cursor,n=e.options.leftRightIntoCmdGoes;return e.selection?e.insDirOf(t,e.selection.ends[t]):e[t]?e[t].moveTowards(t,e,n):e.parent.moveOutOf(t,e,n),this.notify("move")},t.moveLeft=function(){return this.moveDir(w)},t.moveRight=function(){return this.moveDir(q)},t.moveUp=function(){return e(this,"up")},t.moveDown=function(){return e(this,"down")},this.onNotify(function(t){"upDown"!==t&&(this.upDownCache={})}),this.onNotify(function(t){"edit"===t&&this.show().deleteSelection()}),t.deleteDir=function(t){var e,n;return r(t),e=this.cursor,n=e.selection,this.notify("edit"),n||(e[t]?e[t].deleteTowards(t,e):e.parent.deleteOutOf(t,e)),e[w].siblingDeleted&&e[w].siblingDeleted(e.options,q),e[q].siblingDeleted&&e[q].siblingDeleted(e.options,w),e.parent.bubble("reflow"),this},t.ctrlDeleteDir=function(t){r(t);var e=this.cursor;return!e[t]||e.selection?this.deleteDir(t):(this.notify("edit"),t===w?k(e.parent.ends[w],e[w]).remove():k(e[q],e.parent.ends[q]).remove(),e.insAtDirEnd(t,e.parent),e[w].siblingDeleted&&e[w].siblingDeleted(e.options,q),e[q].siblingDeleted&&e[q].siblingDeleted(e.options,w),e.parent.bubble("reflow"),this)},t.backspace=function(){return this.deleteDir(w)},t.deleteForward=function(){return this.deleteDir(q)},this.onNotify(function(t){"select"!==t&&this.endSelection()}),t.selectDir=function(t){var e,n=this.notify("select").cursor,i=n.selection;r(t),n.anticursor||n.startSelection(),e=n[t],e?i&&i.ends[t]===e&&n.anticursor[-t]!==e?e.unselectInto(t,n):e.selectTowards(t,n):n.parent.selectOutOf(t,n),n.clearSelection(),n.select()||n.show()},t.selectLeft=function(){return this.selectDir(w)},t.selectRight=function(){return this.selectDir(q)}}),S.open(function(t){D.p.substituteTextarea=function(){return x("<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true />")[0]},t.createTextarea=function(){var t,e=this.textareaSpan=x('<span class="mq-textarea"></span>'),n=this.options.substituteTextarea();if(!n.nodeType)throw"substituteTextarea() must return a DOM element, got "+n;n=this.textarea=x(n).appendTo(e),t=this,t.cursor.selectionChanged=function(){t.selectionChanged()}},t.selectionChanged=function(){var t=this;J(t.container[0]),t.textareaSelectionTimeout===m&&(t.textareaSelectionTimeout=setTimeout(function(){t.setTextareaSelection()}))},t.setTextareaSelection=function(){this.textareaSelectionTimeout=m;var t="";this.cursor.selection&&(t=this.cursor.selection.join("latex"),this.options.statelessClipboard&&(t="$"+t+"$")),this.selectFn(t)},t.staticMathTextareaEvents=function(){function t(){s.detach(),e.blurred=!0}var e=this,n=(e.root,e.cursor),i=e.textarea,s=e.textareaSpan;this.container.prepend(Mt('<span class="mq-selectable">').text("$"+e.exportLatex()+"$")),e.blurred=!0,i.bind("cut paste",!1).bind("copy",function(){e.setTextareaSelection()}).focus(function(){e.blurred=!1}).blur(function(){n.selection&&n.selection.clear(),setTimeout(t)}),e.selectFn=function(t){i.val(t),t&&i.select()}},D.p.substituteKeyboardEvents=M,t.editablesTextareaEvents=function(){var t=this,e=t.textarea,n=t.textareaSpan,i=this.options.substituteKeyboardEvents(e,this);this.selectFn=function(t){i.select(t)},this.container.prepend(n),this.focusBlurEvents()},t.typedText=function(t){if("\n"===t)return this.handle("enter");var e=this.notify().cursor;e.parent.write(e,t),this.scrollHoriz()},t.cut=function(){var t=this,e=t.cursor;e.selection&&setTimeout(function(){t.notify("edit"),e.parent.bubble("reflow")})},t.copy=function(){this.setTextareaSelection()},t.paste=function(t){this.options.statelessClipboard&&(t="$"===t.slice(0,1)&&"$"===t.slice(-1)?t.slice(1,-1):"\\text{"+t+"}"),this.writeLatex(t).cursor.show()}}),S.open(function(e){D.p.ignoreNextMousedown=t,e.delegateMouseEvents=function(){var e=this.root.jQ;this.container.bind("mousedown.mathquill",function(n){function i(t){o=x(t.target)}function s(t){h.anticursor||h.startSelection(),c.seek(o,t.pageX,t.pageY).cursor.select(),o=m}function r(t){h.blink=u,h.selection||(c.editable?h.show():f.detach()),a.unbind("mousemove",i),x(t.target.ownerDocument).unbind("mousemove",s).unbind("mouseup",r)}var o,a=x(n.target).closest(".mq-root-block"),l=O.byId[a.attr(Ft)||e.attr(Ft)],c=l.controller,h=c.cursor,u=h.blink,f=c.textareaSpan,p=c.textarea;n.preventDefault(),n.target.unselectable=!0,h.options.ignoreNextMousedown(n)||(h.options.ignoreNextMousedown=t,c.blurred&&(c.editable||a.prepend(f),p.focus()),h.blink=t,c.seek(x(n.target),n.pageX,n.pageY).cursor.startSelection(),a.mousemove(i),x(n.target.ownerDocument).mousemove(s).mouseup(r))})}}),S.open(function(t){t.seek=function(t,e,n){var i,r,o,a=this.notify("select").cursor;return t&&((i=t.attr(Ft)||t.attr(Bt))||(r=t.parent(),i=r.attr(Ft)||r.attr(Bt))),o=i?O.byId[i]:this.root,s("nodeId is the id of some Node that exists",o),a.clearSelection().show(),o.seek(e,a),this.scrollHoriz(),this}}),S.open(function(t){t.scrollHoriz=function(){var t,e,n,i,s,r=this.cursor,o=r.selection,a=this.root.jQ[0].getBoundingClientRect();if(o)if(n=o.jQ[0].getBoundingClientRect(),i=n.left-(a.left+20),s=n.right-(a.right-20),o.ends[w]===r[q])if(i<0)e=i;else{if(!(s>0))return;e=n.left-s<a.left+20?i:s}else if(s>0)e=s;else{if(!(i<0))return;e=n.right-i>a.right-20?s:i}else if((t=r.jQ[0].getBoundingClientRect().left)>a.right-20)e=t-(a.right-20);else{if(!(t<a.left+20))return;e=t-(a.left+20)}this.root.jQ.stop().animate({scrollLeft:"+="+e},100)}}),$=v(O,function(t,e){t.finalizeInsert=function(t,e){var n=this;n.postOrder("finalizeTree",t),n.postOrder("contactWeld",e),n.postOrder("blur"),n.postOrder("reflow"),n[q].siblingCreated&&n[q].siblingCreated(t,w),n[w].siblingCreated&&n[w].siblingCreated(t,q),n.bubble("reflow")}}),P=v($,function(t,e){t.init=function(t,n,i){var s=this;e.init.call(s),s.ctrlSeq||(s.ctrlSeq=t),n&&(s.htmlTemplate=n),i&&(s.textTemplate=i)},t.replaces=function(t){t.disown(),this.replacedFragment=t},t.isEmpty=function(){return this.foldChildren(!0,function(t,e){return t&&e.isEmpty()})},t.parser=function(){var t=F.block,e=this;return t.times(e.numBlocks()).map(function(t){e.blocks=t;for(var n=0;n<t.length;n+=1)t[n].adopt(e,e.ends[q],0);return e})},t.createLeftOf=function(t){var n=this,i=n.replacedFragment;n.createBlocks(),e.createLeftOf.call(n,t),i&&(i.adopt(n.ends[w],0,0),i.jQ.appendTo(n.ends[w].jQ)),n.finalizeInsert(t.options),n.placeCursor(t)},t.createBlocks=function(){var t,e,n=this,i=n.numBlocks(),s=n.blocks=Array(i);for(t=0;t<i;t+=1)e=s[t]=V(),e.adopt(n,n.ends[q],0)},t.placeCursor=function(t){t.insAtRightEnd(this.foldChildren(this.ends[w],function(t,e){return t.isEmpty()?t:e}))},t.moveTowards=function(t,e,n){var i=n&&this[n+"Into"];e.insAtDirEnd(-t,i||this.ends[-t])},t.deleteTowards=function(t,e){this.isEmpty()?e[t]=this.remove()[t]:this.moveTowards(t,e,null)},t.selectTowards=function(t,e){e[-t]=this,e[t]=this[t]},t.selectChildren=function(){return C(this,this)},t.unselectInto=function(t,e){e.insAtDirEnd(-t,e.anticursor.ancestors[this.id])},t.seek=function(t,e){function n(t){var e={};return e[w]=t.jQ.offset().left,e[q]=e[w]+t.jQ.outerWidth(),e}var i,s=this,r=n(s)
;return t<r[w]?e.insLeftOf(s):t>r[q]?e.insRightOf(s):(i=r[w],void s.eachChild(function(o){var a=n(o);return t<a[w]?(t-i<a[w]-t?o[w]?e.insAtRightEnd(o[w]):e.insLeftOf(s):e.insAtLeftEnd(o),!1):t>a[q]?void(o[q]?i=a[q]:r[q]-t<t-a[q]?e.insRightOf(s):e.insAtRightEnd(o)):(o.seek(t,e),!1)}))},t.numBlocks=function(){var t=this.htmlTemplate.match(/&\d+/g);return t?t.length:0},t.html=function(){var t,e,n,i=this,r=i.blocks,o=" mathquill-command-id="+i.id,a=i.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);for(s("no unmatched angle brackets",a.join("")===this.htmlTemplate),t=0,e=a[0];e;t+=1,e=a[t])if("/>"===e.slice(-2))a[t]=e.slice(0,-2)+o+"/>";else if("<"===e.charAt(0)){s("not an unmatched top-level close tag","/"!==e.charAt(1)),a[t]=e.slice(0,-1)+o+">",n=1;do{t+=1,e=a[t],s("no missing close tags",e),"</"===e.slice(0,2)?n-=1:"<"===e.charAt(0)&&"/>"!==e.slice(-2)&&(n+=1)}while(n>0)}return a.join("").replace(/>&(\d+)/g,function(t,e){return" mathquill-block-id="+r[e].id+">"+r[e].join("html")})},t.latex=function(){return this.foldChildren(this.ctrlSeq,function(t,e){return t+"{"+(e.latex()||" ")+"}"})},t.textTemplate=[""],t.text=function(){var t=this,e=0;return t.foldChildren(t.textTemplate[e],function(n,i){e+=1;var s=i.text();return n&&"("===t.textTemplate[e]&&"("===s[0]&&")"===s.slice(-1)?n+s.slice(1,-1)+t.textTemplate[e]:n+i.text()+(t.textTemplate[e]||"")})}}),N=v(P,function(e,n){e.init=function(t,e,i){i||(i=t&&t.length>1?t.slice(1):t),n.init.call(this,t,e,[i])},e.parser=function(){return B.succeed(this)},e.numBlocks=function(){return 0},e.replaces=function(t){t.remove()},e.createBlocks=t,e.moveTowards=function(t,e){e.jQ.insDirOf(t,this.jQ),e[-t]=this,e[t]=this[t]},e.deleteTowards=function(t,e){e[t]=this.remove()[t]},e.seek=function(t,e){t-this.jQ.offset().left<this.jQ.outerWidth()/2?e.insLeftOf(this):e.insRightOf(this)},e.latex=function(){return this.ctrlSeq},e.text=function(){return this.textTemplate},e.placeCursor=t,e.isEmpty=function(){return!0}}),W=v(N,function(t,e){t.init=function(t,n){e.init.call(this,t,"<span>"+(n||t)+"</span>")}}),U=v(N,function(t,e){t.init=function(t,n,i){e.init.call(this,t,'<span class="mq-binary-operator">'+n+"</span>",i)}}),V=v($,function(t,e){t.join=function(t){return this.foldChildren("",function(e,n){return e+n[t]()})},t.html=function(){return this.join("html")},t.latex=function(){return this.join("latex")},t.text=function(){return this.ends[w]===this.ends[q]&&0!==this.ends[w]?this.ends[w].text():this.join("text")},t.keystroke=function(t,n,i){return!i.options.spaceBehavesLikeTab||"Spacebar"!==t&&"Shift-Spacebar"!==t?e.keystroke.apply(this,arguments):(n.preventDefault(),void i.escapeDir("Shift-Spacebar"===t?w:q,t,n))},t.moveOutOf=function(t,e,n){n&&this.parent[n+"Into"]||!this[t]?e.insDirOf(t,this.parent):e.insAtDirEnd(-t,this[t])},t.selectOutOf=function(t,e){e.insDirOf(t,this.parent)},t.deleteOutOf=function(t,e){e.unwrapGramp()},t.seek=function(t,e){var n=this.ends[q];if(!n||n.jQ.offset().left+n.jQ.outerWidth()<t)return e.insAtRightEnd(this);if(t<this.ends[w].jQ.offset().left)return e.insAtLeftEnd(this);for(;t<n.jQ.offset().left;)n=n[w];return n.seek(t,e)},t.chToCmd=function(t,e){var n;return t.match(/^[a-eg-zA-Z]$/)?Ot(t):/^\d$/.test(t)?xt(t):e&&e.typingSlashWritesDivisionSymbol&&"/"===t?j["÷"](t):e&&e.typingAsteriskWritesTimesSymbol&&"*"===t?j["×"](t):(n=Q[t]||j[t])?n(t):W(t)},t.write=function(t,e){var n=this.chToCmd(e,t.options);t.selection&&n.replaces(t.replaceSelection()),n.createLeftOf(t.show())},t.focus=function(){return this.jQ.addClass("mq-hasCursor"),this.jQ.removeClass("mq-empty"),this},t.blur=function(){return this.jQ.removeClass("mq-hasCursor"),this.isEmpty()&&this.jQ.addClass("mq-empty"),this}}),_.StaticMath=function(t){return v(t.AbstractMathQuill,function(e,n){this.RootBlock=V,e.__mathquillify=function(t,e){return this.config(t),n.__mathquillify.call(this,"mq-math-mode"),this.__controller.delegateMouseEvents(),this.__controller.staticMathTextareaEvents(),this},e.init=function(){n.init.apply(this,arguments),this.__controller.root.postOrder("registerInnerField",this.innerFields=[],t.MathField)},e.latex=function(){var e=n.latex.apply(this,arguments);return arguments.length>0&&this.__controller.root.postOrder("registerInnerField",this.innerFields=[],t.MathField),e}})},H=v(V,h),_.MathField=function(e){return v(e.EditableField,function(e,n){this.RootBlock=H,e.__mathquillify=function(e,i){return this.config(e),i>1&&(this.__controller.root.reflow=t),n.__mathquillify.call(this,"mq-editable-field mq-math-mode"),delete this.__controller.root.reflow,this}})},G=v(O,function(t,e){function n(t){var e,n;if(t.jQ[0].normalize(),e=t.jQ[0].firstChild)return s("only node in TextBlock span is Text node",3===e.nodeType),n=K(e.data),n.jQadd(e),t.children().disown(),n.adopt(t,0,0)}t.ctrlSeq="\\text",t.replaces=function(t){t instanceof k?this.replacedText=t.remove().jQ.text():"string"==typeof t&&(this.replacedText=t)},t.jQadd=function(t){e.jQadd.call(this,t),this.ends[w]&&this.ends[w].jQadd(this.jQ[0].firstChild)},t.createLeftOf=function(t){var n,i=this;if(e.createLeftOf.call(this,t),i[q].siblingCreated&&i[q].siblingCreated(t.options,w),i[w].siblingCreated&&i[w].siblingCreated(t.options,q),i.bubble("reflow"),t.insAtRightEnd(i),i.replacedText)for(n=0;n<i.replacedText.length;n+=1)i.write(t,i.replacedText.charAt(n))},t.parser=function(){var t=this,e=B.string,n=B.regex;return B.optWhitespace.then(e("{")).then(n(/^[^}]*/)).skip(e("}")).map(function(e){return 0===e.length?k():(K(e).adopt(t,0,0),t)})},t.textContents=function(){return this.foldChildren("",function(t,e){return t+e.text})},t.text=function(){return'"'+this.textContents()+'"'},t.latex=function(){var t=this.textContents();return 0===t.length?"":"\\text{"+t.replace(/\\/g,"\\backslash ").replace(/[{}]/g,"\\$&")+"}"},t.html=function(){return'<span class="mq-text-mode" mathquill-command-id='+this.id+">"+this.textContents()+"</span>"},t.moveTowards=function(t,e){e.insAtDirEnd(-t,this)},t.moveOutOf=function(t,e){e.insDirOf(t,this)},t.unselectInto=t.moveTowards,t.selectTowards=P.prototype.selectTowards,t.deleteTowards=P.prototype.deleteTowards,t.selectOutOf=function(t,e){e.insDirOf(t,this)},t.deleteOutOf=function(t,e){this.isEmpty()&&e.insRightOf(this)},t.write=function(t,n){var i,s;t.show().deleteSelection(),"$"!==n?t[w]?t[w].appendText(n):K(n).createLeftOf(t):this.isEmpty()?(t.insRightOf(this),W("\\$","$").createLeftOf(t)):t[q]?t[w]?(i=G(),s=this.ends[w],s.disown().jQ.detach(),s.adopt(i,0,0),t.insLeftOf(this),e.createLeftOf.call(i,t)):t.insLeftOf(this):t.insRightOf(this)},t.seek=function(t,e){var i,s,r,o,a,l,c,h;for(e.hide(),i=n(this),s=this.jQ.width()/this.text.length,r=Math.round((t-this.jQ.offset().left)/s),r<=0?e.insAtLeftEnd(this):r>=i.text.length?e.insAtRightEnd(this):e.insLeftOf(i.splitRight(r)),o=t-e.show().offset().left,a=o&&o<0?w:q,l=a;e[a]&&o*l>0;)e[a].moveTowards(a,e),l=o,o=t-e.offset().left;a*o<-a*l&&e[-a].moveTowards(-a,e),e.anticursor?e.anticursor.parent===this&&(c=e[w]&&e[w].text.length,this.anticursorPosition===c?e.anticursor=y.copy(e):(this.anticursorPosition<c?(h=e[w].splitRight(this.anticursorPosition),e[w]=h):h=e[q].splitRight(this.anticursorPosition-c),e.anticursor=y(this,h[w],h))):this.anticursorPosition=e[w]&&e[w].text.length},t.blur=function(t){V.prototype.blur.call(this),t&&(""===this.textContents()?(this.remove(),t[w]===this?t[w]=this[w]:t[q]===this&&(t[q]=this[q])):n(this))},t.focus=V.prototype.focus}),K=v(O,function(t,e){function n(t,e){return e.charAt(t===w?0:-1+e.length)}t.init=function(t){e.init.call(this),this.text=t},t.jQadd=function(t){this.dom=t,this.jQ=x(t)},t.jQize=function(){return this.jQadd(document.createTextNode(this.text))},t.appendText=function(t){this.text+=t,this.dom.appendData(t)},t.prependText=function(t){this.text=t+this.text,this.dom.insertData(0,t)},t.insTextAtDirEnd=function(t,e){r(e),e===q?this.appendText(t):this.prependText(t)},t.splitRight=function(t){var e=K(this.text.slice(t)).adopt(this.parent,this,this[q]);return e.jQadd(this.dom.splitText(t)),this.text=this.text.slice(0,t),e},t.moveTowards=function(t,e){var i,s;return r(t),i=n(-t,this.text),s=this[-t],s?s.insTextAtDirEnd(i,t):K(i).createDir(-t,e),this.deleteTowards(t,e)},t.latex=function(){return this.text},t.deleteTowards=function(t,e){this.text.length>1?t===q?(this.dom.deleteData(0,1),this.text=this.text.slice(1)):(this.dom.deleteData(-1+this.text.length,1),this.text=this.text.slice(0,-1)):(this.remove(),this.jQ.remove(),e[t]=this[t])},t.selectTowards=function(t,e){var i,s,o,a;return r(t),i=e.anticursor,s=n(-t,this.text),i[t]===this?(o=K(s).createDir(t,e),i[t]=o,e.insDirOf(t,o)):(a=this[-t],a?a.insTextAtDirEnd(s,t):(o=K(s).createDir(-t,e),o.jQ.insDirOf(-t,e.selection.jQ)),1===this.text.length&&i[-t]===this&&(i[-t]=this[-t])),this.deleteTowards(t,e)}}),j.text=j.textnormal=j.textrm=j.textup=j.textmd=G,j.em=j.italic=j.italics=j.emph=j.textit=j.textsl=u("\\textit","i",'class="mq-text-mode"'),j.strong=j.bold=j.textbf=u("\\textbf","b",'class="mq-text-mode"'),j.sf=j.textsf=u("\\textsf","span",'class="mq-sans-serif mq-text-mode"'),j.tt=j.texttt=u("\\texttt","span",'class="mq-monospace mq-text-mode"'),j.textsc=u("\\textsc","span",'style="font-variant:small-caps" class="mq-text-mode"'),j.uppercase=u("\\uppercase","span",'style="text-transform:uppercase" class="mq-text-mode"'),j.lowercase=u("\\lowercase","span",'style="text-transform:lowercase" class="mq-text-mode"'),Y=v(P,function(t,e){t.init=function(t){e.init.call(this,"$"),this.cursor=t},t.htmlTemplate='<span class="mq-math-mode">&0</span>',t.createBlocks=function(){e.createBlocks.call(this),this.ends[w].cursor=this.cursor,this.ends[w].write=function(t,e){"$"!==e?V.prototype.write.call(this,t,e):this.isEmpty()?(t.insRightOf(this.parent),this.parent.deleteTowards(dir,t),W("\\$","$").createLeftOf(t.show())):t[q]?t[w]?V.prototype.write.call(this,t,e):t.insLeftOf(this.parent):t.insRightOf(this.parent)}},t.latex=function(){return"$"+this.ends[w].latex()+"$"}}),X=v(H,function(t,e){t.keystroke=function(t){if("Spacebar"!==t&&"Shift-Spacebar"!==t)return e.keystroke.apply(this,arguments)},t.write=function(t,e){if(t.show().deleteSelection(),"$"===e)Y(t).createLeftOf(t);else{var n;"<"===e?n="&lt;":">"===e&&(n="&gt;"),W(e,n).createLeftOf(t)}}}),_.TextField=function(t){return v(t.EditableField,function(t,e){this.RootBlock=X,t.__mathquillify=function(){return e.__mathquillify.call(this,"mq-editable-field mq-text-mode")},t.latex=function(t){return arguments.length>0?(this.__controller.renderLatexText(t),this.__controller.blurred&&this.__controller.cursor.hide().parent.blur(),this):this.__controller.exportLatex()}})},Q["\\"]=v(P,function(t,e){t.ctrlSeq="\\",t.replaces=function(t){this._replacedFragment=t.disown(),this.isEmpty=function(){return!1}},t.htmlTemplate='<span class="mq-latex-command-input mq-non-leaf">\\<span>&0</span></span>',t.textTemplate=["\\"],t.createBlocks=function(){e.createBlocks.call(this),this.ends[w].focus=function(){return this.parent.jQ.addClass("mq-hasCursor"),this.isEmpty()&&this.parent.jQ.removeClass("mq-empty"),this},this.ends[w].blur=function(){return this.parent.jQ.removeClass("mq-hasCursor"),this.isEmpty()&&this.parent.jQ.addClass("mq-empty"),this},this.ends[w].write=function(t,e){t.show().deleteSelection(),e.match(/[a-z]/i)?W(e).createLeftOf(t):(this.parent.renderCommand(t),"\\"===e&&this.isEmpty()||t.parent.write(t,e))},this.ends[w].keystroke=function(t,n,i){return"Tab"===t||"Enter"===t||"Spacebar"===t?(this.parent.renderCommand(i.cursor),void n.preventDefault()):e.keystroke.apply(this,arguments)}},t.createLeftOf=function(t){if(e.createLeftOf.call(this,t),this._replacedFragment){var n=this.jQ[0];this.jQ=this._replacedFragment.jQ.addClass("mq-blur").bind("mousedown mousemove",function(t){return x(t.target=n).trigger(t),!1}).insertBefore(this.jQ).add(this.jQ)}},t.latex=function(){return"\\"+this.ends[w].latex()+" "},t.renderCommand=function(t){var e,n;this.jQ=this.jQ.last(),this.remove(),this[q]?t.insLeftOf(this[q]):t.insAtRightEnd(this.parent),e=this.ends[w].latex(),e||(e=" "),n=j[e]||bt[e],n?(n=n(e),this._replacedFragment&&n.replaces(this._replacedFragment),n.createLeftOf(t)):(n=G(),n.replaces(e),n.createLeftOf(t),t.insRightOf(n),this._replacedFragment&&this._replacedFragment.remove())}}),J=t,tt=document.createElement("div"),et=tt.style,nt={transform:1,WebkitTransform:1,MozTransform:1,OTransform:1,msTransform:1};for(st in nt)if(st in et){it=st;break}it?Z=function(t,e,n){t.css(it,"scale("+e+","+n+")")}:"filter"in et?(J=function(t){t.className=t.className},Z=function(t,e,n){function i(){t.css("marginRight",(s.width()-1)*(e-1)/e+"px")}var s,r;e/=1+(n-1)/2,t.css("fontSize",n+"em"),t.hasClass("mq-matrixed-container")||t.addClass("mq-matrixed-container").wrapInner('<span class="mq-matrixed"></span>'),s=t.children().css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+e+",SizingMethod='auto expand')"),i(),r=setInterval(i),x(window).load(function(){clearTimeout(r),i()})}):Z=function(t,e,n){t.css("fontSize",n+"em")},rt=v(P,function(t,e){t.init=function(t,n,i){e.init.call(this,t,"<"+n+" "+i+">&0</"+n+">")}}),j.mathrm=i(rt,"\\mathrm","span",'class="mq-roman mq-font"'),j.mathit=i(rt,"\\mathit","i",'class="mq-font"'),j.mathbf=i(rt,"\\mathbf","b",'class="mq-font"'),j.mathsf=i(rt,"\\mathsf","span",'class="mq-sans-serif mq-font"'),j.mathtt=i(rt,"\\mathtt","span",'class="mq-monospace mq-font"'),j.underline=i(rt,"\\underline","span",'class="mq-non-leaf mq-underline"'),j.overline=j.bar=i(rt,"\\overline","span",'class="mq-non-leaf mq-overline"'),j.overrightarrow=i(rt,"\\overrightarrow","span",'class="mq-non-leaf mq-overarrow mq-arrow-right"'),j.overleftarrow=i(rt,"\\overleftarrow","span",'class="mq-non-leaf mq-overarrow mq-arrow-left"'),j.overleftrightarrow=i(rt,"\\overleftrightarrow","span",'class="mq-non-leaf mq-overarrow mq-arrow-both"'),j.overarc=i(rt,"\\overarc","span",'class="mq-non-leaf mq-overarc"'),j.dot=v(P,function(t,e){t.init=function(){e.init.call(this,"\\dot",'<span class="mq-non-leaf"><span class="mq-dot-recurring-inner"><span class="mq-dot-recurring">&#x2d9;</span><span class="mq-empty-box">&0</span></span></span>')}}),j.textcolor=v(P,function(t,e){t.setColor=function(t){this.color=t,this.htmlTemplate='<span class="mq-textcolor" style="color:'+t+'">&0</span>'},t.latex=function(){return"\\textcolor{"+this.color+"}{"+this.blocks[0].latex()+"}"},t.parser=function(){var t=this,n=B.optWhitespace,i=B.string,s=B.regex;return n.then(i("{")).then(s(/^[#\w\s.,()%-]*/)).skip(i("}")).then(function(n){return t.setColor(n),e.parser.call(t)})},t.isStyleBlock=function(){return!0}}),j.class=v(P,function(t,e){t.parser=function(){var t=this,n=B.string,i=B.regex;return B.optWhitespace.then(n("{")).then(i(/^[-\w\s\\\xA0-\xFF]*/)).skip(n("}")).then(function(n){return t.cls=n||"",t.htmlTemplate='<span class="mq-class '+n+'">&0</span>',e.parser.call(t)})},t.latex=function(){return"\\class{"+this.cls+"}{"+this.blocks[0].latex()+"}"},t.isStyleBlock=function(){return!0}}),ot=v(P,function(t,e){t.ctrlSeq="_{...}^{...}",t.createLeftOf=function(t){if(this.replacedFragment||t[w]||!t.options.supSubsRequireOperand)return e.createLeftOf.apply(this,arguments)},t.contactWeld=function(t){var e,n,i,s,r,o;for(e=w;e;e=e===w&&q)if(this[e]instanceof ot){for(n="sub";n;n="sub"===n&&"sup")i=this[n],s=this[e][n],i&&(s?i.isEmpty()?o=y(s,0,s.ends[w]):(i.jQ.children().insAtDirEnd(-e,s.jQ),r=i.children().disown(),o=y(s,r.ends[q],s.ends[w]),e===w?r.adopt(s,s.ends[q],0):r.adopt(s,0,s.ends[w])):this[e].addBlock(i.disown()),this.placeCursor=function(t,n){return function(i){i.insAtDirEnd(-e,t||n)}}(s,i));this.remove(),t&&t[w]===this&&(e===q&&o?o[w]?t.insRightOf(o[w]):t.insAtLeftEnd(o.parent):t.insRightOf(this[e]));break}},D.p.charsThatBreakOutOfSupSub="",t.finalizeTree=function(){this.ends[w].write=function(t,e){if(t.options.autoSubscriptNumerals&&this===this.parent.sub){if("_"===e)return;var n=this.chToCmd(e,t.options);return n instanceof N?t.deleteSelection():t.clearSelection().insRightOf(this.parent),n.createLeftOf(t.show())}t[w]&&!t[q]&&!t.selection&&t.options.charsThatBreakOutOfSupSub.indexOf(e)>-1&&t.insRightOf(this.parent),V.p.write.apply(this,arguments)}},t.moveTowards=function(t,n,i){n.options.autoSubscriptNumerals&&!this.sup?n.insDirOf(t,this):e.moveTowards.apply(this,arguments)},t.deleteTowards=function(t,n){if(n.options.autoSubscriptNumerals&&this.sub){var i=this.sub.ends[-t];i instanceof N?i.remove():i&&i.deleteTowards(t,n.insAtDirEnd(-t,this.sub)),this.sub.isEmpty()&&(this.sub.deleteOutOf(w,n.insAtLeftEnd(this.sub)),this.sup&&n.insDirOf(-t,this))}else e.deleteTowards.apply(this,arguments)},t.latex=function(){function t(t,e){var n=e&&e.latex();return e?t+(1===n.length?n:"{"+(n||" ")+"}"):""}return t("_",this.sub)+t("^",this.sup)},t.addBlock=function(t){"sub"===this.supsub?(this.sup=this.upInto=this.sub.upOutOf=t,t.adopt(this,this.sub,0).downOutOf=this.sub,t.jQ=x('<span class="mq-sup"/>').append(t.jQ.children()).attr(Ft,t.id).prependTo(this.jQ)):(this.sub=this.downInto=this.sup.downOutOf=t,t.adopt(this,0,this.sup).upOutOf=this.sup,t.jQ=x('<span class="mq-sub"></span>').append(t.jQ.children()).attr(Ft,t.id).appendTo(this.jQ.removeClass("mq-sup-only")),this.jQ.append('<span style="display:inline-block;width:0">&#8203;</span>'));for(var e=0;e<2;e+=1)!function(t,e,n,i){t[e].deleteOutOf=function(s,r){if(r.insDirOf(this[s]?-s:s,this.parent),!this.isEmpty()){var o=this.ends[s];this.children().disown().withDirAdopt(s,r.parent,r[s],r[-s]).jQ.insDirOf(-s,r.jQ),r[-s]=o}t.supsub=n,delete t[e],delete t[i+"Into"],t[n][i+"OutOf"]=f,delete t[n].deleteOutOf,"sub"===e&&x(t.jQ.addClass("mq-sup-only")[0].lastChild).remove(),this.remove()}}(this,"sub sup".split(" ")[e],"sup sub".split(" ")[e],"down up".split(" ")[e])}}),j.subscript=j._=v(ot,function(t,e){t.supsub="sub",t.htmlTemplate='<span class="mq-supsub mq-non-leaf"><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>',t.textTemplate=["_"],t.finalizeTree=function(){this.downInto=this.sub=this.ends[w],this.sub.upOutOf=f,e.finalizeTree.call(this)}}),j.superscript=j.supscript=j["^"]=v(ot,function(t,e){t.supsub="sup",t.htmlTemplate='<span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup">&0</span></span>',t.textTemplate=["^"],t.finalizeTree=function(){this.upInto=this.sup=this.ends[q],this.sup.downOutOf=f,e.finalizeTree.call(this)},t.reflow=function(){var t=this.jQ,e=t.prev().innerHeight();e*=.6,t.css("vertical-align",e+"px")}}),at=v(P,function(t,e){t.init=function(t,e){var n='<span class="mq-large-operator mq-non-leaf"><span class="mq-to"><span>&1</span></span><big>'+e+'</big><span class="mq-from"><span>&0</span></span></span>';N.prototype.init.call(this,t,n)},t.createLeftOf=function(t){e.createLeftOf.apply(this,arguments),t.options.sumStartsWithNEquals&&(Ot("n").createLeftOf(t),Rt().createLeftOf(t))},t.latex=function(){function t(t){return 1===t.length?t:"{"+(t||" ")+"}"}return this.ctrlSeq+"_"+t(this.ends[w].latex())+"^"+t(this.ends[q].latex())},t.parser=function(){var t,e=B.string,n=B.optWhitespace,i=B.succeed,s=F.block,r=this,o=r.blocks=[V(),V()];for(t=0;t<o.length;t+=1)o[t].adopt(r,r.ends[q],0);return n.then(e("_").or(e("^"))).then(function(t){var e=o["_"===t?0:1];return s.then(function(t){return t.children().adopt(e,e.ends[q],0),i(r)})}).many().result(r)},t.finalizeTree=function(){this.downInto=this.ends[w],this.upInto=this.ends[q],this.ends[w].upOutOf=this.ends[q],this.ends[q].downOutOf=this.ends[w]}}),j["∑"]=j.sum=j.summation=i(at,"\\sum ","&sum;"),j["∏"]=j.prod=j.product=i(at,"\\prod ","&prod;"),j.coprod=j.coproduct=i(at,"\\coprod ","&#8720;"),j["∫"]=j.int=j.integral=v(at,function(t,e){t.init=function(){N.prototype.init.call(this,"\\int ",'<span class="mq-int mq-non-leaf"><big>&int;</big><span class="mq-supsub mq-non-leaf"><span class="mq-sup"><span class="mq-sup-inner">&1</span></span><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203</span></span></span>')},t.createLeftOf=P.p.createLeftOf}),lt=j.frac=j.dfrac=j.cfrac=j.fraction=v(P,function(t,e){t.ctrlSeq="\\frac",t.htmlTemplate='<span class="mq-fraction mq-non-leaf"><span class="mq-numerator">&0</span><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>',t.textTemplate=["(",")/(",")"],t.finalizeTree=function(){this.upInto=this.ends[q].upOutOf=this.ends[w],this.downInto=this.ends[w].downOutOf=this.ends[q]}}),ct=j.over=Q["/"]=v(lt,function(e,n){e.createLeftOf=function(e){if(!this.replacedFragment){for(var i=e[w];i&&!(i instanceof U||i instanceof(j.text||t)||i instanceof at||"\\ "===i.ctrlSeq||/^[,;:]$/.test(i.ctrlSeq));)i=i[w];i instanceof at&&i[q]instanceof ot&&(i=i[q],i[q]instanceof ot&&i[q].ctrlSeq!=i.ctrlSeq&&(i=i[q])),i!==e[w]&&(this.replaces(k(i[q]||e.parent.ends[w],e[w])),e[w]=i)}n.createLeftOf.call(this,e)}}),ht=j.sqrt=j["√"]=v(P,function(t,e){t.ctrlSeq="\\sqrt",t.htmlTemplate='<span class="mq-non-leaf"><span class="mq-scaled mq-sqrt-prefix">&radic;</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>',t.textTemplate=["sqrt(",")"],t.parser=function(){return F.optBlock.then(function(t){return F.block.map(function(e){var n=ut();return n.blocks=[t,e],t.adopt(n,0,0),e.adopt(n,t,0),n})}).or(e.parser.call(this))},t.reflow=function(){var t=this.ends[q].jQ;Z(t.prev(),1,t.innerHeight()/+t.css("fontSize").slice(0,-2)-.1)}}),j.hat=v(P,function(t,e){t.ctrlSeq="\\hat",t.htmlTemplate='<span class="mq-non-leaf"><span class="mq-hat-prefix">^</span><span class="mq-hat-stem">&0</span></span>',t.textTemplate=["hat(",")"]}),ut=j.nthroot=v(ht,function(t,e){t.htmlTemplate='<sup class="mq-nthroot mq-non-leaf">&0</sup><span class="mq-scaled"><span class="mq-sqrt-prefix mq-scaled">&radic;</span><span class="mq-sqrt-stem mq-non-leaf">&1</span></span>',t.textTemplate=["sqrt[","](",")"],t.latex=function(){return"\\sqrt["+this.ends[w].latex()+"]{"+this.ends[q].latex()+"}"}}),ft=v(P,function(t,e){t.init=function(t,n,i){var s='<span class="mq-non-leaf"><span class="mq-diacritic-above">'+n+'</span><span class="mq-diacritic-stem">&0</span></span>';e.init.call(this,t,s,i)}}),j.vec=i(ft,"\\vec","&rarr;",["vec(",")"]),j.tilde=i(ft,"\\tilde","~",["tilde(",")"]),pt=v(v(P,p),function(e,n){e.init=function(t,e,i,s,r){n.init.call(this,"\\left"+s,m,[e,i]),this.side=t,this.sides={},this.sides[w]={ch:e,ctrlSeq:s},this.sides[q]={ch:i,ctrlSeq:r}},e.numBlocks=function(){return 1},e.html=function(){return this.htmlTemplate='<span class="mq-non-leaf"><span class="mq-scaled mq-paren'+(this.side===q?" mq-ghost":"")+'">'+this.sides[w].ch+'</span><span class="mq-non-leaf">&0</span><span class="mq-scaled mq-paren'+(this.side===w?" mq-ghost":"")+'">'+this.sides[q].ch+"</span></span>",n.html.call(this)},e.latex=function(){return"\\left"+this.sides[w].ctrlSeq+this.ends[w].latex()+"\\right"+this.sides[q].ctrlSeq},e.matchBrack=function(t,e,n){return n instanceof pt&&n.side&&n.side!==-e&&(!t.restrictMismatchedBrackets||dt[this.sides[this.side].ch]===n.sides[n.side].ch||{"(":"]","[":")"}[this.sides[w].ch]===n.sides[q].ch)&&n},e.closeOpposing=function(t){t.side=0,t.sides[this.side]=this.sides[this.side],t.delimjQs.eq(this.side===w?0:1).removeClass("mq-ghost").html(this.sides[this.side].ch)},e.createLeftOf=function(t){var e,i,s;this.replacedFragment||(e=t.options,i="|"===this.sides[w].ch?this.matchBrack(e,q,t[q])||this.matchBrack(e,w,t[w])||this.matchBrack(e,0,t.parent.parent):this.matchBrack(e,-this.side,t[-this.side])||this.matchBrack(e,-this.side,t.parent.parent)),i?(s=this.side=-i.side,this.closeOpposing(i),i===t.parent.parent&&t[s]&&k(t[s],t.parent.ends[s],-s).disown().withDirAdopt(-s,i.parent,i,i[s]).jQ.insDirOf(s,i.jQ),i.bubble("reflow")):(i=this,s=i.side,i.replacedFragment?i.side=0:t[-s]&&(i.replaces(k(t[-s],t.parent.ends[-s],s)),t[-s]=0),n.createLeftOf.call(i,t)),s===w?t.insAtLeftEnd(i.ends[w]):t.insRightOf(i)},e.placeCursor=t,e.unwrap=function(){this.ends[w].children().disown().adopt(this.parent,this,this[q]).jQ.insertAfter(this.jQ),this.remove()},e.deleteSide=function(t,e,n){var i,s,r,o=this.parent,a=this[t],l=o.ends[t];if(t===this.side)return this.unwrap(),void(a?n.insDirOf(-t,a):n.insAtDirEnd(t,o));if(i=n.options,s=!this.side,this.side=-t,this.matchBrack(i,t,this.ends[w].ends[this.side]))this.closeOpposing(this.ends[w].ends[this.side]),r=this.ends[w].ends[t],this.unwrap(),r.siblingCreated&&r.siblingCreated(n.options,t),a?n.insDirOf(-t,a):n.insAtDirEnd(t,o);else{if(this.matchBrack(i,t,this.parent.parent))this.parent.parent.closeOpposing(this),this.parent.parent.unwrap();else{if(e&&s)return this.unwrap(),void(a?n.insDirOf(-t,a):n.insAtDirEnd(t,o));this.sides[t]={ch:dt[this.sides[this.side].ch],ctrlSeq:dt[this.sides[this.side].ctrlSeq]},this.delimjQs.removeClass("mq-ghost").eq(t===w?0:1).addClass("mq-ghost").html(this.sides[t].ch)}a?(r=this.ends[w].ends[t],k(a,l,-t).disown().withDirAdopt(-t,this.ends[w],r,0).jQ.insAtDirEnd(t,this.ends[w].jQ.removeClass("mq-empty")),r.siblingCreated&&r.siblingCreated(n.options,t),n.insDirOf(-t,a)):e?n.insDirOf(t,this):n.insAtDirEnd(t,this.ends[w])}},e.deleteTowards=function(t,e){this.deleteSide(-t,!1,e)},e.finalizeTree=function(){this.ends[w].deleteOutOf=function(t,e){this.parent.deleteSide(t,!0,e)},this.finalizeTree=this.intentionalBlur=function(){this.delimjQs.eq(this.side===w?1:0).removeClass("mq-ghost"),this.side=0}},e.siblingCreated=function(t,e){e===-this.side&&this.finalizeTree()}}),dt={"(":")",")":"(","[":"]","]":"[","{":"}","}":"{","\\{":"\\}","\\}":"\\{","&lang;":"&rang;","&rang;":"&lang;","\\langle ":"\\rangle ","\\rangle ":"\\langle ","|":"|","\\lVert ":"\\rVert ","\\rVert ":"\\lVert "},d("("),d("["),d("{","\\{"),j.langle=i(pt,w,"&lang;","&rang;","\\langle ","\\rangle "),j.rangle=i(pt,q,"&lang;","&rang;","\\langle ","\\rangle "),Q["|"]=i(pt,w,"|","|","|","|"),j.lVert=i(pt,w,"&#8741;","&#8741;","\\lVert ","\\rVert "),j.rVert=i(pt,q,"&#8741;","&#8741;","\\lVert ","\\rVert "),j.left=v(P,function(t){t.parser=function(){var t=B.regex,e=B.string,n=(B.succeed,B.optWhitespace);return n.then(t(/^(?:[([|]|\\\{|\\langle\b|\\lVert\b)/)).then(function(i){var s="\\"===i.charAt(0)?i.slice(1):i;return"\\langle"==i&&(s="&lang;",i+=" "),"\\lVert"==i&&(s="&#8741;",i+=" "),F.then(function(r){return e("\\right").skip(n).then(t(/^(?:[\])|]|\\\}|\\rangle\b|\\rVert\b)/)).map(function(t){var e,n="\\"===t.charAt(0)?t.slice(1):t;return"\\rangle"==t&&(n="&rang;",t+=" "),"\\rVert"==t&&(n="&#8741;",t+=" "),e=pt(0,s,n,i,t),e.blocks=[r],r.adopt(e,0,0),e})})})}}),j.right=v(P,function(t){t.parser=function(){return B.fail("unmatched \\right")}}),mt=j.binom=j.binomial=v(v(P,p),function(t,e){t.ctrlSeq="\\binom",t.htmlTemplate='<span class="mq-non-leaf"><span class="mq-paren mq-scaled">(</span><span class="mq-non-leaf"><span class="mq-array mq-non-leaf"><span>&0</span><span>&1</span></span></span><span class="mq-paren mq-scaled">)</span></span>',t.textTemplate=["choose(",",",")"]}),j.choose=v(mt,function(t){t.createLeftOf=ct.prototype.createLeftOf}),j.editable=j.MathQuillMathField=v(P,function(t,e){t.ctrlSeq="\\MathQuillMathField",t.htmlTemplate='<span class="mq-editable-field"><span class="mq-root-block">&0</span></span>',t.parser=function(){var t=this,n=B.string,i=B.regex,s=B.succeed;return n("[").then(i(/^[a-z][a-z0-9]*/i)).skip(n("]")).map(function(e){t.name=e}).or(s()).then(e.parser.call(t))},t.finalizeTree=function(t){var e=S(this.ends[w],this.jQ,t);e.KIND_OF_MQ="MathField",e.editable=!0,e.createTextarea(),e.editablesTextareaEvents(),e.cursor.insAtRightEnd(e.root),h(e.root)},t.registerInnerField=function(t,e){t.push(t[this.name]=e(this.ends[w].controller))},t.latex=function(){return this.ends[w].latex()},t.text=function(){return this.ends[w].text()}}),gt=j.embed=v(N,function(t,e){t.setOptions=function(t){function e(){return""}return this.text=t.text||e,this.htmlTemplate=t.htmlString||"",this.latex=t.latex||e,this},t.parser=function(){var t=this,e=B.string,n=B.regex,i=B.succeed;return e("{").then(n(/^[a-z][a-z0-9]*/i)).skip(e("}")).then(function(s){return e("[").then(n(/^[-\w\s]*/)).skip(e("]")).or(i()).map(function(e){return t.setOptions(A[s](e))})})}}),bt={},j.begin=v(P,function(t,e){t.parser=function(){var t=B.string,e=B.regex;return t("{").then(e(/^[a-z]+/i)).skip(t("}")).then(function(e){return(bt[e]?bt[e]().parser():B.fail("unknown environment type: "+e)).skip(t("\\end{"+e+"}"))})}}),vt=v(P,function(t,e){t.template=[["\\begin{","}"],["\\end{","}"]],t.wrappers=function(){return[t.template[0].join(this.environment),t.template[1].join(this.environment)]}}),wt=bt.matrix=v(vt,function(t,e){var n={column:"&",row:"\\\\"};t.parentheses={left:null,right:null},t.environment="matrix",t.reflow=function(){var t=this.jQ.children("table"),e=t.outerHeight()/+t.css("fontSize").slice(0,-2),n=this.jQ.children(".mq-paren");n.length&&Z(n,$t(1+.2*(e-1),1.2),1.05*e)},t.latex=function(){var t,e="";return this.eachChild(function(i){void 0!==t&&(e+=t!==i.row?n.row:n.column),t=i.row,e+=i.latex()}),this.wrappers().join(e)},t.html=function(){function t(t){return t?'<span class="mq-scaled mq-paren">'+t+"</span>":""}var n,i=[],s="",r=0;return this.eachChild(function(t){n!==t.row&&(n=t.row,s+="<tr>$tds</tr>",i[n]=[]),i[n].push("<td>&"+r+++"</td>")}),this.htmlTemplate='<span class="mq-matrix mq-non-leaf">'+t(this.parentheses.left)+'<table class="mq-non-leaf">'+s.replace(/\$tds/g,function(){return i.shift().join("")})+"</table>"+t(this.parentheses.right)+"</span>",e.html.call(this)},t.createBlocks=function(){this.blocks=[qt(0,this),qt(0,this),qt(1,this),qt(1,this)]},t.parser=function(){var t=this,e=B.optWhitespace,i=B.string;return e.then(i(n.column).or(i(n.row)).or(F.block)).many().skip(e).then(function(e){function i(){t.blocks.push(qt(o,t,r)),r=[]}var s,r=[],o=0;for(t.blocks=[],s=0;s<e.length;s+=1)e[s]instanceof V?r.push(e[s]):(i(),e[s]===n.row&&(o+=1));return i(),t.autocorrect(),B.succeed(t)})},t.finalizeTree=function(){var t=this.jQ.find("table");t.toggleClass("mq-rows-1",1===t.find("tr").length),this.relink()},t.getEntryPoint=function(t,e,n){return"up"===n?t===w?this.blocks[this.rowSize-1]:this.blocks[0]:t===w?this.blocks[this.blocks.length-1]:this.blocks[this.blocks.length-this.rowSize]},t.atExitPoint=function(t,e){var n=this.blocks.indexOf(e.parent);return t===w?n%this.rowSize==0:(n+1)%this.rowSize==0},t.moveTowards=function(t,e,n){var i=n&&this.getEntryPoint(t,e,n);e.insAtDirEnd(-t,i||this.ends[-t])},t.relink=function(){var t,e,n,i,s=this.blocks,r=[];for(this.rowSize=s.length,i=0;i<s.length;i+=1)n=s[i],t!==n.row&&(1===n.row&&(this.rowSize=e),t=n.row,r[t]=[],e=0),r[t][e]=n,n[q]=s[i+1],n[w]=s[i-1],r[t-1]&&r[t-1][e]&&(n.upOutOf=r[t-1][e],r[t-1][e].downOutOf=n),e+=1;this.ends[w]=s[0],this.ends[q]=s[s.length-1]},t.autocorrect=function(t){var e,n,i,s,r,o,a=[];for(t=[],e=this.blocks,o=0;o<e.length;o+=1)r=e[o].row,t[r]=t[r]||[],t[r].push(e[o]),a[r]=t[r].length;if((n=Math.max.apply(null,a))!==Math.min.apply(null,a)){for(o=0;o<t.length;o+=1)for(i=n-t[o].length;i;)s=n*o+t[o].length,e.splice(s,0,qt(o,this)),i-=1;this.relink()}},t.deleteCell=function(t){function e(t){var e,n=[];for(e=0;e<t.length;e+=1)t[e].isEmpty()&&n.push(t[e]);return n.length===t.length}function n(t){for(var e=0;e<t.length;e+=1)c.indexOf(t[e])>-1&&(t[e].remove(),c.splice(c.indexOf(t[e]),1))}var i,s,r=[],o=[],a=[],l=[],c=this.blocks;this.eachChild(function(e){i!==e.row&&(i=e.row,r[i]=[],s=0),o[s]=o[s]||[],o[s].push(e),r[i].push(e),e===t&&(a=r[i],l=o[s]),s+=1}),e(a)&&l.length>1&&(i=r.indexOf(a),this.eachChild(function(t){t.row>i&&(t.row-=1)}),n(a),this.jQ.find("tr").eq(i).remove()),e(l)&&a.length>1&&n(l),this.finalizeTree()},t.addRow=function(t){var e,n,i,s=[],r=[],o=[],a=x("<tr></tr>"),l=t.row,c=0;for(this.eachChild(function(e){e.row<=l&&s.push(e),e.row===l&&(e===t&&(n=c),c+=1),e.row>l&&(e.row+=1,o.push(e))}),i=0;i<c;i+=1)e=qt(l+1),e.parent=this,r.push(e),e.jQ=x('<td class="mq-empty">').attr(Ft,e.id).appendTo(a);return this.jQ.find("tr").eq(l).after(a),this.blocks=s.concat(r,o),r[n]},t.addColumn=function(t){var e,n,i,s=[],r=[];for(this.eachChild(function(n){
s[n.row]=s[n.row]||[],s[n.row].push(n),n===t&&(e=s[n.row].length)}),i=0;i<s.length;i+=1)n=qt(i),n.parent=this,r.push(n),s[i].splice(e,0,n),n.jQ=x('<td class="mq-empty">').attr(Ft,n.id);return this.jQ.find("tr").each(function(t){x(this).find("td").eq(e-1).after(s[t][e].jQ)}),this.blocks=[].concat.apply([],s),r[t.row]},t.insert=function(t,e){var n=this[t](e);this.cursor=this.cursor||this.parent.cursor,this.finalizeTree(),this.bubble("reflow").cursor.insAtRightEnd(n)},t.backspace=function(t,e,n,i){var s=t[e];if(t.isEmpty()){for(this.deleteCell(t);s&&s[e]&&-1===this.blocks.indexOf(s);)s=s[e];s&&n.insAtDirEnd(-e,s),1===this.blocks.length&&this.blocks[0].isEmpty()&&(i(),this.finalizeTree()),this.bubble("edited")}}}),bt.pmatrix=v(wt,function(t,e){t.environment="pmatrix",t.parentheses={left:"(",right:")"}}),bt.bmatrix=v(wt,function(t,e){t.environment="bmatrix",t.parentheses={left:"[",right:"]"}}),bt.Bmatrix=v(wt,function(t,e){t.environment="Bmatrix",t.parentheses={left:"{",right:"}"}}),bt.vmatrix=v(wt,function(t,e){t.environment="vmatrix",t.parentheses={left:"|",right:"|"}}),bt.Vmatrix=v(wt,function(t,e){t.environment="Vmatrix",t.parentheses={left:"&#8214;",right:"&#8214;"}}),qt=v(V,function(t,e){t.init=function(t,n,i){if(e.init.call(this),this.row=t,n&&this.adopt(n,n.ends[q],0),i)for(var s=0;s<i.length;s++)i[s].children().adopt(this,this.ends[q],0)},t.keystroke=function(t,n,i){switch(t){case"Shift-Spacebar":return n.preventDefault(),this.parent.insert("addColumn",this);case"Shift-Enter":return this.parent.insert("addRow",this)}return e.keystroke.apply(this,arguments)},t.deleteOutOf=function(t,n){var i=this,s=arguments;this.parent.backspace(this,t,n,function(){return e.deleteOutOf.apply(i,s)})},t.moveOutOf=function(t,e,n){n&&this.parent.atExitPoint(t,e)||!this[t]?e.insDirOf(t,this.parent):e.insAtDirEnd(-t,this[t])}}),j.notin=j.cong=j.equiv=j.oplus=j.otimes=v(U,function(t,e){t.init=function(t){e.init.call(this,"\\"+t+" ","&"+t+";")}}),j["≠"]=j.ne=j.neq=i(U,"\\ne ","&ne;"),j["∗"]=j.ast=j.star=j.loast=j.lowast=i(U,"\\ast ","&lowast;"),j.therefor=j.therefore=i(U,"\\therefore ","&there4;"),j.cuz=j.because=i(U,"\\because ","&#8757;"),j.prop=j.propto=i(U,"\\propto ","&prop;"),j["≈"]=j.asymp=j.approx=i(U,"\\approx ","&asymp;"),j.isin=j.in=i(U,"\\in ","&isin;"),j.ni=j.contains=i(U,"\\ni ","&ni;"),j.notni=j.niton=j.notcontains=j.doesnotcontain=i(U,"\\not\\ni ","&#8716;"),j.sub=j.subset=i(U,"\\subset ","&sub;"),j.sup=j.supset=j.superset=i(U,"\\supset ","&sup;"),j.nsub=j.notsub=j.nsubset=j.notsubset=i(U,"\\not\\subset ","&#8836;"),j.nsup=j.notsup=j.nsupset=j.notsupset=j.nsuperset=j.notsuperset=i(U,"\\not\\supset ","&#8837;"),j.sube=j.subeq=j.subsete=j.subseteq=i(U,"\\subseteq ","&sube;"),j.supe=j.supeq=j.supsete=j.supseteq=j.supersete=j.superseteq=i(U,"\\supseteq ","&supe;"),j.nsube=j.nsubeq=j.notsube=j.notsubeq=j.nsubsete=j.nsubseteq=j.notsubsete=j.notsubseteq=i(U,"\\not\\subseteq ","&#8840;"),j.nsupe=j.nsupeq=j.notsupe=j.notsupeq=j.nsupsete=j.nsupseteq=j.notsupsete=j.notsupseteq=j.nsupersete=j.nsuperseteq=j.notsupersete=j.notsuperseteq=i(U,"\\not\\supseteq ","&#8841;"),j.N=j.naturals=j.Naturals=i(W,"\\mathbb{N}","&#8469;"),j.P=j.primes=j.Primes=j.projective=j.Projective=j.probability=j.Probability=i(W,"\\mathbb{P}","&#8473;"),j.Z=j.integers=j.Integers=i(W,"\\mathbb{Z}","&#8484;"),j.Q=j.rationals=j.Rationals=i(W,"\\mathbb{Q}","&#8474;"),j.R=j.reals=j.Reals=i(W,"\\mathbb{R}","&#8477;"),j.C=j.complex=j.Complex=j.complexes=j.Complexes=j.complexplane=j.Complexplane=j.ComplexPlane=i(W,"\\mathbb{C}","&#8450;"),j.H=j.Hamiltonian=j.quaternions=j.Quaternions=i(W,"\\mathbb{H}","&#8461;"),j.quad=j.emsp=i(W,"\\quad ","    "),j.qquad=i(W,"\\qquad ","        "),j.diamond=i(W,"\\diamond ","&#9671;"),j.bigtriangleup=i(W,"\\bigtriangleup ","&#9651;"),j.ominus=i(W,"\\ominus ","&#8854;"),j.uplus=i(W,"\\uplus ","&#8846;"),j.bigtriangledown=i(W,"\\bigtriangledown ","&#9661;"),j.sqcap=i(W,"\\sqcap ","&#8851;"),j.triangleleft=i(W,"\\triangleleft ","&#8882;"),j.sqcup=i(W,"\\sqcup ","&#8852;"),j.triangleright=i(W,"\\triangleright ","&#8883;"),j.odot=j.circledot=i(W,"\\odot ","&#8857;"),j.bigcirc=i(W,"\\bigcirc ","&#9711;"),j.dagger=i(W,"\\dagger ","&#0134;"),j.ddagger=i(W,"\\ddagger ","&#135;"),j.wr=i(W,"\\wr ","&#8768;"),j.amalg=i(W,"\\amalg ","&#8720;"),j.models=i(W,"\\models ","&#8872;"),j.prec=i(W,"\\prec ","&#8826;"),j.succ=i(W,"\\succ ","&#8827;"),j.preceq=i(W,"\\preceq ","&#8828;"),j.succeq=i(W,"\\succeq ","&#8829;"),j.simeq=i(W,"\\simeq ","&#8771;"),j.mid=i(W,"\\mid ","&#8739;"),j.ll=i(W,"\\ll ","&#8810;"),j.gg=i(W,"\\gg ","&#8811;"),j.parallel=i(W,"\\parallel ","&#8741;"),j.nparallel=i(W,"\\nparallel ","&#8742;"),j.bowtie=i(W,"\\bowtie ","&#8904;"),j.sqsubset=i(W,"\\sqsubset ","&#8847;"),j.sqsupset=i(W,"\\sqsupset ","&#8848;"),j.smile=i(W,"\\smile ","&#8995;"),j.sqsubseteq=i(W,"\\sqsubseteq ","&#8849;"),j.sqsupseteq=i(W,"\\sqsupseteq ","&#8850;"),j.doteq=i(W,"\\doteq ","&#8784;"),j.frown=i(W,"\\frown ","&#8994;"),j.vdash=i(W,"\\vdash ","&#8870;"),j.dashv=i(W,"\\dashv ","&#8867;"),j.nless=i(W,"\\nless ","&#8814;"),j.ngtr=i(W,"\\ngtr ","&#8815;"),j.longleftarrow=i(W,"\\longleftarrow ","&#8592;"),j.longrightarrow=i(W,"\\longrightarrow ","&#8594;"),j.Longleftarrow=i(W,"\\Longleftarrow ","&#8656;"),j.Longrightarrow=i(W,"\\Longrightarrow ","&#8658;"),j.longleftrightarrow=i(W,"\\longleftrightarrow ","&#8596;"),j.updownarrow=i(W,"\\updownarrow ","&#8597;"),j.Longleftrightarrow=i(W,"\\Longleftrightarrow ","&#8660;"),j.Updownarrow=i(W,"\\Updownarrow ","&#8661;"),j.mapsto=i(W,"\\mapsto ","&#8614;"),j.nearrow=i(W,"\\nearrow ","&#8599;"),j.hookleftarrow=i(W,"\\hookleftarrow ","&#8617;"),j.hookrightarrow=i(W,"\\hookrightarrow ","&#8618;"),j.searrow=i(W,"\\searrow ","&#8600;"),j.leftharpoonup=i(W,"\\leftharpoonup ","&#8636;"),j.rightharpoonup=i(W,"\\rightharpoonup ","&#8640;"),j.swarrow=i(W,"\\swarrow ","&#8601;"),j.leftharpoondown=i(W,"\\leftharpoondown ","&#8637;"),j.rightharpoondown=i(W,"\\rightharpoondown ","&#8641;"),j.nwarrow=i(W,"\\nwarrow ","&#8598;"),j.ldots=i(W,"\\ldots ","&#8230;"),j.cdots=i(W,"\\cdots ","&#8943;"),j.vdots=i(W,"\\vdots ","&#8942;"),j.ddots=i(W,"\\ddots ","&#8945;"),j.surd=i(W,"\\surd ","&#8730;"),j.triangle=i(W,"\\triangle ","&#9651;"),j.ell=i(W,"\\ell ","&#8467;"),j.top=i(W,"\\top ","&#8868;"),j.flat=i(W,"\\flat ","&#9837;"),j.natural=i(W,"\\natural ","&#9838;"),j.sharp=i(W,"\\sharp ","&#9839;"),j.wp=i(W,"\\wp ","&#8472;"),j.bot=i(W,"\\bot ","&#8869;"),j.clubsuit=i(W,"\\clubsuit ","&#9827;"),j.diamondsuit=i(W,"\\diamondsuit ","&#9826;"),j.heartsuit=i(W,"\\heartsuit ","&#9825;"),j.spadesuit=i(W,"\\spadesuit ","&#9824;"),j.parallelogram=i(W,"\\parallelogram ","&#9649;"),j.square=i(W,"\\square ","&#11036;"),j.oint=i(W,"\\oint ","&#8750;"),j.bigcap=i(W,"\\bigcap ","&#8745;"),j.bigcup=i(W,"\\bigcup ","&#8746;"),j.bigsqcup=i(W,"\\bigsqcup ","&#8852;"),j.bigvee=i(W,"\\bigvee ","&#8744;"),j.bigwedge=i(W,"\\bigwedge ","&#8743;"),j.bigodot=i(W,"\\bigodot ","&#8857;"),j.bigotimes=i(W,"\\bigotimes ","&#8855;"),j.bigoplus=i(W,"\\bigoplus ","&#8853;"),j.biguplus=i(W,"\\biguplus ","&#8846;"),j.lfloor=i(W,"\\lfloor ","&#8970;"),j.rfloor=i(W,"\\rfloor ","&#8971;"),j.lceil=i(W,"\\lceil ","&#8968;"),j.rceil=i(W,"\\rceil ","&#8969;"),j.opencurlybrace=j.lbrace=i(W,"\\lbrace ","{"),j.closecurlybrace=j.rbrace=i(W,"\\rbrace ","}"),j.lbrack=i(W,"["),j.rbrack=i(W,"]"),j.slash=i(W,"/"),j.vert=i(W,"|"),j.perp=j.perpendicular=i(W,"\\perp ","&perp;"),j.nabla=j.del=i(W,"\\nabla ","&nabla;"),j.hbar=i(W,"\\hbar ","&#8463;"),j.AA=j.Angstrom=j.angstrom=i(W,"\\text\\AA ","&#8491;"),j.ring=j.circ=j.circle=i(W,"\\circ ","&#8728;"),j.bull=j.bullet=i(W,"\\bullet ","&bull;"),j.setminus=j.smallsetminus=i(W,"\\setminus ","&#8726;"),j.not=j["¬"]=j.neg=i(W,"\\neg ","&not;"),j["…"]=j.dots=j.ellip=j.hellip=j.ellipsis=j.hellipsis=i(W,"\\dots ","&hellip;"),j.converges=j.darr=j.dnarr=j.dnarrow=j.downarrow=i(W,"\\downarrow ","&darr;"),j.dArr=j.dnArr=j.dnArrow=j.Downarrow=i(W,"\\Downarrow ","&dArr;"),j.diverges=j.uarr=j.uparrow=i(W,"\\uparrow ","&uarr;"),j.uArr=j.Uparrow=i(W,"\\Uparrow ","&uArr;"),j.to=i(U,"\\to ","&rarr;"),j.rarr=j.rightarrow=i(W,"\\rightarrow ","&rarr;"),j.implies=i(U,"\\Rightarrow ","&rArr;"),j.rArr=j.Rightarrow=i(W,"\\Rightarrow ","&rArr;"),j.gets=i(U,"\\gets ","&larr;"),j.larr=j.leftarrow=i(W,"\\leftarrow ","&larr;");j.impliedby=i(U,"\\Leftarrow ","&lArr;"),j.lArr=j.Leftarrow=i(W,"\\Leftarrow ","&lArr;"),j.harr=j.lrarr=j.leftrightarrow=i(W,"\\leftrightarrow ","&harr;"),j.iff=i(U,"\\Leftrightarrow ","&hArr;"),j.hArr=j.lrArr=j.Leftrightarrow=i(W,"\\Leftrightarrow ","&hArr;"),j.Re=j.Real=j.real=i(W,"\\Re ","&real;"),j.Im=j.imag=j.image=j.imagin=j.imaginary=j.Imaginary=i(W,"\\Im ","&image;"),j.part=j.partial=i(W,"\\partial ","&part;"),j.infty=j.infin=j.infinity=i(W,"\\infty ","&infin;"),j.alef=j.alefsym=j.aleph=j.alephsym=i(W,"\\aleph ","&alefsym;"),j.xist=j.xists=j.exist=j.exists=i(W,"\\exists ","&exist;"),j.nexists=j.nexist=i(W,"\\nexists ","&#8708;"),j.and=j.land=j.wedge=i(U,"\\wedge ","&and;"),j.or=j.lor=j.vee=i(U,"\\vee ","&or;"),j.o=j.O=j.empty=j.emptyset=j.oslash=j.Oslash=j.nothing=j.varnothing=i(U,"\\varnothing ","&empty;"),j.cup=j.union=i(U,"\\cup ","&cup;"),j.cap=j.intersect=j.intersection=i(U,"\\cap ","&cap;"),j.deg=j.degree=i(W,"\\degree ","&deg;"),j.ang=j.angle=i(W,"\\angle ","&ang;"),j.measuredangle=i(W,"\\measuredangle ","&#8737;"),xt=v(W,function(t,e){t.createLeftOf=function(t){t.options.autoSubscriptNumerals&&t.parent!==t.parent.parent.sub&&(t[w]instanceof yt&&!1!==t[w].isItalic||t[w]instanceof ot&&t[w][w]instanceof yt&&!1!==t[w][w].isItalic)?(j._().createLeftOf(t),e.createLeftOf.call(this,t),t.insRightOf(t.parent.parent)):e.createLeftOf.call(this,t)}}),yt=v(N,function(t,e){t.init=function(t,n){e.init.call(this,t,"<var>"+(n||t)+"</var>")},t.text=function(){var t=this.ctrlSeq;return this.isPartOfOperator?"\\"==t[0]?t=t.slice(1,t.length):" "==t[t.length-1]&&(t=t.slice(0,-1)):(!this[w]||this[w]instanceof yt||this[w]instanceof U||"\\ "===this[w].ctrlSeq||(t="*"+t),!this[q]||this[q]instanceof U||this[q]instanceof ot||(t+="*")),t}}),D.p.autoCommands={_maxLength:0},E.autoCommands=function(t){var e,n,i,s,r;if(!/^[a-z]+(?: [a-z]+)*$/i.test(t))throw'"'+t+'" not a space-delimited list of only letters';for(e=t.split(" "),n={},i=0,s=0;s<e.length;s+=1){if(r=e[s],r.length<2)throw'autocommand "'+r+'" not minimum length of 2';if(j[r]===Tt)throw'"'+r+'" is a built-in operator name';n[r]=1,i=Pt(i,r.length)}return n._maxLength=i,n},Ot=v(yt,function(t,e){function n(t){return!t||t instanceof U||t instanceof at}t.init=function(t){return e.init.call(this,this.letter=t)},t.createLeftOf=function(t){var n,i,s,r,o;if(e.createLeftOf.apply(this,arguments),n=t.options.autoCommands,i=n._maxLength,i>0){for(s="",r=this,o=0;r instanceof Ot&&r.ctrlSeq===r.letter&&o<i;)s=r.letter+s,r=r[w],o+=1;for(;s.length;){if(n.hasOwnProperty(s)){for(o=1,r=this;o<s.length;o+=1,r=r[w]);return k(r,this).remove(),t[w]=r[w],j[s](s).createLeftOf(t)}s=s.slice(1)}}},t.italicize=function(t){return this.isItalic=t,this.isPartOfOperator=!t,this.jQ.toggleClass("mq-operator-name",!t),this},t.finalizeTree=t.siblingDeleted=t.siblingCreated=function(t,e){e!==w&&this[q]instanceof Ot||this.autoUnItalicize(t)},t.autoUnItalicize=function(t){var e,i,s,r,o,a,l,c,h,u,f,p,d=t.autoOperatorNames;if(0!==d._maxLength){for(e=this.letter,i=this[w];i instanceof Ot;i=i[w])e=i.letter+e;for(s=this[q];s instanceof Ot;s=s[q])e+=s.letter;k(i[q]||this.parent.ends[w],s[w]||this.parent.ends[q]).each(function(t){t.italicize(!0).jQ.removeClass("mq-first mq-last mq-followed-by-supsub"),t.ctrlSeq=t.letter});t:for(r=0,o=i[q]||this.parent.ends[w];r<e.length;r+=1,o=o[q])for(a=$t(d._maxLength,e.length-r);a>0;a-=1)if(l=e.slice(r,r+a),d.hasOwnProperty(l)){for(c=0,h=o;c<a;c+=1,h=h[q])h.italicize(!1),u=h;f=kt.hasOwnProperty(l),o.ctrlSeq=(f?"\\":"\\operatorname{")+o.ctrlSeq,u.ctrlSeq+=f?" ":"}",Qt.hasOwnProperty(l)&&u[w][w][w].jQ.addClass("mq-last"),n(o[w])||o.jQ.addClass("mq-first"),n(u[q])||(u[q]instanceof ot?(p=u[q],(p.siblingCreated=p.siblingDeleted=function(){p.jQ.toggleClass("mq-after-operator-name",!(p[q]instanceof pt))})()):u.jQ.toggleClass("mq-last",!(u[q]instanceof pt))),r+=a-1,o=u;continue t}}}}),kt={},jt=D.p.autoOperatorNames={_maxLength:9},Qt={limsup:1,liminf:1,projlim:1,injlim:1},function(){var t,e,n,i,s="arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr".split(" ");for(t=0;t<s.length;t+=1)kt[s[t]]=jt[s[t]]=1;for(e="sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth".split(" "),t=0;t<e.length;t+=1)kt[e[t]]=1;for(n="sin cos tan sec cosec csc cotan cot ctg".split(" "),t=0;t<n.length;t+=1)jt[n[t]]=jt["arc"+n[t]]=jt[n[t]+"h"]=jt["ar"+n[t]+"h"]=jt["arc"+n[t]+"h"]=1;for(i="gcf hcf lcm proj span".split(" "),t=0;t<i.length;t+=1)jt[i[t]]=1}(),E.autoOperatorNames=function(t){var e,n,i,s,r;if(!/^[a-z]+(?: [a-z]+)*$/i.test(t))throw'"'+t+'" not a space-delimited list of only letters';for(e=t.split(" "),n={},i=0,s=0;s<e.length;s+=1){if(r=e[s],r.length<2)throw'"'+r+'" not minimum length of 2';n[r]=1,i=Pt(i,r.length)}return n._maxLength=i,n},Tt=v(N,function(t,e){t.init=function(t){this.ctrlSeq=t},t.createLeftOf=function(t){var e,n=this.ctrlSeq;for(e=0;e<n.length;e+=1)Ot(n.charAt(e)).createLeftOf(t)},t.parser=function(){var t,e=this.ctrlSeq,n=V();for(t=0;t<e.length;t+=1)Ot(e.charAt(t)).adopt(n,n.ends[q],0);return B.succeed(n.children())}});for(Ct in jt)jt.hasOwnProperty(Ct)&&(j[Ct]=Tt);j.operatorname=v(P,function(e){e.createLeftOf=t,e.numBlocks=function(){return 1},e.parser=function(){return F.block.map(function(t){return t.children()})}}),j.f=v(Ot,function(t,e){t.init=function(){N.p.init.call(this,this.letter="f",'<var class="mq-f">f</var>')},t.italicize=function(t){return this.jQ.html("f").toggleClass("mq-f",t),e.italicize.apply(this,arguments)}}),j[" "]=j.space=i(W,"\\ ","&nbsp;"),j["'"]=j.prime=i(W,"'","&prime;"),j["″"]=j.dprime=i(W,"″","&Prime;"),j.backslash=i(W,"\\backslash ","\\"),Q["\\"]||(Q["\\"]=j.backslash),j.$=i(W,"\\$","$"),St=v(N,function(t,e){t.init=function(t,n){e.init.call(this,t,'<span class="mq-nonSymbola">'+(n||t)+"</span>")}}),j["@"]=St,j["&"]=i(St,"\\&","&amp;"),j["%"]=i(St,"\\%","%"),j.alpha=j.beta=j.gamma=j.delta=j.zeta=j.eta=j.theta=j.iota=j.kappa=j.mu=j.nu=j.xi=j.rho=j.sigma=j.tau=j.chi=j.psi=j.omega=v(yt,function(t,e){t.init=function(t){e.init.call(this,"\\"+t+" ","&"+t+";")}}),j.phi=i(yt,"\\phi ","&#981;"),j.phiv=j.varphi=i(yt,"\\varphi ","&phi;"),j.epsilon=i(yt,"\\epsilon ","&#1013;"),j.epsiv=j.varepsilon=i(yt,"\\varepsilon ","&epsilon;"),j.piv=j.varpi=i(yt,"\\varpi ","&piv;"),j.sigmaf=j.sigmav=j.varsigma=i(yt,"\\varsigma ","&sigmaf;"),j.thetav=j.vartheta=j.thetasym=i(yt,"\\vartheta ","&thetasym;"),j.upsilon=j.upsi=i(yt,"\\upsilon ","&upsilon;"),j.gammad=j.Gammad=j.digamma=i(yt,"\\digamma ","&#989;"),j.kappav=j.varkappa=i(yt,"\\varkappa ","&#1008;"),j.rhov=j.varrho=i(yt,"\\varrho ","&#1009;"),j.pi=j["π"]=i(St,"\\pi ","&pi;"),j.lambda=i(St,"\\lambda ","&lambda;"),j.Upsilon=j.Upsi=j.upsih=j.Upsih=i(N,"\\Upsilon ",'<var style="font-family: serif">&upsih;</var>'),j.Gamma=j.Delta=j.Theta=j.Lambda=j.Xi=j.Pi=j.Sigma=j.Phi=j.Psi=j.Omega=j.forall=v(W,function(t,e){t.init=function(t){e.init.call(this,"\\"+t+" ","&"+t+";")}}),_t=v(P,function(t){t.init=function(t){this.latex=t},t.createLeftOf=function(t){var e=F.parse(this.latex);e.children().adopt(t.parent,t[w],t[q]),t[w]=e.ends[q],e.jQize().insertBefore(t.jQ),e.finalizeInsert(t.options,t),e.ends[q][q].siblingCreated&&e.ends[q][q].siblingCreated(t.options,w),e.ends[w][w].siblingCreated&&e.ends[w][w].siblingCreated(t.options,q),t.parent.bubble("reflow")},t.parser=function(){var t=F.parse(this.latex).children();return B.succeed(t)}}),j["¹"]=i(_t,"^1"),j["²"]=i(_t,"^2"),j["³"]=i(_t,"^3"),j["¼"]=i(_t,"\\frac14"),j["½"]=i(_t,"\\frac12"),j["¾"]=i(_t,"\\frac34"),Dt=v(U,function(t){t.init=W.prototype.init,t.contactWeld=t.siblingCreated=t.siblingDeleted=function(t,e){function n(t){return t[w]?t[w]instanceof U||/^[,;:\(\[]$/.test(t[w].ctrlSeq)?"":"mq-binary-operator":t.parent&&t.parent.parent&&t.parent.parent.isStyleBlock()?n(t.parent.parent):""}if(e!==q)return this.jQ[0].className=n(this),this}}),j["+"]=i(Dt,"+","+"),j["–"]=j["-"]=i(Dt,"-","&minus;"),j["±"]=j.pm=j.plusmn=j.plusminus=i(Dt,"\\pm ","&plusmn;"),j.mp=j.mnplus=j.minusplus=i(Dt,"\\mp ","&#8723;"),Q["*"]=j.sdot=j.cdot=i(U,"\\cdot ","&middot;","*"),Et=v(U,function(t,e){t.init=function(t,n){this.data=t,this.strict=n;var i=n?"Strict":"";e.init.call(this,t["ctrlSeq"+i],t["html"+i],t["text"+i])},t.swap=function(t){this.strict=t;var e=t?"Strict":"";this.ctrlSeq=this.data["ctrlSeq"+e],this.jQ.html(this.data["html"+e]),this.textTemplate=[this.data["text"+e]]},t.deleteTowards=function(t,n){if(t===w&&!this.strict)return this.swap(!0),void this.bubble("reflow");e.deleteTowards.apply(this,arguments)}}),Lt={ctrlSeq:"\\le ",html:"&le;",text:"≤",ctrlSeqStrict:"<",htmlStrict:"&lt;",textStrict:"<"},At={ctrlSeq:"\\ge ",html:"&ge;",text:"≥",ctrlSeqStrict:">",htmlStrict:"&gt;",textStrict:">"},j["<"]=j.lt=i(Et,Lt,!0),j[">"]=j.gt=i(Et,At,!0),j["≤"]=j.le=j.leq=i(Et,Lt,!1),j["≥"]=j.ge=j.geq=i(Et,At,!1),Rt=v(U,function(t,e){t.init=function(){e.init.call(this,"=","=")},t.createLeftOf=function(t){if(t[w]instanceof Et&&t[w].strict)return t[w].swap(!1),void t[w].bubble("reflow");e.createLeftOf.apply(this,arguments)}}),j["="]=Rt,j["×"]=j.times=i(U,"\\times ","&times;","[x]"),j["÷"]=j.div=j.divide=j.divides=i(U,"\\div ","&divide;","[/]"),Q["~"]=j.sim=i(U,"\\sim ","~","~"),zt=c(1);for(It in zt)!function(t,e){"function"==typeof e?(l[t]=function(){return a(),e.apply(this,arguments)},l[t].prototype=e.prototype):l[t]=e}(It,zt[It])};


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ QuizzComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(50);
/* harmony import */ var _dropdownWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _mchoiceWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
/* harmony import */ var _numericWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);
/* harmony import */ var _clozeWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57);
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






var SEARCH_QUERY = ".ib-quizz-elem";
function textNodesUnder(el) {
  var a = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  var n = walk.nextNode();
  while (n != null) {
    a.push(n);
    n = walk.nextNode();
  }
  return a;
}
var QuizzComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_4__.Component)({
  name: "quizz",
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
    // Determine the lang --> Pass to form components
    _defineProperty(_assertThisInitialized(_this), "groupContext", {
      s: '',
      _s: {},
      o: {
        hint: 2,
        ans: 4
      }
    });
    var searchLang = parent.getAttribute("data-lang");
    if (!searchLang) {
      var _parent$parentElement;
      searchLang = ((_parent$parentElement = parent.parentElement) === null || _parent$parentElement === void 0 ? void 0 : _parent$parentElement.getAttribute("data-lang")) || null;
    }
    // Determine the groupContext --> Pass to form components
    var contextRaw64 = parent.getAttribute("data-quizz-group") || '';
    try {
      var contextRaw = atob(contextRaw64) || '{}';
      console.log(contextRaw);
      var context = JSON.parse(contextRaw);
      _this.groupContext = Object.assign(_this.groupContext, context);
      console.log(contextRaw, context, _this.groupContext);
    } catch (ex) {
      console.error(ex);
    }
    _this.lang = searchLang || "ca";
    // Must generate an instance of the group vars into map _v
    _this.generateGroup();

    // Must find placeholders in the dom by replacing #key by _v[#key]
    _this.findPlaceholders();
    _this.allQuizzElements = _this.parent.querySelectorAll(SEARCH_QUERY);
    console.log(_this.allQuizzElements);
    _this.checkButton = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.createElement)("button", {
      "class": "btn btn-sm btn-primary d-print-none",
      style: "margin: 10px",
      html: '<i class="fa fas fa-check"></i> ' + (0,_i18n__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.lang, 'check')
    });
    _this.parent.append(_this.checkButton);
    _this.listener = function (evt) {
      evt.preventDefault();
      var check = true;
      _this.allQuizzElements.forEach(function (quizzElem) {
        var partial = quizzElem.check();
        check = check && partial;
      });
      if (check) {
        // All widgets are correct. Then disable the check button
        _this.checkButton.setAttribute("disabled", "true");
      }
    };
    return _this;
  }
  _createClass(QuizzComponent, [{
    key: "generateGroup",
    value: function generateGroup() {
      var utilities = {};
      Object.defineProperty(utilities, "alea", {
        value: function value(a, b) {
          return Math.floor((b - a) * Math.random()) + a;
        },
        enumerable: true,
        configurable: false,
        writable: false
      });
      Object.defineProperty(utilities, "dec", {
        value: function value(v, n) {
          var p = Math.pow(10, n);
          return Math.floor(v * p) / p;
        },
        enumerable: true,
        configurable: false,
        writable: false
      });
      try {
        (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_7__.runInScope)('var _this=this;\n' + this.groupContext.s.replace(/#/g, '_this.'), utilities, this.groupContext._s);
      } catch (ex) {
        console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
      }

      //Tell the user that this quizz contains random questions
      if (this.groupContext.s.trim().length) {
        var noticeDiv = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.createElement)('div', {
          "class": 'alert alert-info',
          html: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" style=\"height:20px;\"><path fill=\"#154b5e\" d=\"M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z\"/></svg> \n                <small>".concat((0,_i18n__WEBPACK_IMPORTED_MODULE_6__["default"])(this.lang, 'random_msg'), "</small>")
        });
        var secondChild = this.parent.querySelector(':nth-child(2)');
        if ((secondChild === null || secondChild === void 0 ? void 0 : secondChild.nodeName) === 'H4') {
          this.parent.insertBefore(noticeDiv, secondChild.nextSibling);
        } else {
          this.parent.prepend(noticeDiv);
        }
      }
    }
  }, {
    key: "findPlaceholders",
    value: function findPlaceholders() {
      var _this2 = this;
      if (this.groupContext.s.trim().length === 0) {
        return; //Nothing to do
      }

      textNodesUnder(this.parent).forEach(function (textNode) {
        var valor = textNode.nodeValue || '';
        if (valor.indexOf('#') < 0) {
          return;
        }
        var interpolated = valor.replace(/#([a-zA-Z0-9_]+)/g, function ($0, $1) {
          return _this2.groupContext._s[$1];
        });
        textNode.nodeValue = interpolated;
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;
      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";
      this.checkButton.addEventListener("click", this.listener);
      //Pass language to all QuizzElements
      this.allQuizzElements.forEach(function (quizzElem) {
        if (typeof quizzElem.setLang !== 'function') {
          console.error("No custom element registered for ", quizzElem);
          return;
        }
        quizzElem.setLang(_this3.lang);
        quizzElem.setGroupContext(_this3.groupContext);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var ds = this.parent.dataset;
      if (ds.active === "0") {
        return;
      }
      this.parent.removeAttribute("data-active");
      this.checkButton.removeEventListener("click", this.listener);
    }
  }]);
  return QuizzComponent;
}(_base__WEBPACK_IMPORTED_MODULE_8__.BaseComponent)) || _class);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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
    var _this;
    _classCallCheck(this, IBQuizzDropdown);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "userAns", -1);
    return _this;
  }
  _createClass(IBQuizzDropdown, [{
    key: "enable",
    value: function enable(state) {
      if (!this.button) {
        return;
      }
      if (state) {
        this.button.disabled = false;
      } else {
        this.button.disabled = true;
      }
    }
  }, {
    key: "getUserInput",
    value: function getUserInput() {
      return this.userAns + "";
    }
  }, {
    key: "displayRightAnswer",
    value: function displayRightAnswer() {
      this.enable(false);
    }
  }, {
    key: "check",
    value: function check() {
      var _this$widgetConfig;
      var result = ((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) === this.userAns + "";
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
      this.enable(!result);
      if (result) {
        this.showFeedback();
      } else {
        this.incAttempts();
      }
      return result;
    }
  }, {
    key: "setLang",
    value: function setLang(lang) {
      _get(_getPrototypeOf(IBQuizzDropdown.prototype), "setLang", this).call(this, lang);
      if (this.button) {
        this.button.innerHTML = (0,_i18n__WEBPACK_IMPORTED_MODULE_2__["default"])(lang, "chooseone");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext,
        _this2 = this,
        _this$widgetConfig3,
        _this$widgetConfig3$v,
        _this$widgetConfig4,
        _this$widgetConfig4$o;
      if (!this.widgetConfig) {
        return;
      }

      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer and all the options
      if ((_this$groupContext = this.groupContext) !== null && _this$groupContext !== void 0 && _this$groupContext.s.length) {
        var _this$widgetConfig2;
        var theVars = ((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.vars) || [];
        theVars.forEach(function (v, i) {
          if (v.indexOf('#') < 0) {
            return;
          }
          theVars[i] = v.replace(/#([a-zA-Z0-9_]+)/g, function ($0, $1) {
            var _this2$groupContext;
            return ((_this2$groupContext = _this2.groupContext) === null || _this2$groupContext === void 0 ? void 0 : _this2$groupContext._s[$1]) || $0;
          });
        });
      }

      // Attach editListener of edit pages 
      this.dropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
        "class": "dropdown",
        style: "display:inline-block;"
      });
      console.log("connectedCallback ", this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      this.button = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
        "class": "btn btn-outline-primary dropdown-toggle",
        "type": "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "html": (0,_i18n__WEBPACK_IMPORTED_MODULE_2__["default"])(this.lang, "chooseone")
      });
      this.options = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
        "class": "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      });
      var n = ((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : (_this$widgetConfig3$v = _this$widgetConfig3.vars) === null || _this$widgetConfig3$v === void 0 ? void 0 : _this$widgetConfig3$v.length) || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig4 = this.widgetConfig) !== null && _this$widgetConfig4 !== void 0 && (_this$widgetConfig4$o = _this$widgetConfig4.opts) !== null && _this$widgetConfig4$o !== void 0 && _this$widgetConfig4$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.shuffleArray)(permutationIndices);
      }
      permutationIndices.forEach(function (index) {
        var _this2$widgetConfig, _this2$options;
        var opt = (((_this2$widgetConfig = _this2.widgetConfig) === null || _this2$widgetConfig === void 0 ? void 0 : _this2$widgetConfig.vars) || [])[index];
        var anchor = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createElement)("a", {
          "class": "dropdown-item",
          "href": "#",
          "data-index": index + "",
          "html": opt
        });
        anchor.addEventListener("click", function (evt) {
          _this2.userAns = index;
          evt.preventDefault();
          _this2.button && (_this2.button.innerHTML = opt);
          if (opt.indexOf('\\(') >= 0) {
            _this2.reflowLatex();
          }
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.UNSET);
        });
        (_this2$options = _this2.options) === null || _this2$options === void 0 ? void 0 : _this2$options.append(anchor);
      });
      this.dropdown.append(this.button);
      this.dropdown.append(this.options);
      _get(_getPrototypeOf(IBQuizzDropdown.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.dropdown);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    }*/
  }]);
  return IBQuizzDropdown;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusDisplay": function() { return /* binding */ StatusDisplay; },
/* harmony export */   "WidgetStatus": function() { return /* binding */ WidgetStatus; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _bsMsgDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var WidgetStatus;
(function (WidgetStatus) {
  WidgetStatus[WidgetStatus["ERROR"] = 0] = "ERROR";
  WidgetStatus[WidgetStatus["UNSET"] = 1] = "UNSET";
  WidgetStatus[WidgetStatus["WRONG"] = 2] = "WRONG";
  WidgetStatus[WidgetStatus["RIGHT"] = 3] = "RIGHT";
})(WidgetStatus || (WidgetStatus = {}));
var ICON_RIGHT = "fa fas fa-check";
var ICON_WRONG = "fa fas fa-times";
var ICON_ERROR = "fa fas fa-exclamation";
var ICON_HINT = "fa fas fa-life-ring";
var ICON_ANSWER = "fa fas fa-question";
var StatusDisplay = /*#__PURE__*/function () {
  function StatusDisplay() {
    _classCallCheck(this, StatusDisplay);
    _defineProperty(this, "status", WidgetStatus.UNSET);
    _defineProperty(this, "lang", "ca");
    this.spanStatus = document.createElement("span");
    this.spanStatus.setAttribute("data-toggle", "tooltip");
    this.spanHint = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      dataToggle: 'tooltip',
      "class": 'ib-quizz-hint',
      title: 'Mostrar pista',
      style: "display:none;",
      html: "<i class=\"".concat(ICON_HINT, "\"></i>")
    });
    this.feedbackSpan = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "class": 'ib-quizz-feedback',
      dataToggle: 'tooltip',
      title: 'Mostrar solució',
      style: "display:none;",
      html: "<i class=\"".concat(ICON_ANSWER, "\"></i>")
    });
    this.divBlock = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: "display:inline-block;"
    });
    this.divBlock.append(this.spanStatus);
    this.divBlock.append(this.spanHint);
    this.divBlock.append(this.feedbackSpan);
  }
  _createClass(StatusDisplay, [{
    key: "setStatus",
    value: function setStatus(status, msg) {
      this.status = status;
      var cl = this.spanStatus.classList;
      var msg2 = msg;
      switch (status) {
        case WidgetStatus.UNSET:
          cl.remove("ib-quizz-right", "ib-quizz-wrong", "ib-quizz-error");
          this.spanStatus.innerHTML = "";
          break;
        case WidgetStatus.RIGHT:
          cl.add("ib-quizz-right");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__["default"])(this.lang, 'right');
          }
          this.spanStatus.innerHTML = "<i class=\"".concat(ICON_RIGHT, "\"></i>");
          break;
        case WidgetStatus.WRONG:
          cl.add("ib-quizz-wrong");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__["default"])(this.lang, 'wrong');
          }
          this.spanStatus.innerHTML = "<i class=\"".concat(ICON_WRONG, "\"></i>");
          break;
        default:
          cl.add("ib-quizz-error");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__["default"])(this.lang, 'error');
          }
          this.spanStatus.innerHTML = "<i class=\"".concat(ICON_ERROR, "\"></i>");
          break;
      }
      msg2 && this.spanStatus.setAttribute("title", msg2);
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "setLang",
    value: function setLang(lang) {
      this.lang = lang;
    }
  }, {
    key: "setHint",
    value: function setHint(hint) {
      this.spanHint.addEventListener('click', function () {
        var dlg = (0,_bsMsgDialog__WEBPACK_IMPORTED_MODULE_2__.getCachedMsgDialog)('ib-quizz-modal-dlg', 'Una pista...');
        var hintDiv = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
          html: hint
        });
        dlg.setBody(hintDiv);
        dlg.show();
      });
      this.spanHint.style.setProperty('display', '');
    }
  }, {
    key: "setFeedback",
    value: function setFeedback(feedback) {
      this.feedbackSpan.addEventListener('click', function () {
        var dlg = (0,_bsMsgDialog__WEBPACK_IMPORTED_MODULE_2__.getCachedMsgDialog)('ib-quizz-modal-dlg', 'Retroacció');
        var hintDiv = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
          html: feedback
        });
        dlg.setBody(hintDiv);
        dlg.show();
      });
      this.spanHint.style.setProperty('display', 'none');
      this.feedbackSpan.style.setProperty('display', '');
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.divBlock;
    }
  }]);
  return StatusDisplay;
}();

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getI18n; }
/* harmony export */ });
var I18n = {
  "ca": {
    "check": "Comprova",
    "chooseone": "Tria una opció",
    "right": "Ben fet!",
    "wrong": "Ho sento. Intentau-ho de nou",
    "error": "Hi ha hagut un error processant la resposta",
    "random_msg": "Aquestes activitats contenen preguntes aleatòries que es generen cada vegada que es carrega la pàgina."
  },
  "es": {
    "check": "Comprueba",
    "chooseone": "Elige una opción",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página."
  },
  "en": {
    "check": "Check",
    "chooseone": "Choose one",
    "right": "Well done!",
    "wrong": "Try it again.",
    "error": "There has been an error processing the answer",
    "random_msg": "These activities contain random questions that are generated at every page load."
  },
  "fr": {
    "check": "Vérifier",
    "chooseone": "Choisis une option",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página."
  },
  "de": {
    "check": "Prüfen",
    "chooseone": "Wähle eine option",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página."
  }
};
function getI18n(lang, key) {
  var locale = I18n[lang];
  if (!locale) {
    locale = I18n["ca"];
  }
  return locale[key] || key;
}

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCachedMsgDialog": function() { return /* binding */ getCachedMsgDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MsgDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(MsgDialog, _BSDialog);
  var _super = _createSuper(MsgDialog);
  function MsgDialog(id) {
    _classCallCheck(this, MsgDialog);
    return _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CLOSE, '');
  }
  return _createClass(MsgDialog);
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog); // Cache
var _chachedDlg = {};
function getCachedMsgDialog(id, title) {
  var dlg = _chachedDlg[id];
  if (!dlg) {
    dlg = new MsgDialog(id);
    _chachedDlg[id] = dlg;
  }
  dlg.setTitle(title);
  return dlg;
}

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSDialog": function() { return /* binding */ BSDialog; },
/* harmony export */   "BSDialogType": function() { return /* binding */ BSDialogType; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _jsPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
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
        this.form.removeClass('was-validated');
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
      var panel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
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
/* 53 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* 54 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetElement": function() { return /* binding */ WidgetElement; }
/* harmony export */ });
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WidgetElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(WidgetElement, _HTMLElement);
  var _super = _createSuper(WidgetElement);
  function WidgetElement() {
    var _this;
    _classCallCheck(this, WidgetElement);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "lang", "ca");
    _defineProperty(_assertThisInitialized(_this), "_syncCount", 0);
    _defineProperty(_assertThisInitialized(_this), "attempts", 0);
    _defineProperty(_assertThisInitialized(_this), "hintSet", false);
    _defineProperty(_assertThisInitialized(_this), "feedbackSet", false);
    _this.innerHTML = "";
    _this.classList.add("d-print-none");
    _this.statusDisplay = new _statusDisplay__WEBPACK_IMPORTED_MODULE_0__.StatusDisplay();
    //this.append(this.statusDisplay);
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    //$(this.statusDisplay).tooltip();
    return _this;
  }
  _createClass(WidgetElement, [{
    key: "init",
    value: function init(pre) {
      if (pre) {
        var spanPre = document.createElement("span");
        spanPre.innerHTML = pre;
        this.prepend(spanPre);
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      // Parse the widgetConfig from data-src
      // Make sure that has data-src field
      var src = this.dataset.src || "";
      try {
        src = atob(src);
        this.widgetConfig = JSON.parse(src);
      } catch (ex) {
        console.error(ex);
        return;
      }
      console.log("Widget config is ", this.widgetConfig);
      this._syncCount++;
      if (this._syncCount === 3) {
        this.render();
      }
    }
  }, {
    key: "reflowLatex",
    value: function reflowLatex() {
      // Reflow Mathjax if exists in page
      if (window.MathJax) {
        window.MathJax.typesetPromise && window.MathJax.typesetPromise();
        window.MathJax.Hub && window.MathJax.Hub.Queue && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    }
  }, {
    key: "setLang",
    value: function setLang(lang) {
      this.lang = lang;
      this.statusDisplay.setLang(lang);
      console.log("Setting lang ", lang);
      this._syncCount++;
      if (this._syncCount === 3) {
        this.render();
      }
    }
  }, {
    key: "setGroupContext",
    value: function setGroupContext(groupContext) {
      this.groupContext = groupContext;
      console.log("Setting context ", this.groupContext);
      this._syncCount++;
      if (this._syncCount === 3) {
        this.render();
      }
    }
  }, {
    key: "setStatus",
    value: function setStatus(status, msg) {
      this.statusDisplay.setStatus(status, msg);
    }
  }, {
    key: "incAttempts",
    value: function incAttempts() {
      var _this$groupContext, _this$groupContext2, _this$widgetConfig, _this$widgetConfig3;
      this.attempts++;
      var limitHint = ((_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext.o.hint) || 0;
      var limitFeedback = ((_this$groupContext2 = this.groupContext) === null || _this$groupContext2 === void 0 ? void 0 : _this$groupContext2.o.ans) || 0;
      if (!this.hintSet && limitHint > 0 && this.attempts >= limitHint && (_this$widgetConfig = this.widgetConfig) !== null && _this$widgetConfig !== void 0 && _this$widgetConfig.hint) {
        var _this$widgetConfig2;
        this.hintSet = true;
        this.statusDisplay.setHint((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.hint);
      }
      if (!this.feedbackSet && limitFeedback > 0 && this.attempts >= limitFeedback && (_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && _this$widgetConfig3.fbk) {
        var _this$widgetConfig4;
        this.feedbackSet = true;
        this.statusDisplay.setFeedback((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : _this$widgetConfig4.fbk);
      }
    }
  }, {
    key: "showFeedback",
    value: function showFeedback() {
      var _this$widgetConfig5;
      if (!this.feedbackSet && (_this$widgetConfig5 = this.widgetConfig) !== null && _this$widgetConfig5 !== void 0 && _this$widgetConfig5.fbk) {
        var _this$widgetConfig6;
        this.feedbackSet = true;
        this.statusDisplay.setFeedback((_this$widgetConfig6 = this.widgetConfig) === null || _this$widgetConfig6 === void 0 ? void 0 : _this$widgetConfig6.fbk);
      }
    }
  }]);
  return WidgetElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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




var isSameSet = function isSameSet(set1, set2) {
  var s = new Set([].concat(_toConsumableArray(set1), _toConsumableArray(set2)));
  return s.size == set1.size && s.size == set2.size;
};
var IBQuizzMchoice = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-mchoice",
  classes: ["iedib-quizz-widget"],
  styles: {
    display: "flex",
    "align-items": "center"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzMchoice, _WidgetElement);
  var _super = _createSuper(IBQuizzMchoice);
  function IBQuizzMchoice() {
    var _this;
    _classCallCheck(this, IBQuizzMchoice);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "radios", []);
    _defineProperty(_assertThisInitialized(_this), "userAnsSet", new Set());
    return _this;
  }
  _createClass(IBQuizzMchoice, [{
    key: "enable",
    value: function enable(state) {
      var _this$radios;
      (_this$radios = this.radios) === null || _this$radios === void 0 ? void 0 : _this$radios.forEach(function (radio) {
        if (state) {
          var _radio$parentElement;
          radio.disabled = false;
          (_radio$parentElement = radio.parentElement) === null || _radio$parentElement === void 0 ? void 0 : _radio$parentElement.classList.remove("disabled");
        } else {
          var _radio$parentElement2;
          radio.disabled = true;
          (_radio$parentElement2 = radio.parentElement) === null || _radio$parentElement2 === void 0 ? void 0 : _radio$parentElement2.classList.add("disabled");
        }
      });
    }
  }, {
    key: "getUserInput",
    value: function getUserInput() {
      return _toConsumableArray(this.userAnsSet).join(",");
    }
  }, {
    key: "displayRightAnswer",
    value: function displayRightAnswer() {
      this.enable(false);
    }
  }, {
    key: "check",
    value: function check() {
      var _this$widgetConfig;
      var expectedAns = (((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) || '').split(",").map(function (e) {
        return e.trim();
      });
      var expectedSet = new Set(expectedAns);
      var result = isSameSet(this.userAnsSet, expectedSet);
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
      this.enable(!result);
      if (result) {
        this.showFeedback();
      } else {
        this.incAttempts();
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext,
        _this2 = this,
        _this$widgetConfig3,
        _this$widgetConfig4,
        _this$widgetConfig4$v,
        _this$widgetConfig5,
        _this$widgetConfig5$o;
      console.log("MCHOICE RENDER:: ", this.groupContext, this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer and all the options
      if ((_this$groupContext = this.groupContext) !== null && _this$groupContext !== void 0 && _this$groupContext.s.length) {
        var _this$widgetConfig2;
        var theVars = ((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.vars) || [];
        console.log("The vars,", theVars);
        theVars.forEach(function (v, i) {
          console.log("Searching for # in ", v);
          if (v.indexOf('#') < 0) {
            return;
          }
          theVars[i] = v.replace(/#([a-zA-Z0-9_]+)/g, function ($0, $1) {
            var _this2$groupContext;
            return ((_this2$groupContext = _this2.groupContext) === null || _this2$groupContext === void 0 ? void 0 : _this2$groupContext._s[$1]) || $0;
          });
        });
      }
      this.form = document.createElement("form");
      this.form.style.setProperty("display", "inline-block");
      var isMultiple = ((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : _this$widgetConfig3.ans.indexOf(",")) > 0;
      var n = ((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : (_this$widgetConfig4$v = _this$widgetConfig4.vars) === null || _this$widgetConfig4$v === void 0 ? void 0 : _this$widgetConfig4$v.length) || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig5 = this.widgetConfig) !== null && _this$widgetConfig5 !== void 0 && (_this$widgetConfig5$o = _this$widgetConfig5.opts) !== null && _this$widgetConfig5$o !== void 0 && _this$widgetConfig5$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.shuffleArray)(permutationIndices);
      }
      var radioName = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.genID)();
      permutationIndices.forEach(function (index) {
        var _this2$widgetConfig, _this2$form;
        var opt = (((_this2$widgetConfig = _this2.widgetConfig) === null || _this2$widgetConfig === void 0 ? void 0 : _this2$widgetConfig.vars) || [])[index];
        var formCheck = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
          "class": "form-check"
        });
        (_this2$form = _this2.form) === null || _this2$form === void 0 ? void 0 : _this2$form.append(formCheck);
        var input = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
          "class": "form-check-input",
          type: isMultiple ? "checkbox" : "radio",
          name: radioName,
          id: radioName + "_" + index
        });
        var label = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
          "class": "form-check-label",
          "for": radioName + "_" + index,
          html: opt
        });
        formCheck.appendChild(input);
        formCheck.appendChild(label);
        _this2.radios.push(input);
        input.addEventListener("click", function (evt) {
          input.checked ? _this2.userAnsSet.add(index + '') : _this2.userAnsSet["delete"](index + '');
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.UNSET);
        });
      });
      _get(_getPrototypeOf(IBQuizzMchoice.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.form);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue); 
    }
    static get observedAttributes(): string[] {
         return ['data-src']; 
    }*/
  }]);
  return IBQuizzMchoice;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_3__.WidgetElement)) || _class);

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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





var IBQuizzNumeric = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-numeric",
  classes: ["iedib-quizz-widget"],
  styles: {
    "display": "inline-block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzNumeric, _WidgetElement);
  var _super = _createSuper(IBQuizzNumeric);
  function IBQuizzNumeric() {
    var _this;
    _classCallCheck(this, IBQuizzNumeric);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "userAns", -1);
    return _this;
  }
  _createClass(IBQuizzNumeric, [{
    key: "enable",
    value: function enable(state) {
      if (!this.input) {
        return;
      }
      if (state) {
        this.input.disabled = false;
      } else {
        this.input.disabled = true;
      }
    }
  }, {
    key: "getUserInput",
    value: function getUserInput() {
      var _this$input;
      return ((_this$input = this.input) === null || _this$input === void 0 ? void 0 : _this$input.value) || "";
    }
  }, {
    key: "displayRightAnswer",
    value: function displayRightAnswer() {
      if (this.input) {
        var _this$widgetConfig;
        this.input.value = ((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) || "";
        this.enable(false);
      }
    }
  }, {
    key: "check",
    value: function check() {
      //TODO set tolerance
      var result = false;
      try {
        var _this$widgetConfig2;
        var userFloat = parseFloat(this.getUserInput());
        var ansFloat = parseFloat(((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.ans) || "0");
        if (!isNaN(userFloat) && !isNaN(ansFloat)) {
          var _this$widgetConfig3, _this$widgetConfig3$o, _this$widgetConfig4, _this$widgetConfig4$o;
          var tolerance = ((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : (_this$widgetConfig3$o = _this$widgetConfig3.opts) === null || _this$widgetConfig3$o === void 0 ? void 0 : _this$widgetConfig3$o.err) || 0;
          var units = ((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : (_this$widgetConfig4$o = _this$widgetConfig4.opts) === null || _this$widgetConfig4$o === void 0 ? void 0 : _this$widgetConfig4$o.errunit) || 'absolute';
          if (units === '%') {
            tolerance = 0.01 * tolerance;
          }
          if (ansFloat === 0) {
            units = 'absolute';
          }
          switch (units) {
            case 'absolute':
              result = Math.abs(userFloat - ansFloat) <= tolerance;
              break;
            default:
              // Assume relative
              result = Math.abs(userFloat / ansFloat - 1) <= tolerance;
          }
        } else {
          var _this$widgetConfig5;
          console.error("ERROR", this.getUserInput(), (_this$widgetConfig5 = this.widgetConfig) === null || _this$widgetConfig5 === void 0 ? void 0 : _this$widgetConfig5.ans);
          this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
          return false;
        }
      } catch (ex) {
        console.error(ex);
        //Error
        this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
        return false;
      }
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
      console.log("Numeric, ", this.getUserInput(), result);
      this.enable(!result);
      if (result) {
        this.showFeedback();
      } else {
        this.incAttempts();
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext,
        _this2 = this;
      if (!this.widgetConfig) {
        return;
      }
      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer
      if ((_this$groupContext = this.groupContext) !== null && _this$groupContext !== void 0 && _this$groupContext.s.length && this.widgetConfig) {
        var theAns = this.widgetConfig.ans || '';
        if (theAns.indexOf('#') >= 0) {
          theAns = theAns.replace(/#/g, '');
          this.widgetConfig.ans = '' + (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", {
        "class": "form-control",
        type: "number",
        style: "display:inline-block;width:100px;"
      });
      this.input.addEventListener("change", function (evt) {
        _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.UNSET);
      });
      _get(_getPrototypeOf(IBQuizzNumeric.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.input);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    } 
    */
  }]);
  return IBQuizzNumeric;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runInScope": function() { return /* binding */ runInScope; },
/* harmony export */   "scopedEval": function() { return /* binding */ scopedEval; },
/* harmony export */   "treatIniPlaceholders": function() { return /* binding */ treatIniPlaceholders; }
/* harmony export */ });
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
/* 58 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var IBQuizzCloze = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-cloze",
  classes: ["iedib-quizz-widget"],
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
    key: "enable",
    value: function enable(state) {
      var _this$mathInput;
      //TODO
      var v = ((_this$mathInput = this.mathInput) === null || _this$mathInput === void 0 ? void 0 : _this$mathInput.innerFields) || [];
      for (var i = 0, lenv = v.length; i < lenv; i++) {
        v[i].__controller.editable = state;
      }
    }
  }, {
    key: "getUserInput",
    value: function getUserInput() {
      return JSON.stringify(this.getUserInputArray());
    }
  }, {
    key: "getUserInputArray",
    value: function getUserInputArray() {
      var _this$mathInput2, _this$mathInput3;
      var parts = [];
      console.log((_this$mathInput2 = this.mathInput) === null || _this$mathInput2 === void 0 ? void 0 : _this$mathInput2.innerFields);
      var v = ((_this$mathInput3 = this.mathInput) === null || _this$mathInput3 === void 0 ? void 0 : _this$mathInput3.innerFields) || [];
      for (var i = 0, lenv = v.length; i < lenv; i++) {
        parts.push((v[i].latex() || '').replace(/\\\s/g, '').trim());
      }
      return parts;
    }
  }, {
    key: "displayRightAnswer",
    value: function displayRightAnswer() {
      if (this.mathInput) {
        var _this$widgetConfig;
        var parts = JSON.parse(((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) || "[]");
        var v = this.mathInput.innerFields || [];
        for (var i = 0, lenv = v.length; i < lenv; i++) {
          if (i < parts.length) {
            parts.push(v[i].latex(parts[i]));
          }
        }
        this.enable(false);
      }
    }
  }, {
    key: "check",
    value: function check() {
      //TODO set tolerance
      var result = false;
      try {
        var _this$widgetConfig2;
        // See if there is a check function
        if ((_this$widgetConfig2 = this.widgetConfig) !== null && _this$widgetConfig2 !== void 0 && _this$widgetConfig2.cfn) {
          var _this$groupContext, _this$widgetConfig3, _this$groupContext2;
          var localContext = {
            u: this.getUserInputArray()
          };
          Object.assign(localContext, (_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext._s);
          localContext.u.forEach(function (e, i) {
            return localContext['u' + i] = e;
          });
          //Evaluate check function that must return true or false
          var scriptFn = (((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : _this$widgetConfig3.cfn) || 'return true').replace(/#/g, '');
          result = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.runInScope)('var _this=this;\n' + scriptFn.replace(/#/g, '_this.'), localContext, ((_this$groupContext2 = this.groupContext) === null || _this$groupContext2 === void 0 ? void 0 : _this$groupContext2._s) || {});
          console.log("Avaluant ", scriptFn, "Retorna ", result);
        } else {
          var _this$widgetConfig4;
          //Must rely on .ans to be an array with answers
          var expected = ((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : _this$widgetConfig4.ans) || "[]";
          if (typeof expected === 'string') {
            expected = JSON.parse(expected);
          }
          console.log(expected);
          var given = this.getUserInputArray();
          result = true;
          for (var i = 0, lenv = given.length; i < lenv; i++) {
            if (i < expected.length) {
              result = result && expected[i] == (given[i] || '').trim();
            } else {
              result = false;
            }
          }
        }
      } catch (ex) {
        //Error
        console.error(ex);
        this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.ERROR);
        return false;
      }
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.WRONG);
      console.log("Matquill Cloze, ", this.getUserInput(), result);
      this.enable(!result);
      if (!result) {
        this.incAttempts();
      } else {
        this.showFeedback();
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext3,
        _this = this;
      if (!this.widgetConfig) {
        return;
      }
      console.log("Render numeric ", this.widgetConfig);

      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer
      if ((_this$groupContext3 = this.groupContext) !== null && _this$groupContext3 !== void 0 && _this$groupContext3.s.length && this.widgetConfig) {
        var theAns = this.widgetConfig.ans || '';
        if (theAns.indexOf('#') >= 0) {
          theAns = theAns.replace(/#/g, '');
          this.widgetConfig.ans = '' + (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = document.createElement("span");
      this.input.innerText = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_1__.treatIniPlaceholders)(this.widgetConfig.ini || '?');
      console.log(this.input.innerText);
      this.append(this.input);
      //Important MUST BE appended before calling StaticMath
      var MQI = window.MathQuill.getInterface(2);
      this.mathInput = MQI.StaticMath(this.input);
      // TODO: listen to changes to set status to unmodified

      this.mathInput.innerFields.forEach(function (e) {
        e.__controller.textarea.on('keyup', function (ev) {
          ev.preventDefault();
          _this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.UNSET);
        });
      });
      _get(_getPrototypeOf(IBQuizzCloze.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    } 
    */
  }]);
  return IBQuizzCloze;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_3__.WidgetElement)) || _class);

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _quizz_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _mathquill_matrix_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _mathquill_matrix_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _mathquill_matrix_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mathquill_matrix_min_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _quizzComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);





_loader__WEBPACK_IMPORTED_MODULE_3__["default"].bootstrap([_quizzComponent__WEBPACK_IMPORTED_MODULE_4__["default"]]);
}();
/******/ })()
;