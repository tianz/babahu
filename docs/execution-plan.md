# Execution Plan

## Phase 1 — Types & Core Logic

**`src/types/mahjong.ts`**
- Define `Suit` (万 | 筒 | 条), `Tile`, `GameState` types

**`src/utils/mahjong.ts`**
- `generateDeck()` — full 108-tile Sichuan deck (4×27)
- `dealHand()` — draw 13 random tiles
- `sortHand(tiles)` — sort by suit then number
- `getWinningTiles(hand)` — core algorithm: check all 27 tile types, test if adding that tile completes a valid hand
- `isWinningHand(14 tiles)` — recursive meld extractor

## Phase 2 — Components

**`src/components/Tile.tsx`**
- Render a single tile (万/筒/条 + number), highlighted state, clickable

**`src/components/Hand.tsx`**
- Display the 13 dealt tiles sorted, read-only

**`src/components/TilePicker.tsx`**
- Grid of all 27 tiles, toggle-selectable

## Phase 3 — Screens

**`src/pages/MainScreen.tsx`**
- "开始游戏" button → starts a 10-round game

**`src/pages/GameScreen.tsx`**
- Top: `<Hand>` with 13 dealt tiles
- Bottom: `<TilePicker>` + "提交" button
- On submit: compare selection to `getWinningTiles()`, award/deduct point, advance round

**`src/pages/ResultScreen.tsx`**
- Show final score (X / 10), "再来一局" button

## Phase 4 — App Shell

**`src/App.tsx`**
- State-based navigation: `main` → `game` → `result`
- Pass game state between screens via props/context

## Key Logic Note — Sichuan Winning Hand
A valid hand is one of:
- **4 melds + 1 pair** — a meld is either a sequence (e.g. 1-2-3万) or a triplet (e.g. 3-3-3筒)
- **7 pairs** — seven distinct pairs

No honor tiles.
