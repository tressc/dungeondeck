import Board from './board.js';

class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;
    this.settings = false;
    this.sound = true;
    this.rules = false;
    this.hasClicked = false;

    this.setupBoard();
    this.bindEvents();
  }

  setupBoard(restarted = false) {

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
    $gear.append($(`<img src="https://i.imgur.com/InSIwNk.png"/>`));
    $settings.append($gear);

    const $settingsList = $("<ul>");
    $settingsList.addClass("hidden");

    const $soundButton = $("<div>");
    $soundButton.append($(`<img src="https://i.imgur.com/sXruLuV.png"/>`));

    const $rulesButton = $("<div>");
    $rulesButton.append($(`<img src="https://i.imgur.com/LOyH4LH.png"/>`));

    const $restartButton = $("<div>");
    $restartButton.append($(`<img src="https://i.imgur.com/mhz61yk.png"/>`));

    const $okayButton = $("<p>");
    $okayButton.addClass("okay");
    $okayButton.text("Got it!");

    const $rules = $("<div>");
    $rules.addClass("rules");
    $rules.addClass("hidden");
    $rules.append($(`<p>Greetings adventurer... In order to escape this dungeon you must clear all the cards from the deck and dungeon (top) row.</p>`));
    $rules.append($("<p>The deck displays the number of its remaining cards, and the dungeon row refills whenever it contains <span><span><span>three</span></span></span> open spaces.</p>"));
    $rules.append($('<p>Begin by selecting a card. Selected cards are highlighted in <span>green</span>. You can unselect a card by clicking on it again. All valid targets for that card will be highlighted in <span><span>blue</span></span>. Click on a <span><span>target</span></span> to apply the <span>selected card\'s</span> value to it.</p>'));
    // $rules.append($("<p>Non-monster cards cannot be used before first moving them down into your inventory. If your hands are full you can throw these items in the everpresent dungeon flames instead. The value of their melted down remains will be added to your loot. But beware! Melted down <span><span><span><span>coins</span></span></span></span> and <span><span><span><span><span>magical items</span></span></span></span></span> are worthless on the black market!</p>"));
    // $rules.append($("<p>Also note that <span><span><span><span>coins</span></span></span></span> and <span><span><span><span><span><span>potions</span></span></span></span></span></span> will continue to take up a slot of your inventory until the dungeon row refills.</p>"));
    $rules.append($("<p>Escape the dungeon alive with as much loot as you can hold!</p>"));
    $rules.append($okayButton);

    if (this.board.Deck.count === 50 &&
        this.board.DungeonRow.count === 4 &&
        this.board.moveBuffer === null && this.hasClicked === false &&
        restarted === false) {
            this.rules = true;
            $rules.removeClass("hidden");
        }

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

    $restartButton.on("click", (event => {
      event.stopPropagation();
      $gear.addClass("turntUp");
      $settingsList.addClass("hidden");
      this.settings = false;
      $(".dd").empty();
      this.board = new Board;
      this.setupBoard(true);
      this.bindEvents();
    }));

    $okayButton.on("click", event => {
      event.stopPropagation();
      this.rules = false;
      $rules.removeClass("unhidden");
      $rules.addClass("hidden");
    });


    for (let i = 0; i < 3; i++) {
      const $settingsItem = $("<li>");
      $settingsItem.addClass("settings-item");
      if (i === 0) {
        $settingsItem.append($soundButton);
        $settingsList.append($settingsItem);
      } else if (i === 1) {
        $settingsItem.append($rulesButton);
        $settingsList.append($settingsItem);
      } else if (i === 2) {
        $settingsItem.append($restartButton);
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
      this.$root.append($settings);
      this.$root.append($youLose);
    } else if (this.board.Deck.count === 0 && this.board.DungeonRow.empty()) {
      this.$root.append($settings);
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
      this.hasClicked = true;
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

export default View;
