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
  legalMove(target) {
    const bCard = this.moveBuffer.card;
    const bLoc = this.moveBuffer.location;
    const tCard = target.card;
    const tLoc = target.location;

    if (bLoc.row === "dungeon") {
      if (bCard.suit !== "monsters") {
        if (tLoc.row === "fire") {
          return true;
        } else if (tLoc.row === "player") {
          if (this.PlayerRow[tLoc.idx].length === 0) {
            return true;
          }
        }
      } else if (bCard.suit === "monsters") {
        if (tCard.suit === "player") {
          return true;
        } if (tLoc.row === "player") {
          if (tCard.suit === "shields") {
            return true;
          }
        }
      }
    } else if (bLoc.row === "player") {
      if (bCard.suit === "swords") {
        if (tCard.suit === "monsters") {
          return true;
        }
      } else if (bCard.suit === "potions" || bCard.suit === "coins") {
        if (tCard.suit === "player") {
          return true;
        }
      }
    }
    return false;
  }

}

export default Board;
