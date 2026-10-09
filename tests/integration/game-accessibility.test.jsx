import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import GameScreen from '../../src/components/GameScreen.jsx'
import { createMatchState } from '../../src/game/state.js'

const config = {
  themeId: 'clasico',
  humanSideId: 'equis',
  machineSideId: 'circulo',
  sceneId: 'tablero-tradicional',
  difficulty: 3,
}

describe('game accessibility', () => {
  it('provides named keyboard-operable cells and a live turn/result region', async () => {
    const user = userEvent.setup()
    render(
      <GameScreen
        config={config}
        initialState={createMatchState(config, config.humanSideId)}
        random={() => 0}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )

    const cell = screen.getByRole('button', { name: 'Casilla 1, vacía' })
    expect(cell).toBeEnabled()
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
    cell.focus()
    expect(cell).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: /Casilla 1, ocupada por/ })).toBeDisabled()
  })

  it('allows a touch pointer to select an available cell', async () => {
    const user = userEvent.setup()
    render(
      <GameScreen
        config={config}
        initialState={createMatchState(config, config.humanSideId)}
        random={() => 0}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )

    const cell = screen.getByRole('button', { name: 'Casilla 1, vacía' })
    await user.pointer([{ keys: '[TouchA]', target: cell }])
    expect(screen.getByRole('button', { name: /Casilla 1, ocupada por tu ficha/ })).toBeDisabled()
  })
})
