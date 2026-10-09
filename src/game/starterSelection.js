export function selectStartingSide(
  humanSideId,
  machineSideId,
  random = Math.random,
) {
  if (
    !humanSideId ||
    !machineSideId ||
    humanSideId === machineSideId
  ) {
    throw new TypeError('Se requieren dos participantes distintos.')
  }

  const value = random()
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('La fuente aleatoria debe devolver un número entre 0 y 1.')
  }

  return value < 0.5 ? humanSideId : machineSideId
}
