import { describe, expect, it } from 'vitest'
import {
  applyMove,
  createEmptyBoard,
  getLegalMoves,
  getWinner,
  getWinningLine,
} from '../../src/game/rules.js'
import { applyMatchMove, createMatchState } from '../../src/game/state.js'

describe('game rules', () => {
  it('initializes an empty 3x3 board', () => {
    expect(createEmptyBoard()).toEqual(Array(9).fill(null))
  })

  it('accepts a move only for an empty board index from 0 through 8', () => {
    expect(applyMove(createEmptyBoard(), 0, 'human').accepted).toBe(true)
    const board = ['human', null, null, null, null, null, null, null, null]

    for (const index of [-1, 1.5, 9, NaN]) {
      expect(applyMove(board, index, 'machine').accepted).toBe(false)
    }
    expect(applyMove(board, 0, 'machine')).toMatchObject({
      accepted: false,
      reason: 'occupied',
    })
  })

  it.each([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])('detects a winning line %j', (...line) => {
    const board = createEmptyBoard()
    line.forEach((index) => {
      board[index] = 'human'
    })

    expect(getWinningLine(board, 'human')).toEqual(line)
    expect(getWinner(board)).toBe('human')
  })

  it('detects a draw when all cells are occupied and no line wins', () => {
    const board = ['human', 'machine', 'human', 'human', 'machine', 'machine', 'machine', 'human', 'human']
    const result = applyMove(board.slice(0, 8).concat(null), 8, 'human')

    expect(result.accepted).toBe(true)
    expect(result.isDraw).toBe(true)
  })

  it('does not mutate the source board and lists only empty cells', () => {
    const board = createEmptyBoard()
    const result = applyMove(board, 4, 'human')

    expect(board[4]).toBeNull()
    expect(result.board[4]).toBe('human')
    expect(getLegalMoves(result.board)).toEqual([0, 1, 2, 3, 5, 6, 7, 8])
  })

  it('rejects moves after a match ends and alternates turns', () => {
    let state = createMatchState(
      { humanSideId: 'human', machineSideId: 'machine' },
      'human',
    )
    const first = applyMatchMove(state, 'human', 0)
    expect(first.accepted).toBe(true)
    expect(first.state.currentSideId).toBe('machine')

    state = createMatchState(
      { humanSideId: 'human', machineSideId: 'machine' },
      'human',
    )
    for (const [side, index] of [
      ['human', 0],
      ['machine', 3],
      ['human', 1],
      ['machine', 4],
      ['human', 2],
    ]) {
      const result = applyMatchMove(state, side, index)
      expect(result.accepted).toBe(true)
      state = result.state
    }

    expect(state.status).toBe('human-won')
    expect(applyMatchMove(state, 'machine', 8)).toMatchObject({
      accepted: false,
      reason: 'game-over',
      state,
    })
    expect(getWinner(state.board)).toBe('human')
  })

  it('marks a full non-winning board as a draw and rejects further moves', () => {
    let state = createMatchState(
      { humanSideId: 'human', machineSideId: 'machine' },
      'human',
    )
    for (const [side, index] of [
      ['human', 0],
      ['machine', 1],
      ['human', 2],
      ['machine', 4],
      ['human', 3],
      ['machine', 5],
      ['human', 7],
      ['machine', 6],
      ['human', 8],
    ]) {
      const result = applyMatchMove(state, side, index)
      expect(result.accepted).toBe(true)
      state = result.state
    }

    expect(state.status).toBe('draw')
    expect(state.moveCount).toBe(9)
    expect(applyMatchMove(state, 'machine', 0)).toMatchObject({
      accepted: false,
      reason: 'game-over',
    })
  })
})
