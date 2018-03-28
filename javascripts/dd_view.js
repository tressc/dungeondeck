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
    // $deck.text(this.board.Deck.count);

    const $fire = $("<li>");
    $fire.addClass("fire");
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
        $card.append($(`<span>${value}</span>`));
        $card.append($(`<img src=${card.img}/>`));
        $space.append($card);
      } else {
        $space.append($cardSlot);
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

    const $rules = $("<div>");
    $rules.addClass("rules");
    $rules.addClass("hidden");
    $rules.append($("<p>these are the rules...</p>"));

    $rulesButton.on("click", (event => {
      if (this.rules) {
        $rules.addClass("hidden");
        this.rules = false;
      } else {
        $rules.addClass("unhidden");
        $rules.removeClass("hidden");
        this.rules = true;
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
    // $youLose.append($settings);
    $youLose.append($(`<img src="https://i.imgur.com/MadL9Zr.png"/>`));

    const $youWin = $("<div>");
    $youWin.addClass("you-win");
    // $youWin.append($settings);
    $youWin.append($(`<img src="https://i.imgur.com/tlfOByO.png"/>`));

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
    this.$root.on("click", ".deck", (event => {
      this.board.Deck.draw(3);
      this.$root.empty();
      this.setupBoard();
    }));
  }

  // bindEvents() {
  //
  //   this.$root.on("click", ".drow li", (event => {
  //     const pos = $(event.currentTarget).data("pos");
  //     console.log($(event.currentTarget).data("loc"));
  //     const card = this.board.DungeonRow.spaces[pos][0];
  //     this.board.burnCard(card);
  //     this.board.popIfDungeonEmpty();
  //     const $lis = $('.drow ul')[0].childNodes;
  //     for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
  //       let text = "";
  //       if (this.board.DungeonRow.spaces[rowIdx].length > 0) {
  //         text = this.board.DungeonRow.spaces[rowIdx][0].suit;
  //       }
  //       $($lis[rowIdx]).text(text);
  //     }
  //     $('.deck').text(this.board.Deck.count);
  //     let value = this.board.PlayerRow.spaces[0][0].specialValue;
  //     $($('.prow')[0].childNodes[0].childNodes[0]).text(value);
  //   }));
  // }
}

export default View;
