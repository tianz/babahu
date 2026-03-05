import type { Tile } from '../types/mahjong'
import styles from './Tile.module.css'

interface Props {
  tile: Tile
  selected?: boolean
  onClick?: () => void
  dim?: boolean
}

export default function TileComponent({ tile, selected, onClick, dim }: Props) {
  return (
    <button
      className={[
        styles.tile,
        selected ? styles.selected : '',
        dim ? styles.dim : '',
        onClick ? styles.clickable : '',
      ].join(' ')}
      onClick={onClick}
      disabled={!onClick}
    >
      <span className={styles.number}>{tile.number}</span>
      <span className={styles.suit}>{tile.suit}</span>
    </button>
  )
}
