import type { Suit, Tile } from '../types/mahjong'

const SUITS: Suit[] = ['万', '筒', '条']

// All 27 unique tile types
export const ALL_TILES: Tile[] = SUITS.flatMap(suit =>
  Array.from({ length: 9 }, (_, i) => ({ suit, number: i + 1 }))
)

// Full 108-tile deck (4 copies of each)
export function generateDeck(): Tile[] {
  return ALL_TILES.flatMap(tile => [tile, tile, tile, tile])
}

export function dealHand(): Tile[] {
  const allSuits: Suit[] = ['万', '筒', '条']
  // Keep retrying until we get a tenpai hand
  while (true) {
    // Randomly pick 1 or 2 suits (Sichuan rule)
    const shuffled = [...allSuits].sort(() => Math.random() - 0.5)
    const numSuits = Math.random() < 0.3 ? 1 : 2
    const chosen = new Set(shuffled.slice(0, numSuits))

    // Build deck from only chosen suits
    const deck: Tile[] = ALL_TILES
      .filter(t => chosen.has(t.suit))
      .flatMap(tile => [tile, tile, tile, tile])

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }

    const hand = sortHand(deck.slice(0, 13))
    if (getWinningTiles(hand).length > 0) return hand
  }
}

export function sortHand(tiles: Tile[]): Tile[] {
  const suitOrder: Record<Suit, number> = { '万': 0, '筒': 1, '条': 2 }
  return [...tiles].sort((a, b) =>
    suitOrder[a.suit] !== suitOrder[b.suit]
      ? suitOrder[a.suit] - suitOrder[b.suit]
      : a.number - b.number
  )
}

export function tileKey(tile: Tile): string {
  return `${tile.suit}${tile.number}`
}

// Unicode mahjong tile codepoints:
//   万 (Characters): U+1F007–U+1F00F
//   条 (Bamboo):     U+1F010–U+1F018
//   筒 (Circles):    U+1F019–U+1F021
const UNICODE_BASE: Record<Suit, number> = {
  '万': 0x1F007,
  '条': 0x1F010,
  '筒': 0x1F019,
}

export function tileUnicode(tile: Tile): string {
  return String.fromCodePoint(UNICODE_BASE[tile.suit] + tile.number - 1)
}

function tilesToCounts(tiles: Tile[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const t of tiles) {
    const k = tileKey(t)
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  return counts
}

// Check if 14 tiles form a valid winning hand (4 melds + 1 pair, or 7 pairs)
// Sichuan rule: hand must use at most 2 suits
export function isWinningHand(tiles: Tile[]): boolean {
  const suits = new Set(tiles.map(t => t.suit))
  if (suits.size > 2) return false
  const counts = tilesToCounts(tiles)
  return isSevenPairs(counts) || canFormMelds(counts, 0)
}

function isSevenPairs(counts: Map<string, number>): boolean {
  const values = [...counts.values()]
  // Need exactly 7 pairs (each count must be even, total 14 tiles, 7 distinct pairs)
  return values.every(v => v % 2 === 0) && values.length === 7
}

// Recursively extract melds; pairUsed tracks whether the pair has been assigned
function canFormMelds(counts: Map<string, number>, pairsUsed: number): boolean {
  // Find first tile with count > 0
  const entry = [...counts.entries()].find(([, v]) => v > 0)
  if (!entry) return pairsUsed === 1

  const [key] = entry
  const [suit, numStr] = [key[0] as Suit, parseInt(key.slice(1))]

  // Try as pair
  if (pairsUsed === 0 && (counts.get(key) ?? 0) >= 2) {
    counts.set(key, (counts.get(key) ?? 0) - 2)
    if (canFormMelds(counts, 1)) { counts.set(key, (counts.get(key) ?? 0) + 2); return true }
    counts.set(key, (counts.get(key) ?? 0) + 2)
  }

  // Try as triplet
  if ((counts.get(key) ?? 0) >= 3) {
    counts.set(key, (counts.get(key) ?? 0) - 3)
    if (canFormMelds(counts, pairsUsed)) { counts.set(key, (counts.get(key) ?? 0) + 3); return true }
    counts.set(key, (counts.get(key) ?? 0) + 3)
  }

  // Try as start of sequence
  const k2 = `${suit}${numStr + 1}`
  const k3 = `${suit}${numStr + 2}`
  if (numStr <= 7 && (counts.get(k2) ?? 0) > 0 && (counts.get(k3) ?? 0) > 0) {
    counts.set(key, (counts.get(key) ?? 0) - 1)
    counts.set(k2, (counts.get(k2) ?? 0) - 1)
    counts.set(k3, (counts.get(k3) ?? 0) - 1)
    if (canFormMelds(counts, pairsUsed)) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
      counts.set(k2, (counts.get(k2) ?? 0) + 1)
      counts.set(k3, (counts.get(k3) ?? 0) + 1)
      return true
    }
    counts.set(key, (counts.get(key) ?? 0) + 1)
    counts.set(k2, (counts.get(k2) ?? 0) + 1)
    counts.set(k3, (counts.get(k3) ?? 0) + 1)
  }

  return false
}

// Return all tiles that complete the hand when added as the 14th tile
export function getWinningTiles(hand: Tile[]): Tile[] {
  return ALL_TILES.filter(candidate => isWinningHand([...hand, candidate]))
}
