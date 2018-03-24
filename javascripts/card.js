class Card {
  constructor(suit, value, img) {
    this.suit = suit;
    this.value = value;
    this.destroyed = false;
    this.specialValue = 0;
    this.frozen = false;
    this.img = img;
  }

  updateValue(change) {
    this.value += change;
  }

  updateSpecial(change) {
    this.specialValue += change;
  }

  destroy() {
    this.destroyed = true;
  }

  freeze() {
    this.frozen = true;
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
  2, 3, 4, 5, 6, 7, 8, 9, 10, "magic door"
];

Card.imgs = [
  "https://i.imgur.com/VSfIozr.png",
  "https://i.imgur.com/Zd3cxiV.png",
  "https://i.imgur.com/uHmZ39z.png",
  "https://i.imgur.com/VAPa9HY.png",
  "https://i.imgur.com/46QvyiL.png",
  "https://i.imgur.com/0JJTGtd.png",
  "https://i.imgur.com/GWTBJQb.png",
];

export default Card;
