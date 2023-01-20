/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 22:
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

/***/ 23:
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

/***/ 1:
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

/***/ 2:
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

/***/ 25:
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

/***/ 24:
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _wheelzoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _zoomComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);



_loader__WEBPACK_IMPORTED_MODULE_0__["default"].bootstrap([_zoomComponent__WEBPACK_IMPORTED_MODULE_2__["default"]]);
}();
/******/ })()
;