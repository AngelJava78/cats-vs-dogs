import { describe, expect, it } from 'vitest'
import { createMatchState } from '../../src/game/state.js'
import { getRandomMove } from '../../src/ai/strategies.js'

describe('baseline machine move contract', () => {
  it('returns a legal move for a playing match', () => {
    const state = createMatchState(
      { humanSideId: 'human', machineSideId: 'machine' },
      'machine',
    )
    expect(getRandomMove(state, () => 0)).toBe(0)
  })

  it('returns no move for a terminal or full board', () => {
    const terminal = {
      board: ['human', 'human', 'human', null, null, null, null, null, null],
      status: 'human-won',
    }
    const full = {
      board: ['human', 'machine', 'human', 'human', 'machine', 'machine', 'machine', 'human', 'human'],
      status: 'playing',
    }

    expect(getRandomMove(terminal)).toBeNull()
    expect(getRandomMove(full)).toBeNull()
  })
})
