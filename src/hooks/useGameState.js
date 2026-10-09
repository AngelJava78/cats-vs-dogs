import { useCallback, useEffect, useState } from 'react'
import { chooseMachineMove } from '../ai/strategies.js'
import { applyMatchMove } from '../game/state.js'

const moveErrorMessages = {
  'game-over': 'La partida ya terminó.',
  'wrong-turn': 'Espera tu turno para jugar.',
  occupied: 'Esa casilla ya está ocupada.',
  'invalid-index': 'Esa casilla no está disponible.',
}

export function useGameState(initialState, difficulty, random = Math.random) {
  const [state, setState] = useState(initialState)
  const [error, setError] = useState('')

  const playHumanMove = useCallback(
    (index) => {
      const result = applyMatchMove(state, state.humanSideId, index)
      if (!result.accepted) {
        setError(moveErrorMessages[result.reason] ?? 'No se pudo realizar ese movimiento.')
        return
      }
      setError('')
      setState(result.state)
    },
    [state],
  )

  useEffect(() => {
    if (
      state.status !== 'playing' ||
      state.currentSideId !== state.machineSideId
    ) {
      return
    }

    const index = chooseMachineMove(state, difficulty, random)
    if (index === null) {
      setError('La máquina no encontró una jugada disponible.')
      return
    }

    const result = applyMatchMove(state, state.machineSideId, index)
    if (!result.accepted) {
      setError(moveErrorMessages[result.reason] ?? 'La máquina produjo una jugada inválida.')
      return
    }

    setError('')
    setState(result.state)
  }, [state, random])

  return { state, error, playHumanMove }
}
