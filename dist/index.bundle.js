/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_tesra_js__ = __webpack_require__(2);




/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__items_js__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Tesra = function () {
  function Tesra(opts) {
    _classCallCheck(this, Tesra);

    this.ts = opts.dataSrc;
    this.tsContainer = opts.tsContainer;
    this.previous = [];
    this.limit = opts.limit;
    this.autoplay = opts.autoplay;
    this.interval = opts.interval;
  }

  _createClass(Tesra, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.autoplay) {
        setInterval(function () {
          _this.start();
        }, this.interval);
      } else {
        this.start();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.ts = this.shuffle(this.ts);
      this.removePrevious();
    }
  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var currentIndex = array.length;
      var temporaryValue = void 0;
      var randomIndex = void 0;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }, {
    key: "indexFinder",
    value: function indexFinder(value) {
      var previous = this.previous;
      for (var key = 0; key < previous.length; key++) {
        if (previous[key] === value) {
          return key;
        }
      }
    }
  }, {
    key: "removePrevious",
    value: function removePrevious() {
      var _this2 = this;

      this.placeholder = [];
      this.ts.map(function (i) {
        // remove previous items from main item array
        if (_this2.indexFinder(i) === undefined) {
          _this2.placeholder.push(i);
        }
      });
      this.setPrevious();
    }
  }, {
    key: "setPrevious",
    value: function setPrevious() {
      // reset previous items and push current items
      // this.previous = [];
      // for (let i = 0, l = this.limit; i < l; i++) {
      //   this.previous.push(this.placeholder[i]); 
      // }
      // this.showItems();

      // Each randomized item will display once every cycle
      for (var i = 0, l = this.limit; i < l; i++) {
        if (this.previous.length !== this.ts.length - this.limit) {
          this.previous.push(this.placeholder[i]);
        } else {
          this.previous = [];
          this.previous.push(this.placeholder[i]);
        }
      }
      this.showItems();
    }
  }, {
    key: "showItems",
    value: function showItems() {
      document.getElementById(this.tsContainer).innerHTML = "";
      for (var i = 0, l = this.limit; i < l; i++) {
        var tsItems = document.createElement("div");
        tsItems.className = "col-sm-6";
        tsItems.innerHTML = "\n      " + this.placeholder[i].ct + "\n      " + this.placeholder[i].name + "<br>\n      " + this.placeholder[i].info + "\n      " + this.placeholder[i].avatar;

        document.getElementById(this.tsContainer).appendChild(tsItems);
      }
    }
  }]);

  return Tesra;
}();

var TR = new Tesra({
  dataSrc: __WEBPACK_IMPORTED_MODULE_0__items_js__["a" /* items */],
  tsContainer: "tesra_placeholder",
  limit: 2,
  autoplay: true,
  interval: 1000
});

TR.init();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return items; });
var items = [{
  name: "name1",
  avatar: "avatar1",
  ct: "comment1",
  info: "info1"
}, {
  name: "name2",
  avatar: "avatar2",
  ct: "comment2",
  info: "info2"
}, {
  name: "name3",
  avatar: "avatar3",
  ct: "comment3",
  info: "info3"
}, {
  name: "name4",
  avatar: "avatar4",
  ct: "comment4",
  info: "info4"
}, {
  name: "name5",
  avatar: "avatar5",
  ct: "comment5",
  info: "info5"
}, {
  name: "name6",
  avatar: "avatar6",
  ct: "comment6",
  info: "info6"
}];



/***/ })
/******/ ]);