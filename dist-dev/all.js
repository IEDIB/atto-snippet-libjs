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
/* 15 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* %SKIPALLCSS */\ndiv[role=\"snptd_presentacio\"] .nav.nav-tabs {\n    display: none;\n}\n\n@media not print {\n    div[role=\"snptd_presentacio\"]>.tab-content {\n        border: none;\n        display: flex;\n        padding: 10px;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane {\n        display: block;\n        border: none;\n        min-height: 100px;\n        margin-right: -100%;\n        width: 100%;\n        opacity: 0;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane.fade {\n        transition-delay: 300ms;\n        transition-duration: 500ms;\n    }\n\n    div[role=\"snptd_presentacio\"][data-transition=\"slide\"] .tab-pane {\n        transition: transform .55s linear, opacity 0.55s ease-out;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane.active {\n        opacity: 1;\n        transform: translate(0, 0);\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane:not(.active) {\n        transform: translate(-110%, 0);\n    }\n\n    div[role=\"snptd_presentacio\"] .snpt_container {\n        margin: 20px 400px;\n        height: 300px;\n        width: 50%;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_continguts {\n        padding-top: 20px;\n        padding-left: 20px;\n        padding-right: 20px;\n        font-size: 20px;\n        height: 250px;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons {\n        padding-left: 10px;\n        padding-top: 6px;\n        font-size: 18px;\n        height: 40px;\n        background-color: #d4ebee;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons button {\n        margin: 0 1px;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_comptador {\n        display: inline;\n        float: right;\n        padding-right: 15px;\n        padding-top: 5px;\n        font-size: 16px;\n        height: 30px;\n        color: #0069d9;\n    }\n}\n\n@media print {\n    div[role=\"snptd_presentacio\"] {\n        width: 99%;\n        margin: auto;\n        border: 1px solid #eee;\n        display: flex;\n    }\n\n    div[role=\"snptd_presentacio\"] .box_botons {\n        display: none;\n    }\n\n    div[role=\"snptd_presentacio\"] .fade {\n        opacity: 1;\n    }\n\n    div[role=\"snptd_presentacio\"] .nav>li>a {\n        min-width: 80px;\n        color: #555;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane {\n        opacity: 1;\n        width: 100%;\n        display: inline-block !important;\n    }\n\n    div[role=\"snptd_presentacio\"] .tab-pane::before {\n        content: attr(data-label);\n        width: 100%;\n        display: block;\n        margin-bottom: 10px;\n        background-color: #d4ebee;\n        text-align: right;\n        padding-right: 5px;\n    }\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
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
/* 21 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LightboxComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
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
var LightboxComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
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
        _this3.currentIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)($theImg.attr("data-lbpos") || "0", 0);
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
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


/***/ }),
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
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ZoomComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _wheelzoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
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
var ZoomComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
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
        (0,_wheelzoom__WEBPACK_IMPORTED_MODULE_3__["default"])(img, options);
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
        maxZoom: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(ds.maxzoom, 10)
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
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* 26 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PresentacioComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
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
var PresentacioComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
  name: 'presentacio',
  author: 'Tomeu Fiol, Josep Mulet',
  version: '2.1'
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
      this.n = ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)((ds === null || ds === void 0 ? void 0 : ds.start) || '1', 1) - 1) % this.num;
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
        defaultTime = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(tempsDiapositiva[0], defaultTime);
      }
      this.durada = [];
      var len_td = tempsDiapositiva.length;
      for (var j = 0; j < this.num; j++) {
        var t = defaultTime;
        if (j >= len_td) {
          this.durada.push(t);
          continue;
        }
        t = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(tempsDiapositiva[j], defaultTime);
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
      if (!this.buttonBack || !this.buttonFirst || !this.buttonLast || !this.buttonNext || !this.buttonPlay) {
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
        this.buttonPlay.addEventListener("click", this.evListener5);
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
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


/***/ }),
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


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TaleaComponent; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _smartTabMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33);
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
var TaleaComponent = (_dec = (0,_decorators__WEBPACK_IMPORTED_MODULE_1__.Component)({
  name: 'talea',
  author: 'Josep Mulet Pol',
  version: '2.1',
  use$: true
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
    _this.pi = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getPageInfo)();
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
      this.seed = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(ds.seed || "1", 1);
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
            var idUser = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(user.userid, 0);
            _this2.mapStudents[idUser] = user.userfullname;
            $dataList.append($('<option value="' + user.userid + '">' + user.userfullname + '</option>'));
          }
        });
      } else {
        headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???');
        this.showUser(this.pi.userId);
      }
    }
  }, {
    key: "showUser",
    value: function showUser(idUser) {
      if (this.pi.isTeacher) {
        var ele = $('#talea_name_' + this.parent.id);
        if (this.mapStudents && this.mapStudents[idUser]) {
          ele.text('Tasca de ' + this.mapStudents[idUser]);
        } else {
          ele.text('Tasca d\'usuari #' + idUser);
        }
      }
      var randomGen = null;
      if (this.workingMode === "urandom") {
        randomGen = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pran)(idUser * this.seed);
      } else if (this.workingMode === "lrandom") {
        randomGen = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pran)(this.seed);
      }
      this.smartMenus.forEach(function (sm) {
        return sm.showUser(randomGen, idUser);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.pi.isTeacher) {
        $('#talea_name_' + this.parent.id).text('Sense filtre');
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
      var elem = $("#controls_userid_" + pid);
      elem.on('change', function (evt) {
        var current_userId = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convertInt)(elem.val() + "", -2);
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
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.parent.dataset.active !== "1") {
        return;
      }
      this.clear();
      var pid = this.parent.id;
      $("#talea_name_" + pid).remove();
      $('#controls_userid_' + pid).off();
      $('#talea_controls_' + pid).remove();
      this.parent.removeAttribute("data-active");
    }
  }]);
  return TaleaComponent;
}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent)) || _class);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SmartTabMenu; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
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
          which = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertInt)(val, 0);
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
/* harmony import */ var _lightbox_lightbox_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _presentacio_presentacio_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _presentacio_presentacio_skipall_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _speak_speak_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _talea_talea_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var _presentacio_presentacioComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26);
/* harmony import */ var _speak_speakComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(27);
/* harmony import */ var _talea_taleaComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);











_loader__WEBPACK_IMPORTED_MODULE_0__["default"].bootstrap([_zoom_zoomComponent__WEBPACK_IMPORTED_MODULE_7__["default"], _lightbox_lightboxComponent__WEBPACK_IMPORTED_MODULE_6__["default"], _presentacio_presentacioComponent__WEBPACK_IMPORTED_MODULE_8__["default"], _speak_speakComponent__WEBPACK_IMPORTED_MODULE_9__["default"], _talea_taleaComponent__WEBPACK_IMPORTED_MODULE_10__["default"]]);
}();
/******/ })()
;