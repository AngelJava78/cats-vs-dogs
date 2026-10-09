export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function createEmptyBoard() {
  return Array(9).fill(null)
}

export function getWinningLine(board, sideId) {
  return (
    WINNING_LINES.find((line) =>
      line.every((index) => board[index] === sideId),
    ) ?? null
  )
}

export function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [first, second, third] = line.map((index) => board[index])
    if (first && first === second && second === third) {
      return first
    }
  }
  return null
}

export function getLegalMoves(board) {
  return board.flatMap((cell, index) => (cell === null ? [index] : []))
}

export function applyMove(board, index, sideId) {
  if (!Number.isInteger(index) || index < 0 || index > 8) {
    return { accepted: false, reason: 'invalid-index' }
  }
  if (board[index] !== null) {
    return { accepted: false, reason: 'occupied' }
  }

  const nextBoard = board.slice()
  nextBoard[index] = sideId
  const winningLine = getWinningLine(nextBoard, sideId)

  return {
    accepted: true,
    board: nextBoard,
    winnerSideId: winningLine ? sideId : null,
    winningLine,
    isDraw: !winningLine && nextBoard.every((cell) => cell !== null),
  }
}
