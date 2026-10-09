import { applyMove, getLegalMoves } from '../game/rules.js'
import { findBestMove } from './minimax.js'

function getRandomValue(random) {
  const value = random()
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('La fuente aleatoria debe devolver un número entre 0 y 1.')
  }
  return value
}

export function getRandomMove(state, random = Math.random) {
  if (state.status !== 'playing') {
    return null
  }
  const legalMoves = getLegalMoves(state.board)
  if (legalMoves.length === 0) {
    return null
  }
  const value = getRandomValue(random)
  return legalMoves[Math.floor(value * legalMoves.length)]
}

function findWinningMove(board, sideId) {
  for (const index of getLegalMoves(board)) {
    if (applyMove(board, index, sideId).winnerSideId) {
      return index
    }
  }
  return null
}

export function chooseMachineMove(state, difficulty, random = Math.random) {
  if (state.status !== 'playing' || getLegalMoves(state.board).length === 0) {
    return null
  }
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
    throw new RangeError('La dificultad debe ser un número entero del 1 al 5.')
  }

  const { board, machineSideId, humanSideId } = state
  const winningMove = findWinningMove(board, machineSideId)
  const blockingMove = findWinningMove(board, humanSideId)

  if (difficulty === 1) {
    return getRandomMove(state, random)
  }
  if (difficulty === 2) {
    if (blockingMove !== null && getRandomValue(random) < 0.5) {
      return blockingMove
    }
    return getRandomMove(state, random)
  }
  if (difficulty === 3) {
    return winningMove ?? blockingMove ?? getRandomMove(state, random)
  }
  if (difficulty === 4) {
    if (winningMove !== null || blockingMove !== null) {
      return winningMove ?? blockingMove
    }
    return getRandomValue(random) < 0.8
      ? findBestMove(board, machineSideId, humanSideId)
      : getRandomMove(state, random)
  }
  return findBestMove(board, machineSideId, humanSideId)
}
