export default function MatchControls({ onRestart, onReturnToSetup }) {
  return (
    <div className="match-controls">
      <button className="secondary-button" onClick={onReturnToSetup} type="button">
        <span aria-hidden="true">←</span> Cambiar configuración
      </button>
      <button className="primary-button" onClick={onRestart} type="button">
        Nueva partida <span aria-hidden="true">↻</span>
      </button>
    </div>
  )
}
