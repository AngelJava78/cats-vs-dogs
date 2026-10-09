import { describe, expect, it } from 'vitest'
import { chooseMachineMove } from '../../src/ai/strategies.js'
import { getLegalMoves } from '../../src/game/rules.js'

function position(board) {
  return {
    board,
    status: 'playing',
    currentSideId: 'machine',
    humanSideId: 'human',
    machineSideId: 'machine',
  }
}

function sequenceRandom(values) {
  let index = 0
  return () => values[index++] ?? 0
}

describe('difficulty strategies', () => {
  it('returns a legal move for every level and no move for a terminal game', () => {
    const state = position(['human', null, null, null, 'machine', null, null, null, null])
    for (let difficulty = 1; difficulty <= 5; difficulty += 1) {
      expect(getLegalMoves(state.board)).toContain(
        chooseMachineMove(state, difficulty, () => 0.2),
      )
    }
    expect(
      chooseMachineMove({ ...state, status: 'draw' }, 5),
    ).toBeNull()
  })

  it('level 2 blocks 40-60 of 100 immediate threats', () => {
    const state = position(['human', 'human', null, 'machine', null, null, null, null, null])
    const randomValues = []
    for (let index = 0; index < 100; index += 1) {
      const blocks = index < 50
      randomValues.push(blocks ? 0.25 : 0.75)
      if (!blocks) randomValues.push(0.25)
    }

    let blocks = 0
    const random = sequenceRandom(randomValues)
    for (let index = 0; index < 100; index += 1) {
      if (chooseMachineMove(state, 2, random) === 2) blocks += 1
    }
    expect(blocks).toBeGreaterThanOrEqual(40)
    expect(blocks).toBeLessThanOrEqual(60)
  })

  it('level 3 takes an immediate win and blocks an immediate human win', () => {
    expect(
      chooseMachineMove(
        position(['machine', 'machine', null, 'human', null, null, null, null, null]),
        3,
        () => 0.9,
      ),
    ).toBe(2)
    expect(
      chooseMachineMove(
        position(['human', 'human', null, null, 'machine', null, null, null, null]),
        3,
        () => 0.9,
      ),
    ).toBe(2)
  })

  it('level 4 chooses an optimal move in 70-90 of 100 non-tactical positions', () => {
    const state = position(Array(9).fill(null))
    const randomValues = []
    for (let index = 0; index < 100; index += 1) {
      randomValues.push(index < 80 ? 0.1 : 0.9)
      if (index >= 80) randomValues.push(0.12)
    }

    let optimalMoves = 0
    const random = sequenceRandom(randomValues)
    for (let index = 0; index < 100; index += 1) {
      const move = chooseMachineMove(state, 4, random)
      if ([0, 2, 4, 6, 8].includes(move)) optimalMoves += 1
    }
    expect(optimalMoves).toBeGreaterThanOrEqual(70)
    expect(optimalMoves).toBeLessThanOrEqual(90)
  })
})
