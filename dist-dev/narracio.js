/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
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
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBaseToUrl": function() { return /* binding */ addBaseToUrl; },
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "getPageInfo": function() { return /* binding */ getPageInfo; },
/* harmony export */   "parseUrlParams": function() { return /* binding */ parseUrlParams; },
/* harmony export */   "pathJoin": function() { return /* binding */ pathJoin; },
/* harmony export */   "pran": function() { return /* binding */ pran; },
/* harmony export */   "querySelectorProp": function() { return /* binding */ querySelectorProp; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; },
/* harmony export */   "waitForRequire": function() { return /* binding */ waitForRequire; }
/* harmony export */ });
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
    } else if (optName === "html") {
      elem.innerHTML = value;
    } else {
      elem.setAttribute(optName, value);
    }
  });
  return elem;
}
function shuffleArray(array, index) {
  var out = 0;
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    if (i === index) {
      out = j;
    }
    array[i] = array[j];
    array[j] = temp;
  }
  return out;
}

/***/ }),
/* 3 */,
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */,
/* 11 */
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 12 */
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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* 23 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* 24 */,
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
/* 37 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, " .pw-laser-nw {\n     position: relative;\n }\n\n .pw-laser-nw::after {\n     content: \"\";\n     position: absolute;\n     left: 0;\n     top: 0;\n     width: 10px;\n     height: 10px;\n     border-radius: 50%;\n     background: rgba(255, 0, 0, 0.6);\n     box-shadow: 0 0 5px 3px red;\n }\n\n .pw-laser-ne {\n     position: relative;\n }\n\n .pw-laser-ne::after {\n     content: \"\";\n     position: absolute;\n     right: 0;\n     top: 0;\n     width: 10px;\n     height: 10px;\n     border-radius: 50%;\n     background: rgba(255, 0, 0, 0.6);\n     box-shadow: 0 0 5px 3px red;\n }\n\n .pw-laser-sw {\n     position: relative;\n }\n\n .pw-laser-sw::after {\n     content: \"\";\n     position: absolute;\n     left: 0;\n     bottom: 0;\n     width: 10px;\n     height: 10px;\n     border-radius: 50%;\n     background: rgba(255, 0, 0, 0.6);\n     box-shadow: 0 0 5px 3px red;\n }\n\n.pw-laser-se {\n     position: relative;\n }\n\n .pw-laser-se::after {\n     content: \"\";\n     position: absolute;\n     right: 0;\n     bottom: 0;\n     width: 10px;\n     height: 10px;\n     border-radius: 50%;\n     background: rgba(255, 0, 0, 0.6);\n     box-shadow: 0 0 5px 3px red;\n }\n\n .pw-laser-md {\n     position: relative;\n }\n\n .pw-laser-md::after {\n     content: \"\";\n     position: absolute;\n     left: 50%;\n     bottom: 50%;\n     width: 10px;\n     height: 10px;\n     border-radius: 50%;\n     background: rgba(255, 0, 0, 0.6);\n     box-shadow: 0 0 5px 3px red;\n }\n\n .audible-media-player {\n     max-width: 600px;\n     padding: 6px;\n     border-radius: 7px;\n     display: flex;\n     margin: auto;\n     margin-bottom: 15px;\n }\n\n .audible-frog span, .audible-frog button {\n     color: #4f6e46;\n }\n\n .audible-sky {\n     background: rgb(241, 245, 254);\n }\n\n .audible-frog {\n     background: #e6ede6;\n }\n\n .audible-sky span, .audible-sky button {\n     color: rgb(31, 106, 219);\n }\n\n .pw-audible-btn {\n     background: none;\n     border: none;\n     color: #4f6e46;\n     margin: 0 5px;\n }\n\n.pw-pen-yellow {\n     -webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     background: rgb(255, 255, 193, 0.5);\n }\n\n .pw-pen-green {\n     -webkit-box-shadow: #FFF 0 -1px 4px, #3f3 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     box-shadow: #FFF 0 -1px 4px, #3f3 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     background: rgb(193, 255, 200, 0.5);\n }\n\n .pw-pen-red {\n     -webkit-box-shadow: #FFF 0 -1px 4px, #f33 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     box-shadow: #FFF 0 -1px 4px, #f33 0 -2px 10px, 5px 5px 15px 5px rgba(0, 0, 0, 0);\n     background: rgb(255, 193, 193, 0.5);\n }\n\n @media print {\n     .audible-media-player {\n         display: none;\n     }\n }\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NarracioComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
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


var plugins_initialized = false;
var NarracioComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
  name: 'narracio',
  author: 'Josep Mulet Pol',
  version: '1.4',
  use$: true
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(NarracioComponent, _BaseComponent);
  var _super = _createSuper(NarracioComponent);
  function NarracioComponent(parent) {
    _classCallCheck(this, NarracioComponent);
    return _super.call(this, parent);
  }
  _createClass(NarracioComponent, [{
    key: "init",
    value: function init() {
      if (!plugins_initialized) {
        plugins_initialized = true;
        //initPlugins($);
      }

      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";
      //$(this.parent)["snpt_narracio"]();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.parent.dataset.active !== "1") {
        return;
      }
      this.parent.removeAttribute("data-active");
    }
  }]);
  return NarracioComponent;
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _narracio_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);
/* harmony import */ var _narracioComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);



_loader__WEBPACK_IMPORTED_MODULE_0__["default"].bootstrap([_narracioComponent__WEBPACK_IMPORTED_MODULE_2__["default"]]);
}();
/******/ })()
;