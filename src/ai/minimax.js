import { applyMove, getLegalMoves, getWinner } from '../game/rules.js'

const outcomes = new Map()

function compare(left, right, isMaximizing) {
  if (left.outcome !== right.outcome) {
    return isMaximizing
      ? left.outcome > right.outcome
      : left.outcome < right.outcome
  }
  if (left.outcome === 1) {
    return isMaximizing
      ? left.moves < right.moves
      : left.moves > right.moves
  }
  if (left.outcome === -1) {
    return isMaximizing
      ? left.moves > right.moves
      : left.moves < right.moves
  }
  return false
}

function evaluate(board, currentSideId, maximizingSideId, minimizingSideId) {
  const key = JSON.stringify([
    board,
    currentSideId,
    maximizingSideId,
    minimizingSideId,
  ])
  const cached = outcomes.get(key)
  if (cached) {
    return cached
  }

  const winner = getWinner(board)
  if (winner) {
    const result = { outcome: winner === maximizingSideId ? 1 : -1, moves: 0 }
    outcomes.set(key, result)
    return result
  }

  const legalMoves = getLegalMoves(board)
  if (legalMoves.length === 0) {
    const result = { outcome: 0, moves: 0 }
    outcomes.set(key, result)
    return result
  }

  const isMaximizing = currentSideId === maximizingSideId
  let bestResult = null

  for (const index of legalMoves) {
    const nextBoard = board.slice()
    nextBoard[index] = currentSideId
    const continuation = evaluate(
      nextBoard,
      currentSideId === maximizingSideId ? minimizingSideId : maximizingSideId,
      maximizingSideId,
      minimizingSideId,
    )
    const candidate = { ...continuation, moves: continuation.moves + 1 }
    if (bestResult === null || compare(candidate, bestResult, isMaximizing)) {
      bestResult = candidate
    }
  }

  outcomes.set(key, bestResult)
  return bestResult
}

export function findBestMove(board, sideId, opponentSideId) {
  if (
    !Array.isArray(board) ||
    board.length !== 9 ||
    !sideId ||
    !opponentSideId ||
    sideId === opponentSideId ||
    getWinner(board)
  ) {
    return null
  }

  const legalMoves = getLegalMoves(board)
  if (legalMoves.length === 0) {
    return null
  }

  let bestMove = null
  let bestResult = null
  for (const index of legalMoves) {
    const move = applyMove(board, index, sideId)
    const continuation = move.winnerSideId
      ? { outcome: 1, moves: 0 }
      : evaluate(move.board, opponentSideId, sideId, opponentSideId)
    const candidate = { ...continuation, moves: continuation.moves + 1 }
    if (bestResult === null || compare(candidate, bestResult, true)) {
      bestResult = candidate
      bestMove = index
    }
  }

  return bestMove
}
