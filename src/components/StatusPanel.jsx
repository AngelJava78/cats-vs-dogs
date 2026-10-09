import { getTheme } from '../config/themes.js'
import { difficultyChoices } from './DifficultySelector.jsx'

export default function StatusPanel({ config, state, error }) {
  const theme = getTheme(config.themeId)
  const humanSide = theme.sides.find((side) => side.id === config.humanSideId)
  const machineSide = theme.sides.find((side) => side.id === config.machineSideId)
  const isHumanTurn = state.currentSideId === state.humanSideId
  const difficulty = difficultyChoices.find((choice) => choice.value === config.difficulty)
  const statusMessage = state.status === 'human-won'
    ? '¡Ganaste! Esta cancha es tuya.'
    : state.status === 'machine-won'
      ? 'La máquina se lleva esta partida.'
      : state.status === 'draw'
        ? 'Empate. Nadie cedió terreno.'
        : isHumanTurn
          ? 'Tu turno'
          : 'Turno de la máquina'

  return (
    <section className="match-status" aria-label="Estado de la partida">
      <div className="match-status__heading">
        <span className="eyebrow">PARTIDA EN CURSO</span>
        <span className="difficulty-pill">NIVEL {config.difficulty} · {difficulty.label.toUpperCase()}</span>
      </div>
      <div
        aria-live="polite"
        className={`turn-banner${state.status !== 'playing' ? ' turn-banner--result' : ''}`}
        role="status"
      >
        <span className="turn-banner__indicator" aria-hidden="true">
          {state.status === 'human-won' ? '✦' : state.status === 'machine-won' ? '×' : state.status === 'draw' ? '=' : isHumanTurn ? '●' : '◌'}
        </span>
        <span>{statusMessage}</span>
      </div>
      <div className="player-legend">
        <div className={`player-card${isHumanTurn && state.status === 'playing' ? ' is-active' : ''}`}>
          <span className={`player-card__token${humanSide.image ? ' player-card__token--crest' : ''}`} aria-hidden="true">
            {humanSide.image ? <img src={humanSide.image} alt="" /> : humanSide.token}
          </span>
          <span className="player-card__details">
            <small>TÚ</small>
            <strong>{humanSide.name}</strong>
          </span>
          {isHumanTurn && state.status === 'playing' && <span className="player-card__turn">JUEGAS</span>}
        </div>
        <span className="player-legend__versus" aria-hidden="true">VS</span>
        <div className={`player-card${!isHumanTurn && state.status === 'playing' ? ' is-active' : ''}`}>
          <span className={`player-card__token player-card__token--machine${machineSide.image ? ' player-card__token--crest' : ''}`} aria-hidden="true">
            {machineSide.image ? <img src={machineSide.image} alt="" /> : machineSide.token}
          </span>
          <span className="player-card__details">
            <small>OPONENTE</small>
            <strong>{machineSide.name}</strong>
          </span>
          {!isHumanTurn && state.status === 'playing' && <span className="player-card__turn">JUEGA</span>}
        </div>
      </div>
      {error && <p className="game-error" role="alert">{error}</p>}
    </section>
  )
}
