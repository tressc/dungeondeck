## Dungeon Deck


Live: https://tressc.github.io/dungeondeck/

Dungeon Deck is a reimplementation of **Card Crawl** by Arnold Rauers, a
solo card game for mobile. In this game, the player must clear all 54 cards in
the deck without ever falling below 1 health point in order to escape a dungeon with all the loot they find along the way.

***

### Technologies

Dungeon Deck is built with **JavaScript** and **jQuery**. The **Howler.js** library is used to handle the audio.

***

### Features

#### Legal Move Highlighting

While Dungeon Deck does have written rules that can be found in the settings
dropdown, the standard in digital games is an in-game tutorial so that new
users can begin playing as fast as possible, and learn by doing instead of by reading. To this end, I added a blue outline to all legal targets of the currently selected card. For aesthetic reasons, I didn't want a rectangular outline around the fire, so when the fire is a legal target it gets brighter instead. The brightness of the fire is perhaps too subtle for players to notice if they haven't read the rules, so I am currently rethinking this approach.

#### Sound

Instead of music, the only sound in the game is that of a crackling fire. Looping an audio fire in vanilla HTML produces a small, but noticeable gap in the audio. To resolve this, I used the **Howler.js** library, which allows for more fine tuned manipulation of audio files. In addition to removing the gap from the loop, I also lowered the volume on the track. There is a button in the settings dropdown for users to toggle the audio on and off.

***

### Upcoming Features

- **High Scores**: Using **Firebase**, the game will be able to record and display high scores.

- **Animations**: The game will include transition animations when resolving an action, both the make the game more visually engaging, and to make the correlation between actions and their resulting game state more clear.
