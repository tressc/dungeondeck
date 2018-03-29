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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
  constructor(suit, value, img) {
    this.suit = suit;
    this.value = value;
    this.destroyed = false;
    this.specialValue = 0;
    this.frozen = false;
    this.img = img;
    this.validTarget = false;
  }

  updateValue(change) {
    this.value += change;
  }

  updateSpecial(change) {
    this.specialValue += change;
  }

  destroy() {
    this.destroyed = true;
  }

  freeze() {
    this.frozen = true;
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
  2, 3, 4, 5, 6, 7, 8, 9, 10, "magic door"
];

// gladius: https://i.imgur.com/izEcuUG.png


Card.imgs = [
  "https://i.imgur.com/Rh8gBbL.png",
  "https://i.imgur.com/1ZbWLXW.png",
  "https://i.imgur.com/X2gtjkv.png",
  "https://i.imgur.com/TEn6e6B.png",
  "https://i.imgur.com/ceKsUWJ.png",
  "https://i.imgur.com/0JJTGtd.png",
  "https://i.imgur.com/L89XhPg.png",
];

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dd_view_js__ = __webpack_require__(7);



document.addEventListener("DOMContentLoaded", () => {
  const root = $('.dd');
  window.a = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */];
  new __WEBPACK_IMPORTED_MODULE_1__dd_view_js__["a" /* default */](window.a, root);
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deck_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dungeon_row_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_row_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fire_js__ = __webpack_require__(6);





class Board {

  constructor() {
    this.Deck = new __WEBPACK_IMPORTED_MODULE_0__deck_js__["a" /* default */];
    this.DungeonRow = new __WEBPACK_IMPORTED_MODULE_1__dungeon_row_js__["a" /* default */];
    this.populateDungeon(4);
    this.PlayerRow = new __WEBPACK_IMPORTED_MODULE_2__player_row_js__["a" /* default */];
    this.Fire = new __WEBPACK_IMPORTED_MODULE_3__fire_js__["a" /* default */];
    this.moveBuffer = null;
    this.validSpaces = [];
  }

  populateDungeon(n) {
    const newCards = this.Deck.draw(n);
    this.DungeonRow.fillEmpties(newCards);
  }

  popIfDungeonEmpty() {
    let count = this.DungeonRow.count;
    if (count < 2) {
      if (count === 1) {
        this.populateDungeon(3);
      } else if (count === 0) {
        this.populateDungeon(4);
      }
      this.PlayerRow.destroyTemps();
      this.clearAllDestroyed();
    }
  }

  burnCard(card = this.moveBuffer) {
    const meltValue = this.Fire.melt(card);
    this.PlayerRow.player().updateSpecial(meltValue);
    this.clearAllDestroyed();
  }

  clearAllDestroyed() {
    this.DungeonRow.clearDestroyed();
    this.PlayerRow.clearDestroyed();
  }

  selectTarget(target) {
    if (!this.moveBuffer) {
      if (target.card === null) {
        return;
      } else if (target.card.suit === "player") {
        return;
      } else if (target.location.row === "player") {
          if (target.card.suit === "shields") {
            return;
          }
      }
    }

    if (target.card && target.card.frozen) {
      return;
    }

    if (!this.moveBuffer) {
      this.moveBuffer = target;
      this.highlightTargets();
    } else if (target.card === this.moveBuffer.card) {
      this.moveBuffer = null;
      this.removeHighlights();
    } else if (this.legalMove(target)){
      this.removeHighlights();
      this.resolveAction(target);
    }
  }

  removeHighlights() {
    for (let i = 0; i < 4; i++) {
      if (this.DungeonRow.spaces[i].length > 0) {
        this.DungeonRow.spaces[i][0].validTarget = false;
      }
      if (this.PlayerRow.spaces[i].length > 0) {
        this.PlayerRow.spaces[i][0].validTarget = false;
      }
    }
    this.validSpaces = [];
  }

  resolveAction(target) {
    const bCard = this.moveBuffer.card;
    const bLoc = this.moveBuffer.location;
    const tCard = target.card;
    const tLoc = target.location;

    if (bCard.suit === "monsters") {
      if (tCard.suit === "player") {
        bCard.destroy();
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
        }
      } else if (tCard.suit === "shields") {
        bCard.destroy();
        const leftover = bCard.value - tCard.value;
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
          if (leftover > 0) {
            const player = this.PlayerRow.player();
            player.updateValue(leftover * -1);
            if (player.value < 1) {
              player.destroy();
            }
          }
        }
      }
    } else if (bLoc.row === "dungeon"){
      if (tLoc.row === "fire") {
        bCard.destroy();
        if (bCard.suit !== "coins" && bCard.suit !== "magic") {
          const player = this.PlayerRow.player();
          player.updateSpecial(bCard.value);
        }
      } else if (this.PlayerRow.spaces[tLoc.idx].length === 0) {
        let card = this.DungeonRow.spaces[bLoc.idx].pop();
        this.PlayerRow.spaces[tLoc.idx].push(card);
        if (card.suit === "coins") {
          card.freeze();
          const player = this.PlayerRow.player();
          player.updateSpecial(bCard.value);
        }
      }
    } else if (bLoc.row === "player") {
      if (bCard.suit === "potions") {
        bCard.freeze();
        const player = this.PlayerRow.player();
        player.updateValue(bCard.value);
        if (player.value > 13) {
          player.value = 13;
        }
      } else if (bCard.suit === "swords") {
        bCard.destroy();
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
        }
      } else if (bCard.suit === "magic") {
        bCard.destroy();
        this.reshuffle();
      }
    }
    this.moveBuffer = null;
    this.clearAllDestroyed();
    this.popIfDungeonEmpty();
  }

  reshuffle() {
    let dRow = this.DungeonRow.spaces;
    for (let i = 0; i < 4; i++) {
      if (dRow[i].length === 1) {
        this.Deck.deck.push(dRow[i].pop());
      }
    }
    this.Deck.shuffle();
  }

  highlightTargets() {
    let target = {};
    for (let i = 0; i < 4; i++) {
      target.location = {row: "dungeon", idx: i};
      target.card = this.DungeonRow.spaces[i][0];
      if (this.legalMove(target)) {
        if (this.DungeonRow.spaces[i].length > 0) {
          this.DungeonRow.spaces[i][0].validTarget = true;
        }
      }
      target.location = {row: "player", idx: i};
      target.card = this.PlayerRow.spaces[i][0];
      if (this.legalMove(target)) {
        if (this.PlayerRow.spaces[i].length > 0) {
          this.PlayerRow.spaces[i][0].validTarget = true;
        }  else {
          this.validSpaces.push(i);
        }
      }
    }
    target.location = {row: "fire", idx: 0};
    target.card = null;
    if (this.legalMove(target)) {
      this.validSpaces.push("fire");
    }
  }

  legalMove(target) {
    const bCard = this.moveBuffer.card;
    const bLoc = this.moveBuffer.location;
    const tCard = target.card;
    const tLoc = target.location;
    const tIdx = target.index;
    if (bLoc.row === "dungeon") {
      if (bCard.suit !== "monsters") {
        if (tLoc.row === "fire") {
          return true;
        } else if (tLoc.row === "player") {
          if (this.PlayerRow.spaces[tLoc.idx].length === 0) {
            return true;
          }
        }
      } else if (bCard.suit === "monsters") {
        if (tCard) {
          if (tCard.suit === "player") {
            return true;
          } if (tLoc.row === "player") {
              if (tCard.suit === "shields") {
                return true;
              }
          }
        }
      }
    } else if (bLoc.row === "player") {
      if (bCard.suit === "swords") {
        if (tCard) {
          if (tCard.suit === "monsters") {
            return true;
          }
        }
      } else if (bCard.suit === "potions" || bCard.suit === "magic") {
        if (tCard) {
          if (tCard.suit === "player") {
            return true;
          }
        }
      }
    }
    return false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(0);


class Deck {

  constructor() {
    this.deck = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[i], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[j], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[i]));
      }
    }
    for (let i = 2; i < 4; i++) {
      for (let j = 0; j < 9; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[i], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[j], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[i]));
      }
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 2; j++) {
        this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[4], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[i], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[4]));
      }
    }
    this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[4], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[8], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[4]));
    for (let i = 0; i < 5; i++) {
      this.deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].suits[5], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].values[9], __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[5]));
    }
    this.shuffle();
    this.count = this.deck.length;
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

  draw(n) {
    const drawnCards = [];
    while (this.count > 0 && n > 0) {
      drawnCards.push(this.deck.pop());
      n -= 1;
      this.updateCount();
    }
    return drawnCards;
  }

  updateCount() {
    this.count = this.deck.length;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Deck);


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
    this.updateCount();
  }

  fillEmpties(arr) {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length === 0 && arr.length > 0) {
        this.spaces[i].push(arr.pop());
      }
    }
    this.updateCount();
  }

  destroyCard(n) {
    this.spaces[n][0].destroy();
    this.clearDestroyed();
  }

  empty() {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length === 1) {
        return false;
      }
    }
    return true;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DungeonRow);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(0);


class PlayerRow {
  constructor() {
    const newPlayer = new __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */]("player", 13, __WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */].imgs[6]);
    this.spaces = [
      [newPlayer],
      [],
      [],
      []
    ];
  }

  player() {
    return this.spaces[0][0];
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

  destroyTemps() {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length) {
        if (this.spaces[i][0].frozen) {
          this.spaces[i][0].destroyed = true;
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayerRow);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fire {

  constructor() {
  }

  melt(card) {
    card.destroy();
    if (["potions", "shields", "swords"].includes(card.suit)) {
      return card.value;
    } else {
      return 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Fire);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;
    this.settings = false;
    this.sound = true;
    this.rules = false;

    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    this.$root.addClass("root");

    const $deck = $("<div>");
    $deck.addClass("deck");
    $deck.append($(`<img src="https://i.imgur.com/7nUOKbI.png"/>`));
    $deck.append($(`<div><span>${this.board.Deck.count}</span></div>`));

    const $fire = $("<li>");
    $fire.addClass("fire");
    if (this.board.validSpaces.includes("fire")) {
      $fire.addClass("bright");
    }
    $fire.data("pos", null);
    $fire.data("loc", "fire");
    $fire.append($(`<img src="https://i.imgur.com/phDnO3R.gif"/>`));

    const $row1 = $("<ul>");
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      let $card = $("<div>");
      $card.addClass("card");
      let $cardSlot = $("<div>");
      $cardSlot.addClass("card-slot");
      let $space = $("<li>");
      $space.data("pos", rowIdx);
      $space.data("loc", "dungeon");
      if (this.board.DungeonRow.spaces[rowIdx].length > 0) {
        let card = this.board.DungeonRow.spaces[rowIdx][0];
        let value = card.value;
        let suit = card.suit;
        let img = card.img;
        if (this.board.moveBuffer && card === this.board.moveBuffer.card) {
          $space.addClass("selected");
        }
        if (value === "magic door") {
          $card.addClass("magic");
        }
        if (card.validTarget) {
          $card.addClass("valid-target");
        }
        $card.text(value);
        $card.append($(`<img src=${card.img}/>`));
        $space.append($card);
      } else {
        $space.append($cardSlot);
      }
      $row1.append($space);
    }

    const $row2 = $("<ul>");
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      let $card = $("<div>");
      $card.addClass("card");
      let $cardSlot = $("<div>");
      $cardSlot.addClass("card-slot");
      let $space = $("<li>");
      $space.data("pos", rowIdx);
      $space.data("loc", "player");
      if (rowIdx === 0) {
        if (this.board.PlayerRow.spaces[rowIdx].length > 0) {
          $card.addClass("player");
          let card = this.board.PlayerRow.spaces[rowIdx][0];
          let health = card.value + "/13";
          let score = card.specialValue;
          let img = card.img;
          if (card.validTarget) {
            $card.addClass("valid-target");
          }
          $card.text(health);
          $card.append($(`<img src=${card.img}/>`));
          $card.append(score);
          $space.append($card);
        }
      } else if (this.board.PlayerRow.spaces[rowIdx].length > 0) {
        let card = this.board.PlayerRow.spaces[rowIdx][0];
        let value = card.value;
        let suit = card.suit;
        let img = card.img;
        if (this.board.moveBuffer && card === this.board.moveBuffer.card) {
          $space.addClass("selected");
        }
        if (value === "magic door") {
          $card.addClass("magic");
        }
        if (card.frozen) {
          $space.addClass("frozen");
        }
        if (card.validTarget) {
          $card.addClass("valid-target");
        }
        $card.append($(`<span>${value}</span>`));
        $card.append($(`<img src=${card.img}/>`));
        $space.append($card);
      } else {
        $space.append($cardSlot);
        if (this.board.validSpaces.includes(rowIdx)) {
          $cardSlot.addClass("valid-target");
        }
      }
      $row2.append($space);
    }

    const $settings = $("<div>");
    $settings.addClass("settings");

    const $gear = $("<div>");
    $gear.addClass("gear");
    $gear.append($(`<img src="https://i.imgur.com/K8KgyU1.png"/>`));
    $settings.append($gear);

    const $settingsList = $("<ul>");
    $settingsList.addClass("hidden");

    const $soundButton = $("<div>");
    $soundButton.append($(`<img src="https://i.imgur.com/sXruLuV.png"/>`));

    const $rulesButton = $("<div>");
    $rulesButton.append($(`<img src="https://i.imgur.com/LOyH4LH.png"/>`));

    const $rules = $("<div>");
    $rules.addClass("rules");
    $rules.addClass("hidden");
    $rules.append($(`<p>Greetings adventurer... In order to escape this dungeon you must clear all the cards from the deck and dungeon (top) row.</p>`));
    $rules.append($("<p>The deck displays the number of its remaining cards, and the dungeon row refills whenever it contains <span><span><span>three</span></span></span> open spaces.</p>"));
    $rules.append($('<p>Begin by selecting a card. Selected cards are highlighted in <span>green</span>. You can unselect a card by clicking on it again. All valid targets for that card will be highlighted in <span><span>blue</span></span>. Click on a <span><span>target</span></span> to apply the <span>selected card\'s</span> value to it.</p>'));
    $rules.append($("<p>Non-monster cards cannot be used before first moving them down into your inventory. If your hands are full you can throw these items in the everpresent dungeon flames instead. The value of their melted down remains will be added to your loot. But beware! Melted down <span><span><span><span>coins</span></span></span></span> and <span><span><span><span><span>magical items</span></span></span></span></span> are worthless on the black market!</p>"));
    $rules.append($("<p>Also note that <span><span><span><span>coins</span></span></span></span> and <span><span><span><span><span><span>potions</span></span></span></span></span></span> will continue to take up a slot of your inventory until the dungeon row refills.</p>"));
    $rules.append($("<p>Escape the dungeon alive with as much loot as you can hold!</p>"));
    $gear.on("click", (event => {
      if (this.settings) {
        $gear.addClass("turntUp");
        $settingsList.addClass("hidden");
        this.settings = false;
      } else {
        $gear.addClass("turnt");
        $gear.removeClass("turntUp");
        $settingsList.addClass("unhidden");
        $settingsList.removeClass("hidden");
        this.settings = true;
      }
    }));

    $soundButton.on("click", (event => {
      if (this.sound === true) {
        sound.pause();
        this.sound = false;
        $soundButton.empty();
        $soundButton.append($(`<img src="https://i.imgur.com/s1UKgJ0.png"/>`));
      } else {
        sound.play();
        this.sound = true;
        $soundButton.empty();
        $soundButton.append($(`<img src="https://i.imgur.com/sXruLuV.png"/>`));
      }
    }));

    $rulesButton.on("click", (event => {
      event.stopPropagation();
      if (this.rules) {
        this.rules = false;
        $rules.removeClass("unhidden");
        $rules.addClass("hidden");
      } else {
        this.rules = true;
        $rules.addClass("unhidden");
        $rules.removeClass("hidden");
      }
    }));


    for (let i = 0; i < 2; i++) {
      const $settingsItem = $("<li>");
      $settingsItem.addClass("settings-item");
      if (i === 0) {
        $settingsItem.append($soundButton);
        $settingsList.append($settingsItem);
      } else {
        $settingsItem.append($rulesButton);
        $settingsList.append($settingsItem);
      }
      $settings.append($settingsList);
    }

    const $top = $("<div>");
    $top.addClass("top");
    $top.append($deck);
    $top.append($fire);

    const $drow = $("<div>");
    $drow.addClass("drow");
    $drow.append($row1);

    const $prow = $("<div>");
    $prow.addClass("prow");
    $prow.append($row2);

    const $youLose = $("<div>");
    $youLose.addClass("you-lose");
    $youLose.append($(`<img src="https://i.imgur.com/YeVnPoy.png"/>`));

    const $youWin = $("<div>");
    $youWin.addClass("you-win");
    $youWin.append($(`<img src="https://i.imgur.com/KzG4w6r.png"/>`));
    if (this.board.PlayerRow.spaces[0].length > 0) {
      $youWin.append($(`<h1>Loot: <span>${this.board.PlayerRow.spaces[0][0].specialValue}</span></h1>`));
    }

    if (this.board.PlayerRow.spaces[0].length === 0) {
      this.$root.append($youLose);
    } else if (this.board.Deck.count === 0 && this.board.DungeonRow.empty()) {
        this.$root.append($youWin);
    } else {
      this.$root.append($rules);
      this.$root.append($settings);
      this.$root.append($top);
      this.$root.append($drow);
      this.$root.append($prow);
    }
  }

  bindEvents() {
    this.$root.on("click", "li", (event => {
      let location;
      let card = null;
      let idx = $(event.currentTarget).data("pos");
      if ($(event.currentTarget).data("loc") === "dungeon") {
        location = "dungeon";
        if (this.board.DungeonRow.spaces[idx].length > 0) {
          card = this.board.DungeonRow.spaces[idx][0];
        }
      } else if ($(event.currentTarget).data("loc") === "player") {
        location = "player";
        if (this.board.PlayerRow.spaces[idx].length > 0) {
          card = this.board.PlayerRow.spaces[idx][0];
        }
      } else if ($(event.currentTarget).data("loc") === "fire") {
        location = "fire";
      }
      this.board.selectTarget(
        {location: {row: location, idx: idx}, card: card}
      );
      this.$root.empty();
      this.setupBoard();
    }));
    // this.$root.on("click", ".deck", (event => {
    //   this.board.Deck.draw(50);
    //   this.$root.empty();
    //   this.setupBoard();
    // }));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map