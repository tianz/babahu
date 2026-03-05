import { useState } from 'react'
import type { Tile } from '../types/mahjong'
import { getWinningTiles, tileKey, sortHand } from '../utils/mahjong'
import Hand from '../components/Hand'
import TilePicker from '../components/TilePicker'
import TileComponent from '../components/Tile'
import styles from './GameScreen.module.css'

interface Props {
  round: number
  score: number
  hand: Tile[]
  onRoundComplete: (point: number) => void
}

export default function GameScreen({ round, score, hand, onRoundComplete }: Props) {
  const [selected, setSelected] = useState<Tile[]>([])
  const [reviewing, setReviewing] = useState(false)
  const [earnedPoint, setEarnedPoint] = useState(0)

  const winningTiles = getWinningTiles(hand)
  const winningKeys = new Set(winningTiles.map(tileKey))

  function handleToggle(tile: Tile) {
    const key = tileKey(tile)
    setSelected(prev =>
      prev.some(t => tileKey(t) === key)
        ? prev.filter(t => tileKey(t) !== key)
        : [...prev, tile]
    )
  }

  function handleSubmit() {
    const selectedKeys = new Set(selected.map(tileKey))
    const isCorrect =
      selectedKeys.size === winningKeys.size &&
      [...selectedKeys].every(k => winningKeys.has(k))
    setEarnedPoint(isCorrect ? 1 : 0)
    setReviewing(true)
  }

  if (reviewing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span>第 {round} / 10 轮</span>
          <span>
            得分：{score}
            <span className={earnedPoint ? styles.correct : styles.wrong}>
              {earnedPoint ? '  ✓ +1' : '  ✗ +0'}
            </span>
          </span>
        </div>

        <section>
          <h2 className={styles.sectionLabel}>你的手牌</h2>
          <Hand tiles={hand} />
        </section>

        <section>
          <h2 className={styles.sectionLabel}>
            胡牌张（共 {winningTiles.length} 张）
          </h2>
          <div className={styles.winningList}>
            {winningTiles.map(wt => (
              <div key={tileKey(wt)} className={styles.winningEntry}>
                <div className={styles.winningLabel}>
                  <TileComponent tile={wt} />
                  <span>{wt.number}{wt.suit}</span>
                </div>
                <Hand tiles={sortHand([...hand, wt])} />
              </div>
            ))}
          </div>
        </section>

        <button className={styles.button} onClick={() => onRoundComplete(earnedPoint)}>
          {round < 10 ? '下一轮' : '查看结果'}
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>第 {round} / 10 轮</span>
        <span>得分：{score}</span>
      </div>

      <section>
        <h2 className={styles.sectionLabel}>你的手牌</h2>
        <Hand tiles={hand} />
      </section>

      <section>
        <h2 className={styles.sectionLabel}>选择能胡牌的张（可多选）</h2>
        <TilePicker selected={selected} onToggle={handleToggle} />
      </section>

      <button className={styles.button} onClick={handleSubmit}>提交</button>
    </div>
  )
}
