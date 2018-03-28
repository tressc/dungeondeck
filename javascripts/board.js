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
    let count = this.DungeonRow.count;
    if (count < 2) {
      if (count === 1) {
        this.populateDungeon(3);
      } else if (count === 0) {
        this.populateDungeon(4);
      }
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

  selectTarget(target) {
    if (!this.moveBuffer) {
      if (target.card === null) {
        return;
      } else if (target.card.suit === "player") {
        return;
      } else if (target.location.row === "player") {
          if (target.card.suit === "shields") {
            return;
          }
      }
    }

    if (target.card && target.card.frozen) {
      return;
    }

    if (!this.moveBuffer) {
      this.moveBuffer = target;
      this.highlightTargets();
    } else if (target.card === this.moveBuffer.card) {
      this.moveBuffer = null;
      this.removeHighlights();
    } else if (this.legalMove(target)){
      this.removeHighlights();
      this.resolveAction(target);
    }
  }

  removeHighlights() {
    for (let i = 0; i < 4; i++) {
      if (this.DungeonRow.spaces[i].length > 0) {
        this.DungeonRow.spaces[i][0].validTarget = false;
      }
      if (this.PlayerRow.spaces[i].length > 0) {
        this.PlayerRow.spaces[i][0].validTarget = false;
      }
    }
  }

  resolveAction(target) {
    const bCard = this.moveBuffer.card;
    const bLoc = this.moveBuffer.location;
    const tCard = target.card;
    const tLoc = target.location;

    if (bCard.suit === "monsters") {
      if (tCard.suit === "player") {
        bCard.destroy();
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
        }
      } else if (tCard.suit === "shields") {
        bCard.destroy();
        const leftover = bCard.value - tCard.value;
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
          if (leftover > 0) {
            const player = this.PlayerRow.player();
            player.updateValue(leftover * -1);
            if (player.value < 1) {
              player.destroy();
            }
          }
        }
      }
    } else if (bLoc.row === "dungeon"){
      if (tLoc.row === "fire") {
        bCard.destroy();
        if (bCard.suit !== "coins" && bCard.suit !== "magic") {
          const player = this.PlayerRow.player();
          player.updateSpecial(bCard.value);
        }
      } else if (this.PlayerRow.spaces[tLoc.idx].length === 0) {
        let card = this.DungeonRow.spaces[bLoc.idx].pop();
        this.PlayerRow.spaces[tLoc.idx].push(card);
        if (card.suit === "coins") {
          card.freeze();
          const player = this.PlayerRow.player();
          player.updateSpecial(bCard.value);
        }
      }
    } else if (bLoc.row === "player") {
      if (bCard.suit === "potions") {
        bCard.freeze();
        const player = this.PlayerRow.player();
        player.updateValue(bCard.value);
        if (player.value > 13) {
          player.value = 13;
        }
      } else if (bCard.suit === "swords") {
        bCard.destroy();
        tCard.updateValue(bCard.value * -1);
        if (tCard.value < 1) {
          tCard.destroy();
        }
      } else if (bCard.suit === "magic") {
        bCard.destroy();
        this.reshuffle();
      }
    }
    this.moveBuffer = null;
    this.clearAllDestroyed();
    this.popIfDungeonEmpty();
  }

  reshuffle() {
    let dRow = this.DungeonRow.spaces;
    for (let i = 0; i < 4; i++) {
      if (dRow[i].length === 1) {
        this.Deck.deck.push(dRow[i].pop());
      }
    }
    this.Deck.shuffle();
  }

  highlightTargets() {
    let target = {};
    for (let i = 0; i < 4; i++) {
      target.location = {row: "dungeon", idx: i};
      target.card = this.DungeonRow.spaces[i][0];
      if (this.legalMove(target)) {
        if (this.DungeonRow.spaces[i].length > 0) {
          this.DungeonRow.spaces[i][0].validTarget = true;
        }
      }
      target.location = {row: "player", idx: i};
      target.card = this.PlayerRow.spaces[i][0];
      if (this.legalMove(target)) {
        if (this.PlayerRow.spaces[i].length > 0) {
          this.PlayerRow.spaces[i][0].validTarget = true;
        }
      }
    }
  }

  legalMove(target) {
    const bCard = this.moveBuffer.card;
    const bLoc = this.moveBuffer.location;
    const tCard = target.card;
    const tLoc = target.location;
    const tIdx = target.index;
    if (bLoc.row === "dungeon") {
      if (bCard.suit !== "monsters") {
        if (tLoc.row === "fire") {
          return true;
        } else if (tLoc.row === "player") {
          if (this.PlayerRow.spaces[tLoc.idx].length === 0) {
            return true;
          }
        }
      } else if (bCard.suit === "monsters") {
        if (tCard) {
          if (tCard.suit === "player") {
            return true;
          } if (tLoc.row === "player") {
              if (tCard.suit === "shields") {
                return true;
              }
          }
        }
      }
    } else if (bLoc.row === "player") {
      if (bCard.suit === "swords") {
        if (tCard) {
          if (tCard.suit === "monsters") {
            return true;
          }
        }
      } else if (bCard.suit === "potions" || bCard.suit === "magic") {
        if (tCard) {
          if (tCard.suit === "player") {
            return true;
          }
        }
      }
    }
    return false;
  }

}

export default Board;
