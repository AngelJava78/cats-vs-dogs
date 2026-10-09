import { describe, expect, it } from 'vitest'
import { findBestMove } from '../../src/ai/minimax.js'
import {
  createEmptyBoard,
  getLegalMoves,
  getWinner,
} from '../../src/game/rules.js'

describe('Minimax', () => {
  it('takes an immediate win and blocks an immediate loss', () => {
    expect(
      findBestMove(
        ['machine', 'machine', null, 'human', 'human', null, null, null, null],
        'machine',
        'human',
      ),
    ).toBe(2)
    expect(
      findBestMove(
        ['human', 'human', null, null, 'machine', null, null, null, null],
        'machine',
        'human',
      ),
    ).toBe(2)
  })

  it('returns only a legal move without mutating the board', () => {
    const board = createEmptyBoard()
    const move = findBestMove(board, 'machine', 'human')

    expect(getLegalMoves(board)).toContain(move)
    expect(board).toEqual(createEmptyBoard())
    expect(findBestMove(['human', 'human', 'human', null, null, null, null, null, null], 'machine', 'human')).toBeNull()
  })

  it('never loses from any reachable valid position when the human chooses every possible reply', () => {
    const machine = 'machine'
    const human = 'human'

    function explore(board, currentSideId) {
      const winner = getWinner(board)
      if (winner) {
        return winner !== human
      }
      const legalMoves = getLegalMoves(board)
      if (legalMoves.length === 0) {
        return true
      }

      if (currentSideId === machine) {
        const move = findBestMove(board, machine, human)
        const nextBoard = board.slice()
        nextBoard[move] = machine
        return explore(nextBoard, human)
      }

      return legalMoves.every((move) => {
        const nextBoard = board.slice()
        nextBoard[move] = human
        return explore(nextBoard, machine)
      })
    }

    expect(explore(createEmptyBoard(), machine)).toBe(true)
    expect(explore(createEmptyBoard(), human)).toBe(true)
  })
})
