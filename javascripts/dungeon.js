import Card from "./card.js";
import DungeonRow from './dungeon_row.js';
import Deck from './deck.js';

document.addEventListener("DOMContentLoaded", () => {
  window.Card = Card;
  window.DungeonRow = DungeonRow;
  window.a = new DungeonRow;
  window.a.spaces[3].push(new Card(2, 5));
  window.a.updateCount();
  window.b = new Deck;
});
