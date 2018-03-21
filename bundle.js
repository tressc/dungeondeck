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
/******/ 	__webpack_require__.p = "";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dungeon_row_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deck_js__ = __webpack_require__(5);




document.addEventListener("DOMContentLoaded", () => {
  window.Card = __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */];
  window.DungeonRow = __WEBPACK_IMPORTED_MODULE_1__dungeon_row_js__["a" /* default */];
  window.a = new __WEBPACK_IMPORTED_MODULE_1__dungeon_row_js__["a" /* default */];
  window.a.spaces[3].push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](2, 5));
  window.a.updateCount();
  window.b = new __WEBPACK_IMPORTED_MODULE_2__deck_js__["a" /* default */];
});


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.destroyed = false;
  }

  changeValue(change) {
    this.value = this.value + change;
  }

  destroy() {
    this.destroyed = true;
  }

}

Card.suits = [
  "shields",
  "swords",
  "coins",
  "potions",
  "monsters",
  "magic"
];

Card.values = [
  2, 3, 4, 5, 6, 7, 8, 9, 10
];

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DungeonRow {
  constructor() {
    this.spaces = [
      [],
      [],
      [],
      []
    ];

    this.count = 0;
  }

  updateCount() {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      count += this.spaces[i].length;
    }
    this.count = count;
  }

  clearDestroyed() {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length) {
        if (this.spaces[i][0].destroyed) {
          this.spaces[i].pop();
        }
      }
    }
  }



}

/* harmony default export */ __webpack_exports__["a"] = (DungeonRow);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(3);


class Deck {

  constructor() {
    this.deck = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[i], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[j]));
      }
    }
    for (let i = 2; i < 4; i++) {
      for (let j = 0; j < 9; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[i], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[j]));
      }
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 2; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[4], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[i]));
      }
    }
    this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[4], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[8]));
    for (let i = 0; i < 5; i++) {
      this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[5], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[8]));
    }

    this.shuffle();
  }

  shuffle() {
    let currentIndex = this.deck.length;
    let tempVal;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempVal = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = tempVal;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Deck);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map