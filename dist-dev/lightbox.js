/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/base.ts":
/*!********************!*\
  !*** ./ts/base.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseComponent\": function() { return /* binding */ BaseComponent; }\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nvar BaseComponent = /*#__PURE__*/_createClass(function BaseComponent(parent) {\n  _classCallCheck(this, BaseComponent);\n  this.parent = parent;\n});\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/base.ts?");

/***/ }),

/***/ "./ts/lightbox/lightbox.ts":
/*!*********************************!*\
  !*** ./ts/lightbox/lightbox.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ \"./ts/loader.ts\");\n/* harmony import */ var _lightbox_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lightbox.css */ \"./ts/lightbox/lightbox.css\");\n/* harmony import */ var _lightboxComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lightboxComponent */ \"./ts/lightbox/lightboxComponent.ts\");\n\n\n\n_loader__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bootstrap(_lightboxComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/lightbox/lightbox.ts?");

/***/ }),

/***/ "./ts/lightbox/lightboxComponent.ts":
/*!******************************************!*\
  !*** ./ts/lightbox/lightboxComponent.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ LightboxComponent; }\n/* harmony export */ });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ \"./ts/base.ts\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/// <reference path=\"../global.d.ts\" />\n\nvar leftArrow = '<span>&#10094;</span>';\nvar rightArrow = '<span>&#10095;</span>';\nvar MODAL_ID = 'snptModal_lightbox';\n\n// The gallery is a sequence of img tags that participate in the lightbox show\nfunction constructGallery() {\n  var globalId = 0;\n  var Gallery = [];\n  var allGals = document.querySelectorAll('[role=\"snptd_lightbox\"], [data-snptd=\"lightbox\"]');\n  for (var i = 0, len = allGals.length; i < len; i++) {\n    var el = allGals[i];\n    var tn = (el.tagName || '').toUpperCase();\n    if (tn === 'DIV' || tn === 'TABLE') {\n      // Find all images in this container\n      var allImgs = el.querySelectorAll(\"img\");\n      for (var j = 0, lenj = allImgs.length; j < lenj; j++) {\n        var img = allImgs[j];\n        img.dataset.lbpos = globalId + \"\";\n        globalId++;\n        Gallery.push(img);\n      }\n    } else if (tn == 'IMG') {\n      // Must contain the markup for lighbox otherwise continue\n      if (el.dataset.snptd != 'lightbox' && el.getAttribute('role') != 'snptd_lightbox') {\n        continue;\n      }\n      //support old markup\n      el.dataset.lbpos = globalId + \"\";\n      globalId++;\n      Gallery.push(el);\n    }\n  }\n  return Gallery;\n}\n;\nvar LightboxComponent = /*#__PURE__*/function (_BaseComponent) {\n  _inherits(LightboxComponent, _BaseComponent);\n  var _super = _createSuper(LightboxComponent);\n  function LightboxComponent(parent) {\n    _classCallCheck(this, LightboxComponent);\n    return _super.call(this, parent);\n  }\n  _createClass(LightboxComponent, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      this.$gallery = constructGallery();\n      this.createModal();\n      this.currentIndex = 0; // The index to be shown\n      this.$gallery.forEach(function (img) {\n        return _this.setupImage(img);\n      });\n    }\n  }, {\n    key: \"setupImage\",\n    value: function setupImage(theImg) {\n      var self = this;\n      var $theImg = $(theImg);\n      if ($theImg.attr(\"data-active\") == '1') {\n        return;\n      }\n      $theImg.css(\"cursor\", \"pointer\");\n      $theImg.attr(\"data-toggle\", \"modal\");\n      $theImg.attr(\"data-target\", '#' + MODAL_ID);\n      $theImg.attr(\"data-active\", '1');\n      $theImg.off();\n      // Action on clicking the image\n      $theImg.on(\"click\", function (evt) {\n        self.currentIndex = parseInt(this.dataset.lbpos);\n        self.loadImageDynamically();\n      });\n    }\n  }, {\n    key: \"loadImageDynamically\",\n    value: function loadImageDynamically() {\n      var _this2 = this;\n      //Retrieve container from current index\n      if (!this.$gallery[this.currentIndex]) {\n        console.error(\"Nothing at currentIndex\", this.currentIndex);\n        return;\n      }\n      var $container = $(this.$gallery[this.currentIndex]);\n\n      //change src of image in modal\n      if (this.$img.length) {\n        // Create image dynamically\n        var imgObj = new Image();\n        var src = $container.attr(\"data-src\") || $container.attr(\"src\");\n        imgObj.onload = function () {\n          _this2.resize(imgObj.width, imgObj.height);\n          // Can provide a highres in data-src\n          _this2.$img.attr(\"src\", src);\n        };\n        imgObj.onerror = function (err) {\n          console.error(\"Cannot load image \", err);\n          _this2.$img.attr(\"src\", \"\");\n        };\n        imgObj.src = src;\n      }\n    }\n  }, {\n    key: \"createModal\",\n    value: function createModal() {\n      var self = this;\n      var hasGallery = this.$gallery.length > 1;\n      var leftArrowHTML = '<a class=\"navigate-left-arrow\" href=\"javascript:void(0);\">' + leftArrow + '</a>';\n      var rightArrowHTML = '<a class=\"navigate-right-arrow\" href=\"javascript:void(0);\">' + rightArrow + '</a>';\n      var modalHTML = $('<div class=\"modal fade modal-fullscreen-xl\" id=\"' + MODAL_ID + '\" tabindex=\"-1\" role=\"dialog\">' + '<div class=\"modal-dialog\" role=\"document\">' + '<div class=\"modal-content\">' + '<div class=\"modal-header\"><button type=\"button\" class=\"close text-white\" data-dismiss=\"modal\">&times;</button>' + '</div>' + '<div class=\"modal-body p-0\" style=\"text-align:center;\">' + (hasGallery ? leftArrowHTML : '') + '<img src=\"\">' + (hasGallery ? rightArrowHTML : '') + '</div>' + '</div>' + '</div>' + '</div>');\n      this.$modal = $(modalHTML);\n      this.$img = this.$modal.find('img');\n      this.$close = this.$modal.find('button');\n      $('body').append(this.$modal);\n      this.$modal.on(\"hide.bs.modal\", function () {\n        self.$img.attr(\"src\", \"\");\n      });\n      $(\"#modalCloseBtn\").on(\"click\", function () {\n        self.$img.attr(\"src\", \"\");\n      });\n      if (hasGallery) {\n        this.$modal.find('.navigate-left-arrow').on(\"click\", function (evt) {\n          evt.preventDefault();\n          self.navigateLeft();\n        });\n        this.$modal.find('.navigate-right-arrow').on(\"click\", function (evt) {\n          evt.preventDefault();\n          self.navigateRight();\n        });\n      }\n    }\n  }, {\n    key: \"resize\",\n    value: function resize(imgwidth, imgheight) {\n      // Resize accordingly to the image\n      // Size of browser viewport.\n      var imgratio = 1;\n      if (imgheight > 0) {\n        imgratio = imgwidth / imgheight;\n      }\n      var winwidth = $(window).height();\n      var winheight = $(window).width();\n      var winratio = 1;\n      if (winheight > 0) {\n        winratio = winwidth / winheight;\n      }\n      if (imgratio > winratio) {\n        this.$img.css(\"width\", \"initial\");\n        this.$img.css(\"height\", \"100%\");\n      } else {\n        this.$img.css(\"height\", \"initial\");\n        this.$img.css(\"width\", \"100%\");\n      }\n    }\n  }, {\n    key: \"navigateLeft\",\n    value: function navigateLeft() {\n      if (this.currentIndex == 0) {\n        this.currentIndex = this.$gallery.length - 1;\n      } else {\n        this.currentIndex = this.currentIndex - 1;\n      }\n      this.loadImageDynamically();\n    }\n  }, {\n    key: \"navigateRight\",\n    value: function navigateRight() {\n      if (this.currentIndex == this.$gallery.length - 1) {\n        this.currentIndex = 0;\n      } else {\n        this.currentIndex = this.currentIndex + 1;\n      }\n      this.loadImageDynamically();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.$gallery.forEach(function (theImg) {\n        var $theImg = $(theImg);\n        $theImg.removeAttr(\"data-active\");\n        $theImg.removeAttr(\"data-toggle\");\n        $theImg.removeAttr(\"data-target\");\n        $theImg.css(\"cursor\", 'initial');\n        $theImg.off();\n      });\n      var $modal = $('#' + MODAL_ID);\n      $modal.off();\n      $modal.remove();\n    }\n  }]);\n  return LightboxComponent;\n}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent);\n_defineProperty(LightboxComponent, \"meta\", {\n  name: 'lightbox',\n  author: 'Josep Mulet Pol',\n  version: '2.3',\n  query: 'body',\n  // Define as singleton instance\n  use$: true\n});\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/lightbox/lightboxComponent.ts?");

/***/ }),

/***/ "./ts/loader.ts":
/*!**********************!*\
  !*** ./ts/loader.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./ts/utils.ts\");\n\nfunction genID() {\n  return \"sd_\" + Math.random().toString(32).substring(2);\n}\nfunction findContainers(query) {\n  return document.querySelectorAll(query);\n}\nfunction _bootstrap(classes) {\n  classes.forEach(function (clazz) {\n    var IB = window.IB;\n    var meta = clazz[\"meta\"];\n    if (IB.sd[meta.name] && typeof IB.sd[meta.name]._init === 'function') {\n      console.error(\"Warning: component '\".concat(meta.name, \"' loaded twice.\"));\n      //Simply bind possibly missing components\n      IB.sd[meta.name]._init();\n      return;\n    }\n    var _init = function _init() {\n      IB.sd[meta.name] = IB.sd[meta.name] || {\n        inst: {},\n        _class: clazz,\n        _init: _init,\n        _dispose: null\n      };\n      var query = meta.query || \"div[role=\\\"snptd_\".concat(meta.name, \"\\\"], div[data-snptd=\\\"\").concat(meta.name, \"\\\"]\");\n      //Check if is defined as a singleton\n      if (query === 'body') {\n        if (window.IB.sd[meta.name].singl) {\n          console.error(\"Singleton already defined\");\n          return;\n        }\n        //Singleton instance\n        var parent = document.querySelector(\"body\");\n        var singleton = new clazz(parent);\n        singleton.init();\n        // add to the shared variable\n        window.IB.sd[meta.name].singl = singleton;\n        console.log(\"_init: Initialized singleton '\".concat(meta.name, \"' instance.\"));\n      } else {\n        //Multiple instances with parent's\n        var containers = findContainers(query);\n        var counter = 0;\n        containers.forEach(function (parent) {\n          // Create instance of clazz\n          var id = parent.getAttribute(\"id\");\n          if (!id) {\n            id = genID();\n            parent.setAttribute(\"id\", id);\n          }\n          if (parent.dataset.active === \"1\") {\n            console.warn(\"Warning: Element '\".concat(meta.name, \"' \").concat(id, \" already processed.\"));\n            return;\n          }\n          var instance = new clazz(parent);\n          instance.init();\n          // add to the shared variable\n          window.IB.sd[meta.name].inst[id] = instance;\n          counter++;\n        });\n        console.log(\"_init: Initialized \".concat(counter, \" '\").concat(meta.name, \"' instances.\"));\n      }\n    };\n    _init();\n    var _dispose = function _dispose() {\n      var counter = 0;\n      Object.keys(window.IB.sd[meta.name].inst).forEach(function (key) {\n        var instance = window.IB.sd[meta.name].inst[key];\n        if (instance) {\n          instance.dispose();\n          counter++;\n          delete window.IB.sd[meta.name].inst[key];\n        }\n      });\n      console.log(\"_dispose: Destroyed \".concat(counter, \" '\").concat(meta.name, \"' instances.\"));\n    };\n    IB.sd[meta.name]._dispose = _dispose;\n  });\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  bootstrap: function bootstrap(defs) {\n    window.IB = window.IB || {\n      sd: {}\n    };\n    if (!Array.isArray(defs)) {\n      defs = [defs];\n    }\n    //check if some of the components to be bootstrap need jQuery\n    var use$ = defs.map(function (d) {\n      return d[\"meta\"].use$ || false;\n    }).reduce(function (pv, cv) {\n      return cv && pv;\n    });\n    if (use$) {\n      //wait for requirejs\n      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitForRequire)(function () {\n        //wait for jquery\n        requirejs(['jquery'], function ($) {\n          //wait for document ready\n          $(function () {\n            _bootstrap(defs);\n          });\n        });\n      }, 15);\n    } else {\n      _bootstrap(defs);\n    }\n  }\n});\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/loader.ts?");

/***/ }),

/***/ "./ts/utils.ts":
/*!*********************!*\
  !*** ./ts/utils.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPageInfo\": function() { return /* binding */ getPageInfo; },\n/* harmony export */   \"parseUrlParams\": function() { return /* binding */ parseUrlParams; },\n/* harmony export */   \"pran\": function() { return /* binding */ pran; },\n/* harmony export */   \"querySelectorProp\": function() { return /* binding */ querySelectorProp; },\n/* harmony export */   \"waitForRequire\": function() { return /* binding */ waitForRequire; }\n/* harmony export */ });\nfunction parseUrlParams(url) {\n  var params = {};\n  var parts = url.substring(1).split('&');\n  for (var i = 0; i < parts.length; i++) {\n    var nv = parts[i].split('=');\n    if (!nv[0]) continue;\n    params[nv[0]] = nv[1] || true;\n  }\n  return params;\n}\n;\nfunction querySelectorProp(query, prop, def) {\n  var ele = document.querySelector(query);\n  if (ele != null) {\n    return ele.getAttribute(prop) || def || '';\n  }\n  return def || '';\n}\n\n// Identifies the user and role from page\nfunction getPageInfo() {\n  if (!document.querySelector) {\n    return {\n      userId: 1,\n      userFullname: '',\n      courseId: 1,\n      isTeacher: false,\n      courseName: '',\n      site: ''\n    };\n  }\n  // Get current user information\n  var userId = null;\n  var userFullname = null;\n  var dataUserId = document.querySelector('[data-userid]');\n  if (dataUserId) {\n    userId = dataUserId.getAttribute('data-userid');\n  }\n  var userText = document.getElementsByClassName(\"usertext\");\n  if (userText && userText.length) {\n    userFullname = userText[0].innerText;\n  } else {\n    //Moodle4.1\n    var logininfo = document.querySelector(\"div.logininfo > a\");\n    if (logininfo) {\n      userFullname = logininfo.innerText;\n    }\n  }\n  if (!userId) {\n    //TODO:: check if the current user is guest\n    userId = '1';\n    userFullname = \"Usuari convidat\";\n  }\n  var isTeacher = document.querySelector('.usermenu li a[href*=\"switchrole\"]') != null ? 1 : 0;\n  if (!isTeacher) {\n    //Moodle 4.1\n    isTeacher = document.querySelector('form.editmode-switch-form') != null ? 1 : 0;\n  }\n  if (!isTeacher) {\n    // Boost theme\n    isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;\n  }\n\n  // Get information about the course\n  var courseId = '';\n  var courseName = '';\n  var footer = document.querySelector(\".homelink > a\");\n  if (footer != null) {\n    courseName = footer.innerText;\n    var hrefVal = \"?\" + (footer.getAttribute('href').split(\"?\")[1] || \"\");\n    courseId = parseUrlParams(hrefVal).id;\n  } else {\n    //Moodle 4.1\n    if (window.M && window.M.cfg) {\n      courseId = window.M.cfg.courseId;\n    }\n    var nav = document.querySelector(\"#page-navbar ol > li:first-child > a\");\n    if (nav != null) {\n      courseName = nav.innerText; //short name\n    }\n  }\n\n  var site = (location.href.split(\"?\")[0] || \"\").replace(\"/mod/book/view.php\", \"\");\n  return {\n    userId: parseInt(userId || '1'),\n    userFullname: userFullname || 'test-user',\n    isTeacher: isTeacher > 0,\n    site: site,\n    courseName: courseName || 'test-course',\n    courseId: parseInt(courseId || '1')\n  };\n}\n;\n\n//Seeded random number generator\n// https://gist.github.com/blixt/f17b47c62508be59987b\nfunction pran(seed) {\n  seed = seed % 2147483647;\n  var ranGen = function ranGen() {\n    seed = seed * 16807 % 2147483647;\n    return (seed - 1) / 2147483646;\n  };\n  ranGen();\n  ranGen();\n  ranGen();\n  return ranGen;\n}\nfunction waitForRequire(cb, nattempt) {\n  nattempt = nattempt || 0;\n  if (window.require && typeof window.require === 'function') {\n    cb();\n    return;\n  } else if (nattempt > 15) {\n    console.error(\"ERROR: Cannot find requirejs\");\n    return;\n  }\n  window.setTimeout(function () {\n    waitForRequire(cb, nattempt + 1);\n  }, 500);\n}\n;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/utils.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./ts/lightbox/lightbox.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./ts/lightbox/lightbox.css ***!
  \************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".modal-fullscreen-xl .modal-header {\\n    padding: 0rem 1rem;\\n    border: none;\\n}\\n.modal-fullscreen-xl .close {\\n    font-size: 200%;\\n    border-radius: 50%;\\n    background: black;\\n}\\n.modal-fullscreen-xl .modal-dialog {\\n    width: 95%;\\n    height: 95%;\\n    max-width: none;\\n    margin: auto;\\n}\\n.modal-fullscreen-xl .modal-content {\\n    height: 100%;\\n    border: 0;\\n    border-radius: 0;\\n    background: rgba(0,0,0,0);\\n}\\n.modal-fullscreen-xl .modal-body {\\n    width: 100%;\\n    overflow: auto;\\n    background: rgba(0,0,0,0);\\n}\\n.navigate-left-arrow, .navigate-right-arrow {\\n    font-size: 300%;\\n    color: whitesmoke;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/lightbox/lightbox.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./ts/lightbox/lightbox.css":
/*!**********************************!*\
  !*** ./ts/lightbox/lightbox.css ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./lightbox.css */ \"./node_modules/css-loader/dist/cjs.js!./ts/lightbox/lightbox.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_lightbox_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/lightbox/lightbox.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/lightbox/lightbox.ts");
/******/ 	
/******/ })()
;