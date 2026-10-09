import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../../src/app/App.jsx'

describe('application smoke flow', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  it('configures a match, plays a human and machine turn, restarts, and returns to setup', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Temática' }), 'clasico')
    await user.click(screen.getByRole('button', { name: 'Jugar partida' }))
    expect(screen.getByRole('group', { name: 'Tablero de tres en raya' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Casilla 5, vacía' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Casilla 1, ocupada por la máquina/ })).toBeDisabled(),
    )
    expect(screen.getByRole('status')).toHaveTextContent('Tu turno')

    await user.click(screen.getByRole('button', { name: /Nueva partida/ }))
    await waitFor(() =>
      expect(screen.queryAllByRole('button', { name: /ocupada por/ })).toHaveLength(0),
    )
    await user.click(screen.getByRole('button', { name: /Cambiar configuración/ }))
    await user.click(screen.getByRole('button', { name: 'Sí, cambiar configuración' }))
    expect(screen.getByRole('combobox', { name: 'Temática' })).toHaveValue('clasico')
  })

  it('makes an opening machine move when the starter draw selects the machine', async () => {
    const user = userEvent.setup()
    vi.mocked(Math.random).mockReturnValue(0.75)
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Jugar partida' }))
    await waitFor(() =>
      expect(screen.getAllByRole('button', { name: /ocupada por/ })).toHaveLength(1),
    )
    expect(screen.getByRole('button', { name: /ocupada por la máquina/ })).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent('Tu turno')
  })
})
