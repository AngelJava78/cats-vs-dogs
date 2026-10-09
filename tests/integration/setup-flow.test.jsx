import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SetupScreen from '../../src/components/SetupScreen.jsx'

describe('setup flow', () => {
  it('lets the player choose a theme, side, scene, difficulty, then starts with the other side', async () => {
    const user = userEvent.setup()
    const onStart = vi.fn()
    render(<SetupScreen onStart={onStart} />)

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Temática' }),
      'futbol-europeo',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Tu equipo o ficha' }),
      'barcelona',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Escenario' }),
      'camp-nou',
    )
    await user.click(screen.getByRole('radio', { name: /Muy difícil/ }))
    await user.click(screen.getByRole('button', { name: 'Jugar partida' }))

    expect(onStart).toHaveBeenCalledWith({
      themeId: 'futbol-europeo',
      humanSideId: 'barcelona',
      machineSideId: 'real-madrid',
      sceneId: 'camp-nou',
      difficulty: 5,
    })
  })
})
