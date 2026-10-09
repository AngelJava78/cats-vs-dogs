# Quickstart: validación del Tres en Raya configurable

## Prerrequisitos

- Node.js LTS y npm.
- Navegador moderno con soporte para la aplicación web.

## Inicialización y ejecución local

1. Desde la raíz del proyecto, ejecutar `npm install` para instalar React, Vite
   y las herramientas de prueba.
2. Iniciar el servidor local con `npm run dev` y abrir la URL indicada por Vite.
3. Ejecutar las pruebas automatizadas con `npm test`.
4. Crear la versión de producción con `npm run build`; el resultado se genera en
   `dist/`.
5. Para inspeccionar la versión compilada, ejecutar `npm run preview`.

## Validación funcional manual

1. En configuración, comprobar que están disponibles las cuatro temáticas y los
   siete escenarios enumerados en [data-model.md](data-model.md).
2. Elegir un tema, lado del jugador, escenario y cada nivel de dificultad; confirmar
   que el otro lado queda asignado a la máquina.
3. Iniciar partidas repetidas y confirmar que cualquiera de los participantes puede
   tener el primer turno; verificar que la máquina hace la jugada inicial cuando le
   corresponde.
4. Jugar una partida con una victoria del jugador, una victoria de la máquina y un
   empate; comprobar que el turno y el resultado son claros.
5. Intentar jugar en una casilla ocupada y después de una partida terminada; verificar
   que el tablero no cambia.
6. Volver a configuración durante una partida y cancelar la confirmación; comprobar
   que la partida activa se conserva. Confirmar y verificar que se descarta.
7. Probar controles con teclado y pantalla táctil, incluidos foco visible, nombres
   accesibles y anuncios de turno/resultado.
8. Comprobar que tablero y controles se mantienen visibles y utilizables con ventanas
   de 320 px y 1280 px de ancho.

## Validación automatizada sugerida

- `npm test` valida las reglas para movimientos inválidos, las ocho líneas
  ganadoras, empate, turnos y bloqueo de movimientos tras el final.
- La suite de Minimax explora las respuestas humanas posibles desde ambas
  aperturas y comprueba que el nivel 5 no pierde cuando puede evitarlo.
- Las pruebas de estrategia muestrean 100 decisiones: nivel 2 bloquea entre 40 y
  60 amenazas; nivel 4 elige una jugada óptima entre 70 y 90 veces en posiciones
  no tácticas.
- La prueba de sorteo inyecta valores aleatorios para cubrir ambos participantes
  y el límite de decisión.
- Las pruebas de interfaz recorren configuración, turnos, resultado, teclado,
  reinicio y confirmación para regresar a configuración.
- `npm run build` comprueba que Vite genera el bundle de producción.

## Resultado esperado

Las partidas completas se ejecutan localmente en el navegador, usan la configuración
elegida, siguen turnos legales y terminan en el resultado correcto. Los cambios de
temática afectan solo la presentación, y cada nivel de máquina cumple el
comportamiento descrito en la especificación.
