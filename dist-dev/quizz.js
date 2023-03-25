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
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_quizz_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_quizz_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_quizz_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_quizz_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_quizz_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "[data-quizz-group]{padding:5px;border-left:3px solid lightblue}.ib-quizz-right{margin-left:8px;border-radius:50%;background-color:#438c43;color:white;width:23px;display:inline-block;height:23px;text-align:center}.ib-quizz-wrong{margin-left:8px;border-radius:50%;background-color:#a43c3c;color:white;width:23px;display:inline-block;height:23px;text-align:center}.ib-quizz-error{margin-left:8px;border-radius:50%;background-color:#72395a;color:white;width:23px;display:inline-block;height:23px;text-align:center}.ib-quizz-hint,.ib-quizz-feedback{margin-left:8px;border-radius:50%;background-color:#a3a3a3;color:black;width:23px;display:inline-block;height:23px;text-align:center;cursor:pointer}.ibquizz-me-btn-openeditor{background:whitesmoke;vertical-align:top}.ibquizz-me-btn-openeditor:hover{background:white}.ibquizz-me-btn-openeditor>i.fas{color:darkred}.ibquizz-square-root{background-position:50% 50%;background-size:20px 20px;background-repeat:no-repeat;background-image:url(\"https://piworld.es/iedib/mqwidgets2/pw-square-root.png\");display:inline-block;width:16px;height:16px}.ibquizz-me-btn-toolbar{height:35px;overflow:hidden;font-weight:bold}.ibquizz-me-btn-toolbar>span{cursor:pointer;font-size:90%}.ibquizz-me-btn-toolbar:hover{background:white}ib-quizz-mathquill{display:none !important}ib-quizz-mathquill.ib-enable-future{display:inline-block !important}.ibquizz-editor-palette{padding:2px;background:whitesmoke}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* harmony export */   "addScript": function() { return /* binding */ addScript; },
/* harmony export */   "base64Decode": function() { return /* binding */ base64Decode; },
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; },
/* harmony export */   "parseUrlParams": function() { return /* binding */ parseUrlParams; },
/* harmony export */   "scopedEval": function() { return /* binding */ scopedEval; }
/* harmony export */ });
/* unused harmony exports querySelectorProp, addLinkSheet, pathJoin, addBaseToUrl, base64Encode */
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
/* 25 */,
/* 26 */
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
/* 27 */,
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

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "items": function() { return /* binding */ items; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; },
/* harmony export */   "zip": function() { return /* binding */ zip; }
/* harmony export */ });
/* unused harmony exports getPageInfo, pran, reflowLatex, sanitizeLaTeX, sum, hasValue, copyPropsFromTo, isNumeric */
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
/* 38 */,
/* 39 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ QuizzComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var _dropdownWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _mchoiceWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
/* harmony import */ var _numericWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _clozeWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50);
/* harmony import */ var _mathquillWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46);
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




//Manually import the customElements that should be loaded







var SEARCH_QUERY = "ib-quizz-numeric, ib-quizz-dropdown, ib-quizz-mchoice"; //".ib-quizz-elem"; 
var SEARCH_QUERY2 = "ib-quizz-cloze, ib-quizz-mathquill"; //Requires loading Mathquill + Nerdamer

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
var QuizzComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_5__.Component)({
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
      var context = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.base64Decode)(contextRaw64);
      _this.groupContext = Object.assign(_this.groupContext, context);
      _this.groupContext.o.hint = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.convertInt)(_this.groupContext.o.hint, 2);
      _this.groupContext.o.ans = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.convertInt)(_this.groupContext.o.ans, 4);
      console.log(context, _this.groupContext);
    } catch (ex) {
      console.error(ex);
    }
    _this.lang = searchLang || "ca";
    // Must generate an instance of the group vars into map _v
    _this.generateGroup();

    // Must find placeholders in the dom by replacing #key by _v[#key]
    _this.findPlaceholders();
    _this.allQuizzElements = _this.parent.querySelectorAll(SEARCH_QUERY);
    _this.allClozeElements = document.querySelectorAll(SEARCH_QUERY2);
    console.log(_this.allQuizzElements, _this.allClozeElements);
    _this.checkButton = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.createElement)("button", {
      "class": "btn btn-sm btn-primary d-print-none",
      style: "margin: 10px;display:block",
      html: '<i class="fa fas fa-check"></i> ' + (0,_i18n__WEBPACK_IMPORTED_MODULE_7__["default"])(_this.lang, 'check')
    });
    _this.listener = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(evt) {
        var allPromises, checksList;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              evt.preventDefault();
              allPromises = [];
              _this.allQuizzElements.forEach(function (quizzElem) {
                allPromises.push(quizzElem.check());
              });
              _this.allClozeElements.forEach(function (quizzElem) {
                allPromises.push(quizzElem.check());
              });
              _context.next = 6;
              return Promise.all(allPromises);
            case 6:
              checksList = _context.sent;
              if (checksList.every(function (chk) {
                return chk === true;
              })) {
                // All widgets are correct. Then disable the check button
                _this.checkButton.setAttribute("disabled", "true");
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    //Si no hi ha cap control, no té sentit afegir el botó
    if (_this.allQuizzElements.length + _this.allClozeElements.length > 0) {
      _this.parent.append(_this.checkButton);
    }
    return _this;
  }
  _createClass(QuizzComponent, [{
    key: "generateGroup",
    value: function generateGroup() {
      try {
        (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_8__.runIBScript)(this.groupContext.s, {}, this.groupContext._s);
      } catch (ex) {
        console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
      }

      //Tell the user that this quizz contains random questions
      if (this.groupContext.s.trim().length) {
        var noticeDiv = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.createElement)('div', {
          "class": 'alert alert-info d-print-none',
          html: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" style=\"height:20px;\"><path fill=\"#154b5e\" d=\"M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z\"/></svg> \n                <small>".concat((0,_i18n__WEBPACK_IMPORTED_MODULE_7__["default"])(this.lang, 'random_msg'), "</small>")
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
      if (this.groupContext.s.trim().length === 0) {
        return; //Nothing to do
      }

      this.findPlaceholdersSpan();
      this.findPlaceholdersText();
    }
  }, {
    key: "findPlaceholdersText",
    value: function findPlaceholdersText() {
      var _this2 = this;
      textNodesUnder(this.parent).forEach(function (textNode) {
        var text = textNode.textContent || '';
        textNode.textContent = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_8__.doVariablesInterpolation)(text, _this2.groupContext._s);
      });
    }
  }, {
    key: "findPlaceholdersSpan",
    value: function findPlaceholdersSpan() {
      var _this3 = this;
      this.parent.querySelectorAll("span[data-quizz-interpol]").forEach(function (spanNode) {
        var valor = spanNode.getAttribute("data-quizz-interpol") || '';
        if (valor.indexOf('#') < 0) {
          return;
        }
        spanNode.innerHTML = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_8__.doVariablesInterpolation)(valor, _this3.groupContext._s);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;
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
        quizzElem.setLang(_this4.lang);
        quizzElem.setGroupContext(_this4.groupContext);
      });
      //cloze elements needs mathquill to be loaded on demand

      if (this.allClozeElements.length) {
        //Needs to load mathquill js file on demand
        //Needs the lookup document.head for a script with src="....../sd/quizz.min.js"
        //and build a new url with ....../sd/mathquill.min.js
        //In this way, we share the same base url than the main plugin
        //Fallback
        var mathQuillURL = 'https://piworld.es/iedib/snippets/sd/mathquill.min.js';
        var scriptFound = document.body.querySelector('script[src$="/sd/quizz.min.js"]');
        if (scriptFound) {
          mathQuillURL = (scriptFound.getAttribute('src') || '').replace('/sd/quizz.min.js', '/sd/mathquill.min.js');
        }
        (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.addScript)(mathQuillURL, 'mathquill.matrix4quizz', function () {
          //When mathquill ready must initialize this widgets
          _this4.allClozeElements.forEach(function (quizzElem) {
            if (typeof quizzElem.setLang !== 'function') {
              console.error("No custom element registered for ", quizzElem);
              return;
            }
            quizzElem.setLang(_this4.lang);
            quizzElem.setGroupContext(_this4.groupContext);
          });
        });
      }
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
}(_base__WEBPACK_IMPORTED_MODULE_9__.BaseComponent)) || _class);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$statusDisplay, _this$statusDisplay2, _this$widgetConfig;
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(((_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.getStatus()) === _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", true);
            case 4:
              if (!(((_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.getStatus()) !== _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              result = ((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) === this.userAns + "";
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              this.enable(!result);
              if (result) {
                this.showFeedback();
              } else {
                this.incAttempts();
              }
              return _context.abrupt("return", result);
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
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
      var _this$widgetConfig2,
        _this$groupContext,
        _this2 = this,
        _this$widgetConfig3,
        _this$widgetConfig3$o;
      if (!this.widgetConfig) {
        console.error("The widgetConfig is not set");
        return;
      }
      var theVars = (((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.vars) || []).filter(function (e) {
        return (e + '').trim().length > 0;
      });
      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer and all the options
      if ((_this$groupContext = this.groupContext) !== null && _this$groupContext !== void 0 && _this$groupContext.s.length) {
        theVars.forEach(function (v, i) {
          var _this2$groupContext;
          if (v.indexOf('#') < 0) {
            return;
          }
          theVars[i] = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_3__.doVariablesInterpolation)(v, (_this2$groupContext = _this2.groupContext) === null || _this2$groupContext === void 0 ? void 0 : _this2$groupContext._s);
        });
      }

      // Attach editListener of edit pages 
      this.dropdown = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
        "class": "dropdown",
        style: "display:inline-block;"
      });
      console.log("connectedCallback ", this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      this.button = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
        "class": "btn btn-outline-primary dropdown-toggle",
        "type": "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "html": (0,_i18n__WEBPACK_IMPORTED_MODULE_2__["default"])(this.lang, "chooseone")
      });
      this.options = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
        "class": "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      });
      var n = theVars.length || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && (_this$widgetConfig3$o = _this$widgetConfig3.opts) !== null && _this$widgetConfig3$o !== void 0 && _this$widgetConfig3$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_5__.shuffleArray)(permutationIndices);
      }
      permutationIndices.forEach(function (index) {
        var _this2$options;
        var opt = theVars[index];
        var anchor = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("a", {
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
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING);
        });
        (_this2$options = _this2.options) === null || _this2$options === void 0 ? void 0 : _this2$options.append(anchor);
      });
      this.dropdown.append(this.button);
      this.dropdown.append(this.options);
      _get(_getPrototypeOf(IBQuizzDropdown.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.dropdown);
      this.statusDisplay && this.append(this.statusDisplay.getElement());
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
}(_widgetElement__WEBPACK_IMPORTED_MODULE_6__.WidgetElement)) || _class);

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusDisplay": function() { return /* binding */ StatusDisplay; },
/* harmony export */   "WidgetStatus": function() { return /* binding */ WidgetStatus; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _bsMsgDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




// Only PENDING require checking
var WidgetStatus;
(function (WidgetStatus) {
  WidgetStatus[WidgetStatus["UNTOUCHED"] = 0] = "UNTOUCHED";
  WidgetStatus[WidgetStatus["PENDING"] = 1] = "PENDING";
  WidgetStatus[WidgetStatus["ERROR"] = 2] = "ERROR";
  WidgetStatus[WidgetStatus["WRONG"] = 3] = "WRONG";
  WidgetStatus[WidgetStatus["RIGHT"] = 4] = "RIGHT";
})(WidgetStatus || (WidgetStatus = {}));
var ICON_RIGHT = "fa fas fa-check";
var ICON_WRONG = "fa fas fa-times";
var ICON_ERROR = "fa fas fa-exclamation";
var ICON_HINT = "fa fas fa-life-ring";
var ICON_ANSWER = "fa fas fa-question";
var StatusDisplay = /*#__PURE__*/function () {
  function StatusDisplay() {
    _classCallCheck(this, StatusDisplay);
    _defineProperty(this, "status", WidgetStatus.UNTOUCHED);
    _defineProperty(this, "lang", "ca");
    this.spanStatus = document.createElement("span");
    this.spanStatus.setAttribute("data-toggle", "tooltip");
    this.spanHint = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      dataToggle: 'tooltip',
      "class": 'ib-quizz-hint',
      title: 'Mostrar pista',
      style: "display:none;",
      html: "<i class=\"".concat(ICON_HINT, "\"></i>")
    });
    this.feedbackSpan = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "class": 'ib-quizz-feedback',
      dataToggle: 'tooltip',
      title: 'Mostrar solució',
      style: "display:none;",
      html: "<i class=\"".concat(ICON_ANSWER, "\"></i>")
    });
    this.divBlock = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
        case WidgetStatus.UNTOUCHED:
        case WidgetStatus.PENDING:
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
        var hintDiv = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
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
        var hintDiv = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
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
/* 42 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
    "random_msg": "Aquestes activitats contenen preguntes aleatòries que es generen cada vegada que es carrega la pàgina.",
    "open_editor": "Obrir l'editor matemàtic",
    "math_editor": "Editor matemàtic",
    "sym_notallowed": "El símbol no està permès",
    "sym_once": "El símbol només es pot emprar una vegada",
    "error_cantprocess": "Error quan es processava la petició",
    "right_answer": "La resposta és correcta",
    "wrong_answer": "La resposta és incorrecta",
    "error_verifying": "Error quan es verificava la resposta",
    "expected_ans": "S'esperava la resposta"
  },
  "es": {
    "check": "Comprueba",
    "chooseone": "Elige una opción",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
    "open_editor": "Abrir el editor matemático",
    "math_editor": "Editor matemático",
    "sym_notallowed": "El símbolo no esta permitido",
    "sym_once": "El símbolo solo se permite una vez",
    "error_cantprocess": "Error cuando se procesaba la petición",
    "right_answer": "Respuesta correcta",
    "wrong_answer": "Respuesta incorrecta",
    "error_verifying": "Error cuando se verificaba la respuesta",
    "expected_ans": "Se esperaba la respuesta"
  },
  "en": {
    "check": "Check",
    "chooseone": "Choose one",
    "right": "Well done!",
    "wrong": "Try it again.",
    "error": "There has been an error processing the answer",
    "random_msg": "These activities contain random questions that are generated at every page load.",
    "open_editor": "Open math editor",
    "math_editor": "Math editor",
    "sym_notallowed": "The symbol is not allowed",
    "sym_once": "The symbol can only be used once",
    "error_cantprocess": "Error processing the request",
    "right_answer": "Right answer",
    "wrong_answer": "Wrong answer",
    "error_verifying": "Error verifying the answer",
    "expected_ans": "The expected answer is"
  },
  "fr": {
    "check": "Vérifier",
    "chooseone": "Choisis une option",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
    "open_editor": "Open math editor",
    "math_editor": "Math editor",
    "sym_notallowed": "The symbol is not allowed",
    "sym_once": "The symbol can only be used once",
    "error_cantprocess": "Error processing the request",
    "right_answer": "Right answer",
    "wrong_answer": "Wrong answer",
    "error_verifying": "Error verifying the answer",
    "expected_ans": "The expected answer is"
  },
  "de": {
    "check": "Prüfen",
    "chooseone": "Wähle eine option",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta",
    "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
    "open_editor": "Open math editor",
    "math_editor": "Math editor",
    "sym_notallowed": "The symbol is not allowed",
    "sym_once": "The symbol can only be used once",
    "error_cantprocess": "Error processing the request",
    "right_answer": "Right answer",
    "wrong_answer": "Wrong answer",
    "error_verifying": "Error verifying the answer",
    "expected_ans": "The expected answer is"
  }
};
function getI18n(lang, key, value) {
  var locale = I18n[lang];
  if (!locale) {
    locale = I18n["ca"];
  }
  var trans = locale[key] || key;
  if (value) {
    trans += ' ' + value;
  }
  return trans;
}

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCachedMsgDialog": function() { return /* binding */ getCachedMsgDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
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
/* 44 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSDialog": function() { return /* binding */ BSDialog; },
/* harmony export */   "BSDialogType": function() { return /* binding */ BSDialogType; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _jsPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
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
/* 45 */
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
/* 46 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "doVariablesInterpolation": function() { return /* binding */ doVariablesInterpolation; },
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
  if (window.nerdamer && !utilities.N) {
    Object.defineProperty(utilities, "N", {
      value: window.nerdamer,
      enumerable: true,
      configurable: false,
      writable: false
    });
  }
  if (window.mathjs && !utilities.M) {
    Object.defineProperty(utilities, "M", {
      value: window.mathjs,
      enumerable: true,
      configurable: false,
      writable: false
    });
  }
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
function doVariablesInterpolation(text, map) {
  if (!map) {
    return text;
  }
  var interpolated = text.replace(/#([a-zA-Z0-9_]+)($|[ .,"'])/gm, function ($0, $1, $2) {
    if (map[$1] != null) {
      return map[$1] + ($2 || '');
    }
    return $0;
  });
  //Support dynamic LaTeX in placeholders (by using $...$ and $$...$$)
  interpolated = interpolated.replace(/\${2}(.*)?\${2}/gm, function ($0, $1) {
    return "\\" + "[" + $1 + "\\" + "]";
  }).replace(/\$(.*)?\$/gm, function ($0, $1) {
    return "\\" + "(" + $1 + "\\" + ")";
  });
  return interpolated;
}

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetElement": function() { return /* binding */ WidgetElement; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
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
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "lang", "ca");
    _defineProperty(_assertThisInitialized(_this), "_syncCount", 0);
    _defineProperty(_assertThisInitialized(_this), "attempts", 0);
    _defineProperty(_assertThisInitialized(_this), "hintSet", false);
    _defineProperty(_assertThisInitialized(_this), "feedbackSet", false);
    return _this;
  }
  _createClass(WidgetElement, [{
    key: "init",
    value:
    /*
    constructor() {
        super();
      
        //this.append(this.statusDisplay);
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        //$(this.statusDisplay).tooltip();
    }
    */

    function init(pre) {
      if (pre) {
        var spanPre = document.createElement("span");
        spanPre.innerHTML = pre;
        this.prepend(spanPre);
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      console.log("Widget connected callback");
      this.innerHTML = "";
      this.classList.add("d-print-none");
      this.statusDisplay = new _statusDisplay__WEBPACK_IMPORTED_MODULE_0__.StatusDisplay();
      // Parse the widgetConfig from data-src
      // Make sure that has data-src field 
      try {
        this.widgetConfig = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.base64Decode)(this.dataset.src);
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
      var _this$statusDisplay;
      this.lang = lang;
      (_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.setLang(lang);
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
      //Interpolate the variables in the groupContext if any
      if (Object.keys(groupContext._s).length) {
        var _this$widgetConfig, _this$widgetConfig2, _this$widgetConfig3, _this$widgetConfig4;
        if ((_this$widgetConfig = this.widgetConfig) !== null && _this$widgetConfig !== void 0 && _this$widgetConfig.hint) {
          this.widgetConfig.hint = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.doVariablesInterpolation)(this.widgetConfig.hint, groupContext._s);
        }
        if ((_this$widgetConfig2 = this.widgetConfig) !== null && _this$widgetConfig2 !== void 0 && _this$widgetConfig2.fbk) {
          this.widgetConfig.fbk = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.doVariablesInterpolation)(this.widgetConfig.fbk, groupContext._s);
        }
        if ((_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && _this$widgetConfig3.ini) {
          this.widgetConfig.ini = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.doVariablesInterpolation)(this.widgetConfig.ini, groupContext._s);
        }
        if ((_this$widgetConfig4 = this.widgetConfig) !== null && _this$widgetConfig4 !== void 0 && _this$widgetConfig4.pre) {
          this.widgetConfig.pre = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.doVariablesInterpolation)(this.widgetConfig.pre, groupContext._s);
        }
        /*
        if(this.widgetConfig?.ans) {
            this.widgetConfig.ans = doVariablesInterpolation(this.widgetConfig.ans, groupContext._s);
        }
        */
      }

      if (this._syncCount === 3) {
        this.render();
      }
    }
  }, {
    key: "setStatus",
    value: function setStatus(status, msg) {
      var _this$statusDisplay2;
      (_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.setStatus(status, msg);
    }
  }, {
    key: "incAttempts",
    value: function incAttempts() {
      var _this$groupContext, _this$groupContext2, _this$widgetConfig5, _this$widgetConfig7;
      this.attempts++;
      var limitHint = ((_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext.o.hint) || 0;
      var limitFeedback = ((_this$groupContext2 = this.groupContext) === null || _this$groupContext2 === void 0 ? void 0 : _this$groupContext2.o.ans) || 0;
      if (!this.hintSet && limitHint > 0 && this.attempts >= limitHint && (_this$widgetConfig5 = this.widgetConfig) !== null && _this$widgetConfig5 !== void 0 && _this$widgetConfig5.hint) {
        var _this$statusDisplay3, _this$widgetConfig6;
        this.hintSet = true;
        (_this$statusDisplay3 = this.statusDisplay) === null || _this$statusDisplay3 === void 0 ? void 0 : _this$statusDisplay3.setHint((_this$widgetConfig6 = this.widgetConfig) === null || _this$widgetConfig6 === void 0 ? void 0 : _this$widgetConfig6.hint);
      }
      if (!this.feedbackSet && limitFeedback > 0 && this.attempts >= limitFeedback && (_this$widgetConfig7 = this.widgetConfig) !== null && _this$widgetConfig7 !== void 0 && _this$widgetConfig7.fbk) {
        var _this$statusDisplay4, _this$widgetConfig8;
        this.feedbackSet = true;
        (_this$statusDisplay4 = this.statusDisplay) === null || _this$statusDisplay4 === void 0 ? void 0 : _this$statusDisplay4.setFeedback((_this$widgetConfig8 = this.widgetConfig) === null || _this$widgetConfig8 === void 0 ? void 0 : _this$widgetConfig8.fbk);
      }
    }
  }, {
    key: "showFeedback",
    value: function showFeedback() {
      var _this$widgetConfig9;
      if (!this.feedbackSet && (_this$widgetConfig9 = this.widgetConfig) !== null && _this$widgetConfig9 !== void 0 && _this$widgetConfig9.fbk) {
        var _this$statusDisplay5, _this$widgetConfig10;
        this.feedbackSet = true;
        (_this$statusDisplay5 = this.statusDisplay) === null || _this$statusDisplay5 === void 0 ? void 0 : _this$statusDisplay5.setFeedback((_this$widgetConfig10 = this.widgetConfig) === null || _this$widgetConfig10 === void 0 ? void 0 : _this$widgetConfig10.fbk);
      }
    }
  }]);
  return WidgetElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$statusDisplay, _this$statusDisplay2, _this$widgetConfig;
        var expectedAns, expectedSet, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(((_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.getStatus()) === _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", true);
            case 4:
              if (!(((_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.getStatus()) !== _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              expectedAns = (((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) || '').split(",").map(function (e) {
                return e.trim();
              });
              expectedSet = new Set(expectedAns);
              result = isSameSet(this.userAnsSet, expectedSet);
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              this.enable(!result);
              if (result) {
                this.showFeedback();
              } else {
                this.incAttempts();
              }
              return _context.abrupt("return", result);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$widgetConfig2,
        _this$groupContext,
        _this2 = this,
        _this$widgetConfig3,
        _this$widgetConfig4,
        _this$widgetConfig4$o;
      console.log("MCHOICE RENDER:: ", this.groupContext, this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer and all the options
      var theVars = (((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.vars) || []).filter(function (e) {
        return (e + '').trim().length > 0;
      });
      console.log("thevars", theVars);
      if ((_this$groupContext = this.groupContext) !== null && _this$groupContext !== void 0 && _this$groupContext.s.length) {
        console.log("The vars,", theVars);
        theVars.forEach(function (v, i) {
          var _this2$groupContext;
          console.log("Searching for # in ", v);
          if (v.indexOf('#') < 0) {
            return;
          }
          theVars[i] = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.doVariablesInterpolation)(v, (_this2$groupContext = _this2.groupContext) === null || _this2$groupContext === void 0 ? void 0 : _this2$groupContext._s);
        });
      }
      this.form = document.createElement("form");
      this.form.style.setProperty("display", "inline-block");
      var isMultiple = ((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : _this$widgetConfig3.ans.indexOf(",")) > 0;
      var n = theVars.length || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig4 = this.widgetConfig) !== null && _this$widgetConfig4 !== void 0 && (_this$widgetConfig4$o = _this$widgetConfig4.opts) !== null && _this$widgetConfig4$o !== void 0 && _this$widgetConfig4$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.shuffleArray)(permutationIndices);
      }
      var radioName = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.genID)();
      permutationIndices.forEach(function (index) {
        var _this2$form;
        var opt = theVars[index];
        var formCheck = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
          "class": "form-check"
        });
        (_this2$form = _this2.form) === null || _this2$form === void 0 ? void 0 : _this2$form.append(formCheck);
        var input = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("input", {
          "class": "form-check-input",
          type: isMultiple ? "checkbox" : "radio",
          name: radioName,
          id: radioName + "_" + index
        });
        var label = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
          "class": "form-check-label",
          "for": radioName + "_" + index,
          html: opt
        });
        formCheck.appendChild(input);
        formCheck.appendChild(label);
        _this2.radios.push(input);
        input.addEventListener("click", function (evt) {
          if (isMultiple) {
            input.checked ? _this2.userAnsSet.add(index + '') : _this2.userAnsSet["delete"](index + '');
          } else {
            _this2.userAnsSet = new Set([index + '']);
          }
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING);
        });
      });
      _get(_getPrototypeOf(IBQuizzMchoice.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.form);
      this.statusDisplay && this.append(this.statusDisplay.getElement());
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
}(_widgetElement__WEBPACK_IMPORTED_MODULE_5__.WidgetElement)) || _class);

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$statusDisplay, _this$statusDisplay2;
        var result, _this$widgetConfig2, userFloat, ansFloat, _this$widgetConfig3, _this$widgetConfig3$o, _this$widgetConfig4, _this$widgetConfig4$o, tolerance, units, _this$widgetConfig5;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(((_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.getStatus()) === _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", true);
            case 4:
              if (!(((_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.getStatus()) !== _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              //TODO set tolerance
              result = false;
              _context.prev = 7;
              userFloat = parseFloat(this.getUserInput());
              ansFloat = parseFloat(((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : _this$widgetConfig2.ans) || "0");
              if (!(!isNaN(userFloat) && !isNaN(ansFloat))) {
                _context.next = 23;
                break;
              }
              tolerance = ((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : (_this$widgetConfig3$o = _this$widgetConfig3.opts) === null || _this$widgetConfig3$o === void 0 ? void 0 : _this$widgetConfig3$o.err) || 0;
              units = ((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : (_this$widgetConfig4$o = _this$widgetConfig4.opts) === null || _this$widgetConfig4$o === void 0 ? void 0 : _this$widgetConfig4$o.errunit) || 'absolute';
              if (units === '%') {
                tolerance = 0.01 * tolerance;
              }
              if (ansFloat === 0) {
                units = 'absolute';
              }
              _context.t0 = units;
              _context.next = _context.t0 === 'absolute' ? 18 : 20;
              break;
            case 18:
              result = Math.abs(userFloat - ansFloat) <= tolerance;
              return _context.abrupt("break", 21);
            case 20:
              // Assume relative
              result = Math.abs(userFloat / ansFloat - 1) <= tolerance;
            case 21:
              _context.next = 26;
              break;
            case 23:
              console.error("ERROR", this.getUserInput(), (_this$widgetConfig5 = this.widgetConfig) === null || _this$widgetConfig5 === void 0 ? void 0 : _this$widgetConfig5.ans);
              this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
              return _context.abrupt("return", false);
            case 26:
              _context.next = 33;
              break;
            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](7);
              console.error(_context.t1);
              //Error
              this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
              return _context.abrupt("return", false);
            case 33:
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              console.log("Numeric, ", this.getUserInput(), result);
              this.enable(!result);
              if (result) {
                this.showFeedback();
              } else {
                this.incAttempts();
              }
              return _context.abrupt("return", result);
            case 38:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[7, 28]]);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
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
          this.widgetConfig.ans = '' + (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
        "class": "form-control",
        type: "number",
        style: "display:inline-block;width:100px;"
      });
      this.input.addEventListener("change", function (evt) {
        _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING);
      });
      _get(_getPrototypeOf(IBQuizzNumeric.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.input);
      this.statusDisplay && this.append(this.statusDisplay.getElement());
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
}(_widgetElement__WEBPACK_IMPORTED_MODULE_3__.WidgetElement)) || _class);

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$statusDisplay, _this$statusDisplay2;
        var result, _this$widgetConfig2, _this$groupContext, _this$widgetConfig3, _this$groupContext2, localContext, scriptFn, _this$widgetConfig4, expected, given, i, lenv;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(((_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.getStatus()) === _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", true);
            case 4:
              if (!(((_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.getStatus()) !== _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              //TODO set tolerance
              result = false;
              _context.prev = 7;
              // See if there is a check function
              if ((_this$widgetConfig2 = this.widgetConfig) !== null && _this$widgetConfig2 !== void 0 && _this$widgetConfig2.cfn) {
                localContext = {
                  u: this.getUserInputArray()
                };
                Object.assign(localContext, (_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext._s);
                localContext.u.forEach(function (e, i) {
                  return localContext['u' + i] = e;
                });
                //Evaluate check function that must return true or false
                scriptFn = (((_this$widgetConfig3 = this.widgetConfig) === null || _this$widgetConfig3 === void 0 ? void 0 : _this$widgetConfig3.cfn) || 'return true').replace(/#/g, '');
                result = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.runIBScript)(scriptFn, localContext, ((_this$groupContext2 = this.groupContext) === null || _this$groupContext2 === void 0 ? void 0 : _this$groupContext2._s) || {});
                console.log("Avaluant ", scriptFn, "Retorna ", result);
              } else {
                //Must rely on .ans to be an array with answers
                expected = ((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : _this$widgetConfig4.ans) || "[]";
                if (typeof expected === 'string') {
                  expected = JSON.parse(expected);
                }
                console.log(expected);
                given = this.getUserInputArray();
                result = true;
                for (i = 0, lenv = given.length; i < lenv; i++) {
                  if (i < expected.length) {
                    result = result && expected[i] == (given[i] || '').trim();
                  } else {
                    result = false;
                  }
                }
              }
              _context.next = 16;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](7);
              //Error
              console.error(_context.t0);
              this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
              return _context.abrupt("return", false);
            case 16:
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              console.log("Matquill Cloze, ", this.getUserInput(), result);
              this.enable(!result);
              if (!result) {
                this.incAttempts();
              } else {
                this.showFeedback();
              }
              return _context.abrupt("return", result);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[7, 11]]);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext3,
        _this = this;
      if (!this.widgetConfig) {
        return;
      }
      console.log("Render cloze widget ", this.widgetConfig);
      if (!window.MathQuill) {
        console.error("MathQuill not found on page");
        return;
      }

      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer
      if ((_this$groupContext3 = this.groupContext) !== null && _this$groupContext3 !== void 0 && _this$groupContext3.s.length && this.widgetConfig) {
        var theAns = this.widgetConfig.ans || '';
        if (theAns.indexOf('#') >= 0) {
          theAns = theAns.replace(/#/g, '');
          this.widgetConfig.ans = '' + (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = document.createElement("span");
      this.input.innerText = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_2__.treatIniPlaceholders)(this.widgetConfig.ini || '?');
      console.log(this.input.innerText);
      this.append(this.input);
      //Important MUST BE appended before calling StaticMath
      var MQI = window.MathQuill.getInterface(2);
      this.mathInput = MQI.StaticMath(this.input);
      // TODO: listen to changes to set status to unmodified

      this.mathInput.innerFields.forEach(function (e) {
        e.__controller.textarea.on('keyup', function (ev) {
          ev.preventDefault();
          _this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING);
        });
      });
      _get(_getPrototypeOf(IBQuizzCloze.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.statusDisplay && this.append(this.statusDisplay.getElement());
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
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var _engines_nerdamerEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53);
/* harmony import */ var _engines_parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
/* harmony import */ var _mathEditorDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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









var IBQuizzMathquill = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.ComponentHTML)({
  elementName: "ib-quizz-mathquill",
  classes: ["iedib-quizz-widget"],
  styles: {
    "display": "inline-block"
  }
}), _dec(_class = /*#__PURE__*/function (_WidgetElement) {
  _inherits(IBQuizzMathquill, _WidgetElement);
  var _super = _createSuper(IBQuizzMathquill);
  function IBQuizzMathquill() {
    _classCallCheck(this, IBQuizzMathquill);
    return _super.apply(this, arguments);
  }
  _createClass(IBQuizzMathquill, [{
    key: "enable",
    value: function enable(state) {
      //TODO
      console.log(this.mathInput);
    }
  }, {
    key: "getUserInput",
    value: function getUserInput() {
      var _this$mathInput;
      var l = (_this$mathInput = this.mathInput) === null || _this$mathInput === void 0 ? void 0 : _this$mathInput.latex();
      console.log(l);
      return (l || '').replace(/\\,/g, ' ').replace(/\\/g, ' ').trim();
    }
  }, {
    key: "displayRightAnswer",
    value: function displayRightAnswer() {
      if (this.mathInput) {
        var _this$widgetConfig;
        var ansLatex = ((_this$widgetConfig = this.widgetConfig) === null || _this$widgetConfig === void 0 ? void 0 : _this$widgetConfig.ans) || '';
        this.mathInput.latex(ansLatex);
        this.enable(false);
      }
    }
  }, {
    key: "check",
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$statusDisplay, _this$statusDisplay2, _this$widgetConfig2, _this$widgetConfig2$o;
        var result, ngx, _this$widgetConfig3, _this$groupContext, _this$widgetConfig4, _this$groupContext2, raw, uNerd, localContext, scriptFn, _this$widgetConfig5, _this$widgetConfig6, N, userInput, cas, payload, res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(((_this$statusDisplay = this.statusDisplay) === null || _this$statusDisplay === void 0 ? void 0 : _this$statusDisplay.getStatus()) === _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", true);
            case 4:
              if (!(((_this$statusDisplay2 = this.statusDisplay) === null || _this$statusDisplay2 === void 0 ? void 0 : _this$statusDisplay2.getStatus()) !== _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              //TODO set tolerance
              result = false;
              ngx = (((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : (_this$widgetConfig2$o = _this$widgetConfig2.opts) === null || _this$widgetConfig2$o === void 0 ? void 0 : _this$widgetConfig2$o.ngx) || 'nermader').trim().toLowerCase();
              _context.prev = 8;
              if (!((_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && _this$widgetConfig3.cfn)) {
                _context.next = 20;
                break;
              }
              raw = this.getUserInput() || '';
              uNerd = null;
              if (window.nerdamer) {
                uNerd = (0,_engines_parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_2__.parseLatexNerdamer)(raw);
              }
              localContext = {
                uTex: raw,
                uNerd: uNerd
              };
              Object.assign(localContext, (_this$groupContext = this.groupContext) === null || _this$groupContext === void 0 ? void 0 : _this$groupContext._s);
              //Evaluate check function that must return true or false
              scriptFn = (((_this$widgetConfig4 = this.widgetConfig) === null || _this$widgetConfig4 === void 0 ? void 0 : _this$widgetConfig4.cfn) || 'return true').replace(/#/g, '');
              result = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_3__.runIBScript)(scriptFn, localContext, ((_this$groupContext2 = this.groupContext) === null || _this$groupContext2 === void 0 ? void 0 : _this$groupContext2._s) || {});
              console.log("Avaluant ", scriptFn, "Retorna ", result);
              _context.next = 33;
              break;
            case 20:
              if (!(window.nerdamer && ngx === 'nermader')) {
                _context.next = 32;
                break;
              }
              N = window.nerdamer; // Process
              userInput = this.getUserInput() || ''; // Send to the Engine
              cas = (0,_engines_nerdamerEngine__WEBPACK_IMPORTED_MODULE_4__.getNerdamerCAS)(this.lang);
              payload = {
                latex: [userInput],
                ans: [((_this$widgetConfig5 = this.widgetConfig) === null || _this$widgetConfig5 === void 0 ? void 0 : _this$widgetConfig5.ans) || ''],
                symbols: ((_this$widgetConfig6 = this.widgetConfig) === null || _this$widgetConfig6 === void 0 ? void 0 : _this$widgetConfig6.vars) || [],
                qid: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__.genID)()
              };
              _context.next = 27;
              return cas.compare(payload);
            case 27:
              res = _context.sent;
              console.log(res);
              result = res.correct > 0;
              _context.next = 33;
              break;
            case 32:
              throw new Error("Check function must be set");
            case 33:
              _context.next = 40;
              break;
            case 35:
              _context.prev = 35;
              _context.t0 = _context["catch"](8);
              //Error
              console.error(_context.t0);
              this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
              return _context.abrupt("return", false);
            case 40:
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              console.log("Matquill mathinput, ", this.getUserInput(), result);
              this.enable(!result);
              if (!result) {
                this.incAttempts();
              } else {
                this.showFeedback();
              }
              return _context.abrupt("return", result);
            case 45:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[8, 35]]);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext3,
        _this = this;
      if (!this.widgetConfig) {
        return;
      }
      console.log("Render cloze widget ", this.widgetConfig);
      if (!window.MathQuill) {
        console.error("MathQuill not found on page");
        return;
      }

      // Here groupContext._v map is available and parsed
      // Must evaluate in the context the rightanswer
      if ((_this$groupContext3 = this.groupContext) !== null && _this$groupContext3 !== void 0 && _this$groupContext3.s.length && this.widgetConfig) {
        var theAns = this.widgetConfig.ans || '';
        if (theAns.indexOf('#') >= 0) {
          theAns = theAns.replace(/#/g, '');
          this.widgetConfig.ans = '' + (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = document.createElement("span");
      this.input.innerText = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_3__.treatIniPlaceholders)(this.widgetConfig.ini || '');
      this.input.style.minWidth = "100px";
      this.append(this.input);
      //Important MUST BE appended before calling StaticMath
      var MQI = window.MathQuill.getInterface(2);
      this.mathInput = MQI.MathField(this.input, {
        handlers: {
          edit: function edit() {
            console.log("Edit ev on mathquill ");
            _this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.PENDING);
          }
        }
      });
      // Add editor button dialog
      this.dlg_btn_el = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__.createElement)('button', {
        "class": "btn btn-sm ibquizz-me-btn-openeditor",
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_6__["default"])(this.lang, 'open_editor'),
        html: '<i class="ibquizz-square-root"></i>'
      });
      this.append(this.dlg_btn_el);
      this.dlg_btn_el.addEventListener("click", function (ev) {
        var _this$mathInput3;
        ev.preventDefault();
        // open a editordlg
        // must do the binding when closing
        var dlg = (0,_mathEditorDialog__WEBPACK_IMPORTED_MODULE_7__.getCachedMathEditorDialog)((0,_i18n__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.lang, 'math_editor'));
        dlg.setLatex('');
        dlg.show(function () {
          var latex = dlg.getLatex();
          if (latex) {
            var _this$mathInput2;
            (_this$mathInput2 = _this.mathInput) === null || _this$mathInput2 === void 0 ? void 0 : _this$mathInput2.latex(latex);
          }
        });
        dlg.setLatex(((_this$mathInput3 = _this.mathInput) === null || _this$mathInput3 === void 0 ? void 0 : _this$mathInput3.latex()) || '');
      });
      _get(_getPrototypeOf(IBQuizzMathquill.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.statusDisplay && this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
  }]);
  return IBQuizzMathquill;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_8__.WidgetElement)) || _class);

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseLatexNerdamer": function() { return /* binding */ parseLatexNerdamer; }
/* harmony export */ });
var pmatrix_re = /\\begin\{pmatrix\}(.*?)\\end\{pmatrix\}/gm;
var mcount = 0;
// Convert a \begin{pmatrix} a & b \\ c & d \end{pmatrix} in to nermader matrix([a,b],[c,d]) 
function parse_pmatrix(latex) {
  latex = latex.replace("\\begin{pmatrix}", "").replace("\\end{pmatrix}", "");
  var rows = latex.split("\\\\").map(function (row) {
    var cols = row.split("&").map(function (col) {
      return col.trim();
    });
    return '[' + cols.join(',') + ']';
  });
  var out = 'matrix(' + rows.join(',') + ')';
  var varName = 'M_' + mcount;
  window.nerdamer.setVar(varName, out);
  mcount++;
  return varName;
}
function parseLatexNerdamer(tex) {
  // Treat matrices
  tex = tex.replace(pmatrix_re, function ($0, $1) {
    return parse_pmatrix($0);
  });
  return window.nerdamer.convertFromLaTeX(tex);
}

/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNerdamerCAS": function() { return /* binding */ getNerdamerCAS; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



function is_set(expr) {
  var _expr$symbols;
  if (Array.isArray(expr === null || expr === void 0 ? void 0 : (_expr$symbols = expr.symbols) === null || _expr$symbols === void 0 ? void 0 : _expr$symbols.elements)) {
    var mat = expr.symbols.elements;
    var firstElem = mat[0];
    if (!Array.isArray(firstElem)) {
      return true;
    }
  }
  return false;
}
function is_interval(expr) {
  // Intervals not implemented in Nerdamer
  return false;
}
function is_matrix(expr) {
  var txt = expr.text();
  if (txt.startsWith('matrix')) {
    return window.nerdamer('size(' + txt + ')');
  }
  return null;
}
function is_zero_matrix(expr) {
  var isZero = true;
  expr.each(function (e) {
    isZero = isZero && e.text() == '0';
  });
  return isZero;
}
var NerdamerCAS = /*#__PURE__*/function () {
  function NerdamerCAS(lang) {
    _classCallCheck(this, NerdamerCAS);
    this.lang = lang;
  } //
  _createClass(NerdamerCAS, [{
    key: "checkRules",
    value: function checkRules(p) {
      var _this = this;
      //Before parsing and evaluation, do checks directly based on latex answers
      var rules_checks = [];
      var rules = p.rules || {};
      if (typeof rules === 'string') {
        console.log("Converting rules to json");
        rules = JSON.parse(rules);
      }
      var latex_code = p.latex.join(' ');

      // comma as tuple
      if (rules['comma_as_decimal']) {
        console.log('Consider comma as decimal');
        // by default, consider comma as decimal separator
        p['latex'] = p['latex'].map(function (e) {
          return e.replace(',', '.');
        });
      }
      // do not allow sympy keywords in latex code
      // TODO

      if (rules['forbidden']) {
        // symbols or expressions that are forbidden
        rules["forbidden"].forEach(function (fo_symb) {
          if (latex_code[fo_symb]) {
            rules_checks.push((0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.lang, 'sym_notallowed', fo_symb));
          }
        });
      }
      if (rules["unique"]) {
        // Symbols that can only appear once
        rules["unique"].forEach(function (un_sym) {
          if ((latex_code.match(new RegExp(un_sym, 'g')) || []).length > 1) {
            rules_checks.push((0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.lang, 'sym_once', un_sym));
          }
        });
      }
      return rules_checks;
    }
  }, {
    key: "compare",
    value: function compare(p) {
      var _this2 = this;
      var cas = window.nerdamer;
      console.log("The payload: ", p);
      p = NerdamerCAS.clone(p);
      return new Promise(function (resolve, reject) {
        //Remove all stores expressions
        cas.flush();
        cas.clearVars();
        var core = window.nerdamer.getCore();
        var _Symbol = core.Symbol;
        var scope = {
          'x': cas('x'),
          'y': cas('y'),
          'z': cas('z'),
          't': cas('t'),
          'e': cas('exp(1)')
        };
        var rules_checks = _this2.checkRules(p);
        if (rules_checks.length) {
          resolve({
            "qid": p.qid,
            "msg": rules_checks.join(' '),
            "correct": 0
          });
          return;
        }

        // Parses user input latex --> nerdamer
        var user_nerd = [];
        try {
          user_nerd = p['latex'].map(function (e) {
            return (0,_parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_1__.parseLatexNerdamer)(e);
          });
          if (user_nerd.filter(function (x) {
            return x == null;
          }).length > 0) {
            return resolve({
              qid: p.qid,
              correct: -4,
              msg: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this2.lang, 'error_cantprocess')
            });
          }
        } catch (ex) {
          console.error(ex);
          return resolve({
            "qid": p['qid'],
            "correct": -4,
            "msg": "Error: No es poden processar les respostes donades: " + ex
          });
        }
        // Adds user answer to scope for checking evaluation and user defined symbols
        user_nerd.forEach(function (v, i) {
          cas.setVar('ua_' + i, v);
        });

        //Prepares local scope for evaluation
        try {
          (p.symbols || []).forEach(function (symb) {
            if (symb.indexOf(':=') > 0) {
              var pos = symb.indexOf(":=");
              var symb_name = symb.substring(0, pos);
              var symb_raw = symb.substring(pos + 2);
              cas.setVar(symb_name, symb_raw);
            } else {
              cas.setVar(symb, symb);
            }
          });
        } catch (ex) {
          console.error(ex);
          resolve({
            "qid": p["qid"],
            "correct": -2,
            "msg": "Error: no es poden processar els símbols: " + ex
          });
          return;
        }
        console.log("The scope:: ");
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.items)(scope, function (k, v) {
          console.log(k + ": ", v.text());
        });
        var ans_nerd = [];
        try {
          //print('decrypting.....')
          if (p['anse']) {
            p['ans'] = [NerdamerCAS.decrypt(p['anse'])];
          }
          console.log('ans decrypted ', p['anse'], p['ans']);
          ans_nerd = p['ans'].map(function (e) {
            return cas(e, scope);
          });
          if (ans_nerd.filter(function (e) {
            return e == null;
          }).length > 0) {
            resolve({
              "qid": p['qid'],
              "correct": -3,
              "msg": "Error: Hi ha respostes 'ans' que no es poden processar"
            });
            return;
          }
        } catch (ex) {
          console.error(ex);
          resolve({
            "qid": p['qid'],
            "correct": -3,
            "msg": "Error: No es poden processar les respostes 'ans': " + ex
          });
          return;
        }

        //TODO case of logical check condition as answer

        // Before performing math difference to check equality, check types
        try {
          var msgs = [];
          (0,_utils__WEBPACK_IMPORTED_MODULE_2__.zip)(ans_nerd, user_nerd).forEach(function (pair) {
            var _pair = _slicedToArray(pair, 2),
              ans_obj = _pair[0],
              parsed_input = _pair[1];
            if (is_set(ans_obj) && !is_set(parsed_input)) {
              msgs.push("S'espera un conjunt per resposta. Per exemple \\(\\{\\sqrt{2},\\, \\pi\\}\\)");
            } else if (is_matrix(ans_obj) && !is_matrix(parsed_input)) {
              msgs.push("S'espera una matriu per resposta.");
            } else if (is_interval(ans_obj) && !is_interval(parsed_input)) {
              msgs.push("S'espera un interval per resposta.");
            } else if (!is_matrix(ans_obj) && is_matrix(parsed_input)) {
              msgs.push("S'espera una expressió per resposta.");
            }
            var dims1 = is_matrix(ans_obj);
            var dims2 = is_matrix(parsed_input);
            if (dims1 && dims2) {
              // check if both have the same dimensions
              if (dims1[0] != dims2[0] || dims1[1] != dims2[1]) {
                msgs.push("La matriu resposta no té la dimensió correcta.");
              }
            }
          });
          if (msgs.length > 0) {
            resolve({
              "qid": p['qid'],
              "correct": 0,
              "msg": msgs.join(' ')
            });
            return;
          }
        } catch (ex) {
          console.error(ex);
          resolve({
            "qid": p['qid'],
            "correct": -4,
            "msg": "Error: S'ha produït un error comprovant els tipus " + ex
          });
          return;
        }

        // Check for mathematical equivalence
        // This produces an errorr because rules passes as a list not a dict!!!!
        //check_method = rules.get("method", "meqv")  #support other methods numeric[0.01]

        // TODO as_vector is not supported here
        // Treat every element in array of answers indepently 
        var correct = 0;
        var msg = '';
        try {
          (0,_utils__WEBPACK_IMPORTED_MODULE_2__.zip)(ans_nerd, user_nerd).forEach(function (pair) {
            var _pair2 = _slicedToArray(pair, 2),
              ans_obj = _pair2[0],
              parsed_input = _pair2[1];
            console.log('Compare:: ', ans_obj.text(), parsed_input.text());
            // Cannot compare list and FineSet so, convert list to FiniteSet
            // console.log(ans_obj, parsed_input, type(ans_obj), type(parsed_input))

            //print('starting to compare', ans_obj, parsed_input)
            var expr = null;
            var rules = p["rules"] || {};

            // decide if precision is set
            if (rules['precision']) {
              // Numerical equivalence within precision
              expr = Math.abs(ans_obj.toDecimal() - parsed_input.toDecimal()) < rules['precision'];
              console.log('epsilon', expr);
            } else {
              if (is_matrix(ans_obj)) {
                var delta = ans_obj.subtract(parsed_input);
                console.log('debug ', ans_obj.text(), parsed_input.text(), delta.text());
                expr = is_zero_matrix(delta);
              } else if (rules['factor'] || rules['expand']) {
                //This condition takes into account if expanded or not
                expr = ans_obj.eq(parsed_input);
              } else {
                //expr = ans_obj.eq(parsed_input)    
                //Check for subtraction eq 0?
                expr = ans_obj.subtract(parsed_input).simplify();
                expr = expr.text() == '0';
              }
              console.log('remainder', expr);
            }
            if (typeof expr === 'boolean' && expr === true) {
              // Sabem que és matemàticament equivalent
              correct = 1;
              msg = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this2.lang, 'right_answer');
              /*
              if ('factor' in rules) and (rules['factor']==True) and (not (isinstance(parsed_input, Mul) or isinstance(parsed_input, Pow)) ):
                  correct = 0
                  msg = "La resposta ha estar factoritzada."
              elif ('factor' in rules) and (rules['factor']==False) and (not isinstance(parsed_input, Add)):
                  correct = 0 
                  msg = "La resposta ha d'estar desenvolupada."
              */
            } else {
              msg = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this2.lang, 'wrong_answer');
              correct = 0;
              /*
              if is_matrix(expr):
                  msg = find_not_zero_element(expr)
              */
            }

            if (correct == 0) {
              return true;
            }
            // Once equality is checked, then treat the number of terms and factors as second check
            // Apply only for expressions of polynomial type
            if (rules["num_terms"] && parsed_input.isPolynomial()) {
              var unt = parsed_input.symbols.coeffs().length;
              var nexpect = ans_obj.symbols.expand().coeffs().length;
              var nterms_diff = nexpect - unt;
              if (rules["num_terms"] == "equal" && nterms_diff != 0) {
                msg = "La resposta hauria de tenir " + nexpect + " termes sumats o restats.";
                correct = 0;
              }
            }
            /* 
                elif type(ans_obj) == Mul or type(ans_obj) == Pow:
                    #Si només té un terme, comprova si està ben factoritzat
                    # TODO: Allow arbitrary number of numeric factors. Filter only those with symbols
                    tmp1 = list(filter(lambda e: is_symbolic(e), ans_obj.as_ordered_factors()))
                    tmp2 = list(filter(lambda e: is_symbolic(e), parsed_input.as_ordered_factors()))
                    nexpect =  len(tmp1)
                    nterms_diff = nexpect - len(tmp2)
                    if nterms_diff != 0:
                        print(str(tmp1), str([type(e) for e in tmp1]))
                        print(str(tmp2), str([type(e) for e in tmp2]))
                        msg = "La resposta hauria de contenir "+str(nexpect)+" factors simbòlics."
                        correct = 0
                         if correct == 0:
                    break
            */
          }); //end zip foreach
        } catch (err) {
          console.error("Exception comparing ", err);
          msg = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this2.lang, 'error_verifying');
          correct = -1;
        }
        console.log("Response:: ", correct, msg);
        resolve({
          "qid": p['qid'],
          "correct": correct,
          "msg": msg
        });
      });
    }
  }, {
    key: "getAnswer",
    value: function getAnswer(p) {
      var _this3 = this;
      var cas = window.nerdamer;
      p = NerdamerCAS.clone(p);
      return new Promise(function (resolve, reject) {
        // Prepares local scope for evaluation
        var scope = {
          'x': cas('x'),
          'y': cas('y'),
          'z': cas('z'),
          't': cas('t'),
          'e': cas('exp(1)')
        };
        //Prepares local scope for evaluation
        try {
          (p['symbols'] || []).forEach(function (symb) {
            if (symb.indexOf(':=') > 0) {
              var pos = symb.indexOf(":=");
              var symb_name = symb.substring(0, pos);
              var symb_raw = symb.substring(pos + 2);
              cas.setVar(symb_name, symb_raw);
            } else {
              cas.setVar(symb, symb);
            }
          });
        } catch (ex) {
          console.error(ex);
          resolve({
            "msg": "Error: no es poden processar els símbols: " + ex
          });
          return;
        }

        //TODO assume ans is str
        if (typeof p['ans'] === 'string') {
          var ans_nerd = cas(p['ans'], scope);
          var ra = "".concat((0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(_this3.lang, 'expected_ans'), "<br> \\(").concat(ans_nerd.latex(), "\\)");
          resolve({
            "right_answer": btoa(ra)
          });
          return;
        }
        resolve({
          "msg": "Vector ans is not supported yet!"
        });
      });
    }
  }], [{
    key: "clone",
    value: function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }, {
    key: "decrypt",
    value: function decrypt(str) {
      return atob(str);
    }
  }]);
  return NerdamerCAS;
}();
var nerdamerCAS;
function getNerdamerCAS(lang) {
  if (!nerdamerCAS) {
    nerdamerCAS = new NerdamerCAS(lang);
  }
  return nerdamerCAS;
}

/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCachedMathEditorDialog": function() { return /* binding */ getCachedMathEditorDialog; }
/* harmony export */ });
/* unused harmony export MathEditorDialog */
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _mathEditorPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
/* eslint-disable @typescript-eslint/ban-ts-comment */



var MathEditorDialog = /*#__PURE__*/function (_BSDialog) {
  _inherits(MathEditorDialog, _BSDialog);
  var _super = _createSuper(MathEditorDialog);
  function MathEditorDialog(id) {
    var _this;
    _classCallCheck(this, MathEditorDialog);
    _this = _super.call(this, id, _bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialogType.CANCEL_ACCEPT, '');
    _this.mathEditorPanel = new _mathEditorPanel__WEBPACK_IMPORTED_MODULE_1__.MathEditorPanel();
    _this.setBody(_this.mathEditorPanel.getView());
    return _this;
  }
  //@Override
  _createClass(MathEditorDialog, [{
    key: "setBody",
    value: function setBody(htmlElem) {
      var _this2 = this;
      this.body.html('');
      this.body.append($(htmlElem));
      //Directly attach action to primary button if not of submit type
      this.primaryButton.on('click', function (evt) {
        evt.preventDefault();
        _this2.acceptCb && _this2.acceptCb();
        //@ts-ignore
        _this2.elem.modal('hide');
      });
    }
  }, {
    key: "setLatex",
    value: function setLatex(latex) {
      this.mathEditorPanel.setLatex(latex);
    }
  }, {
    key: "getLatex",
    value: function getLatex() {
      return this.mathEditorPanel.getLatex();
    }
    //@Override
  }, {
    key: "show",
    value: function show(acceptCb) {
      var _this3 = this;
      _get(_getPrototypeOf(MathEditorDialog.prototype), "show", this).call(this, acceptCb);
      setTimeout(function () {
        return _this3.mathEditorPanel.reflow();
      }, 300);
    }
  }]);
  return MathEditorDialog;
}(_bs_dialog__WEBPACK_IMPORTED_MODULE_0__.BSDialog);

// Cache
var _chachedDlg;
function getCachedMathEditorDialog(title) {
  if (!_chachedDlg) {
    var id = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__.genID)();
    _chachedDlg = new MathEditorDialog(id);
  }
  _chachedDlg.setTitle(title);
  return _chachedDlg;
}

/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathEditorPanel": function() { return /* binding */ MathEditorPanel; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _mathEditorPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var MathEditorPanel = /*#__PURE__*/function () {
  function MathEditorPanel() {
    _classCallCheck(this, MathEditorPanel);
    //The root view
    this.view = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      "class": "ibquizz-editor-panel"
    });
    this.palette = new _mathEditorPalette__WEBPACK_IMPORTED_MODULE_1__.MathEditorPalette(this);
    this.view.append(this.palette.getView());
    var MQI = window.MathQuill.getInterface(2);
    var spanElem = document.createElement("span");
    spanElem.style.display = "block";
    spanElem.style.width = "100%";
    spanElem.style.minHeight = "100px";
    this.view.append(spanElem);
    this.mathInput = MQI.MathField(spanElem, {});
  }
  _createClass(MathEditorPanel, [{
    key: "getView",
    value: function getView() {
      return this.view;
    }
  }, {
    key: "setLatex",
    value: function setLatex(latex) {
      this.mathInput.latex(latex);
    }
  }, {
    key: "getLatex",
    value: function getLatex() {
      return this.mathInput.latex();
    }
  }, {
    key: "write",
    value: function write(latex, moveTo, moveFor) {
      if (moveFor === undefined) {
        moveFor = 1;
      }
      this.mathInput.write(latex);
      this.mathInput.focus();
      if (moveTo) {
        for (var i = 0; i < moveFor; i++) {
          this.mathInput.keystroke(moveTo);
        }
      }
    }
  }, {
    key: "reflow",
    value: function reflow() {
      this.mathInput.focus();
      this.mathInput.reflow();
      this.palette.reflow();
    }
  }]);
  return MathEditorPanel;
}();

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathEditorPalette": function() { return /* binding */ MathEditorPalette; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var tabs = [{
  name: "General",
  buttons: [{
    name: "Multiplicació",
    latex: "\\times",
    tab: 1,
    icon: '\\times'
  }, {
    name: "Fracció",
    latex: "\\frac{}{}",
    moveto: "Up",
    movefor: 1,
    tab: 1,
    icon: '\\frac{\\square}{\\square}'
  }, {
    name: "Exponent",
    latex: "\\^{}",
    moveto: "Up",
    movefor: 1,
    tab: 1,
    icon: '\\square^2'
  }, {
    name: "Parèntesis",
    latex: "\\left(\\right)",
    moveto: "Left",
    movefor: 1,
    tab: 1,
    icon: '\\left(\\square\\right)'
  }, {
    name: "Arrel quadrada",
    latex: "\\sqrt{}",
    moveto: "Left",
    movefor: 1,
    tab: 1,
    icon: '\\sqrt{\\square}'
  }, {
    name: "Arrel cúbica",
    latex: "\\sqrt[3]{}",
    moveto: "Left",
    movefor: 1,
    tab: 1,
    icon: '\\sqrt[3]{\\square}'
  }, {
    name: "Radical",
    latex: "\\sqrt[{}]{}",
    moveto: "Left",
    movefor: 2,
    tab: 1,
    icon: '\\sqrt[\\square]{\\square}'
  }, {
    name: "Matriu 2x2",
    latex: "\\begin{pmatrix} & \\\\ & \\end{pmatrix}",
    tab: 1,
    icon: 'M_{2\\times 2}'
  }, {
    name: "Matriu 3x3",
    latex: "\\begin{pmatrix} & & \\\\ & &  \\\\ & & \\end{pmatrix}",
    tab: 1,
    icon: 'M_{3\\times 3}'
  }]
}, {
  name: "Símbols",
  buttons: [{
    name: "pi",
    latex: "\\pi",
    tab: 2,
    icon: '\\pi'
  }, {
    name: "e",
    latex: "e",
    tab: 2,
    icon: 'e'
  }, {
    name: "infinit",
    latex: "\\infty",
    tab: 2,
    icon: '\\infty'
  }, {
    name: "Més menys",
    latex: "\\pm",
    tab: 2,
    icon: '\\pm'
  }, {
    name: "Diferent",
    latex: "\\neq",
    tab: 2,
    icon: '\\neq'
  }, {
    name: "Major o igual",
    latex: "\\geq",
    tab: 2,
    icon: '\\geq'
  }, {
    name: "Menor o igual",
    latex: "\\leq",
    tab: 2,
    icon: '\\leq'
  }, {
    name: "Major que",
    latex: "\\gt",
    tab: 2,
    icon: '\\gt'
  }, {
    name: "Menor que",
    latex: "\\lt",
    tab: 2,
    icon: '\\lt'
  }]
}, {
  name: "Funcions",
  buttons: [{
    name: "Sinus",
    latex: "\\sin()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\sin{\\square}'
  }, {
    name: "Cosinus",
    latex: "\\cos()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\cos{\\square}'
  }, {
    name: "Tangent",
    latex: "\\tan()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\tan{\\square}'
  }, {
    name: "Arcsinus",
    latex: "\\arcsin()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\arcsin{\\square}'
  }, {
    name: "Arccosinus",
    latex: "\\arccos()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\arccos{\\square}'
  }, {
    name: "Arctangent",
    latex: "\\arctan()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\arctan{\\square}'
  }, {
    name: "Logaritme Neperià",
    latex: "\\ln()",
    moveto: "Left",
    movefor: 1,
    tab: 5,
    icon: '\\ln{\\square}'
  }, {
    name: "Logaritme en base b",
    latex: "\\frac{\\log()}{\\log{b}}",
    moveto: "Left",
    movefor: 4,
    tab: 5,
    icon: '\\log_b{\\square}'
  }]
}];
var MathEditorPalette = /*#__PURE__*/function () {
  function MathEditorPalette(panel) {
    _classCallCheck(this, MathEditorPalette);
    this.panel = panel;
    this.staticMathFields = [];
    this.view = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      "class": "ibquizz-editor-palette"
    });
    this.createPalettes();
  }
  _createClass(MathEditorPalette, [{
    key: "createPalettes",
    value: function createPalettes() {
      var _this = this;
      tabs.forEach(function (tab) {
        var panelTab = document.createElement("div");
        _this.view.append(panelTab);
        tab.buttons.forEach(function (button) {
          panelTab.append(_this.createButton(button));
        });
      });
    }
  }, {
    key: "createButton",
    value: function createButton(def) {
      var _this2 = this;
      var iconHtml = document.createElement('span');
      iconHtml.innerHTML = def.icon;
      var MQI = window.MathQuill.getInterface(2);
      this.staticMathFields.push(MQI.StaticMath(iconHtml));
      var btn = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
        "class": 'btn btn-sm ibquizz-me-btn-toolbar',
        title: def.name
      });
      btn.append(iconHtml);
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        _this2.panel.write(def.latex, def.moveto, def.movefor);
      });
      return btn;
    }
  }, {
    key: "getView",
    value: function getView() {
      return this.view;
    }
  }, {
    key: "reflow",
    value: function reflow() {
      this.staticMathFields.forEach(function (f) {
        return f.reflow();
      });
    }
  }]);
  return MathEditorPalette;
}();

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
/* harmony import */ var _quizz_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _quizzComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);



_loader__WEBPACK_IMPORTED_MODULE_1__["default"].bootstrap([_quizzComponent__WEBPACK_IMPORTED_MODULE_2__["default"]]);
}();
/******/ })()
;