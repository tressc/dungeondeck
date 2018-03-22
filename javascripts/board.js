import Deck from './deck.js';
import DungeonRow from './dungeon_row.js';
import PlayerRow from './player_row.js';
import Fire from './fire.js';

class Board {

  constructor() {
    this.Deck = new Deck;
    this.DungeonRow = new DungeonRow;
    this.populateDungeon(4);
    this.PlayerRow = new PlayerRow;
    this.Fire = new Fire;
    this.moveBuffer = null;
  }

  populateDungeon(n) {
    const newCards = this.Deck.draw(n);
    this.DungeonRow.fillEmpties(newCards);
  }

  popIfDungeonEmpty() {
    if (this.DungeonRow.count === 1) {
      this.populateDungeon(3);
      this.PlayerRow.destroyTemps();
      this.clearAllDestroyed();
    }
  }

  burnCard(card = this.moveBuffer) {
    const meltValue = this.Fire.melt(card);
    this.PlayerRow.player().updateSpecial(meltValue);
    this.clearAllDestroyed();
  }

  clearAllDestroyed() {
    this.DungeonRow.clearDestroyed();
    this.PlayerRow.clearDestroyed();
  }

  // this should really be select location (which may contain a card)
  selectCard(card) {
    if (!this.moveBuffer) {
      this.moveBuffer = card;
    } else if (this.legalMove(this.moveBuffer, card)){
      this.resolveAction(this.moveBuffer, card);
    }
  }

  resolveAction(card, target) {
    if (target.suit === "player") {
      if (card.suit === "monsters") {
        target.updateValue(card.value * -1);
      } else if (card.suit === "potions") {
        target.updateValue(card.value);
      }
    } else if (target.suit === "monsters") {
      target.updateValue(card.value * -1);
    }
  }

  // this is going to require the card's location!
  legalMove(card, target) {
  }

}

export default Board;
