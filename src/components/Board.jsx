import Cell from './Cell.jsx'
import { getTheme } from '../config/themes.js'
import '../styles/board.css'
import '../styles/theme.css'

export default function Board({ config, state, onSelectCell }) {
  const theme = getTheme(config.themeId)
  const humanSide = theme.sides.find((side) => side.id === config.humanSideId)
  const machineSide = theme.sides.find((side) => side.id === config.machineSideId)
  const winningCells = new Set(state.winningLine ?? [])
  const isHumanTurn =
    state.status === 'playing' && state.currentSideId === state.humanSideId

  return (
    <div
      className={`board-stage theme-${theme.id}`}
      style={{ background: theme.scenes.find((scene) => scene.id === config.sceneId).background }}
    >
      <div className="board-stage__wash" aria-hidden="true" />
      <div
        aria-label="Tablero de tres en raya"
        className="board-grid"
        role="group"
      >
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((column) => {
              const index = row * 3 + column
              const sideId = state.board[index]
              const side = sideId === config.humanSideId
                ? humanSide
                : sideId === config.machineSideId
                  ? machineSide
                  : null
              const owner = sideId === config.humanSideId ? 'human' : 'machine'
              return (
                <Cell
                  disabled={!isHumanTurn || Boolean(side)}
                  index={index}
                  isWinningCell={winningCells.has(index)}
                  key={index}
                  onSelect={onSelectCell}
                  owner={owner}
                  side={side}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="board-stage__caption">
        <span>{theme.scenes.find((scene) => scene.id === config.sceneId).name}</span>
        <span aria-hidden="true">·</span>
        <span>{theme.matchup}</span>
      </div>
    </div>
  )
}
