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
/* 11 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media not print {\n    body.editing div[role=\"snptd_presentacio\"] .nav.nav-tabs {\n        background: lightgray;\n        position: relative;\n    }\n    body.editing div[role=\"snptd_presentacio\"] .nav.nav-tabs::before {\n        content: '\\f1e7';\n        position: absolute;\n        top: 5px;\n        right: 5px; \n        font-family: \"Font Awesome 6 Free\", \"FontAwesome\";\n        font-size: 150%;\n    }\n\n    div[role=\"snptd_presentacio\"] {\n        margin: auto;\n        border-radius: 5px;\n        border: 2px solid #d4ebee;\n        max-width: 600px;\n    }\n  \n    div[role=\"snptd_presentacio\"].theme-dark > .tab-content {\n        background: #363640;\n        color: whitesmoke;\n    }\n\n    div[role=\"snptd_presentacio\"].align-center div.tab-pane {\n        align-self: center;\n        min-height: initial;\n    }\n\n    div[role=\"snptd_presentacio\"].align-bottom div.tab-pane {\n        align-self: flex-end;\n        min-height: initial;\n    }\n}\n  ", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* %SKIPALLCSS */\ndiv[role=\"snptd_presentacio\"] .nav.nav-tabs {\n    display: none;\n}\n\n@media not print {\n    div[role=\"snptd_presentacio\"]>.tab-content {\n        border: none;\n        display: flex;\n        padding: 10px;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane {\n        display: block;\n        border: none;\n        min-height: 100px;\n        margin-right: -100%;\n        width: 100%;\n        opacity: 0;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane.fade {\n        transition-delay: 300ms;\n        transition-duration: 500ms;\n    }\n\n    div[role=\"snptd_presentacio\"][data-transition=\"slide\"] .tab-pane {\n        transition: transform .55s linear, opacity 0.55s ease-out;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane.active {\n        opacity: 1;\n        transform: translate(0, 0);\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane:not(.active) {\n        transform: translate(-110%, 0);\n    }\n\n    div[role=\"snptd_presentacio\"] .snpt_container {\n        margin: 20px 400px;\n        height: 300px;\n        width: 50%;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_continguts {\n        padding-top: 20px;\n        padding-left: 20px;\n        padding-right: 20px;\n        font-size: 20px;\n        height: 250px;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons {\n        padding-left: 10px;\n        padding-top: 6px;\n        font-size: 18px;\n        height: 40px;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons button {\n        margin: 0 1px;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_comptador {\n        display: inline;\n        float: right;\n        padding-right: 15px;\n        padding-top: 5px;\n        font-size: 16px;\n        height: 30px;\n        color: #0069d9;\n    }\n}\n\n@media print {\n    div[role=\"snptd_presentacio\"] {\n        width: 99%;\n        margin: auto;\n        border: 1px solid #eee;\n        display: flex;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons {\n        display: none;\n    }\n\n    div[role=\"snptd_presentacio\"] .fade {\n        opacity: 1;\n    }\n\n    div[role=\"snptd_presentacio\"] .nav>li>a {\n        min-width: 80px;\n        color: #555;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane {\n        opacity: 1;\n        width: 100%;\n        display: inline-block !important;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane::before {\n        content: attr(data-label);\n        width: 100%;\n        display: block;\n        margin-bottom: 10px;\n        background-color: #d4ebee;\n        text-align: right;\n        padding-right: 5px;\n    }\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 16 */
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
___CSS_LOADER_EXPORT___.push([module.id, ".sd-speak-enabled {\n  position: relative;\n  background: whitesmoke;\n  text-decoration: none;\n}\n\n@keyframes speakicon_anim {\n  0% {\n    opacity: 0;\n    left: -10px;\n  }\n\n  100% {\n    opacity: 1;\n    left: -5px;\n  }\n}\n\n.sd-speak-enabled:hover:after {\n  content: \"\";\n  padding: 2px;\n  border-radius: 50%;\n  width: 14px;\n  height: 14px;\n  position: absolute;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  left: -5px;\n  top: -16px;\n  z-index: 1000;\n  font-size: 70%;\n  margin: 0px 5px;\n  font-weight: 700;\n  vertical-align: top;\n  animation: speakicon_anim 1s ease;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* 18 */
/***/ (function(module) {

module.exports = "data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 style=%27background:white%27 viewBox=%270 0 512 512%27%3E%3Cpath fill=%27%232a84f9%27 d=%27M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z%27/%3E%3C/svg%3E";

/***/ }),
/* 19 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media print and (color) {\n    .pw-tasca-solucio, .pw-tasca-nprt {\n        display:none!important;\n    }\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBaseToUrl": function() { return /* binding */ addBaseToUrl; },
/* harmony export */   "addScript": function() { return /* binding */ addScript; },
/* harmony export */   "base64Decode": function() { return /* binding */ base64Decode; },
/* harmony export */   "convertInt": function() { return /* binding */ convertInt; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "onJQueryReady": function() { return /* binding */ onJQueryReady; },
/* harmony export */   "parseUrlParams": function() { return /* binding */ parseUrlParams; },
/* harmony export */   "scopedEval": function() { return /* binding */ scopedEval; }
/* harmony export */ });
/* unused harmony exports querySelectorProp, addLinkSheet, pathJoin, base64Encode */
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
      $theImg.on("click", function () {
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
          //this.resize(imgObj.width, imgObj.height);
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
      var leftArrowHTML = '<a class="navigate-left-arrow" href="javascript:void(0);" style="position: fixed; top: 50%; left: 50px;">' + leftArrow + '</a>';
      var rightArrowHTML = '<a class="navigate-right-arrow" href="javascript:void(0);" style="position: fixed; top: 50%; right: 50px;">' + rightArrow + '</a>';
      var modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="' + MODAL_ID + '" tabindex="-1" role="dialog">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>' + '</div>' + '<div class="modal-body p-0" style="text-align:center;">' + (hasGallery ? leftArrowHTML : '') + '<img src="" style="height: 100%; width: 100%; object-fit: contain;">' + (hasGallery ? rightArrowHTML : '') + '</div>' + '</div>' + '</div>' + '</div>');
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
    /*
       private resize(imgwidth: number, imgheight: number) {
           // Resize accordingly to the image
           // Size of browser viewport.
          
           let imgratio = 1;
           if (imgheight > 0) {
               imgratio = imgwidth / imgheight;
           }
           const winwidth = $(window).height() || 0;
           const winheight = $(window).width() || 0;
           let winratio = 1;
           if (winheight > 0) {
               winratio = winwidth / winheight;
           }
          
           if (imgratio > winratio) {
               //this.$img?.css("height", "initial");
               //this.$img?.css("width", "90%");
               this.$img?.css("transform", "scale("+(winratio/imgratio)+")");
           } else {
               //this.$img?.css("width", "initial");
               //this.$img?.css("height", "90%");
               this.$img?.css("transform", "scale("+(imgratio/winratio)+")");
           }
         
       }
    */
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


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PresentacioComponent; }
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




// DEFAULT CONSTANTS 
var DEFALT_TIME = 5;
var PLAY_ICON = '<i class="fa fas fa-play"></i>';
var PAUSE_ICON = '<i class="fa fas fa-pause"></i>';
function createButton(classNames, classFawesome) {
  var botonet1 = document.createElement("button");
  botonet1.className = classNames;
  var inc1 = document.createElement("i");
  inc1.className = classFawesome;
  botonet1.appendChild(inc1);
  return botonet1;
}
var PresentacioComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.Component)({
  name: 'presentacio',
  author: 'Tomeu Fiol, Josep Mulet',
  version: '2.2'
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(PresentacioComponent, _BaseComponent);
  var _super = _createSuper(PresentacioComponent);
  function PresentacioComponent(parent) {
    var _this;
    _classCallCheck(this, PresentacioComponent);
    _this = _super.call(this, parent);
    _defineProperty(_assertThisInitialized(_this), "loop", false);
    _defineProperty(_assertThisInitialized(_this), "num", 0);
    _defineProperty(_assertThisInitialized(_this), "n", 0);
    _defineProperty(_assertThisInitialized(_this), "continuarAutomatic", false);
    _defineProperty(_assertThisInitialized(_this), "durada", []);
    return _this;
  }
  _createClass(PresentacioComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var ds = this.parent.dataset;
      this.loop = ds.loop == "1" || ds.loop == "true";
      //override tabs names to 1/n, 2/n etc. Useful for printing
      var tabLabels = this.parent.querySelectorAll('ul.nav.nav-tabs > li > a');
      for (var i = 0, len = tabLabels.length; i < len; i++) {
        tabLabels[i].innerHTML = "&nbsp; " + (i + 1) + "/" + len;
      }
      this.parent.style.overflow = 'hidden';
      this.button_container = document.createElement('div');
      this.button_container.className = "box_botons";
      this.parent.append(this.button_container);
      this.diapositives = this.parent.querySelectorAll("div.tab-content > div.tab-pane");
      this.num = this.diapositives.length;

      // Determine which is the current diapositiva (by default the first one)
      this.n = ((0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.convertInt)((ds === null || ds === void 0 ? void 0 : ds.start) || '1', 1) - 1) % this.num;
      var mustFade = ds.transition == 'fade';
      for (var _i = 0; _i < this.num; _i++) {
        //this.diapositives[i].style.overflow='hidden';
        //add content-panel labels 1/n, 2/n etc. Useful for printing
        this.diapositives[_i].dataset.label = _i + 1 + "/" + this.num;
        this.diapositives[_i].classList.remove("iedib-tabpane");
        if (mustFade) {
          this.diapositives[_i].classList.add('fade');
        }
        // Disregard the active as startfrom 
        if (_i == this.n) {
          this.diapositives[_i].classList.add('active');
        } else {
          this.diapositives[_i].classList.remove('active');
        }
      }

      // Control Transicions manuals / temporitzades
      var cadenaDurades = (ds.durades || "0").trim();
      // constiable de control manual /automatic
      this.continuarAutomatic = cadenaDurades != "0";
      var tempsDiapositiva = cadenaDurades.split(",");
      var defaultTime = DEFALT_TIME;
      // If only one time is set, then all slides have the same duration
      if (tempsDiapositiva.length == 1) {
        // Set as default time
        defaultTime = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.convertInt)(tempsDiapositiva[0], defaultTime);
      }
      this.durada = [];
      var len_td = tempsDiapositiva.length;
      for (var j = 0; j < this.num; j++) {
        var t = defaultTime;
        if (j >= len_td) {
          this.durada.push(t);
          continue;
        }
        t = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__.convertInt)(tempsDiapositiva[j], defaultTime);
        this.durada.push(t);
      }
      this.crearBotons();
      this.carregaListeners();
      var autostart = ds.autostart;
      if (ds.loop != "1" && ds.loop != "true") {
        // Never autostart if loop is disabled!
        autostart = "0";
      }
      if (autostart == "1" || autostart == "true") {
        // Inicia la presentació al principi
        if (this.continuarAutomatic && this.n < this.num) {
          //Show the counter
          this.updateCounter();
          this.currentTimeout = setTimeout(function () {
            _this2.seguent();
          }, this.durada[this.n] * 1000);
        }
      } else if (this.continuarAutomatic) {
        // No s'ha iniciat  
        this.continuarAutomatic = false;
        this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
        this.updateCounter();
      } else {
        this.updateCounter();
      }
    }

    // Funcions de canvi de diapositiva
  }, {
    key: "eliminarActive",
    value: function eliminarActive() {
      if (!this.diapositives) {
        return;
      }
      for (var i = 0; i < this.num; i++) {
        this.diapositives[i].classList.remove("active");
      }
    }
  }, {
    key: "updateCounter",
    value: function updateCounter() {
      var _this3 = this;
      if (!this.boxComptador) {
        return;
      }
      this.boxComptador.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; " + (this.n + 1) + " / " + this.num;
      if (this.currentTimeout) {
        clearInterval(this.currentTimeout);
        this.currentTimeout = null;
      }
      if (this.continuarAutomatic) {
        if (!this.loop && this.n == this.num - 1) {
          // stop - end the reproducció
          this.continuarAutomatic = false;
          this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
          return;
        }
        this.currentTimeout = setTimeout(function () {
          _this3.seguent();
        }, this.durada[this.n] * 1000);
        this.buttonPlay && (this.buttonPlay.innerHTML = PAUSE_ICON);
      } else {
        this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
      }
    }
  }, {
    key: "seguent",
    value: function seguent() {
      if (!this.diapositives) {
        return;
      }
      if (this.n >= this.num - 1) {
        if (this.loop) {
          this.n = -1;
        } else {
          return;
        }
      }
      this.eliminarActive();
      this.n += 1;
      this.diapositives[this.n].classList.add("active");
      this.updateCounter();
    }
  }, {
    key: "anterior",
    value: function anterior() {
      if (!this.diapositives) {
        return;
      }
      if (this.n == 0) {
        if (this.loop) {
          this.n = this.num;
        } else {
          return;
        }
      }
      this.eliminarActive();
      this.n -= 1;
      this.diapositives[this.n].classList.add("active");
      this.updateCounter();
    }
  }, {
    key: "primer",
    value: function primer() {
      if (!this.diapositives) {
        return;
      }
      this.eliminarActive();
      this.n = 0;
      this.diapositives[this.n].classList.add("active");
      this.continuarAutomatic = false;
      this.updateCounter();
    }
  }, {
    key: "darrer",
    value: function darrer() {
      if (!this.diapositives) {
        return;
      }
      this.eliminarActive();
      this.n = this.num - 1;
      this.diapositives[this.n].classList.add("active");
      this.continuarAutomatic = false;
      this.updateCounter();
    }
  }, {
    key: "pausa",
    value: function pausa() {
      if (!this.buttonPlay) {
        return;
      }
      this.continuarAutomatic = false;
      if (this.currentTimeout != null) {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = null;
      }
      this.buttonPlay.innerHTML = PLAY_ICON;
    }
  }, {
    key: "play",
    value: function play() {
      var _this4 = this;
      if (!this.buttonPlay) {
        return;
      }
      // si pitja play a la darrera diapositiva, ves a la primera
      if (this.n >= this.num - 1) {
        this.primer();
      }
      this.continuarAutomatic = true;
      this.currentTimeout = setTimeout(function () {
        _this4.seguent();
      }, this.durada[this.n] * 1000);
      this.buttonPlay.innerHTML = PAUSE_ICON;
    }

    // detecció de pulsació dels botons i cridades a les funcions
  }, {
    key: "carregaListeners",
    value: function carregaListeners() {
      var _this5 = this;
      if (!this.buttonBack || !this.buttonFirst || !this.buttonLast || !this.buttonNext) {
        return;
      }
      this.evListener1 = function (evt) {
        return _this5.primer();
      };
      this.evListener2 = function (evt) {
        return _this5.darrer();
      };
      this.evListener3 = function (evt) {
        return _this5.seguent();
      };
      this.evListener4 = function (evt) {
        return _this5.anterior();
      };
      this.buttonFirst.addEventListener("click", this.evListener1);
      this.buttonLast.addEventListener("click", this.evListener2);
      this.buttonNext.addEventListener("click", this.evListener3);
      this.buttonBack.addEventListener("click", this.evListener4);
      if (this.continuarAutomatic) {
        this.evListener5 = function (evt) {
          if (!_this5.continuarAutomatic) {
            _this5.play();
          } else {
            _this5.pausa();
          }
        };
        this.buttonPlay && this.buttonPlay.addEventListener("click", this.evListener5);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //Destroy instance
      this.currentTimeout && window.clearTimeout(this.currentTimeout);
      this.evListener1 && window.removeEventListener("click", this.evListener1);
      this.evListener2 && window.removeEventListener("click", this.evListener2);
      this.evListener3 && window.removeEventListener("click", this.evListener3);
      this.evListener4 && window.removeEventListener("click", this.evListener4);
      this.evListener5 && window.removeEventListener("click", this.evListener5);
      this.parent.dataset.active = '0';
      this.button_container && this.button_container.remove();
    }
  }, {
    key: "crearBotons",
    value: function crearBotons() {
      if (!this.button_container) {
        return;
      }
      this.buttonFirst = createButton("btn btn-sm btn-outline-primary btn-first", "fa fas fa-fast-backward");
      this.button_container.appendChild(this.buttonFirst);
      this.buttonFirst.title = "First";
      this.buttonBack = createButton("btn btn-sm btn-outline-primary btn-step-backward", "fa fas fa-chevron-left");
      this.button_container.appendChild(this.buttonBack);
      this.buttonBack.title = "Previous";
      this.buttonNext = createButton("btn btn-sm btn-outline-primary btn-step-forward", "fa fas fa-chevron-right");
      this.button_container.appendChild(this.buttonNext);
      this.buttonNext.title = "Next";
      this.buttonLast = createButton("btn btn-sm btn-outline-primary btn-last", "fa fas fa-fast-forward");
      this.buttonLast.title = "Last";
      this.button_container.appendChild(this.buttonLast);
      if (this.continuarAutomatic) {
        this.buttonPlay = createButton("btn btn-sm btn-primary btn-step-play", "fa fas fa-pause");
        this.buttonPlay.style.setProperty("margin-left", "15px");
        this.buttonPlay.title = "Play/Pause";
        this.button_container.appendChild(this.buttonPlay);
      }

      // a darrera els botons, afegim el comptador

      this.boxComptador = document.createElement("div");
      this.boxComptador.className = "box_comptador";
      this.button_container.appendChild(this.boxComptador);
    }
  }]);
  return PresentacioComponent;
}(_base__WEBPACK_IMPORTED_MODULE_2__.BaseComponent)) || _class);


/***/ }),
/* 31 */
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
var _dec, _class, _class2;
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
  version: '2.7',
  query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
  use$: true //May require $ajax
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseComponent) {
  _inherits(SpeakComponent, _BaseComponent);
  var _super = _createSuper(SpeakComponent);
  function SpeakComponent(parent) {
    var _this;
    _classCallCheck(this, SpeakComponent);
    _this = _super.call(this, parent);
    _defineProperty(_assertThisInitialized(_this), "unloadListener", null);
    return _this;
  }
  _createClass(SpeakComponent, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$parent$getAttri;
        var ds, _ds$text, text, internal, supported, voices, _this$parent$getAttri2, lang, voice;
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
              if (!((_this$parent$getAttri = this.parent.getAttribute('href')) !== null && _this$parent$getAttri !== void 0 && _this$parent$getAttri.endsWith("#speak_en-wr") || ds.lang === "wr")) {
                _context.next = 16;
                break;
              }
              text = ((_ds$text = ds.text) !== null && _ds$text !== void 0 ? _ds$text : this.parent.innerText).trim();
              if (!(text.indexOf(" ") < 0)) {
                _context.next = 14;
                break;
              }
              //use wordreference
              this.audioPlayer = new _wordreferencePlayer__WEBPACK_IMPORTED_MODULE_8__["default"](this.parent);
              return _context.abrupt("return");
            case 14:
              console.error("WordReference only works for single words.");
              //turn into speech synthesis for american english 
              this.parent.setAttribute('href', '#speak_en-US');
            case 16:
              // Check if the speechSynthesis API is available
              internal = easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].status();
              voices = [];
              if (internal.status === "init: complete") {
                supported = internal.initialized && internal.speechSynthesis && internal.speechSynthesisUtterance;
                voices = internal.voices;
              }
              this.audioPlayer = null;
              if (!supported) {
                console.warn("Web Speech Synthesis is not supported. Fallback on GTTS player.");
                this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__["default"](this.parent);
              } else if (voices.length === 0) {
                console.warn("EasySpeech.voices returns no voices. Fallback on GTTS player.");
                this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_9__["default"](this.parent);
              } else {
                // Sort local voices by lang and quality
                if (!SpeakComponent.sortedVoices) {
                  SpeakComponent.sortedVoices = sortVoices(voices);
                }
                // Check if the required voice is found
                lang = ((_this$parent$getAttri2 = this.parent.getAttribute("href")) !== null && _this$parent$getAttri2 !== void 0 ? _this$parent$getAttri2 : "_").split("_")[1];
                voice = findVoice(lang, SpeakComponent.sortedVoices);
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
            case 21:
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
      this.src = src;
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
}(_base__WEBPACK_IMPORTED_MODULE_11__.BaseComponent), _defineProperty(_class2, "sortedVoices", null), _class2)) || _class);


/***/ }),
/* 32 */
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




/***/ }),
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
      var _ds$src;
      var ds = elem.dataset;
      this.src = (_ds$src = ds.src) !== null && _ds$src !== void 0 ? _ds$src : "";
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
/* 39 */
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
    // Show dropdown but do lazy wordreference loading
    function lazyLoad(mustPlay) {
      var _this$$dropdown,
        _this$elem$dataset$te,
        _this = this;
      if (this.audioElement != null) {
        return; //Already loaded
      }
      // Defer the search of sources until the first click
      var $menu = (_this$$dropdown = this.$dropdown) === null || _this$$dropdown === void 0 ? void 0 : _this$$dropdown.find(".dropdown-menu");
      var lang = "en";
      var text = ((_this$elem$dataset$te = this.elem.dataset.text) !== null && _this$elem$dataset$te !== void 0 ? _this$elem$dataset$te : this.elem.innerText).trim();
      wr_define(lang, text).then(function (audioMap) {
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
                var _evt$target$dataset$v;
                evt.preventDefault();
                var variant2 = (_evt$target$dataset$v = evt.target.dataset.variant) !== null && _evt$target$dataset$v !== void 0 ? _evt$target$dataset$v : '';
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
            // We can hide the dropdown (no variants)
            (_this$$dropdown2 = _this.$dropdown) === null || _this$$dropdown2 === void 0 ? void 0 : _this$$dropdown2.hide();
          }
        } else {
          // Fallback on google
          console.warn("Fallback on GTTSPlayer US");
          if (_this.elem.getAttribute('href')) {
            _this.elem.setAttribute('href', '#speak_en-US');
          } else {
            _this.elem.dataset.lang = "en-US";
          }
          _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this.elem);
        }
        mustPlay && _this.audioElement.play();
      }, function (err) {
        var _this$$dropdown3;
        console.warn("Fallback on GTTSPlayer US. Err: ", err);
        // We can hide the dropdown
        (_this$$dropdown3 = _this.$dropdown) === null || _this$$dropdown3 === void 0 ? void 0 : _this$$dropdown3.hide();
        // Fallback on google
        if (_this.elem.getAttribute('href')) {
          _this.elem.setAttribute('href', '#speak_en-US');
        } else {
          _this.elem.dataset.lang = "en-US";
        }
        _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this.elem);
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
/* 40 */
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
    var _ref,
      _elem$getAttribute,
      _elem$dataset$text,
      _this = this;
    _classCallCheck(this, GTTSPlayer);
    _defineProperty(this, "url", "");
    this._elem = elem;
    var idioma = (_ref = (_elem$getAttribute = elem.getAttribute("href")) !== null && _elem$getAttribute !== void 0 ? _elem$getAttribute : elem.dataset.lang) !== null && _ref !== void 0 ? _ref : "en_us";
    idioma = idioma.replace("#speak_", "");
    var sText = ((_elem$dataset$text = elem.dataset.text) !== null && _elem$dataset$text !== void 0 ? _elem$dataset$text : elem.innerText).trim();
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
/* 41 */
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
      var _window$IB$sd$speak$i, _window$IB, _window$IB$sd$speak, _this$_elem$dataset$t;
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
        text: (_this$_elem$dataset$t = this._elem.dataset.text) !== null && _this$_elem$dataset$t !== void 0 ? _this$_elem$dataset$t : this._elem.innerText,
        voice: this._voice,
        pitch: 1,
        rate: 0.95,
        volume: 1
      });
    }
  }, {
    key: "setSrc",
    value: function setSrc(src) {
      this.src = src;
    }
  }, {
    key: "pause",
    value: function pause() {
      easy_speech__WEBPACK_IMPORTED_MODULE_0__["default"].pause();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.handler) {
        this._elem.removeEventListener("click", this.handler);
      }
      this._elem.classList.remove("sd-speak-enabled");
      this._elem.removeAttribute('data-active');
    }
  }]);
  return NavigatorPlayer;
}();


/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPageInfo": function() { return /* binding */ getPageInfo; },
/* harmony export */   "items": function() { return /* binding */ items; },
/* harmony export */   "pran": function() { return /* binding */ pran; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; },
/* harmony export */   "zip": function() { return /* binding */ zip; }
/* harmony export */ });
/* unused harmony exports reflowLatex, sanitizeLaTeX, sum, hasValue, copyPropsFromTo, isNumeric */
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
/* 44 */
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
/* 45 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ QuizzComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(48);
/* harmony import */ var _dropdownWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var _mchoiceWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _numericWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var _clozeWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _mathquillWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(52);
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
    return _this;
  }
  _createClass(QuizzComponent, [{
    key: "generateGroup",
    value: function generateGroup() {
      console.log("generateGroup");
      try {
        (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_7__.runIBScript)(this.groupContext.s, {}, this.groupContext._s);
      } catch (ex) {
        console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
      }

      //Tell the user that this quizz contains random questions
      if (this.groupContext.s.trim().length) {
        var noticeDiv = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.createElement)('div', {
          "class": 'alert alert-info d-print-none',
          style: 'float:right;display:inline',
          html: "<svg data-toggle=\"tooltip\" title=\"".concat((0,_i18n__WEBPACK_IMPORTED_MODULE_8__["default"])(this.lang, 'random_msg'), "+\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" style=\"height:20px;\"><path fill=\"#154b5e\" d=\"M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z\"/></svg> \n                ")
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
        textNode.textContent = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_7__.doVariablesInterpolation)(text, _this2.groupContext._s);
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
        spanNode.innerHTML = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_7__.doVariablesInterpolation)(valor, _this3.groupContext._s);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;
      console.log("Init called");
      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";

      // Must generate an instance of the group vars into map _v
      if (this.groupContext.s.trim().length) {
        // Make sure that nerdamer + mathquill is loaded in page
        if (!window.nerdamer) {
          var url = "https://piworld.es/iedib/snippets/sd/mathquill.min.js";
          var script = document.querySelector('script[src$="sd/quizz-editor.min.js"]');
          if (script) {
            url = script.src.replace("sd/quizz-editor.min.js", "sd/mathquill.min.js");
          }
          (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.addScript)(url, "mathquill.matrix4quizz", function () {
            _this4.generateGroup();
            _this4.initProxy();
          }, function () {
            console.error("Cannot load mathquill-nerdamer");
            _this4.generateGroup();
            _this4.initProxy();
          });
        } else {
          this.generateGroup();
          this.initProxy();
        }
      } else {
        this.initProxy();
      }
    }
  }, {
    key: "initProxy",
    value: function initProxy() {
      var _this5 = this,
        _this$allQuizzElement,
        _this$allClozeElement;
      console.log("In initProxy....");
      // Must find placeholders in the dom by replacing #key by _v[#key]
      this.findPlaceholders();
      this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY);
      this.allClozeElements = this.parent.querySelectorAll(SEARCH_QUERY2);
      console.log(this.allQuizzElements, this.allClozeElements);
      this.checkButton = (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_6__.createElement)("button", {
        "class": "btn btn-sm btn-primary d-print-none",
        style: "margin: 10px;display:block",
        html: '<i class="fa fas fa-check"></i> ' + (0,_i18n__WEBPACK_IMPORTED_MODULE_8__["default"])(this.lang, 'check')
      });
      this.listener = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(evt) {
          var _this5$allQuizzElemen, _this5$allClozeElemen;
          var allPromises, checksList, _this5$checkButton;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                evt.preventDefault();
                allPromises = [];
                (_this5$allQuizzElemen = _this5.allQuizzElements) === null || _this5$allQuizzElemen === void 0 ? void 0 : _this5$allQuizzElemen.forEach(function (quizzElem) {
                  allPromises.push(quizzElem.check());
                });
                (_this5$allClozeElemen = _this5.allClozeElements) === null || _this5$allClozeElemen === void 0 ? void 0 : _this5$allClozeElemen.forEach(function (quizzElem) {
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
                  (_this5$checkButton = _this5.checkButton) === null || _this5$checkButton === void 0 ? void 0 : _this5$checkButton.setAttribute("disabled", "true");
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
      if (this.allQuizzElements.length + this.allClozeElements.length > 0) {
        this.parent.append(this.checkButton);
      }
      if (this.listener) {
        var _this$checkButton;
        (_this$checkButton = this.checkButton) === null || _this$checkButton === void 0 ? void 0 : _this$checkButton.addEventListener("click", this.listener);
      }
      //Pass language to all QuizzElements
      (_this$allQuizzElement = this.allQuizzElements) === null || _this$allQuizzElement === void 0 ? void 0 : _this$allQuizzElement.forEach(function (quizzElem) {
        if (typeof quizzElem.setLang !== 'function') {
          console.error("No custom element registered for ", quizzElem);
          return;
        }
        quizzElem.setLang(_this5.lang);
        quizzElem.setGroupContext(_this5.groupContext);
      });
      //cloze elements needs mathquill to be loaded on demand

      if ((_this$allClozeElement = this.allClozeElements) !== null && _this$allClozeElement !== void 0 && _this$allClozeElement.length) {
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
          var _this5$allClozeElemen2;
          //When mathquill ready must initialize this widgets
          (_this5$allClozeElemen2 = _this5.allClozeElements) === null || _this5$allClozeElemen2 === void 0 ? void 0 : _this5$allClozeElemen2.forEach(function (quizzElem) {
            if (typeof quizzElem.setLang !== 'function') {
              console.error("No custom element registered for ", quizzElem);
              return;
            }
            quizzElem.setLang(_this5.lang);
            quizzElem.setGroupContext(_this5.groupContext);
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
      if (this.listener) {
        var _this$checkButton2;
        (_this$checkButton2 = this.checkButton) === null || _this$checkButton2 === void 0 ? void 0 : _this$checkButton2.removeEventListener("click", this.listener);
      }
    }
  }]);
  return QuizzComponent;
}(_base__WEBPACK_IMPORTED_MODULE_9__.BaseComponent)) || _class);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(53);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
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
/* 47 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusDisplay": function() { return /* binding */ StatusDisplay; },
/* harmony export */   "WidgetStatus": function() { return /* binding */ WidgetStatus; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _bsMsgDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
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
/* 48 */
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
/* 49 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCachedMsgDialog": function() { return /* binding */ getCachedMsgDialog; }
/* harmony export */ });
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
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
/* 50 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSDialog": function() { return /* binding */ BSDialog; },
/* harmony export */   "BSDialogType": function() { return /* binding */ BSDialogType; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _jsPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
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
      var _this$primaryButton;
      this.body.html('');
      (_this$primaryButton = this.primaryButton) === null || _this$primaryButton === void 0 ? void 0 : _this$primaryButton.off();
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
          (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope || {}, newValue);
        } else {
          var inputElem = elem;
          var t = (inputElem.getAttribute('type') || '').toLowerCase();
          var isCheckRadio = t === 'radio' || t === 'checkbox';
          if (isCheckRadio) {
            (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope || {}, inputElem.checked);
          } else {
            (0,_jsPath__WEBPACK_IMPORTED_MODULE_0__.setPathValue)(barPath, _this2.scope || {}, inputElem.value);
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
/* 51 */
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
/* 52 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "doVariablesInterpolation": function() { return /* binding */ doVariablesInterpolation; },
/* harmony export */   "runIBScript": function() { return /* binding */ runIBScript; },
/* harmony export */   "treatIniPlaceholders": function() { return /* binding */ treatIniPlaceholders; }
/* harmony export */ });
/* unused harmony export utilities */
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
    // For every property in nerdamer that is not in global current scope, create a shortcut
    Object.getOwnPropertyNames(window.nerdamer).forEach(function (key) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (utilities[key] === undefined) {
        utilities[key] = window.nerdamer[key];
      }
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
  }).replace(/\?/g, '\\MathQuillMathField{}');
}

// Make sure that if a Nerdamer object has to be displayed, then call the toLaTeX function
var serializeObject = function serializeObject(obj) {
  if (typeof obj.toTeX === 'function') {
    return obj.toTeX().replace(/vmatrix/g, 'matrix');
  } else if (typeof obj.toString === 'function') {
    return obj.toString();
  }
  return obj + '';
};
function doVariablesInterpolation(text, map) {
  if (!map) {
    return text;
  }
  var interpolated = text.replace(/#([a-zA-Z0-9_]+)($|[ .,"'])/gm, function ($0, $1, $2) {
    if (map[$1] != null) {
      return serializeObject(map[$1]) + ($2 || '');
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
/* 53 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetElement": function() { return /* binding */ WidgetElement; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
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
/* 54 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(53);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
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
/* 55 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53);
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
/* 56 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53);
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
/* 57 */
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var _engines_nerdamerEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59);
/* harmony import */ var _engines_parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(48);
/* harmony import */ var _mathEditorDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60);
/* harmony import */ var _quizzUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(53);
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
      return (l || '').replace(/\\,/g, ' ').replace(/\\ /g, ' ').trim();
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
        var result, ngx, _this$widgetConfig3, _this$groupContext, _this$widgetConfig4, _this$groupContext2, raw, uNerd, localContext, scriptFn, _this$groupContext3, _this$widgetConfig5, _this$widgetConfig6, N, userInput, map, symbolsProcessed, cas, payload, res;
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
              _context.next = 37;
              break;
            case 20:
              if (!(window.nerdamer && ngx === 'nermader')) {
                _context.next = 36;
                break;
              }
              N = window.nerdamer; // Process
              userInput = this.getUserInput() || ''; // Send to the Engine
              // Vars might contain #... that must be send to the CAS
              map = ((_this$groupContext3 = this.groupContext) === null || _this$groupContext3 === void 0 ? void 0 : _this$groupContext3._s) || {};
              console.log("The map is ", map);
              symbolsProcessed = (((_this$widgetConfig5 = this.widgetConfig) === null || _this$widgetConfig5 === void 0 ? void 0 : _this$widgetConfig5.vars) || []).map(function (text) {
                var interpolated = text.replace(/#([a-zA-Z0-9_]+)/gm, function ($0, $1) {
                  var obj = map[$1];
                  if (obj != null) {
                    if (typeof obj.text === 'function') {
                      return obj.text();
                    } else if (typeof obj.toString === 'function') {
                      return obj.toString();
                    }
                    return obj + '';
                  }
                  return $0;
                });
                return interpolated;
              });
              cas = (0,_engines_nerdamerEngine__WEBPACK_IMPORTED_MODULE_4__.getNerdamerCAS)(this.lang);
              payload = {
                latex: [userInput],
                ans: [((_this$widgetConfig6 = this.widgetConfig) === null || _this$widgetConfig6 === void 0 ? void 0 : _this$widgetConfig6.ans) || ''],
                symbols: symbolsProcessed,
                qid: (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__.genID)()
              };
              console.log("PAYLOAD ", payload);
              _context.next = 31;
              return cas.compare(payload);
            case 31:
              res = _context.sent;
              console.log("Response ", res);
              result = res.correct > 0;
              _context.next = 37;
              break;
            case 36:
              throw new Error("Check function must be set");
            case 37:
              _context.next = 44;
              break;
            case 39:
              _context.prev = 39;
              _context.t0 = _context["catch"](8);
              //Error
              console.error(_context.t0);
              this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.ERROR);
              return _context.abrupt("return", false);
            case 44:
              this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_1__.WidgetStatus.WRONG);
              console.log("Matquill mathinput, ", this.getUserInput(), result);
              this.enable(!result);
              if (!result) {
                this.incAttempts();
              } else {
                this.showFeedback();
              }
              return _context.abrupt("return", result);
            case 49:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[8, 39]]);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$groupContext4,
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
      if ((_this$groupContext4 = this.groupContext) !== null && _this$groupContext4 !== void 0 && _this$groupContext4.s.length && this.widgetConfig) {
        var theAns = this.widgetConfig.ans || '';
        if (theAns.indexOf('#') >= 0) {
          theAns = theAns.replace(/#/g, '');
          this.widgetConfig.ans = '' + (0,_shared_utilsShared__WEBPACK_IMPORTED_MODULE_5__.scopedEval)(this.groupContext._s || {}, theAns);
        }
      }
      this.input = document.createElement("span");
      this.input.innerText = (0,_quizzUtil__WEBPACK_IMPORTED_MODULE_3__.treatIniPlaceholders)(this.widgetConfig.ini || '').replace(/\\MathQuillMathField{}/gm, '');
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
/* 58 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseLatexNerdamer": function() { return /* binding */ parseLatexNerdamer; }
/* harmony export */ });
/* unused harmony export parse_pmatrix */
var pmatrix_re = /\\begin\{pmatrix\}(.*?)\\end\{pmatrix\}/gm;
var mcount = 0;
// Convert a \begin{pmatrix} a & b \\ c & d \end{pmatrix} in to nermader matrix([a,b],[c,d]) 
function parse_pmatrix(latex) {
  var core = window.nerdamer.getCore();
  var _Symbol = core.Symbol;
  latex = latex.replace("\\begin{pmatrix}", "").replace("\\end{pmatrix}", "");
  var rows = latex.split("\\" + "\\").map(function (row) {
    var cols = row.split("&").map(function (col) {
      return parseLatexNerdamer(col.trim() || '0');
    });
    return cols.join(",");
  });
  var varName = 'MM_' + mcount;
  //const out = 'matrix(' + rows.join(',') + ')'    
  //window.nerdamer.setVar(varName, out) 
  mcount++;
  window.nerdamer.setVar(varName, core.Matrix.fromArray(rows));
  return varName;
}
function parseLatexNerdamer(tex) {
  // Treat matrices 
  tex = tex.replace(pmatrix_re, function ($0) {
    var mparse = parse_pmatrix($0);
    return mparse;
  });
  // Treat spaces 
  tex = tex.replace(/\\,/g, ' ').replace(/ \\\s+/g, ' ');
  //const core = window.nerdamer.getCore(); 
  var nerd = window.nerdamer.convertFromLaTeX(tex);
  console.log("The variables -- ", window.nerdamer.getVars());
  console.log("Resulting tex -- ", tex);
  return nerd;
}

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNerdamerCAS": function() { return /* binding */ getNerdamerCAS; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _parseLatexNerdamer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
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
            symb = (symb || '').trim();
            if (symb.indexOf(':=') > 0) {
              var pos = symb.indexOf(":=");
              var symb_name = symb.substring(0, pos);
              var symb_raw = symb.substring(pos + 2);
              console.log("Setting", symb_name, " as ", symb_raw);
              cas.setVar(symb_name.trim(), symb_raw.trim());
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
                //Check for subtraction eq 0?
                expr = ans_obj.subtract(parsed_input).simplify();
                expr = expr.toString() === '0';
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
        try {
          (p['symbols'] || []).forEach(function (symb) {
            symb = (symb || '').trim();
            if (symb.indexOf(':=') > 0) {
              var pos = symb.indexOf(":=");
              var symb_name = symb.substring(0, pos);
              var symb_raw = symb.substring(pos + 2);
              cas.setVar(symb_name.trim(), symb_raw.trim());
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
/* 60 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCachedMathEditorDialog": function() { return /* binding */ getCachedMathEditorDialog; }
/* harmony export */ });
/* unused harmony export MathEditorDialog */
/* harmony import */ var _bs_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _mathEditorPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
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
/* 61 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathEditorPanel": function() { return /* binding */ MathEditorPanel; }
/* harmony export */ });
/* harmony import */ var _shared_utilsShared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _mathEditorPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
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
/* 62 */
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
/******/ 			0: 0
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
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _lightbox_lightbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _presentacio_presentacio_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _presentacio_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _speak_speak_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _talea_talea_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _quizz_quizz_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29);
/* harmony import */ var _zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(25);
/* harmony import */ var _presentacio_presentacioComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(30);
/* harmony import */ var _speak_speakComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(31);
/* harmony import */ var _talea_taleaComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(42);
/* harmony import */ var _quizz_quizzComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(45);













_loader__WEBPACK_IMPORTED_MODULE_6__["default"].bootstrap([_zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_7__["default"], _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_8__["default"], _presentacio_presentacioComponent__WEBPACK_IMPORTED_MODULE_9__["default"], _speak_speakComponent__WEBPACK_IMPORTED_MODULE_10__["default"], _talea_taleaComponent__WEBPACK_IMPORTED_MODULE_11__["default"], _quizz_quizzComponent__WEBPACK_IMPORTED_MODULE_12__["default"]]);
}();
/******/ })()
;