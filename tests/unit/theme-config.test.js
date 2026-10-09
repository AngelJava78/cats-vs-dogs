import { describe, expect, it } from 'vitest'
import { themes } from '../../src/config/themes.js'

describe('theme catalog', () => {
  it('contains nine unique themes with exactly two distinct sides each', () => {
    expect(themes).toHaveLength(9)
    expect(new Set(themes.map((theme) => theme.id)).size).toBe(9)

    for (const theme of themes) {
      expect(theme.sides).toHaveLength(2)
      expect(new Set(theme.sides.map((side) => side.id)).size).toBe(2)
      expect(theme.sides.every((side) => side.name && side.token && side.accessibleLabel)).toBe(true)
    }
  })

  it('provides at least one uniquely identified, named scene per theme', () => {
    expect(themes.reduce((count, theme) => count + theme.scenes.length, 0)).toBe(12)
    for (const theme of themes) {
      expect(theme.scenes.length).toBeGreaterThan(0)
      expect(new Set(theme.scenes.map((scene) => scene.id)).size).toBe(theme.scenes.length)
      expect(theme.scenes.every((scene) => scene.name && scene.background)).toBe(true)
    }
  })

  it('uses both club crests for the Spanish football matchup', () => {
    const spanishClassic = themes.find((theme) => theme.id === 'futbol-europeo')
    expect(spanishClassic.sides.map((side) => side.image)).toEqual([
      'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    ])
  })

  it('includes each requested additional theme', () => {
    expect(themes.map((theme) => theme.id)).toEqual(expect.arrayContaining([
      'plants-vs-zombies',
      'formula-1',
      'futbol-americano',
      'chicas-vs-chicos',
      'batman-vs-gason',
    ]))
  })
})
