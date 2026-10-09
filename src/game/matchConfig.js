export function createMatchConfig(selection, themes) {
  const theme = themes.find((item) => item.id === selection.themeId)
  if (!theme) {
    throw new RangeError('Selecciona una temática disponible.')
  }

  if (
    !Array.isArray(theme.sides) ||
    theme.sides.length !== 2 ||
    theme.sides[0].id === theme.sides[1].id
  ) {
    throw new TypeError('La temática debe definir exactamente dos lados distintos.')
  }

  const humanSide = theme.sides.find((side) => side.id === selection.humanSideId)
  if (!humanSide) {
    throw new RangeError('Selecciona uno de los lados de la temática.')
  }

  const scene = theme.scenes.find((item) => item.id === selection.sceneId)
  if (!scene) {
    throw new RangeError('Selecciona un escenario de la temática.')
  }

  if (!Number.isInteger(selection.difficulty) || selection.difficulty < 1 || selection.difficulty > 5) {
    throw new RangeError('La dificultad debe ser un número entero del 1 al 5.')
  }

  const machineSide = theme.sides.find((side) => side.id !== humanSide.id)
  return {
    themeId: theme.id,
    humanSideId: humanSide.id,
    machineSideId: machineSide.id,
    sceneId: scene.id,
    difficulty: selection.difficulty,
  }
}
