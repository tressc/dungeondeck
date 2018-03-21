class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.destroyed = false;
  }

  changeValue(change) {
    this.value = this.value + change;
  }

  destroy() {
    this.destroyed = true;
  }

}

Card.suits = [
  "shields",
  "swords",
  "coins",
  "potions",
  "monsters",
  "magic"
];

Card.values = [
  2, 3, 4, 5, 6, 7, 8, 9, 10
];

export default Card;
