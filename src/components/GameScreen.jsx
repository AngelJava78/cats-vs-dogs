import { useGameState } from '../hooks/useGameState.js'
import Board from './Board.jsx'
import MatchControls from './MatchControls.jsx'
import StatusPanel from './StatusPanel.jsx'
import '../styles/board.css'

export default function GameScreen({
  config,
  initialState,
  random = Math.random,
  onRestart,
  onReturnToSetup,
}) {
  const { state, error, playHumanMove } = useGameState(
    initialState,
    config.difficulty,
    random,
  )

  return (
    <main className="game-screen">
      <div className="page-wrap">
        <header className="game-header">
          <a className="brand" href="#partida" aria-label="La Cancha, partida">
            <span className="brand__mark" aria-hidden="true">C</span>
            <span>LA CANCHA</span>
          </a>
          <span className="header-note">LA PARTIDA</span>
        </header>

        <section className="game-intro" id="partida">
          <div>
            <span className="eyebrow">QUE RUEDE EL BALÓN</span>
            <h1>Tu jugada.</h1>
          </div>
          <span className="game-intro__counter">JUGADA <strong>{String(state.moveCount).padStart(2, '0')}</strong> / 09</span>
        </section>

        <div className="game-layout">
          <div className="game-layout__board">
            <Board config={config} onSelectCell={playHumanMove} state={state} />
          </div>
          <aside className="game-layout__aside">
            <StatusPanel config={config} error={error} state={state} />
            <div className="game-tip">
              <span aria-hidden="true">✳</span>
              <p>Haz tres en línea en cualquier dirección para llevarte la victoria.</p>
            </div>
            <MatchControls
              onRestart={onRestart}
              onReturnToSetup={() => onReturnToSetup(state)}
            />
          </aside>
        </div>
        <footer className="page-footer">
          <span>BUENA SUERTE, Y QUE GANE EL MEJOR</span>
          <span>JUGADA {state.moveCount} DE 9</span>
        </footer>
      </div>
    </main>
  )
}
