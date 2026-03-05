import styles from './MainScreen.module.css'

interface Props {
  onStart: () => void
}

export default function MainScreen({ onStart }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>麻将练习</h1>
      <p className={styles.subtitle}>每局10轮，判断哪些牌可以听牌胡牌</p>
      <button className={styles.button} onClick={onStart}>
        开始游戏
      </button>
    </div>
  )
}
