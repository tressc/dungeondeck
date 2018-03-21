class Card {
  constructor(type, value) {
    this.type = type;
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

export default Card;
