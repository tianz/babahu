import styles from './ResultScreen.module.css'

interface Props {
  score: number
  onRestart: () => void
}

export default function ResultScreen({ score, onRestart }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>游戏结束</h1>
      <p className={styles.score}>最终得分：<strong>{score}</strong></p>
      <button className={styles.button} onClick={onRestart}>再来一局</button>
    </div>
  )
}
