import Card from './card.js';

class PlayerRow {
  constructor() {
    const newPlayer = new Card("player", 13);
    this.spaces = [
      [],
      [newPlayer],
      [],
      []
    ];
  }

  player() {
    return this.spaces[1][0];
  }

  clearDestroyed() {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length) {
        if (this.spaces[i][0].destroyed) {
          this.spaces[i].pop();
        }
      }
    }
  }
}

export default PlayerRow;
