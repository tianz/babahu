import { useState } from 'react'
import type { Tile } from '../types/mahjong'
import { getWinningTiles, tileKey } from '../utils/mahjong'
import Hand from '../components/Hand'
import TilePicker from '../components/TilePicker'
import styles from './GameScreen.module.css'

interface Props {
  round: number
  score: number
  hand: Tile[]
  onRoundComplete: (pointDelta: number) => void
}

export default function GameScreen({ round, score, hand, onRoundComplete }: Props) {
  const [selected, setSelected] = useState<Tile[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

  const winningTiles = getWinningTiles(hand)
  const winningKeys = new Set(winningTiles.map(tileKey))

  function handleToggle(tile: Tile) {
    if (submitted) return
    const key = tileKey(tile)
    setSelected(prev =>
      prev.some(t => tileKey(t) === key)
        ? prev.filter(t => tileKey(t) !== key)
        : [...prev, tile]
    )
  }

  function handleSubmit() {
    if (submitted) return
    const selectedKeys = new Set(selected.map(tileKey))

    // Point = +1 for each correct, -1 for each wrong (missed or extra)
    let delta = 0
    winningKeys.forEach(k => { delta += selectedKeys.has(k) ? 1 : -1 })
    selectedKeys.forEach(k => { if (!winningKeys.has(k)) delta -= 1 })

    setSubmitted(true)

    if (winningTiles.length === 0) {
      setFeedback('这手牌无法听牌（全不中也算对）')
      onRoundComplete(selectedKeys.size === 0 ? 1 : -1)
    } else {
      const correct = [...selectedKeys].filter(k => winningKeys.has(k)).length
      const total = winningKeys.size
      setFeedback(`正确答案：${winningTiles.map(t => `${t.number}${t.suit}`).join('、')}（${correct}/${total}）`)
      onRoundComplete(delta)
    }
  }

  function handleNext() {
    onRoundComplete(0) // signal to advance (delta already applied)
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
        <TilePicker selected={selected} onToggle={handleToggle} disabled={submitted} />
      </section>

      {!submitted ? (
        <button className={styles.button} onClick={handleSubmit}>提交</button>
      ) : (
        <div className={styles.result}>
          <p className={styles.feedback}>{feedback}</p>
          <button className={styles.button} onClick={handleNext}>
            {round < 10 ? '下一轮' : '查看结果'}
          </button>
        </div>
      )}
    </div>
  )
}
