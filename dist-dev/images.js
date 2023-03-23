/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-fullscreen-xl .modal-header {\n    padding: 0rem 1rem;\n    border: none;\n}\n.modal-fullscreen-xl .close {\n    font-size: 200%;\n    border-radius: 50%;\n    background: black;\n}\n.modal-fullscreen-xl .modal-dialog {\n    width: 95%;\n    height: 95%;\n    max-width: none;\n    margin: auto;\n}\n.modal-fullscreen-xl .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n    background: rgba(0,0,0,0);\n}\n.modal-fullscreen-xl .modal-body {\n    width: 100%;\n    overflow: auto;\n    background: rgba(0,0,0,0);\n}\n.navigate-left-arrow, .navigate-right-arrow {\n    font-size: 300%;\n    color: whitesmoke;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
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
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; }
/* harmony export */ });
/* unused harmony exports parseUrlParams, querySelectorProp, genID, createElement, addScript, addLinkSheet, pathJoin, addBaseToUrl, scopedEval, base64Encode, base64Decode */
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
/* 25 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ZoomComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _wheelzoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
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




var INIT_DELAY = 600;
var ZoomComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.Component)({
  name: 'zoom',
  author: 'Josep Mulet Pol',
  version: '2.0'
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(ZoomComponent, _BaseComponent);
  var _super = _createSuper(ZoomComponent);
  function ZoomComponent(parent) {
    var _this;
    _classCallCheck(this, ZoomComponent);
    _this = _super.call(this, parent);
    _this.allImgs = [];
    return _this;
  }
  _createClass(ZoomComponent, [{
    key: "initImage",
    value: function initImage(img, options) {
      this.allImgs.push(img);
      img.style.maxWidth = "98%";
      if (img.dataset.active !== "1") {
        img.dataset.active = "1";
        (0,_wheelzoom__WEBPACK_IMPORTED_MODULE_1__["default"])(img, options);
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;
      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";
      var opts = {
        maxZoom: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.convertInt)(ds.maxzoom, 10)
      };

      // Delay initialization to fix image max-width
      window.setTimeout(function () {
        if (_this2.parent.nodeName === 'IMG') {
          _this2.initImage(_this2.parent, opts);
        } else {
          var allImgs = _this2.parent.querySelectorAll("img");
          allImgs.forEach(function (el) {
            return _this2.initImage(el, opts);
          });
        }
      }, INIT_DELAY);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.parent.dataset.active !== "1") {
        return;
      }
      this.parent.removeAttribute("data-active");
      this.allImgs.forEach(function (img) {
        img.dispatchEvent(new Event('wheelzoom.destroy'));
        img.removeAttribute("data-active");
      });
    }
  }]);
  return ZoomComponent;
}(_base__WEBPACK_IMPORTED_MODULE_3__.BaseComponent)) || _class);


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/*!
  Wheelzoom 4.0.1
  license: MIT
  http://www.jacklmoore.com/wheelzoom
*/

/* harmony default export */ __webpack_exports__["default"] = ((function () {
  var defaults = {
    zoom: 0.03,
    maxZoom: 10,
    initialZoom: 1,
    initialX: 0.5,
    initialY: 0.5
  };
  var main = function main(img, options) {
    if (!img || !img.nodeName || img.nodeName !== 'IMG') {
      return;
    }
    var settings = {};
    var width;
    var height;
    var bgWidth;
    var bgHeight;
    var bgPosX;
    var bgPosY;
    var previousEvent;
    var transparentSpaceFiller;
    function setSrcToBackground(img) {
      img.style.backgroundRepeat = 'no-repeat';
      img.style.backgroundImage = 'url("' + img.src + '")';
      transparentSpaceFiller = 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="' + img.naturalWidth + '" height="' + img.naturalHeight + '"></svg>');
      img.src = transparentSpaceFiller;
    }
    function updateBgStyle() {
      if (bgPosX > 0) {
        bgPosX = 0;
      } else if (bgPosX < width - bgWidth) {
        bgPosX = width - bgWidth;
      }
      if (bgPosY > 0) {
        bgPosY = 0;
      } else if (bgPosY < height - bgHeight) {
        bgPosY = height - bgHeight;
      }
      img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
      img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
    }
    function reset() {
      bgWidth = width;
      bgHeight = height;
      bgPosX = bgPosY = 0;
      updateBgStyle();
    }
    function onwheel(e) {
      var deltaY = 0;
      e.preventDefault();
      if (e.deltaY) {
        // FireFox 17+ (IE9+, Chrome 31+?)
        deltaY = e.deltaY;
      } else if (e.wheelDelta) {
        deltaY = -e.wheelDelta;
      }

      // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
      // We have to calculate the target element's position relative to the document, and subtrack that from the
      // cursor's position relative to the document.
      var rect = img.getBoundingClientRect();
      var offsetX = e.pageX - rect.left - window.pageXOffset;
      var offsetY = e.pageY - rect.top - window.pageYOffset;

      // Record the offset between the bg edge and cursor:
      var bgCursorX = offsetX - bgPosX;
      var bgCursorY = offsetY - bgPosY;

      // Use the previous offset to get the percent offset between the bg edge and cursor:
      var bgRatioX = bgCursorX / bgWidth;
      var bgRatioY = bgCursorY / bgHeight;

      // Update the bg size:
      if (deltaY < 0) {
        bgWidth += bgWidth * settings.zoom;
        bgHeight += bgHeight * settings.zoom;
      } else {
        bgWidth -= bgWidth * settings.zoom;
        bgHeight -= bgHeight * settings.zoom;
      }
      if (settings.maxZoom) {
        bgWidth = Math.min(width * settings.maxZoom, bgWidth);
        bgHeight = Math.min(height * settings.maxZoom, bgHeight);
      }

      // Take the percent offset and apply it to the new size:
      bgPosX = offsetX - bgWidth * bgRatioX;
      bgPosY = offsetY - bgHeight * bgRatioY;

      // Prevent zooming out beyond the starting size
      if (bgWidth <= width || bgHeight <= height) {
        reset();
      } else {
        updateBgStyle();
      }
    }
    function drag(e) {
      e.preventDefault();
      bgPosX += e.pageX - previousEvent.pageX;
      bgPosY += e.pageY - previousEvent.pageY;
      previousEvent = e;
      updateBgStyle();
    }
    function removeDrag() {
      document.removeEventListener('mouseup', removeDrag);
      document.removeEventListener('mousemove', drag);
    }

    // Make the background draggable
    function draggable(e) {
      e.preventDefault();
      previousEvent = e;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', removeDrag);
    }
    function load() {
      var initial = Math.max(settings.initialZoom, 1);
      if (img.src === transparentSpaceFiller) return;
      var computedStyle = window.getComputedStyle(img, null);
      width = parseInt(computedStyle.width, 10);
      height = parseInt(computedStyle.height, 10);
      bgWidth = width * initial;
      bgHeight = height * initial;
      bgPosX = -(bgWidth - width) * settings.initialX;
      bgPosY = -(bgHeight - height) * settings.initialY;
      setSrcToBackground(img);
      img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
      img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
      img.style.cursor = "nesw-resize";
      img.addEventListener('wheelzoom.reset', reset);
      img.addEventListener('wheel', onwheel);
      img.addEventListener('mousedown', draggable);
    }

    //Added onresize event, requires load first
    function resize() {
      if (img.src != transparentSpaceFiller) {
        return;
      }
      var initial = Math.max(settings.initialZoom, 1);
      var computedStyle = window.getComputedStyle(img, null);
      width = parseInt(computedStyle.width, 10);
      height = parseInt(computedStyle.height, 10);
      bgWidth = width * initial;
      bgHeight = height * initial;
      bgPosX = -(bgWidth - width) * settings.initialX;
      bgPosY = -(bgHeight - height) * settings.initialY;

      //setSrcToBackground(img);

      img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
      img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
    }
    var resizeObs;
    var destroy = function (originalProperties) {
      img.removeEventListener('wheelzoom.destroy', destroy);
      img.removeEventListener('wheelzoom.reset', reset);
      img.removeEventListener('load', load);
      img.removeEventListener('mouseup', removeDrag);
      img.removeEventListener('mousemove', drag);
      img.removeEventListener('mousedown', draggable);
      img.removeEventListener('wheel', onwheel);
      //window. resize does not work, need ResizeObserver on img element
      //window.removeEventListener('resize', resize);
      if (resizeObs != null) {
        resizeObs.unobserve(img);
      }
      img.style.backgroundImage = originalProperties.backgroundImage;
      img.style.backgroundRepeat = originalProperties.backgroundRepeat;
      img.src = originalProperties.src;
      img.style.cursor = "default";
    }.bind(null, {
      backgroundImage: img.style.backgroundImage,
      backgroundRepeat: img.style.backgroundRepeat,
      src: img.src
    });
    img.addEventListener('wheelzoom.destroy', destroy);
    options = options || {};
    Object.keys(defaults).forEach(function (key) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      settings[key] = options[key] !== undefined ? options[key] : defaults[key];
    });
    if (img.complete) {
      load();
    }
    img.addEventListener('load', load);
    //Added
    //window.addEventListener('resize', resize);
    if (window.ResizeObserver != null) {
      resizeObs = new ResizeObserver(resize);
      resizeObs.observe(img);
    }
  };
  return function (elem, options) {
    if (typeof window.btoa !== 'function') {
      // Do nothing in IE9 or below
      return;
    }
    main(elem, options);
  };
})());

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LightboxComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
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



var leftArrow = '<span>&#10094;</span>';
var rightArrow = '<span>&#10095;</span>';
var MODAL_ID = 'snptModal_lightbox';

// The gallery is a sequence of img tags that participate in the lightbox show
function constructGallery() {
  var globalId = 0;
  var Gallery = [];
  var allGals = document.querySelectorAll('[role="snptd_lightbox"], [data-snptd="lightbox"]');
  for (var i = 0, len = allGals.length; i < len; i++) {
    var el = allGals[i];
    var tn = (el.tagName || '').toUpperCase();
    if (tn === 'DIV' || tn === 'TABLE') {
      // Find all images in this container
      var allImgs = el.querySelectorAll("img");
      for (var j = 0, lenj = allImgs.length; j < lenj; j++) {
        var img = allImgs[j];
        img.dataset.lbpos = globalId + "";
        globalId++;
        Gallery.push(img);
      }
    } else if (tn == 'IMG') {
      // Must contain the markup for lighbox otherwise continue
      if (el.dataset.snptd != 'lightbox' && el.getAttribute('role') != 'snptd_lightbox') {
        continue;
      }
      //support old markup
      el.dataset.lbpos = globalId + "";
      globalId++;
      Gallery.push(el);
    }
  }
  return Gallery;
}
var LightboxComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.Component)({
  name: 'lightbox',
  author: 'Josep Mulet Pol',
  version: '2.3',
  query: 'body',
  // Define as singleton instance
  use$: true
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(LightboxComponent, _BaseComponent);
  var _super = _createSuper(LightboxComponent);
  function LightboxComponent(parent) {
    var _this;
    _classCallCheck(this, LightboxComponent);
    _this = _super.call(this, parent);
    _defineProperty(_assertThisInitialized(_this), "currentIndex", 0);
    _defineProperty(_assertThisInitialized(_this), "$gallery", []);
    return _this;
  }
  _createClass(LightboxComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      this.$gallery = constructGallery();
      this.createModal();
      this.currentIndex = 0; // The index to be shown
      this.$gallery.forEach(function (img) {
        return _this2.setupImage(img);
      });
    }
  }, {
    key: "setupImage",
    value: function setupImage(theImg) {
      var _this3 = this;
      var $theImg = $(theImg);
      if ($theImg.attr("data-active") == '1') {
        return;
      }
      $theImg.css("cursor", "pointer");
      $theImg.attr("data-toggle", "modal");
      $theImg.attr("data-target", '#' + MODAL_ID);
      $theImg.attr("data-active", '1');
      $theImg.off();
      // Action on clicking the image
      $theImg.on("click", function (evt) {
        _this3.currentIndex = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.convertInt)($theImg.attr("data-lbpos") || "0", 0);
        _this3.loadImageDynamically();
      });
    }
  }, {
    key: "loadImageDynamically",
    value: function loadImageDynamically() {
      var _this$$img,
        _this4 = this;
      //Retrieve container from current index
      if (!this.$gallery[this.currentIndex]) {
        console.error("Nothing at currentIndex", this.currentIndex);
        return;
      }
      var $container = $(this.$gallery[this.currentIndex]);

      //change src of image in modal
      if ((_this$$img = this.$img) !== null && _this$$img !== void 0 && _this$$img.length) {
        // Create image dynamically
        var imgObj = new Image();
        var src = $container.attr("data-src") || $container.attr("src") || "";
        imgObj.onload = function () {
          var _this4$$img;
          _this4.resize(imgObj.width, imgObj.height);
          // Can provide a highres in data-src
          (_this4$$img = _this4.$img) === null || _this4$$img === void 0 ? void 0 : _this4$$img.attr("src", src);
        };
        imgObj.onerror = function (err) {
          var _this4$$img2;
          console.error("Cannot load image ", err);
          (_this4$$img2 = _this4.$img) === null || _this4$$img2 === void 0 ? void 0 : _this4$$img2.attr("src", "");
        };
        imgObj.src = src;
      }
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var _this5 = this;
      var hasGallery = this.$gallery.length > 1;
      var leftArrowHTML = '<a class="navigate-left-arrow" href="javascript:void(0);">' + leftArrow + '</a>';
      var rightArrowHTML = '<a class="navigate-right-arrow" href="javascript:void(0);">' + rightArrow + '</a>';
      var modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="' + MODAL_ID + '" tabindex="-1" role="dialog">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>' + '</div>' + '<div class="modal-body p-0" style="text-align:center;">' + (hasGallery ? leftArrowHTML : '') + '<img src="">' + (hasGallery ? rightArrowHTML : '') + '</div>' + '</div>' + '</div>' + '</div>');
      this.$modal = $(modalHTML);
      this.$img = this.$modal.find('img');
      this.$close = this.$modal.find('button');
      $('body').append(this.$modal);
      this.$modal.on("hide.bs.modal", function () {
        var _this5$$img;
        (_this5$$img = _this5.$img) === null || _this5$$img === void 0 ? void 0 : _this5$$img.attr("src", "");
      });
      $("#modalCloseBtn").on("click", function () {
        var _this5$$img2;
        (_this5$$img2 = _this5.$img) === null || _this5$$img2 === void 0 ? void 0 : _this5$$img2.attr("src", "");
      });
      if (hasGallery) {
        this.$modal.find('.navigate-left-arrow').on("click", function (evt) {
          evt.preventDefault();
          _this5.navigateLeft();
        });
        this.$modal.find('.navigate-right-arrow').on("click", function (evt) {
          evt.preventDefault();
          _this5.navigateRight();
        });
      }
    }
  }, {
    key: "resize",
    value: function resize(imgwidth, imgheight) {
      // Resize accordingly to the image
      // Size of browser viewport.
      var imgratio = 1;
      if (imgheight > 0) {
        imgratio = imgwidth / imgheight;
      }
      var winwidth = $(window).height() || 0;
      var winheight = $(window).width() || 0;
      var winratio = 1;
      if (winheight > 0) {
        winratio = winwidth / winheight;
      }
      if (imgratio > winratio) {
        var _this$$img2, _this$$img3;
        (_this$$img2 = this.$img) === null || _this$$img2 === void 0 ? void 0 : _this$$img2.css("width", "initial");
        (_this$$img3 = this.$img) === null || _this$$img3 === void 0 ? void 0 : _this$$img3.css("height", "100%");
      } else {
        var _this$$img4, _this$$img5;
        (_this$$img4 = this.$img) === null || _this$$img4 === void 0 ? void 0 : _this$$img4.css("height", "initial");
        (_this$$img5 = this.$img) === null || _this$$img5 === void 0 ? void 0 : _this$$img5.css("width", "100%");
      }
    }
  }, {
    key: "navigateLeft",
    value: function navigateLeft() {
      if (this.currentIndex == 0) {
        this.currentIndex = this.$gallery.length - 1;
      } else {
        this.currentIndex = this.currentIndex - 1;
      }
      this.loadImageDynamically();
    }
  }, {
    key: "navigateRight",
    value: function navigateRight() {
      if (this.currentIndex == this.$gallery.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = this.currentIndex + 1;
      }
      this.loadImageDynamically();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.$gallery.forEach(function (theImg) {
        var $theImg = $(theImg);
        $theImg.removeAttr("data-active");
        $theImg.removeAttr("data-toggle");
        $theImg.removeAttr("data-target");
        $theImg.css("cursor", 'initial');
        $theImg.off();
      });
      var $modal = $('#' + MODAL_ID);
      $modal.off();
      $modal.remove();
    }
  }]);
  return LightboxComponent;
}(_base__WEBPACK_IMPORTED_MODULE_2__.BaseComponent)) || _class);


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _lightbox_lightbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var _zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);




_loader__WEBPACK_IMPORTED_MODULE_1__["default"].bootstrap([_zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_2__["default"], _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_3__["default"]]);
}();
/******/ })()
;