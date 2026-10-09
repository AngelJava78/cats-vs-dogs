import { useState } from 'react'
import GameScreen from '../components/GameScreen.jsx'
import SetupScreen from '../components/SetupScreen.jsx'
import { selectStartingSide } from '../game/starterSelection.js'
import { createMatchState } from '../game/state.js'

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [config, setConfig] = useState(null)
  const [initialState, setInitialState] = useState(null)
  const [gameKey, setGameKey] = useState(0)
  const [confirmReturn, setConfirmReturn] = useState(false)

  function startMatch(nextConfig) {
    const startingSideId = selectStartingSide(
      nextConfig.humanSideId,
      nextConfig.machineSideId,
    )
    setConfig(nextConfig)
    setInitialState(createMatchState(nextConfig, startingSideId))
    setGameKey((current) => current + 1)
    setConfirmReturn(false)
    setScreen('match')
  }

  function requestReturnToSetup(state) {
    if (state.status === 'playing') {
      setConfirmReturn(true)
      return
    }
    setScreen('setup')
  }

  return (
    <div className="app-shell">
      {screen === 'setup' ? (
        <SetupScreen initialConfig={config} onStart={startMatch} />
      ) : (
        <GameScreen
          config={config}
          initialState={initialState}
          key={gameKey}
          onRestart={() => startMatch(config)}
          onReturnToSetup={requestReturnToSetup}
        />
      )}

      {confirmReturn && (
        <div className="confirmation-backdrop">
          <section
            aria-labelledby="confirmation-title"
            aria-modal="true"
            className="confirmation-dialog"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setConfirmReturn(false)
                return
              }
              if (event.key !== 'Tab') return

              const buttons = event.currentTarget.querySelectorAll('button:not(:disabled)')
              const firstButton = buttons[0]
              const lastButton = buttons[buttons.length - 1]
              if (event.shiftKey && event.target === firstButton) {
                event.preventDefault()
                lastButton.focus()
              } else if (!event.shiftKey && event.target === lastButton) {
                event.preventDefault()
                firstButton.focus()
              }
            }}
            role="dialog"
          >
            <span className="eyebrow">PARTIDA EN CURSO</span>
            <h2 id="confirmation-title">¿Quieres salir del partido?</h2>
            <p>Si cambias la configuración, esta partida se descartará.</p>
            <div className="confirmation-dialog__actions">
              <button
                autoFocus
                className="secondary-button"
                onClick={() => setConfirmReturn(false)}
                type="button"
              >
                Seguir jugando
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  setConfirmReturn(false)
                  setScreen('setup')
                }}
                type="button"
              >
                Sí, cambiar configuración
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
