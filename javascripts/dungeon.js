import Card from "./cards/card.js";
import DungeonRow from './rows/dungeon_row.js';

document.addEventListener("DOMContentLoaded", () => {
  window.Card = Card;
  window.DungeonRow = DungeonRow;

  window.a = new DungeonRow;
  window.a.spaces[3].push(new Card(2, 5));
  window.a.updateCount();
});
