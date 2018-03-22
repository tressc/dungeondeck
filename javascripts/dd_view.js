class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;

    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    const $div = $("<div>");
    $div.addClass("deck");
    $div.text(this.board.Deck.count);
    this.$root.append($div);
  }

  bindEvents() {
    this.$root.on("click", "div", (event => {
      this.board.Deck.draw(3);
      $(event.currentTarget).text(this.board.Deck.count);
    }));
  }
}

export default View;
