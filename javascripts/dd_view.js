class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;

    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    this.$root.addClass("root");

    const $deck = $("<div>");
    $deck.addClass("deck");
    $deck.append($(`<img src="https://i.imgur.com/HzKl1v6.png"/>`));
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
          let health = card.value + " / 13";
          let score = card.specialValue;
          let img = card.img;
          $card.text("health: " + health);
          $card.append($(`<img src=${card.img}/>`));
          $card.append(`<span>score: ${score}</span>`);
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
        if (card.frozen) {
          $space.addClass("frozen");
        }
        $card.text(value);
        $card.append($(`<img src=${card.img}/>`));
        $space.append($card);
      } else {
        $space.append($cardSlot);
      }
      $row2.append($space);
    }

    const $settings = $("<div>");
    $settings.addClass("settings");
    $settings.append($(`<img src="https://i.imgur.com/uO4RR5s.png"/>`));


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
    $youLose.append($(`<img src="https://i.imgur.com/MadL9Zr.png"/>`));

    const $youWin = $("<div>");
    $youWin.addClass("you-win");
    $youWin.append($(`<img src="https://i.imgur.com/tlfOByO.png"/>`));

    if (this.board.PlayerRow.spaces[0].length === 0) {
      this.$root.append($youLose);
    } else if (this.board.Deck.count === 0 && this.board.DungeonRow.empty()) {
        this.$root.append($youWin);
    } else {
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
