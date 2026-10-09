import { describe, expect, it } from 'vitest'
import { themes } from '../../src/config/themes.js'
import { createMatchConfig } from '../../src/game/matchConfig.js'

const selection = {
  themeId: 'futbol-mexicano',
  humanSideId: 'america',
  sceneId: 'azteca',
  difficulty: 3,
}

describe('match configuration', () => {
  it('validates selections and assigns the opposite side to the machine', () => {
    expect(createMatchConfig(selection, themes)).toEqual({
      ...selection,
      machineSideId: 'chivas',
    })
  })

  it.each([
    [{ ...selection, themeId: 'missing' }],
    [{ ...selection, humanSideId: 'barcelona' }],
    [{ ...selection, sceneId: 'camp-nou' }],
    [{ ...selection, difficulty: 0 }],
    [{ ...selection, difficulty: 6 }],
    [{ ...selection, difficulty: 2.5 }],
    [{ ...selection, difficulty: '3' }],
    [{ ...selection, humanSideId: undefined }],
    [{ ...selection, sceneId: undefined }],
  ])('rejects invalid selection %j', (invalidSelection) => {
    expect(() => createMatchConfig(invalidSelection, themes)).toThrow()
  })
})
