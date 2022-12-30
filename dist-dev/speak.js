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

/***/ "./ts/loader.ts":
/*!**********************!*\
  !*** ./ts/loader.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./ts/utils.ts\");\n\nfunction genID() {\n  return \"sd_\" + Math.random().toString(32).substring(2);\n}\nfunction findContainers(query) {\n  return document.querySelectorAll(query);\n}\nfunction _bootstrap(classes) {\n  classes.forEach(function (clazz) {\n    var IB = window.IB;\n    var meta = clazz[\"meta\"];\n    if (IB.sd[meta.name] && typeof IB.sd[meta.name]._init === 'function') {\n      console.error(\"Warning: component '\".concat(meta.name, \"' loaded twice.\"));\n      //Simply bind possibly missing components\n      IB.sd[meta.name]._init();\n      return;\n    }\n    var _init = function _init() {\n      IB.sd[meta.name] = IB.sd[meta.name] || {\n        inst: {},\n        _class: clazz,\n        _init: _init,\n        _dispose: null\n      };\n      var query = meta.query || \"div[role=\\\"snptd_\".concat(meta.name, \"\\\"], div[data-snptd=\\\"\").concat(meta.name, \"\\\"]\");\n      //Check if is defined as a singleton\n      if (query === 'body') {\n        if (window.IB.sd[meta.name].singl) {\n          console.error(\"Singleton already defined\");\n          return;\n        }\n        //Singleton instance\n        var parent = document.querySelector(\"body\");\n        var singleton = new clazz(parent);\n        singleton.init();\n        // add to the shared variable\n        window.IB.sd[meta.name].singl = singleton;\n        console.log(\"_init: Initialized singleton '\".concat(meta.name, \"' instance.\"));\n      } else {\n        //Multiple instances with parent's\n        var containers = findContainers(query);\n        var counter = 0;\n        containers.forEach(function (parent) {\n          // Create instance of clazz\n          var id = parent.getAttribute(\"id\");\n          if (!id) {\n            id = genID();\n            parent.setAttribute(\"id\", id);\n          }\n          if (parent.dataset.active === \"1\") {\n            console.warn(\"Warning: Element '\".concat(meta.name, \"' \").concat(id, \" already processed.\"));\n            return;\n          }\n          var instance = new clazz(parent);\n          instance.init();\n          // add to the shared variable\n          window.IB.sd[meta.name].inst[id] = instance;\n          counter++;\n        });\n        console.log(\"_init: Initialized \".concat(counter, \" '\").concat(meta.name, \"' instances.\"));\n      }\n    };\n    _init();\n    var _dispose = function _dispose() {\n      var counter = 0;\n      Object.keys(window.IB.sd[meta.name].inst).forEach(function (key) {\n        var instance = window.IB.sd[meta.name].inst[key];\n        if (instance) {\n          instance.dispose();\n          counter++;\n          delete window.IB.sd[meta.name].inst[key];\n        }\n      });\n      console.log(\"_dispose: Destroyed \".concat(counter, \" '\").concat(meta.name, \"' instances.\"));\n    };\n    IB.sd[meta.name]._dispose = _dispose;\n  });\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  bootstrap: function bootstrap(defs) {\n    window.IB = window.IB || {\n      sd: {}\n    };\n    if (!Array.isArray(defs)) {\n      defs = [defs];\n    }\n    //check if some of the components to be bootstrap need jQuery\n    var use$ = defs.map(function (d) {\n      return d[\"meta\"].use$ || false;\n    }).reduce(function (pv, cv) {\n      return cv && pv;\n    });\n    if (use$) {\n      //wait for requirejs\n      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitForRequire)(function () {\n        //wait for jquery\n        requirejs(['jquery'], function ($) {\n          //wait for document ready\n          $(function () {\n            _bootstrap(defs);\n          });\n        });\n      }, 15);\n    } else {\n      _bootstrap(defs);\n    }\n  }\n});\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/loader.ts?");

/***/ }),

/***/ "./ts/speak/gttsPlayer.ts":
/*!********************************!*\
  !*** ./ts/speak/gttsPlayer.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GTTSPlayer; }\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar MAX_GTTS_LEN = 1000;\nvar GTTS_URL = \"https://piworld.es/api/gtts/speak?t=\";\nvar GTTSPlayer = /*#__PURE__*/function () {\n  function GTTSPlayer(elem) {\n    _classCallCheck(this, GTTSPlayer);\n    var self = this;\n    this._elem = elem;\n    var idioma = elem.getAttribute(\"href\").split(\"_\")[1];\n    var sText = elem.innerText.trim();\n    if (sText.length > MAX_GTTS_LEN) {\n      console.log(\"GTTS: Max length supported is \" + MAX_GTTS_LEN + \" characters.\");\n      elem.removeAttribute(\"href\");\n      return;\n    }\n    //decide what to do with the title\n    if (elem.title == \"-\") {\n      //remove it\n      elem.removeAttribute(\"title\");\n    } else if (!elem.title) {\n      elem.title = \"gTTS Speak!\";\n    }\n    this.url = GTTS_URL + encodeURIComponent(sText) + \"&l=\" + idioma;\n    this.audio = null;\n    this.handler = function (evt) {\n      evt.preventDefault(); // Evita que executi el link    \n      self.play();\n    };\n    elem.addEventListener(\"click\", this.handler);\n    if (!this.handler) {\n      this._elem.removeEventListener(\"click\", this.handler);\n    }\n  }\n  _createClass(GTTSPlayer, [{\n    key: \"play\",\n    value: function play() {\n      if (!this.audio) {\n        this.audio = new Audio(this.url);\n      } else {\n        this.audio.pause();\n        this.audio.currentTime = 0;\n      }\n      this.audio.src = this.url;\n      this.audio.play();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (this.audio) {\n        this.audio.pause();\n      }\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.audio.pause();\n      this.audio.currentTime = 0;\n      this.audio.src = null;\n      this.audio = null;\n      if (!this.handler) {\n        this._elem.removeEventListener(\"click\", this.handler);\n      }\n    }\n  }]);\n  return GTTSPlayer;\n}();\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/gttsPlayer.ts?");

/***/ }),

/***/ "./ts/speak/navigatorPlayer.ts":
/*!*************************************!*\
  !*** ./ts/speak/navigatorPlayer.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavigatorPlayer; }\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar findVoice = function findVoice(lang, voices) {\n  lang = (lang || \"\").toLowerCase();\n  var k = 0;\n  var voice = null;\n  var len = (voices || []).length;\n  while (k < len && voice == null) {\n    if (voices[k].lang.toLowerCase() == lang) {\n      voice = voices[k];\n    }\n    k++;\n  }\n  return voice;\n};\nvar NavigatorPlayer = /*#__PURE__*/function () {\n  function NavigatorPlayer(elem, voices) {\n    _classCallCheck(this, NavigatorPlayer);\n    var self = this;\n    this._elem = elem;\n    var idioma = elem.getAttribute(\"href\").split(\"_\")[1];\n    //decide what to do with the title\n    if (elem.title == \"-\") {\n      //remove it\n      elem.removeAttribute(\"title\");\n    } else if (!elem.title) {\n      elem.title = \"Speak!\";\n    }\n    var voice = findVoice(idioma, voices);\n    this.handler = null;\n    if (voice) {\n      var _idioma = this._elem.getAttribute(\"href\").split(\"_\")[1];\n      this.utterance = new SpeechSynthesisUtterance(elem.innerText);\n      this.utterance.voice = voice;\n      elem.classList.add(\"sd-speak-enabled\");\n      this.handler = function (evt) {\n        evt.preventDefault(); // Evita que executi el link    \n        self.play();\n      };\n      elem.addEventListener(\"click\", this.handler);\n    } else {\n      //Get rid of the a link since browser does not support this feature\n      elem.removeAttribute(\"href\");\n    }\n  }\n  _createClass(NavigatorPlayer, [{\n    key: \"play\",\n    value: function play() {\n      // call abort pending...\n      window.speechSynthesis.cancel();\n      window.speechSynthesis.speak(this.utterance);\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      window.speechSynthesis.cancel();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this._elem.removeEventListener(\"click\", this.handler);\n      this._elem.classList.remove(\"sd-speak-enabled\");\n      this._elem.removeAttribute('data-active');\n      this._elem.removeAttribute('title');\n    }\n  }]);\n  return NavigatorPlayer;\n}();\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/navigatorPlayer.ts?");

/***/ }),

/***/ "./ts/speak/speak.ts":
/*!***************************!*\
  !*** ./ts/speak/speak.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ \"./ts/loader.ts\");\n/* harmony import */ var _speak_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speak.css */ \"./ts/speak/speak.css\");\n/* harmony import */ var _speakComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./speakComponent */ \"./ts/speak/speakComponent.ts\");\n\n\n\n_loader__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bootstrap(_speakComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/speak.ts?");

/***/ }),

/***/ "./ts/speak/speakComponent.ts":
/*!************************************!*\
  !*** ./ts/speak/speakComponent.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SpeakComponent; }\n/* harmony export */ });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ \"./ts/base.ts\");\n/* harmony import */ var _gttsPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gttsPlayer */ \"./ts/speak/gttsPlayer.ts\");\n/* harmony import */ var _navigatorPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigatorPlayer */ \"./ts/speak/navigatorPlayer.ts\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\nvar allVoices = null;\nfunction getNavigatorVoices() {\n  return new Promise(function (resolve, reject) {\n    if (allVoices != null) {\n      resolve(allVoices);\n      return;\n    }\n    // wait until the voices have been loaded asyncronously\n    window.speechSynthesis.addEventListener(\"voiceschanged\", function () {\n      allVoices = window.speechSynthesis.getVoices();\n      resolve(allVoices);\n    });\n  });\n}\nvar SpeakComponent = /*#__PURE__*/function (_BaseComponent) {\n  _inherits(SpeakComponent, _BaseComponent);\n  var _super = _createSuper(SpeakComponent);\n  function SpeakComponent(parent) {\n    _classCallCheck(this, SpeakComponent);\n    return _super.call(this, parent);\n  }\n  _createClass(SpeakComponent, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      var ds = this.parent.dataset;\n      if (ds.active === \"1\") {\n        return;\n      }\n      ds.active = \"1\";\n      var synth = window.speechSynthesis;\n      var supported = synth != null && window.SpeechSynthesisUtterance != null;\n      this.audioPlayer = null;\n      if (supported) {\n        getNavigatorVoices().then(function (voices) {\n          _this.audioPlayer = new _navigatorPlayer__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_this.parent, voices);\n        }, function () {\n          //On error, rely on GTTS\n          _this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.parent);\n        });\n        //Stop voices on page change\n        window.addEventListener('unload', function (evt) {\n          window.speechSynthesis.cancel();\n        });\n      } else {\n        // If no navigator support, rely on GTTS\n        this.audioPlayer = new _gttsPlayer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.parent);\n      }\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      if (this.parent.dataset.active !== \"1\") {\n        return;\n      }\n      this.parent.removeAttribute(\"data-active\");\n      this.audioPlayer && this.audioPlayer.dispose();\n      this.audioPlayer = null;\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this.audioPlayer && this.audioPlayer.play();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.audioPlayer && this.audioPlayer.pause();\n    }\n  }]);\n  return SpeakComponent;\n}(_base__WEBPACK_IMPORTED_MODULE_0__.BaseComponent);\n_defineProperty(SpeakComponent, \"meta\", {\n  name: 'speak',\n  author: 'Josep Mulet Pol',\n  version: '2.4',\n  query: 'a[href^=\"#speak_\"]',\n  use$: true //May require $ajax\n});\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/speakComponent.ts?");

/***/ }),

/***/ "./ts/utils.ts":
/*!*********************!*\
  !*** ./ts/utils.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertInt\": function() { return /* binding */ convertInt; },\n/* harmony export */   \"getPageInfo\": function() { return /* binding */ getPageInfo; },\n/* harmony export */   \"parseUrlParams\": function() { return /* binding */ parseUrlParams; },\n/* harmony export */   \"pran\": function() { return /* binding */ pran; },\n/* harmony export */   \"querySelectorProp\": function() { return /* binding */ querySelectorProp; },\n/* harmony export */   \"waitForRequire\": function() { return /* binding */ waitForRequire; }\n/* harmony export */ });\nfunction parseUrlParams(url) {\n  var params = {};\n  var parts = url.substring(1).split('&');\n  for (var i = 0; i < parts.length; i++) {\n    var nv = parts[i].split('=');\n    if (!nv[0]) continue;\n    params[nv[0]] = nv[1] || true;\n  }\n  return params;\n}\n;\nfunction querySelectorProp(query, prop, def) {\n  var ele = document.querySelector(query);\n  if (ele != null) {\n    return ele.getAttribute(prop) || def || '';\n  }\n  return def || '';\n}\n\n// Identifies the user and role from page\nfunction getPageInfo() {\n  if (!document.querySelector) {\n    return {\n      userId: 1,\n      userFullname: '',\n      courseId: 1,\n      isTeacher: false,\n      courseName: '',\n      site: ''\n    };\n  }\n  // Get current user information\n  var userId = null;\n  var userFullname = null;\n  var dataUserId = document.querySelector('[data-userid]');\n  if (dataUserId) {\n    userId = dataUserId.getAttribute('data-userid');\n  }\n  var userText = document.getElementsByClassName(\"usertext\");\n  if (userText && userText.length) {\n    userFullname = userText[0].innerText;\n  } else {\n    //Moodle4.1\n    var logininfo = document.querySelector(\"div.logininfo > a\");\n    if (logininfo) {\n      userFullname = logininfo.innerText;\n    }\n  }\n  if (!userId) {\n    //TODO:: check if the current user is guest\n    userId = '1';\n    userFullname = \"Usuari convidat\";\n  }\n  var isTeacher = document.querySelector('.usermenu li a[href*=\"switchrole\"]') != null ? 1 : 0;\n  if (!isTeacher) {\n    //Moodle 4.1\n    isTeacher = document.querySelector('form.editmode-switch-form') != null ? 1 : 0;\n  }\n  if (!isTeacher) {\n    // Boost theme\n    isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;\n  }\n\n  // Get information about the course\n  var courseId = '';\n  var courseName = '';\n  var footer = document.querySelector(\".homelink > a\");\n  if (footer != null) {\n    courseName = footer.innerText;\n    var hrefVal = \"?\" + (footer.getAttribute('href').split(\"?\")[1] || \"\");\n    courseId = parseUrlParams(hrefVal).id;\n  } else {\n    //Moodle 4.1\n    if (window.M && window.M.cfg) {\n      courseId = window.M.cfg.courseId;\n    }\n    var nav = document.querySelector(\"#page-navbar ol > li:first-child > a\");\n    if (nav != null) {\n      courseName = nav.innerText; //short name\n    }\n  }\n\n  var site = (location.href.split(\"?\")[0] || \"\").replace(\"/mod/book/view.php\", \"\");\n  return {\n    userId: convertInt(userId, 1),\n    userFullname: userFullname || 'test-user',\n    isTeacher: isTeacher > 0,\n    site: site,\n    courseName: courseName || 'test-course',\n    courseId: convertInt(courseId, 1)\n  };\n}\n;\n\n//Seeded random number generator\n// https://gist.github.com/blixt/f17b47c62508be59987b\nfunction pran(seed) {\n  seed = seed % 2147483647;\n  var ranGen = function ranGen() {\n    seed = seed * 16807 % 2147483647;\n    return (seed - 1) / 2147483646;\n  };\n  ranGen();\n  ranGen();\n  ranGen();\n  return ranGen;\n}\nfunction waitForRequire(cb, nattempt) {\n  nattempt = nattempt || 0;\n  if (window.require && typeof window.require === 'function') {\n    cb();\n    return;\n  } else if (nattempt > 15) {\n    console.error(\"ERROR: Cannot find requirejs\");\n    return;\n  }\n  window.setTimeout(function () {\n    waitForRequire(cb, nattempt + 1);\n  }, 500);\n}\n;\nfunction convertInt(str, def) {\n  if (!str || !str.trim()) {\n    return def;\n  }\n  try {\n    var val = parseInt(str);\n    if (!isNaN(val)) {\n      return val;\n    }\n  } catch (ex) {}\n  return def;\n}\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/utils.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./ts/speak/speak.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./ts/speak/speak.css ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".sd-speak-enabled {\\n    position: relative;\\n    background: whitesmoke;\\n    text-decoration: none;  \\n  } \\n  @keyframes speakicon_anim {\\n    0% {\\n      opacity: 0;\\n      left: -10px;\\n    }\\n    100% {\\n      opacity: 1;\\n      left: -5px;\\n    }\\n  } \\n  .sd-speak-enabled:hover:after {\\n    content: \\\"\\\\f025\\\";\\n    position: absolute;\\n    left: -5px;\\n    top: -16px;\\n    background: white;\\n    z-index:1000;\\n    font-family: 'FontAwesome'; \\n    font-size: 70%;\\n    margin: 0px 5px;\\n    font-weight: 700; \\n    vertical-align:top; \\n    animation: speakicon_anim 1s ease;\\n  }\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/speak.css?./node_modules/css-loader/dist/cjs.js");

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

/***/ "./ts/speak/speak.css":
/*!****************************!*\
  !*** ./ts/speak/speak.css ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./speak.css */ \"./node_modules/css-loader/dist/cjs.js!./ts/speak/speak.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_speak_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://iedib-atto-snippets-dynamic/./ts/speak/speak.css?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/speak/speak.ts");
/******/ 	
/******/ })()
;