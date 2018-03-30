import Board from './board.js';
import View from './dd_view.js';

document.addEventListener("DOMContentLoaded", () => {
  const root = $('.dd');
  new View(new Board, root);
});
