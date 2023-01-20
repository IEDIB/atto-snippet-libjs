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
    if (IB.sd[meta.name] && typeof IB.sd[meta.name]._init === 'function') {
      console.error("Warning: component '".concat(meta.name, "' loaded twice."));
      //Simply bind possibly missing components
      IB.sd[meta.name]._init();
      return;
    }
    var _init = function _init() {
      IB.sd[meta.name] = IB.sd[meta.name] || {
        inst: {},
        _class: clazz,
        _init: _init,
        _dispose: null
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
    IB.sd[meta.name]._dispose = _dispose;
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
/* harmony export */   "genID": function() { return /* binding */ genID; },
/* harmony export */   "getPageInfo": function() { return /* binding */ getPageInfo; },
/* harmony export */   "parseUrlParams": function() { return /* binding */ parseUrlParams; },
/* harmony export */   "pathJoin": function() { return /* binding */ pathJoin; },
/* harmony export */   "pran": function() { return /* binding */ pran; },
/* harmony export */   "querySelectorProp": function() { return /* binding */ querySelectorProp; },
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
/* harmony export */   "Component": function() { return /* binding */ Component; }
/* harmony export */ });
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

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SpeakComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _navigatorPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var _urlPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _wordreferencePlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31);
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






var allVoices = null;
function getNavigatorVoices() {
  return new Promise(function (resolve, reject) {
    if (allVoices != null) {
      resolve(allVoices);
      return;
    }
    // wait until the voices have been loaded asyncronously
    window.speechSynthesis.addEventListener("voiceschanged", function () {
      allVoices = window.speechSynthesis.getVoices();
      resolve(allVoices);
    });
  });
}
var SpeakComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
  name: 'speak',
  author: 'Josep Mulet Pol',
  version: '2.5',
  query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
  use$: true //May require $ajax
}), _dec(_class = /*#__PURE__*/function (_BaseComponent) {
  _inherits(SpeakComponent, _BaseComponent);
  var _super = _createSuper(SpeakComponent);
  function SpeakComponent(parent) {
    _classCallCheck(this, SpeakComponent);
    return _super.call(this, parent);
  }
  _createClass(SpeakComponent, [{
    key: "init",
    value: function init() {
      var _this = this;
      var ds = this.parent.dataset;
      if (ds.active === "1") {
        return;
      }
      ds.active = "1";
      if (ds.src) {
        this.audioPlayer = new _urlPlayer__WEBPACK_IMPORTED_MODULE_4__["default"](this.parent);
        return;
      }
      if (ds.wr === "1" || ds.wr === "true") {
        //use wordreference
        this.audioPlayer = new _wordreferencePlayer__WEBPACK_IMPORTED_MODULE_5__["default"](this.parent);
        return;
      }
      var synth = window.speechSynthesis;
      var supported = synth != null && window.SpeechSynthesisUtterance != null;
      this.audioPlayer = null;
      if (supported) {
        getNavigatorVoices().then(function (voices) {
          _this.audioPlayer = new _navigatorPlayer__WEBPACK_IMPORTED_MODULE_3__["default"](_this.parent, voices);
        }, function () {
          //On error, rely on GTTS
          _this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this.parent);
        });
        //Stop voices on page change
        window.addEventListener('unload', function (evt) {
          window.speechSynthesis.cancel();
        });
      } else {
        // If no navigator support, rely on GTTS
        this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](this.parent);
      }
    }
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
    key: "pause",
    value: function pause() {
      this.audioPlayer && this.audioPlayer.pause();
    }
  }]);
  return SpeakComponent;
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GTTSPlayer; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MAX_GTTS_LEN = 1000;
var GTTS_URL = "https://piworld.es/api/gtts/speak?t=";
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
      console.log("GTTS: Max length supported is " + MAX_GTTS_LEN + " characters.");
      elem.removeAttribute("href");
      return;
    }
    //decide what to do with the title
    if (elem.title == "-") {
      //remove it
      elem.removeAttribute("title");
    } else if (!elem.title) {
      elem.title = "gTTS Speak!";
    }
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
    key: "play",
    value: function play() {
      if (!this.audio) {
        this.audio = new Audio(this.url);
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.audio.src = this.url;
      this.audio.play();
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
        this._elem.removeEventListener("click", this.handler);
        this.handler = null;
      }
    }
  }]);
  return GTTSPlayer;
}();


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavigatorPlayer; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var findVoice = function findVoice(lang, voices) {
  lang = (lang || "").toLowerCase();
  var k = 0;
  var voice = null;
  var len = (voices || []).length;
  while (k < len && voice == null) {
    if (voices[k].lang.toLowerCase() == lang) {
      voice = voices[k];
    }
    k++;
  }
  return voice;
};
var NavigatorPlayer = /*#__PURE__*/function () {
  function NavigatorPlayer(elem, voices) {
    var _this = this;
    _classCallCheck(this, NavigatorPlayer);
    this._elem = elem;
    var idioma = (elem.getAttribute("href") || "_").split("_")[1];
    //decide what to do with the title
    if (elem.title == "-") {
      //remove it
      elem.removeAttribute("title");
    } else if (!elem.title) {
      elem.title = "Speak!";
    }
    var voice = findVoice(idioma, voices);
    this.handler = null;
    if (voice) {
      //const idioma = (this._elem.getAttribute("href") || "_").split("_")[1];
      this.utterance = new SpeechSynthesisUtterance(elem.innerText);
      this.utterance.voice = voice;
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
    key: "play",
    value: function play() {
      // call abort pending...
      window.speechSynthesis.cancel();
      this.utterance && window.speechSynthesis.speak(this.utterance);
    }
  }, {
    key: "pause",
    value: function pause() {
      window.speechSynthesis.cancel();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._elem.removeEventListener("click", this.handler);
      this._elem.classList.remove("sd-speak-enabled");
      this._elem.removeAttribute('data-active');
      this._elem.removeAttribute('title');
    }
  }]);
  return NavigatorPlayer;
}();


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UrlPlayer; }
/* harmony export */ });
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
    key: "dispose",
    value: function dispose() {
      this.audioElement = null;
      this.handler && this.elem && this.elem.removeEventListener("click", this.handler);
    }
  }]);
  return UrlPlayer;
}();


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WordReferencePlayer; }
/* harmony export */ });
/* harmony import */ var _gttsPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _urlPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
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
        url: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addBaseToUrl)(wordReferencePrefix, asource)
      };
    }
  });
  return map;
}
var wr_define = function wr_define(from, word) {
  // Make the request
  return new Promise(function (resolve, reject) {
    if (!(from in definition)) {
      reject();
      return;
    }
    var url2 = wordReferencePrefix + definition[from] + '/' + encodeURIComponent(word);
    if (!definition[from]) {
      reject();
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
      reject("cannot find audioFiles in page");
    }).fail(function (err) {
      reject(err);
    });
  });
};
var WordReferencePlayer = /*#__PURE__*/function () {
  function WordReferencePlayer(elem) {
    _classCallCheck(this, WordReferencePlayer);
    this.elem = elem;
    this.init();
  }
  _createClass(WordReferencePlayer, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.handler = function (evt) {
        evt.preventDefault(); // Evita que executi el link  
        if (_this.audioElement != null) {
          _this.play();
          return;
        }
        // Defer the search of sources until the first click
        //TODO if no region specified show dropdown with variants
        var lang = _this.elem.getAttribute("href") || _this.elem.dataset.lang || "en";
        var region = "";
        lang = lang.replace("#speak_", "");
        if (lang.indexOf("-") > 0) {
          var parts = lang.split("-");
          lang = parts[0].toLowerCase().trim();
          region = parts[1].toLowerCase().trim();
        }
        wr_define(lang, _this.elem.innerText).then(function (audioMap) {
          console.log(audioMap);
          var variants = Object.keys(audioMap);
          if (variants.length > 0) {
            //use the one that matches "region"
            var theURL = audioMap[region];
            if (!theURL) {
              theURL = audioMap[variants[0]];
            }
            var url = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addBaseToUrl)(wordReferencePrefix, theURL.url);
            _this.audioElement = new _urlPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](undefined, url);
            if (!region && variants.length > 1) {
              // Add a dropdown to change variant
              var id = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.genID)();
              var $dropdown = $("\n<div class=\"dropdown\" style=\"display:inline-block;\">\n  <button class=\"btn btn-secondary btn-sm\" style=\"margin:2px;padding:4px;height:15px;\" type=\"button\" id=\"dmb_".concat(id, "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n  <i class=\"fas fa fa-globe\" style=\"transform: translateY(-9px);font-size:90%;\"></i>\n  </button>\n  <div class=\"dropdown-menu\" aria-labelledby=\"dmb_").concat(id, "\"> \n  </div>\n</div>"));
              var $menu = $dropdown.find(".dropdown-menu");
              variants.forEach(function (variant) {
                var varDef = audioMap[variant];
                var $menuItem = $("<a class=\"dropdown-item\" href=\"#\">".concat(varDef.name, "</a>"));
                $menuItem.on("click", function (evt) {
                  evt.preventDefault();
                  if (_this.audioElement) {
                    _this.audioElement.src = varDef.url;
                    _this.audioElement.play();
                  }
                });
                $menu.append($menuItem);
              });
              $dropdown.insertAfter($(_this.elem));
            }
          } else {
            // Fallback on google
            _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_0__["default"](_this.elem);
          }
          _this.audioElement.play();
        }, function (err) {
          // Fallback on google
          _this.audioElement = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_0__["default"](_this.elem);
          _this.audioElement.play();
        });
      };
      this.elem.addEventListener("click", this.handler);
      this.elem.title = "wordReference";
    }
  }, {
    key: "play",
    value: function play() {
      this.audioElement && this.audioElement.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.audioElement && this.audioElement.pause();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.pause();
      if (this.handler) {
        this.elem.removeEventListener("click", this.handler);
        this.handler = null;
      }
    }
  }]);
  return WordReferencePlayer;
}();
/*
const wr_translate = function (from: string, to: string, word: string): Promise<string[]> {
    const url2 = 'https://www.wordreference.com/' + from + to + '/' + encodeURIComponent(word);
    console.log(url2);
    // Make the request
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function (data) {
            console.log("Processing ", data);
            let audioList = []
            const matches = data.match(/<script>const audioFiles =(.*?)\]/m);
            console.log("matches audioFiles ", matches);
            if (matches && matches.length == 2) {
                const found = matches[1].trim().replace(/'/g, '"');
                if (found.endsWith(",")) {
                    found = found.substring(0, found.length - 1);
                }
                audioList = JSON.parse(found + "]")
                console.log(audioList);
                resolve(audioList);
                return;
            }
            /*
            matches = data.match(/<div\s+class='entry'>((.|\n)*?)<\/div>/m);
            console.log("matches entry ", matches);
            if (matches && matches.length > 0) {
                const text = $(matches[0]).text();
                console.log(text);
            }

            console.log(data.indexOf("<table class='WRD'"));
            const reg = /<table\s+class='WRD'((.|\n)*?)<\/table>/gi;
            matches = data.match(reg);
            console.log("matches table ", matches);
            if (matches && matches.length > 0) {
                const text = $(matches[0]).text();
                console.log(text);
            }
             
           reject();
        }).fail(function (err) {
            reject();
        });
    });
};
*/


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
/* harmony import */ var _speak_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _speakComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);



_loader__WEBPACK_IMPORTED_MODULE_0__["default"].bootstrap([_speakComponent__WEBPACK_IMPORTED_MODULE_2__["default"]]);
}();
/******/ })()
;