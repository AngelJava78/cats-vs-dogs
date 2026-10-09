import { applyMove, createEmptyBoard } from './rules.js'

export function createMatchState(config, startingSideId) {
  const { humanSideId, machineSideId } = config
  if (!humanSideId || !machineSideId || humanSideId === machineSideId) {
    throw new TypeError('La partida requiere dos lados distintos.')
  }
  if (startingSideId !== humanSideId && startingSideId !== machineSideId) {
    throw new TypeError('El lado inicial debe pertenecer a la partida.')
  }

  return {
    board: createEmptyBoard(),
    humanSideId,
    machineSideId,
    currentSideId: startingSideId,
    startingSideId,
    status: 'playing',
    winningLine: null,
    moveCount: 0,
  }
}

export function applyMatchMove(state, sideId, index) {
  if (state.status !== 'playing') {
    return { accepted: false, reason: 'game-over', state }
  }
  if (sideId !== state.currentSideId) {
    return { accepted: false, reason: 'wrong-turn', state }
  }

  const move = applyMove(state.board, index, sideId)
  if (!move.accepted) {
    return { ...move, state }
  }

  const moveCount = state.moveCount + 1
  const status = move.winnerSideId
    ? move.winnerSideId === state.humanSideId
      ? 'human-won'
      : 'machine-won'
    : move.isDraw
      ? 'draw'
      : 'playing'

  return {
    accepted: true,
    state: {
      ...state,
      board: move.board,
      moveCount,
      status,
      winningLine: move.winningLine,
      currentSideId:
        status === 'playing'
          ? sideId === state.humanSideId
            ? state.machineSideId
            : state.humanSideId
          : sideId,
    },
  }
}
