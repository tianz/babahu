import { useState } from 'react'
import type { GameState } from './types/mahjong'
import { dealHand } from './utils/mahjong'
import MainScreen from './pages/MainScreen'
import GameScreen from './pages/GameScreen'
import ResultScreen from './pages/ResultScreen'
import styles from './App.module.css'

function initialState(): GameState {
  return { screen: 'main', round: 1, score: 0, hand: [], selected: [] }
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState)

  function handleStart() {
    setState({ screen: 'game', round: 1, score: 0, hand: dealHand(), selected: [] })
  }

  function handleRoundComplete(point: number) {
    setState(prev => {
      const newScore = prev.score + point
      const nextRound = prev.round + 1
      if (nextRound > 10) {
        return { ...prev, score: newScore, screen: 'result' }
      }
      return { ...prev, score: newScore, round: nextRound, hand: dealHand(), selected: [] }
    })
  }

  function handleRestart() {
    setState(initialState())
  }

  return (
    <div className={styles.app}>
      {state.screen === 'main' && <MainScreen onStart={handleStart} />}
      {state.screen === 'game' && (
        <GameScreen
          key={state.round}
          round={state.round}
          score={state.score}
          hand={state.hand}
          onRoundComplete={handleRoundComplete}
        />
      )}
      {state.screen === 'result' && (
        <ResultScreen score={state.score} onRestart={handleRestart} />
      )}
    </div>
  )
}
