import Board from './board.js';
import View from './dd_view.js';

document.addEventListener("DOMContentLoaded", () => {
  const root = $('.dd');
  window.a = new Board;
  new View(window.a, root);
});
