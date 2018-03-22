class Fire {

  constructor() {
  }

  melt(card) {
    card.destroy();
    if (["potions", "shields", "swords"].includes(card.suit)) {
      return card.value;
    } else {
      return 0;
    }
  }
}

export default Fire;
