import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { createMatchState } from '../../src/game/state.js'
import { useGameState } from '../../src/hooks/useGameState.js'

const fixedRandom = () => 0

describe('useGameState', () => {
  it('enforces human turns and makes exactly one legal machine response', async () => {
    const initialState = createMatchState(
      { humanSideId: 'human', machineSideId: 'machine' },
      'human',
    )
    const { result } = renderHook(() => useGameState(initialState, 1, fixedRandom))

    act(() => {
      result.current.playHumanMove(4)
    })

    await waitFor(() => expect(result.current.state.moveCount).toBe(2))
    expect(result.current.state.board[4]).toBe('human')
    expect(result.current.state.board[0]).toBe('machine')
    expect(result.current.state.currentSideId).toBe('human')

    act(() => {
      result.current.playHumanMove(0)
    })
    expect(result.current.state.moveCount).toBe(2)
    expect(result.current.error).toMatch(/ocupada/i)
  })

  it('does not request a machine response after a terminal human move', async () => {
    const initialState = {
      ...createMatchState(
        { humanSideId: 'human', machineSideId: 'machine' },
        'human',
      ),
      board: ['human', 'human', null, 'machine', 'machine', null, null, null, null],
      currentSideId: 'human',
      moveCount: 4,
    }
    const random = vi.fn(fixedRandom)
    const { result } = renderHook(() => useGameState(initialState, 1, random))

    act(() => {
      result.current.playHumanMove(2)
    })

    expect(result.current.state.status).toBe('human-won')
    expect(result.current.state.moveCount).toBe(5)
    expect(random).not.toHaveBeenCalled()
  })
})
