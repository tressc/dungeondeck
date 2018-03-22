class View {
  constructor(board, $root) {
    this.board = board;
    this.$root = $root;

    this.setupBoard();
  }

  setupBoard() {
    const $div = $("<div>");
    $div.addClass("deck");
    $div.text(this.board.Deck.count);
    this.$root.append($div);
  }
}

export default View;
