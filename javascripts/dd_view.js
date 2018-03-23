class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;

    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    const $deck = $("<div>");
    $deck.addClass("deck");
    $deck.text(this.board.Deck.count);

    const $fire = $("<li>");
    $fire.addClass("fire");
    $fire.text("fire");
    $fire.data("pos", null);
    $fire.data("loc", "fire");

    const $row1 = $("<ul>");
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      let $space = $("<li>");
      $space.data("pos", rowIdx);
      $space.data("loc", "dungeon");
      if (this.board.DungeonRow.spaces[rowIdx].length > 0) {
        let value = this.board.DungeonRow.spaces[rowIdx][0].value;
        let suit = this.board.DungeonRow.spaces[rowIdx][0].suit;
        $space.text(value + " of " + suit);
      } else {
        $space.text("");
      }
      $row1.append($space);
    }

    const $row2 = $("<ul>");
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      let $space = $("<li>");
      $space.data("pos", rowIdx);
      $space.data("loc", "player");
      if (rowIdx === 0) {
        let health = this.board.PlayerRow.spaces[rowIdx][0].value + " / 13";
        let score = this.board.PlayerRow.spaces[rowIdx][0].specialValue;
        $space.text("health: " + health + "  score: " + score);
      } else if (this.board.PlayerRow.spaces[rowIdx].length > 0) {
        let value = this.board.PlayerRow.spaces[rowIdx][0].value;
        let suit = this.board.PlayerRow.spaces[rowIdx][0].suit;
        $space.text(value + " of " + suit);
      } else {
        $space.text("");
      }
      $row2.append($space);
    }


    const $drow = $("<div>");
    $drow.addClass("drow");
    $drow.append($row1);

    const $prow = $("<div>");
    $prow.addClass("prow");
    $prow.append($row2);


    this.$root.append($deck);
    this.$root.append($fire);
    this.$root.append($drow);
    this.$root.append($prow);
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
      console.log(this.board.moveBuffer);
      this.$root.empty();
      this.setupBoard();
    }));
  }

  // bindEvents() {
  //   this.$root.on("click", ".deck", (event => {
  //     console.log(this.board.Deck.draw(3));
  //     $(event.currentTarget).text(this.board.Deck.count);
  //   }));
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
