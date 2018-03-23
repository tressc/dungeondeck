import Card from './card.js';

class Deck {

  constructor() {
    this.deck = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        this.deck.push(new Card(Card.suits[i], Card.values[j]));
      }
    }
    for (let i = 2; i < 4; i++) {
      for (let j = 0; j < 9; j++) {
        this.deck.push(new Card(Card.suits[i], Card.values[j]));
      }
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 2; j++) {
        this.deck.push(new Card(Card.suits[4], Card.values[i]));
      }
    }
    this.deck.push(new Card(Card.suits[4], Card.values[8]));
    for (let i = 0; i < 5; i++) {
      this.deck.push(new Card(Card.suits[5], Card.values[9]));
    }
    this.shuffle();
    this.count = this.deck.length;
  }

  shuffle() {
    let currentIndex = this.deck.length;
    let tempVal;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempVal = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = tempVal;
    }
  }

  draw(n) {
    const drawnCards = [];
    while (this.count > 0 && n > 0) {
      drawnCards.push(this.deck.pop());
      n -= 1;
      this.updateCount();
    }
    return drawnCards;
  }

  updateCount() {
    this.count = this.deck.length;
  }

}

export default Deck;
