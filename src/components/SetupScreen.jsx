import { useState } from 'react'
import DifficultySelector from './DifficultySelector.jsx'
import ThemeSelector from './ThemeSelector.jsx'
import { themes } from '../config/themes.js'
import { createMatchConfig } from '../game/matchConfig.js'
import '../styles/setup.css'

export default function SetupScreen({ onStart, initialConfig }) {
  const initialTheme = themes.find((item) => item.id === initialConfig?.themeId) ?? themes[0]
  const [themeId, setThemeId] = useState(initialTheme.id)
  const [humanSideId, setHumanSideId] = useState(
    initialTheme.sides.some((side) => side.id === initialConfig?.humanSideId)
      ? initialConfig.humanSideId
      : initialTheme.sides[0].id,
  )
  const [sceneId, setSceneId] = useState(
    initialTheme.scenes.some((scene) => scene.id === initialConfig?.sceneId)
      ? initialConfig.sceneId
      : initialTheme.scenes[0].id,
  )
  const [difficulty, setDifficulty] = useState(initialConfig?.difficulty ?? 3)
  const [error, setError] = useState('')
  const theme = themes.find((item) => item.id === themeId)

  function changeTheme(nextThemeId) {
    const nextTheme = themes.find((item) => item.id === nextThemeId)
    if (!nextTheme) {
      setError('No encontramos esa temática. Elige una de las opciones disponibles.')
      return
    }
    setThemeId(nextTheme.id)
    setHumanSideId(nextTheme.sides[0].id)
    setSceneId(nextTheme.scenes[0].id)
    setError('')
  }

  function startMatch(event) {
    event.preventDefault()
    let matchConfig
    try {
      matchConfig = createMatchConfig(
        { themeId, humanSideId, sceneId, difficulty },
        themes,
      )
    } catch (startError) {
      if (!(startError instanceof RangeError || startError instanceof TypeError)) {
        throw startError
      }
      setError(startError.message)
      return
    }
    setError('')
    onStart(matchConfig)
  }

  return (
    <main className="setup-screen">
      <div className="page-wrap">
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="La Cancha, inicio">
            <span className="brand__mark" aria-hidden="true">C</span>
            <span>LA CANCHA</span>
          </a>
          <span className="header-note">EL CLÁSICO SE JUEGA AQUÍ</span>
        </header>

        <section className="setup-hero" id="inicio">
          <div className="setup-hero__copy">
            <span className="eyebrow">TU CANCHA. TUS REGLAS.</span>
            <h1>Arma el partido.<br /><span>Reta a la máquina.</span></h1>
            <p>Elige tus fichas, busca tu escenario y demuestra quién manda en el tablero.</p>
          </div>
          <div className="hero-decoration" aria-hidden="true">
            <span className="hero-decoration__orbit">✳</span>
            <div className="hero-decoration__card hero-decoration__card--one">X</div>
            <div className="hero-decoration__card hero-decoration__card--two">O</div>
            <div className="hero-decoration__dot" />
          </div>
        </section>

        <form className="setup-card" onSubmit={startMatch}>
          <div className="setup-card__heading">
            <div>
              <span className="eyebrow">ANTES DEL SILBATAZO</span>
              <h2>Prepara tu partida</h2>
            </div>
            <span className="setup-card__step">01 <span>/ 01</span></span>
          </div>

          <ThemeSelector
            themeId={themeId}
            humanSideId={humanSideId}
            sceneId={sceneId}
            onThemeChange={changeTheme}
            onSideChange={setHumanSideId}
            onSceneChange={setSceneId}
          />

          <div className="setup-divider" />

          <div className="opponent-note">
            <span className="opponent-note__icon" aria-hidden="true">↔</span>
            <p>
              Tú eliges tu lado. <strong>{theme.sides.find((side) => side.id !== humanSideId)?.name}</strong>
              {' '}será de la máquina.
            </p>
          </div>

          <DifficultySelector value={difficulty} onChange={setDifficulty} />

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="setup-card__footer">
            <p><span aria-hidden="true">✦</span> La máquina o tú: ¿quién empieza? Se decide al azar.</p>
            <button className="primary-button" type="submit">
              Jugar partida <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>

        <footer className="page-footer">
          <span>HECHO PARA UNA BUENA RIVALIDAD</span>
          <span>TRES EN RAYA · 1 JUGADOR</span>
        </footer>
      </div>
    </main>
  )
}
