import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../../src/app/App.jsx'

describe('match lifecycle', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  it('restarts with the same setup and confirms before abandoning a live match', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Temática' }), 'animales')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Tu equipo o ficha' }), 'perros')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Escenario' }), 'veterinaria')
    await user.click(screen.getByRole('radio', { name: /Difícil/ }))
    await user.click(screen.getByRole('button', { name: 'Jugar partida' }))

    await user.click(screen.getByRole('button', { name: 'Casilla 5, vacía' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Casilla 1, ocupada por la máquina/ })).toBeDisabled(),
    )
    await user.click(screen.getByRole('button', { name: /Cambiar configuración/ }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const boardBeforeCancel = screen.getAllByRole('button', { name: /Casilla/ })
      .map((cell) => cell.getAttribute('aria-label'))
    await user.click(screen.getByRole('button', { name: 'Seguir jugando' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Casilla/ })
      .map((cell) => cell.getAttribute('aria-label'))).toEqual(boardBeforeCancel)

    await user.click(screen.getByRole('button', { name: /Nueva partida/ }))
    await waitFor(() =>
      expect(screen.queryAllByRole('button', { name: /ocupada por/ })).toHaveLength(0),
    )
    expect(screen.getByRole('button', { name: 'Casilla 5, vacía' })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: /Cambiar configuración/ }))
    await user.click(screen.getByRole('button', { name: 'Sí, cambiar configuración' }))
    expect(screen.getByRole('combobox', { name: 'Temática' })).toHaveValue('animales')
    expect(screen.getByRole('combobox', { name: 'Tu equipo o ficha' })).toHaveValue('perros')
    expect(screen.getByRole('combobox', { name: 'Escenario' })).toHaveValue('veterinaria')
    expect(screen.getByRole('radio', { name: /Difícil/ })).toBeChecked()
  })
})
