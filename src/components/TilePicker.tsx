import { ALL_TILES } from '../utils/mahjong'
import type { Suit, Tile } from '../types/mahjong'
import TileComponent from './Tile'
import styles from './TilePicker.module.css'

interface Props {
  selected: Tile[]
  onToggle: (tile: Tile) => void
  disabled?: boolean
}

function tileKey(t: Tile) { return `${t.suit}${t.number}` }

const SUITS: Suit[] = ['万', '筒', '条']

export default function TilePicker({ selected, onToggle, disabled }: Props) {
  const selectedKeys = new Set(selected.map(tileKey))

  return (
    <div className={styles.picker}>
      {SUITS.map(suit => (
        <div key={suit} className={styles.row}>
          {ALL_TILES.filter(t => t.suit === suit).map(tile => (
            <TileComponent
              key={tileKey(tile)}
              tile={tile}
              selected={selectedKeys.has(tileKey(tile))}
              onClick={disabled ? undefined : () => onToggle(tile)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
