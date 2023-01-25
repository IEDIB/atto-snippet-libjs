/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
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
/* 3 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-fullscreen-xl .modal-header {\n    padding: 0rem 1rem;\n    border: none;\n}\n.modal-fullscreen-xl .close {\n    font-size: 200%;\n    border-radius: 50%;\n    background: black;\n}\n.modal-fullscreen-xl .modal-dialog {\n    width: 95%;\n    height: 95%;\n    max-width: none;\n    margin: auto;\n}\n.modal-fullscreen-xl .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n    background: rgba(0,0,0,0);\n}\n.modal-fullscreen-xl .modal-body {\n    width: 100%;\n    overflow: auto;\n    background: rgba(0,0,0,0);\n}\n.navigate-left-arrow, .navigate-right-arrow {\n    font-size: 300%;\n    color: whitesmoke;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* 13 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_presentacio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media not print {\n    body.editing div[role=\"snptd_presentacio\"] .nav.nav-tabs {\n        background: lightgray;\n        position: relative;\n    }\n    body.editing div[role=\"snptd_presentacio\"] .nav.nav-tabs::before {\n        content: '\\f1e7';\n        position: absolute;\n        top: 5px;\n        right: 5px; \n        font-family: 'FontAwesome';\n        font-size: 150%;\n    }\n\n    div[role=\"snptd_presentacio\"] {\n        margin: auto;\n        border-radius: 5px;\n        border: 2px solid #d4ebee;\n        max-width: 600px;\n    }\n  \n    div[role=\"snptd_presentacio\"].theme-dark > .tab-content {\n        background: #363640;\n        color: whitesmoke;\n    }\n\n    div[role=\"snptd_presentacio\"].align-center div.tab-pane {\n        align-self: center;\n        min-height: initial;\n    }\n\n    div[role=\"snptd_presentacio\"].align-bottom div.tab-pane {\n        align-self: flex-end;\n        min-height: initial;\n    }\n}\n  ", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sd-speak-enabled {\n    position: relative;\n    background: whitesmoke;\n    text-decoration: none;  \n  } \n  @keyframes speakicon_anim {\n    0% {\n      opacity: 0;\n      left: -10px;\n    }\n    100% {\n      opacity: 1;\n      left: -5px;\n    }\n  } \n  .sd-speak-enabled:hover:after {\n    content: \"\\f025\";\n    position: absolute;\n    left: -5px;\n    top: -16px;\n    background: white;\n    z-index:1000;\n    font-family: 'FontAwesome'; \n    font-size: 70%;\n    margin: 0px 5px;\n    font-weight: 700; \n    vertical-align:top; \n    animation: speakicon_anim 1s ease;\n  }", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 19 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_talea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media print and (color) {\n    .pw-tasca-solucio, .pw-tasca-nprt {\n        display:none!important;\n    }\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 21 */,
/* 22 */,
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
/* 35 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_narracio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 36 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_quizz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
___CSS_LOADER_EXPORT___.push([module.id, "body.editing .ib-quizz-elem {\n    display: inline-block;\n    position: relative;\n    padding: 4px;\n    background-color: gray;\n}\nbody.editing ib-quizz-dropdown::after {\n    content: \"Quizz::Dropdown\";\n}\nbody.editing ib-quizz-mchoice::after {\n    content: \"Quizz::Mchoice\";\n}\nbody.editing ib-quizz-numeric::after {\n    content: \"Quizz::Numeric\";\n}\n\n.ib-quizz-right {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(67, 140, 67);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n}\n.ib-quizz-wrong {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(164, 60, 60);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n}\n.ib-quizz-error {\n    margin-left: 8px;\n    border-radius:50%;\n    background-color: rgb(114, 57, 90);\n    color: white;\n    width: 23px;\n    display: inline-block;\n    height: 23px;\n    text-align: center;\n}\n\n/* Editor styles */\n.pw-me-dlg {\n    display: flex;\n    flex-direction: column;\n    position: fixed;\n    margin: auto;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    border: 2px solid lightgray;\n    z-index: 100;\n    background: white;\n    box-shadow: 4px 4px 4px #888888;\n    border-radius: 5px;\n}\n\n.pw-me-dlg-header {\n    background: whitesmoke;\n    width: 100%;\n    height: 23px;\n    border-bottom: 2px solid lightgray;\n}\n\n.pw-me-dlg-headertitle {\n    color: black;\n    margin-left: 8px;\n}\n.pw-me-dlg-body {\n    flex-grow: 1;\n    width: 100%;\n    overflow: auto;\n}\n\n.pw-me-dlg-controls {\n    background: white;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    margin: 5px;\n}\n\n.pw-me-btn-dlgclose {\n    color: gray;\n    width: 23px;\n    height: 23px;\n    float: right;\n    padding: 0;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var _dropdownEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43);
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
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_3__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_3__.WidgetStatus.WRONG);
      this.enable(!result);
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
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$widgetConfig2,
        _this$widgetConfig2$v,
        _this$widgetConfig3,
        _this$widgetConfig3$o,
        _this2 = this;
      if (this.editMode) {
        this.attoId = this.discoverAttoId();
        return;
      }
      // Attach editListener of edit pages 
      this.dropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        "class": "dropdown",
        style: "display:inline-block;"
      });
      // Make sure that has data-src field
      var src = this.dataset.src || "";
      try {
        src = atob(src);
        this.widgetConfig = JSON.parse(src);
      } catch (ex) {
        console.error(ex);
      }
      console.log("connectedCallback ", this.widgetConfig);
      if (!this.widgetConfig || this.editMode) {
        return;
      }
      this.button = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        "class": "btn btn-outline-primary dropdown-toggle",
        "type": "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "html": (0,_i18n__WEBPACK_IMPORTED_MODULE_2__["default"])(this.lang, "chooseone")
      });
      this.options = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        "class": "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      });
      var n = ((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : (_this$widgetConfig2$v = _this$widgetConfig2.vars) === null || _this$widgetConfig2$v === void 0 ? void 0 : _this$widgetConfig2$v.length) || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && (_this$widgetConfig3$o = _this$widgetConfig3.opts) !== null && _this$widgetConfig3$o !== void 0 && _this$widgetConfig3$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.shuffleArray)(permutationIndices);
      }
      permutationIndices.forEach(function (index) {
        var _this2$widgetConfig, _this2$options;
        var opt = (((_this2$widgetConfig = _this2.widgetConfig) === null || _this2$widgetConfig === void 0 ? void 0 : _this2$widgetConfig.vars) || [])[index];
        var anchor = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
          "class": "dropdown-item",
          "href": "#",
          "data-index": index + "",
          "html": opt
        });
        anchor.addEventListener("click", function (evt) {
          _this2.userAns = index;
          evt.preventDefault();
          _this2.button && (_this2.button.innerHTML = opt);
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_3__.WidgetStatus.UNSET);
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
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      console.log('The ', name, ' has changed to', newValue);
    }
  }, {
    key: "edit",
    value: function edit() {
      var _this3 = this;
      var editor = document.getElementById(this.attoId || "");
      alert("Editing dropdown at atto " + this.attoId + " " + editor);
      console.log("aaa");
      if (editor) {
        _dropdownEditor__WEBPACK_IMPORTED_MODULE_5__.DropdownEditor.show(this.getAttribute("data-src"), function (output) {
          if (output) {
            _this3.setAttribute("data-src", output);
            var event = new Event('updated');
            editor === null || editor === void 0 ? void 0 : editor.dispatchEvent(event);
            console.info("Event dispatched");
          }
        });
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src'];
    }
  }]);
  return IBQuizzDropdown;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_4__.WidgetElement)) || _class);

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getI18n; }
/* harmony export */ });
var I18n = {
  "ca": {
    "check": "Comprova",
    "chooseone": "Tria una opció",
    "right": "Ben fet!",
    "wrong": "Ho sento. Intentau-ho de nou",
    "error": "Hi ha hagut un error processant la resposta"
  },
  "es": {
    "check": "Comprueba",
    "chooseone": "Elige una opción",
    "right": "¡Bien hecho!",
    "wrong": "Lo siento. Inténtalo de nuevo.",
    "error": "Ha habido un error procesando la respuesta"
  },
  "en": {
    "check": "Check",
    "chooseone": "Choose one",
    "right": "Well done!",
    "wrong": "Try it again.",
    "error": "There has been an error processing the answer"
  },
  "fr": {
    "check": "Vérifier",
    "chooseone": "Choisis une option",
    "right": "",
    "wrong": "",
    "error": ""
  },
  "de": {
    "check": "Prüfen",
    "chooseone": "Wähle eine option",
    "right": "",
    "wrong": "",
    "error": ""
  }
};
function getI18n(lang, key) {
  var locale = I18n[lang];
  if (!locale) {
    locale = I18n["en"];
  }
  return locale[key] || key;
}

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusDisplay": function() { return /* binding */ StatusDisplay; },
/* harmony export */   "WidgetStatus": function() { return /* binding */ WidgetStatus; }
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
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
var StatusDisplay = /*#__PURE__*/function () {
  function StatusDisplay() {
    _classCallCheck(this, StatusDisplay);
    _defineProperty(this, "status", WidgetStatus.UNSET);
    _defineProperty(this, "lang", "ca");
    this.span = document.createElement("span");
    this.span.setAttribute("data-toggle", "tooltip");
  }
  _createClass(StatusDisplay, [{
    key: "setStatus",
    value: function setStatus(status, msg) {
      this.status = status;
      var cl = this.span.classList;
      var msg2 = msg;
      switch (status) {
        case WidgetStatus.UNSET:
          cl.remove("ib-quizz-right", "ib-quizz-wrong", "ib-quizz-error");
          this.span.innerHTML = "";
          break;
        case WidgetStatus.RIGHT:
          cl.add("ib-quizz-right");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(this.lang, 'right');
          }
          this.span.innerHTML = "<i class=\"".concat(ICON_RIGHT, "\"></i>");
          break;
        case WidgetStatus.WRONG:
          cl.add("ib-quizz-wrong");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(this.lang, 'wrong');
          }
          this.span.innerHTML = "<i class=\"".concat(ICON_WRONG, "\"></i>");
          break;
        default:
          cl.add("ib-quizz-error");
          if (!msg2) {
            msg2 = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])(this.lang, 'error');
          }
          this.span.innerHTML = "<i class=\"".concat(ICON_ERROR, "\"></i>");
          break;
      }
      msg2 && this.span.setAttribute("title", msg2);
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
    key: "getElement",
    value: function getElement() {
      return this.span;
    }
  }]);
  return StatusDisplay;
}();

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetElement": function() { return /* binding */ WidgetElement; }
/* harmony export */ });
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
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "lang", "ca");
    _this.innerHTML = "";
    _this.classList.add("d-print-none");
    _this.statusDisplay = new _statusDisplay__WEBPACK_IMPORTED_MODULE_0__.StatusDisplay();
    _this.editMode = document.querySelector("body.editing") != null;
    if (_this.editMode) {
      _this.addEventListener("click", function (evt) {
        return _this.edit();
      });
    }
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
    }
  }, {
    key: "setStatus",
    value: function setStatus(status, msg) {
      this.statusDisplay.setStatus(status, msg);
    }
    /*
    setWidget(htmlElement: HTMLElement, pre: string | undefined) {
        this.prepend(htmlElement);
        if(pre) {
            const spanPre = document.createElement("span");
            spanPre.innerHTML = pre;
            this.prepend(spanPre);
        }
    }
    */
  }, {
    key: "discoverAttoId",
    value: function discoverAttoId() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var elem = this;
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
      return this.attoId;
    }
  }]);
  return WidgetElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownEditor": function() { return /* binding */ DropdownEditor; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* eslint-disable @typescript-eslint/no-non-null-assertion */


var panel = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
  style: 'width:100%;padding:10px',
  html: "\n        Correcte / Opcions<br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_0\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_0\"><br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_1\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_1\"><br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_2\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_2\"><br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_3\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_3\"><br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_4\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_4\"><br>\n        <input type=\"checkbox\" id=\"quizzDDOptRight_5\"> <input type=\"text\" style=\"width:90%\" id=\"quizzDDOpt_5\"><br>\n        <br>\n        <input type=\"checkbox\" id=\"quizzDDshuffle\"> Barreja les opcions<br>\n        <hr>\n        Text abans de l'element<br>\n        <textarea id=\"quizz-numedit-pre\" rows=\"2\" style=\"width:98%\"></textarea>\n        <br>\n        Feedback de la resposta<br>\n        <textarea id=\"quizz-numedit-feedback\" rows=\"2\" style=\"width:98%\"></textarea>\n        <br>\n    "
});
var MAX_ELEMS = 6;
var allCheckboxesElems = new Array(MAX_ELEMS);
var allOptionElems = new Array(MAX_ELEMS);
for (var i = 0; i < MAX_ELEMS; i++) {
  allCheckboxesElems[i] = panel.querySelector("#quizzDDOptRight_" + i);
  allOptionElems[i] = panel.querySelector("#quizzDDOpt_" + i);
}
var quizzDDshuffle = panel.querySelector("#quizzDDshuffle");
var quizzNumeditPre = panel.querySelector("#quizz-numedit-pre");
var quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback");
function setValues(w) {
  var _w$opts;
  // Opcions correctes són
  var allRight = w.ans.split(",").map(function (e) {
    return e.trim();
  });
  var vars = w.vars || [];
  vars.forEach(function (s, i) {
    allCheckboxesElems[i].checked = allRight.indexOf(i + "") >= 0;
    allOptionElems[i].value = s;
  });
  // Clear the remaining inputs
  for (var _i = vars.length; _i < MAX_ELEMS; _i++) {
    allCheckboxesElems[_i].checked = false;
    allOptionElems[_i].value = "";
  }
  quizzDDshuffle.checked = ((_w$opts = w.opts) === null || _w$opts === void 0 ? void 0 : _w$opts.shuffle) || false;
  quizzNumeditFeedback.value = w.fbk || "";
  quizzNumeditPre.value = w.pre || "";
}
function getValues() {
  var theAns = [];
  var theVars = [];
  allOptionElems.forEach(function (e, i) {
    var v = e.value || "";
    if (v.trim()) {
      theVars.push(v);
      if (allCheckboxesElems[i].checked) {
        theAns.push(i + "");
      }
    }
  });
  var updated = {
    ans: theAns.join(","),
    vars: theVars,
    fbk: quizzNumeditFeedback.value || "",
    pre: quizzNumeditPre.value || "",
    opts: {
      shuffle: quizzDDshuffle.checked
    }
  };
  return updated;
}
var DropdownEditor = {
  show: function show(src, cbAccept) {
    if (!src) {
      return;
    }
    var config;
    try {
      config = JSON.parse(atob(src));
      console.log(config);
      // Update controls with values from config
      setValues(config);
      var dialog = (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.getDialog)();
      dialog.setBody($(panel));
      dialog.show();
      dialog.setAcceptAction(function () {
        var updated = getValues();
        var out = btoa(JSON.stringify(updated));
        cbAccept(out);
      });
    } catch (ex) {
      //Error
      console.error("Error parsing:: ", src);
      console.error(ex);
    }
  }
};

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDialog": function() { return /* binding */ getDialog; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
     * Creates a basic dialog which can be extended for further functionality
     * @param {*} title 
     * @param {*} width 
     * @param {*} height 
*/
var PwDialog = /*#__PURE__*/function () {
  function PwDialog(title, width, height) {
    var _this = this;
    _classCallCheck(this, PwDialog);
    this.id = "pwdlg_" + Math.random().toString(32).substring(2);
    this.window = $('<div id="' + this.id + '" class="pw-me-dlg" style="width:' + width + 'px;height:' + height + 'px;display:none;"></div>');
    var topBar = $('<div class="pw-me-dlg-header"></div>');
    this.topBar = topBar;
    var headerTitle = $('<span class="pw-me-dlg-headertitle">' + title + '</span>');
    this.closeBtn = $('<button class="btn btn-sm pw-me-btn-dlgclose" title="Tancar"><i class="fa fas fa-times"></i></button>');
    this.closeBtn.on("click", function (ev) {
      ev.preventDefault();
      _this.window.css("display", "none");
    });
    topBar.append(headerTitle);
    topBar.append(this.closeBtn);

    //Topbar
    this.window.append(topBar);
    //The body region
    this.body = $('<div class="pw-me-dlg-body"></div>');
    this.window.append(this.body);

    //The accept/cancel buttons
    var controlButtons = $('<div class="pw-me-dlg-controls"></div>');
    var acceptBtn = $('<button class="btn btn-sm btn-primary">Acceptar</button>');
    var cancelBtn = $('<button class="btn btn-sm btn-outline-primary">Cancel·lar</button>');
    acceptBtn.on("click", function () {
      _this.close();
      _this.onAccept && _this.onAccept();
    });
    cancelBtn.on("click", function () {
      _this.close();
      _this.onCancel && _this.onCancel();
    });
    controlButtons.append(acceptBtn);
    controlButtons.append(cancelBtn);
    this.window.append(controlButtons);

    //Add dialog to body
    $('body').append(this.window);

    // Make this dialog draggable
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
    this.dragStart = function (e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
      if (e.target === topBar[0]) {
        active = true;
      }
    };
    this.dragEnd = function (e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
    };
    this.setTranslate = function (xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    };
    this.drag = function (e) {
      if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;
        _this.setTranslate(currentX, currentY, _this.window[0]);
      }
    };
    topBar[0].addEventListener("touchstart", this.dragStart, false);
    topBar[0].addEventListener("touchend", this.dragEnd, false);
    topBar[0].addEventListener("touchmove", this.drag, false);
    topBar[0].addEventListener("mousedown", this.dragStart, false);
    topBar[0].addEventListener("mouseup", this.dragEnd, false);
    topBar[0].addEventListener("mousemove", this.drag, false);
  }
  _createClass(PwDialog, [{
    key: "append",
    value: function append(element) {
      this.window.append(element);
    }
  }, {
    key: "show",
    value: function show() {
      this.window.css("display", "flex");
    }
  }, {
    key: "close",
    value: function close() {
      this.window.css("display", "none");
    }
  }, {
    key: "remove",
    value: function remove() {
      this.closeBtn.off();
      this.window.remove();
      this.topBar[0].removeEventListener("touchstart", this.dragStart);
      this.topBar[0].removeEventListener("touchend", this.dragEnd);
      this.topBar[0].removeEventListener("touchmove", this.drag);
      this.topBar[0].removeEventListener("mousedown", this.dragStart);
      this.topBar[0].removeEventListener("mouseup", this.dragEnd);
      this.topBar[0].removeEventListener("mousemove", this.drag);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.remove();
    }
  }, {
    key: "setAcceptAction",
    value: function setAcceptAction(action) {
      this.onAccept = action;
    }
  }, {
    key: "setCancelAction",
    value: function setCancelAction(action) {
      this.onCancel = action;
    }
  }, {
    key: "setBody",
    value: function setBody(body) {
      this.body.html("");
      this.body.append(body);
    }
  }]);
  return PwDialog;
}();
var singleton;
function getDialog() {
  if (singleton == null) {
    singleton = new PwDialog("Editor", 600, 400);
  }
  return singleton;
}

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _mchoiceEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46);
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
    _defineProperty(_assertThisInitialized(_this), "userAns", -1);
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
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.WRONG);
      this.enable(!result);
      return result;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$widgetConfig2,
        _this$widgetConfig2$v,
        _this$widgetConfig3,
        _this$widgetConfig3$o,
        _this2 = this;
      if (this.editMode) {
        this.attoId = this.discoverAttoId();
        return;
      }
      this.form = document.createElement("form");
      this.form.style.setProperty("display", "inline-block");
      // Make sure that has data-src field
      var src = this.dataset.src || "";
      try {
        src = atob(src);
        this.widgetConfig = JSON.parse(src);
      } catch (ex) {
        console.error(ex);
      }
      console.log("connectedCallback ", this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      var n = ((_this$widgetConfig2 = this.widgetConfig) === null || _this$widgetConfig2 === void 0 ? void 0 : (_this$widgetConfig2$v = _this$widgetConfig2.vars) === null || _this$widgetConfig2$v === void 0 ? void 0 : _this$widgetConfig2$v.length) || 0;
      var permutationIndices = new Array(n);
      for (var i = 0; i < n; i++) {
        permutationIndices[i] = i;
      }
      if ((_this$widgetConfig3 = this.widgetConfig) !== null && _this$widgetConfig3 !== void 0 && (_this$widgetConfig3$o = _this$widgetConfig3.opts) !== null && _this$widgetConfig3$o !== void 0 && _this$widgetConfig3$o.shuffle) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.shuffleArray)(permutationIndices);
      }
      var radioName = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.genID)();
      permutationIndices.forEach(function (index) {
        var _this2$widgetConfig, _this2$form;
        var opt = (((_this2$widgetConfig = _this2.widgetConfig) === null || _this2$widgetConfig === void 0 ? void 0 : _this2$widgetConfig.vars) || [])[index];
        var formCheck = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          "class": "form-check"
        });
        (_this2$form = _this2.form) === null || _this2$form === void 0 ? void 0 : _this2$form.append(formCheck);
        var input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
          "class": "form-check-input",
          type: "radio",
          name: radioName,
          id: radioName + "_" + index
        });
        var label = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
          "class": "form-check-label",
          "for": radioName + "_" + index,
          html: opt
        });
        formCheck.appendChild(input);
        formCheck.appendChild(label);
        _this2.radios.push(input);
        input.addEventListener("click", function (evt) {
          _this2.userAns = index;
          _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.UNSET);
        });
      });
      _get(_getPrototypeOf(IBQuizzMchoice.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.form);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      console.log('The ', name, ' has changed to', newValue);
    }
  }, {
    key: "edit",
    value: function edit() {
      var editor = document.getElementById(this.attoId || "");
      alert("Editing mchoice at atto " + this.attoId + " " + editor);
      if (editor) {
        var output = _mchoiceEditor__WEBPACK_IMPORTED_MODULE_4__.MchoiceEditor.show(this.getAttribute("data-src"));
        if (output) {
          this.setAttribute("data-src", output);
          var event = new Event('updated');
          editor === null || editor === void 0 ? void 0 : editor.dispatchEvent(event);
          console.info("Event dispatched");
        }
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src'];
    }
  }]);
  return IBQuizzMchoice;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_3__.WidgetElement)) || _class);

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MchoiceEditor": function() { return /* binding */ MchoiceEditor; }
/* harmony export */ });
var MchoiceEditor = {
  show: function show(src) {
    //pass
    return null;
  }
};

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _widgetElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _numericEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
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
          this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.ERROR);
          return false;
        }
      } catch (ex) {
        //Error
        this.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.ERROR);
        return false;
      }
      this.setStatus(result ? _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.RIGHT : _statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.WRONG);
      console.log("Numeric, ", this.getUserInput(), result);
      this.enable(!result);
      return result;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;
      if (this.editMode) {
        this.attoId = this.discoverAttoId();
        return;
      }
      this.input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
        "class": "form-control",
        type: "number",
        style: "display:inline-block;width:100px;"
      });
      this.input.addEventListener("change", function (evt) {
        _this2.setStatus(_statusDisplay__WEBPACK_IMPORTED_MODULE_2__.WidgetStatus.UNSET);
      });
      // Make sure that has data-src field
      var src = this.dataset.src || "";
      try {
        src = atob(src);
        this.widgetConfig = JSON.parse(src);
      } catch (ex) {
        console.error(ex);
      }
      console.log("connectedCallback ", this.widgetConfig);
      if (!this.widgetConfig) {
        return;
      }
      _get(_getPrototypeOf(IBQuizzNumeric.prototype), "init", this).call(this, this.widgetConfig.pre);
      this.append(this.input);
      this.append(this.statusDisplay.getElement());
      this.reflowLatex();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      console.log('The ', name, ' has changed to', newValue);
    }
  }, {
    key: "edit",
    value: function edit() {
      var _this3 = this;
      var editor = document.getElementById(this.attoId || "");
      alert("Editing numeric at atto " + this.attoId + " " + editor);
      if (editor) {
        _numericEditor__WEBPACK_IMPORTED_MODULE_4__.NumericEditor.show(this.getAttribute("data-src"), function (output) {
          if (output) {
            _this3.setAttribute("data-src", output);
            var event = new Event('updated');
            editor === null || editor === void 0 ? void 0 : editor.dispatchEvent(event);
            console.info("Event dispatched");
          }
        });
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src'];
    }
  }]);
  return IBQuizzNumeric;
}(_widgetElement__WEBPACK_IMPORTED_MODULE_3__.WidgetElement)) || _class);

/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumericEditor": function() { return /* binding */ NumericEditor; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);


var panel = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
  style: 'width:100%;padding:10px',
  html: "\n        Resposta correcta<br>\n        <input id=\"quizz-numedit-ans\" type=\"text\"><br>\n        Precisi\xF3 <br>\n        <input id=\"quizz-numedit-precision\" type=\"numeric\" min=0><br>\n        Tipus de precisi\xF3 <br>\n        <select id=\"quizz-numedit-precisiontype\">\n            <option value=\"relative\">Relativa</option>\n            <option value=\"absolute\">Absoluta</option>\n            <option value=\"%\">Percentual</option>\n        </select>\n        <br>\n        <hr>\n        Text abans de l'element<br>\n        <textarea id=\"quizz-numedit-pre\" rows=\"2\" style=\"width:98%\"></textarea>\n        <br>\n        Feedback de la resposta<br>\n        <textarea id=\"quizz-numedit-feedback\" rows=\"2\" style=\"width:98%\"></textarea>\n        <br>\n    "
});
var quizzNumEditAns = panel.querySelector("#quizz-numedit-ans");
var quizzNumeditPrecision = panel.querySelector("#quizz-numedit-precision");
var quizzNumeditPrecisiontype = panel.querySelector("#quizz-numedit-precisiontype");
var quizzNumeditPre = panel.querySelector("#quizz-numedit-pre");
var quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback");
function setValues(w) {
  var _w$opts, _w$opts2;
  quizzNumEditAns.value = w.ans || "";
  quizzNumeditFeedback.value = w.fbk || "";
  quizzNumeditPre.value = w.pre || "";
  quizzNumeditPrecision.value = (((_w$opts = w.opts) === null || _w$opts === void 0 ? void 0 : _w$opts.err) || 0) + "";
  quizzNumeditPrecisiontype.value = ((_w$opts2 = w.opts) === null || _w$opts2 === void 0 ? void 0 : _w$opts2.errunit) || "absolute";
}
function getValues() {
  var updated = {
    ans: (quizzNumEditAns === null || quizzNumEditAns === void 0 ? void 0 : quizzNumEditAns.value) || "0",
    fbk: quizzNumeditFeedback.value || "",
    pre: quizzNumeditPre.value || "",
    opts: {
      err: parseFloat((quizzNumeditPrecision === null || quizzNumeditPrecision === void 0 ? void 0 : quizzNumeditPrecision.value) || "0"),
      errunit: quizzNumeditPrecisiontype === null || quizzNumeditPrecisiontype === void 0 ? void 0 : quizzNumeditPrecisiontype.value
    }
  };
  return updated;
}
var NumericEditor = {
  show: function show(src, cbAccept) {
    if (!src) {
      return;
    }
    var config;
    try {
      config = JSON.parse(atob(src));
      // Update controls with values from config
      setValues(config);
      var dialog = (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.getDialog)();
      dialog.setBody($(panel));
      dialog.show();
      dialog.setAcceptAction(function () {
        var updated = getValues();
        var out = btoa(JSON.stringify(updated));
        cbAccept(out);
      });
    } catch (ex) {
      //Error
      console.error("Error parsing:: ", src);
      console.error(ex);
    }
  }
};

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
/* harmony import */ var _lightbox_lightbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _narracio_narracio_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
/* harmony import */ var _presentacio_presentacio_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _quizz_quizz_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var _speak_speak_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _talea_talea_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _quizz_dropdownWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39);
/* harmony import */ var _quizz_mchoiceWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45);
/* harmony import */ var _quizz_numericWidget__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47);
// Bundle css that should be available in the atto editor







// Bundle js that should be available in the atto editor



}();
/******/ })()
;