import { describe, expect, it } from 'vitest'
import { selectStartingSide } from '../../src/game/starterSelection.js'

describe('starting side selection', () => {
  it('can select either participant with the same probability boundary', () => {
    expect(selectStartingSide('human', 'machine', () => 0.49)).toBe('human')
    expect(selectStartingSide('human', 'machine', () => 0.5)).toBe('machine')
  })

  it.each([
    [-0.01],
    [1],
    [NaN],
  ])('rejects random values outside [0, 1)', (value) => {
    expect(() => selectStartingSide('human', 'machine', () => value)).toThrow(
      RangeError,
    )
  })
})
