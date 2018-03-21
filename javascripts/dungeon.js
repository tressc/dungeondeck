import Board from './board.js';

document.addEventListener("DOMContentLoaded", () => {
  window.a = new Board;
  window.a.DungeonRow.destroyCard(2);
});
