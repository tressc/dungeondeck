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
}

export default PlayerRow;
