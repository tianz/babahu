import type { Tile } from '../types/mahjong'
import TileComponent from './Tile'
import styles from './Hand.module.css'

interface Props {
  tiles: Tile[]
}

export default function Hand({ tiles }: Props) {
  return (
    <div className={styles.hand}>
      {tiles.map((tile, i) => (
        <TileComponent key={i} tile={tile} />
      ))}
    </div>
  )
}
