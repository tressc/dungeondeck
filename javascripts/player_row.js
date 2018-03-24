import Card from './card.js';

class PlayerRow {
  constructor() {
    const newPlayer = new Card("player", 13, Card.imgs[6]);
    this.spaces = [
      [newPlayer],
      [],
      [],
      []
    ];
  }

  player() {
    return this.spaces[0][0];
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

  destroyTemps() {
    for (let i = 0; i < 4; i++) {
      if (this.spaces[i].length) {
        if (this.spaces[i][0].frozen) {
          this.spaces[i][0].destroyed = true;
        }
      }
    }
  }
}

export default PlayerRow;
