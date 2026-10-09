export default function Cell({
  index,
  side,
  owner,
  isWinningCell,
  disabled,
  onSelect,
}) {
  const label = side
    ? `Casilla ${index + 1}, ocupada por ${owner === 'human' ? 'tu ficha' : 'la máquina'}: ${side.accessibleLabel}`
    : `Casilla ${index + 1}, vacía`

  return (
    <button
      aria-label={label}
      className={[
        'board-cell',
        side ? `board-cell--${owner}` : '',
        side?.image ? 'board-cell--crest' : '',
        isWinningCell ? 'board-cell--winner' : '',
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={() => onSelect(index)}
      type="button"
    >
      {side ? (
        <span className={`board-cell__token${side.image ? ' board-cell__token--crest' : ''}`} aria-hidden="true">
          {side.image ? <img className="board-cell__crest" src={side.image} alt="" /> : side.token}
        </span>
      ) : (
        <span className="board-cell__plus" aria-hidden="true">+</span>
      )}
    </button>
  )
}
