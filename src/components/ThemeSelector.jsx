import { themes as defaultThemes } from '../config/themes.js'

export default function ThemeSelector({
  themes = defaultThemes,
  themeId,
  humanSideId,
  sceneId,
  onThemeChange,
  onSideChange,
  onSceneChange,
}) {
  const theme = themes.find((item) => item.id === themeId)

  return (
    <div className="selector-stack">
      <label className="field-label" htmlFor="theme-select">
        Temática
        <select
          id="theme-select"
          value={themeId}
          onChange={(event) => onThemeChange(event.target.value)}
        >
          {themes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — {item.matchup}
            </option>
          ))}
        </select>
      </label>

      <div
        className="theme-preview"
        style={{ background: theme.scenes.find((item) => item.id === sceneId)?.background }}
      >
        <span className="theme-preview__badge">ENFRENTAMIENTO</span>
        <strong>{theme.matchup}</strong>
        <span>{theme.description}</span>
      </div>

      <div className="field-grid">
        <label className="field-label" htmlFor="side-select">
          Tu equipo o ficha
          <select
            id="side-select"
            value={humanSideId}
            onChange={(event) => onSideChange(event.target.value)}
          >
            {theme.sides.map((side) => (
              <option key={side.id} value={side.id}>
                {side.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field-label" htmlFor="scene-select">
          Escenario
          <select
            id="scene-select"
            value={sceneId}
            onChange={(event) => onSceneChange(event.target.value)}
          >
            {theme.scenes.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
