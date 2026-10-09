export const difficultyChoices = [
  { value: 1, label: 'Muy fácil', descriptor: 'Para entrar en calor' },
  { value: 2, label: 'Fácil', descriptor: 'Un reto relajado' },
  { value: 3, label: 'Normal', descriptor: 'A ver qué tal' },
  { value: 4, label: 'Difícil', descriptor: 'La máquina ya piensa' },
  { value: 5, label: 'Muy difícil', descriptor: 'No da una por perdida' },
]

export default function DifficultySelector({ value, onChange }) {
  return (
    <fieldset className="difficulty-fieldset">
      <legend className="field-label">Dificultad</legend>
      <div className="difficulty-options">
        {difficultyChoices.map((choice) => (
          <label
            className={`difficulty-option${value === choice.value ? ' is-selected' : ''}`}
            key={choice.value}
          >
            <input
              type="radio"
              name="difficulty"
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
            />
            <span className="difficulty-option__number">{choice.value}</span>
            <span className="difficulty-option__copy">
              <strong>{choice.label}</strong>
              <small>{choice.descriptor}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
