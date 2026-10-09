import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import GameScreen from '../../src/components/GameScreen.jsx'
import { applyMatchMove, createMatchState } from '../../src/game/state.js'
import { themes } from '../../src/config/themes.js'

const config = {
  themeId: 'futbol-mexicano',
  humanSideId: 'america',
  machineSideId: 'chivas',
  sceneId: 'azteca',
  difficulty: 1,
}

function stateAfter(moves) {
  return moves.reduce(
    (state, [sideId, index]) => {
      return applyMatchMove(state, sideId, index).state
    },
    createMatchState(config, moves[0]?.[0] ?? config.humanSideId),
  )
}

describe('gameplay flow', () => {
  it('renders the Real Madrid and Barcelona crests in the board and player legend', () => {
    const europeanConfig = {
      themeId: 'futbol-europeo',
      humanSideId: 'real-madrid',
      machineSideId: 'barcelona',
      sceneId: 'bernabeu',
      difficulty: 3,
    }
    const initialState = applyMatchMove(
      applyMatchMove(
        createMatchState(europeanConfig, europeanConfig.humanSideId),
        europeanConfig.humanSideId,
        0,
      ).state,
      europeanConfig.machineSideId,
      1,
    ).state
    const { container } = render(
      <GameScreen
        config={europeanConfig}
        initialState={initialState}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )

    expect(container.querySelectorAll('.board-cell__crest')).toHaveLength(2)
    expect(container.querySelector('.board-cell__crest')).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    )
    expect(container.querySelectorAll('.player-card__token--crest img')).toHaveLength(2)
  })

  it('accepts a legal player move, responds once, and rejects occupied-cell input', async () => {
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

    await user.click(screen.getByRole('button', { name: 'Casilla 5, vacía' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Casilla 1, ocupada por/ })).toBeDisabled(),
    )
    expect(screen.getByRole('button', { name: /Casilla 5, ocupada por/ })).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent('Tu turno')
    expect(screen.getByText(/nivel 1/i)).toBeInTheDocument()
    expect(themes).toHaveLength(9)
  })

  it('announces a player victory and locks all cells', async () => {
    const user = userEvent.setup()
    const initialState = stateAfter([
      [config.humanSideId, 0],
      [config.machineSideId, 3],
      [config.humanSideId, 1],
      [config.machineSideId, 4],
    ])
    render(
      <GameScreen
        config={config}
        initialState={initialState}
        random={() => 0}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Casilla 3, vacía' }))
    expect(screen.getByRole('status')).toHaveTextContent(/ganaste/i)
    expect(screen.getAllByRole('button', { name: /Casilla/ })).toHaveLength(9)
    expect(screen.getAllByRole('button', { name: /Casilla/ }).every((cell) => cell.disabled)).toBe(true)
  })

  it('announces a machine victory and a draw', async () => {
    const user = userEvent.setup()
    const machineWinState = stateAfter([
      [config.humanSideId, 0],
      [config.machineSideId, 3],
      [config.humanSideId, 1],
      [config.machineSideId, 4],
      [config.humanSideId, 7],
    ])
    const { unmount } = render(
      <GameScreen
        config={{ ...config, difficulty: 5 }}
        initialState={machineWinState}
        random={() => 0}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/máquina se lleva/i),
    )
    expect(screen.getAllByRole('button', { name: /Casilla/ }).every((cell) => cell.disabled)).toBe(true)
    unmount()

    const drawState = stateAfter([
      [config.humanSideId, 0],
      [config.machineSideId, 1],
      [config.humanSideId, 2],
      [config.machineSideId, 4],
      [config.humanSideId, 3],
      [config.machineSideId, 5],
      [config.humanSideId, 7],
      [config.machineSideId, 6],
    ])
    render(
      <GameScreen
        config={config}
        initialState={drawState}
        random={() => 0}
        onRestart={() => {}}
        onReturnToSetup={() => {}}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Casilla 9, vacía' }))
    expect(screen.getByRole('status')).toHaveTextContent(/empate/i)
    expect(screen.getAllByRole('button', { name: /Casilla/ }).every((cell) => cell.disabled)).toBe(true)
  })
})
