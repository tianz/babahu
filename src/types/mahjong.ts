export type Suit = '万' | '筒' | '条'

export interface Tile {
  suit: Suit
  number: number // 1–9
}

export interface GameState {
  screen: 'main' | 'game' | 'result'
  round: number       // 1–10
  score: number
  hand: Tile[]
  selected: Tile[]    // tiles player selected as winning
}
