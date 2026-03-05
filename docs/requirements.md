# Requirements

This app is a Mahjong practice app. The main feature is that it will give player 13 tiles each round, and the player needs to correctly pick the ones that can win the game.

## Mahjong rule:
It should use the Sichuan Mahjong rule. In the Sichuan rule, you can only have up to two of the three suites in your hand to win.

## Language:
The application should be in Simplified Chinese.

Below are the specifications of each screen:

## Main Screen
The main screen should have a button to start a new game. Each game should be 10 rounds.

## Game Screen
On the top, it should display 13 tiles. The tiles should be sorted in order: Simples (万), then Dots (筒), then Banmboo (条). Within each set the tiles should be sorted in numerical order. The tiles should be displayed in one row. The 13 tiles must only be one tile away from winning.

On the bottom, it should display all 27 possible tiles, and a submit button. Each suite (9 tiles) should be on its own row.

The tiles should be displayed as images just like Mahjong tiles in real life.

## Player Interaction
On each round, the player clicks on the tiles that can win the game (which will be highlighted), and the submit. The player gets the points if they correctly pick the ones that can win the game. Picking the ones that don't win the game or not picking the ones that do means not getting the point.

Before showing the next round, the game should show the previous hand (13 tiles), with all winning tiles, and the final hand (14 tiles) sorted for each winning tile.

The game will go on for 10 rounds and show a final score at the end.
