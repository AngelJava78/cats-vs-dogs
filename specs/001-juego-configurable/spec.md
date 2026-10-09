# Feature Specification: Tres en Raya configurable

**Feature Branch**: `001-juego-configurable`

**Created**: 2026-10-08

**Status**: Draft

**Input**: User description: "Crear una aplicación web de Tres en Raya configurable, donde una persona juega contra la máquina. Permite elegir temática, fichas/equipos, escenario y dificultad antes de jugar; ofrece cinco niveles de máquina, reglas estándar de Tres en Raya, opción de nueva partida y regreso a configuración."

## Clarifications

### Session 2026-10-08

- Q: ¿Quién debe realizar el primer movimiento de cada partida? → A: Se decide al azar en cada partida, con la misma probabilidad para la persona y la máquina.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configurar una partida (Priority: P1)

Como jugador, quiero elegir una temática, los lados que jugarán cada participante, el
escenario y la dificultad antes de empezar para personalizar la partida.

**Why this priority**: La configuración permite adaptar el juego a las temáticas
disponibles y es necesaria para comenzar una partida.

**Independent Test**: Se puede elegir una combinación válida de tema, lado para cada
participante, escenario y dificultad, iniciar una partida y verificar que esos valores
se reflejen en el tablero.

**Acceptance Scenarios**:

1. **Given** la pantalla de configuración, **When** el jugador selecciona una temática
   y un escenario, **Then** se muestran los dos lados disponibles y la partida utiliza
   la representación visual y el fondo seleccionados.
2. **Given** una temática con dos lados, **When** el jugador asigna un lado a sí mismo,
   **Then** el lado restante queda asignado a la máquina y ambos participantes se
   distinguen claramente.
3. **Given** la configuración de partida, **When** el jugador elige uno de los cinco
   niveles y comienza, **Then** la partida inicia con la dificultad seleccionada.
4. **Given** una partida nueva, **When** se inicia, **Then** se sortea con la misma
   probabilidad si comienza la persona o la máquina.

---

### User Story 2 - Jugar y conocer el resultado (Priority: P1)

Como jugador, quiero jugar en un tablero de 3 x 3 contra la máquina, ver de quién es
el turno y conocer el resultado para completar una partida con reglas claras.

**Why this priority**: Es el flujo principal que entrega el valor básico del producto.

**Independent Test**: Se puede completar una partida y verificar turnos alternados,
movimientos válidos, detección automática de victoria o empate y bloqueo de jugadas
después del final.

**Acceptance Scenarios**:

1. **Given** una partida en curso, **When** el jugador selecciona una casilla libre,
   **Then** su ficha aparece allí, se indica el turno de la máquina y esta realiza una
   jugada válida.
2. **Given** un tablero con tres fichas consecutivas del mismo lado, **When** se realiza
   la jugada que completa la línea, **Then** la partida termina y anuncia el ganador.
3. **Given** un tablero lleno sin una línea ganadora, **When** se ocupa la última casilla,
   **Then** la partida termina y muestra empate.
4. **Given** una partida terminada, **When** el jugador intenta seleccionar una casilla,
   **Then** el tablero no cambia y el resultado permanece visible.

---

### User Story 3 - Reiniciar o cambiar la partida (Priority: P2)

Como jugador, quiero iniciar otra partida o volver a la configuración para elegir otra
temática, escenario o dificultad.

**Why this priority**: Permite volver a jugar con rapidez y aprovechar las opciones de
personalización sin recargar la aplicación.

**Independent Test**: Después de terminar una partida, se puede empezar una nueva con
el mismo ajuste o volver a configurar y comenzar otra con los cambios elegidos.

**Acceptance Scenarios**:

1. **Given** una partida terminada, **When** el jugador elige nueva partida, **Then** se
   muestra un tablero limpio con la configuración actual.
2. **Given** una partida en curso, **When** el jugador decide volver a configuración,
   **Then** se le pide confirmar antes de descartar la partida actual.
3. **Given** una partida terminada, **When** el jugador vuelve a configuración y cambia
   tema, escenario o dificultad, **Then** una nueva partida utiliza los valores
   actualizados.

---

### User Story 4 - Enfrentar distintos niveles de máquina (Priority: P1)

Como jugador, quiero que la máquina juegue de forma acorde al nivel seleccionado para
escoger una partida desde muy fácil hasta muy difícil.

**Why this priority**: Los cinco niveles forman parte explícita de la experiencia
solicitada y el nivel más alto debe ofrecer juego óptimo.

**Independent Test**: Se prueban posiciones representativas con cada dificultad para
verificar el comportamiento descrito; en el nivel 5 se valida que la máquina no pierde
si existe una estrategia que evita la derrota.

**Acceptance Scenarios**:

1. **Given** el nivel 1 seleccionado, **When** la máquina juega, **Then** elige
   uniformemente al azar entre las casillas libres y no prioriza ganar ni bloquear.
2. **Given** el nivel 2 seleccionado y el jugador amenaza con ganar en una jugada,
   **When** la máquina elige su siguiente movimiento, **Then** bloquea la amenaza en
   aproximadamente la mitad de las decisiones y elige al azar en las demás.
3. **Given** el nivel 3 seleccionado, **When** la máquina puede ganar en una jugada o
   el jugador amenaza con ganar en una jugada, **Then** la máquina gana o bloquea esa
   amenaza, respectivamente.
4. **Given** el nivel 4 seleccionado, **When** existe una victoria inmediata o una
   amenaza inmediata, **Then** la máquina la aprovecha o la bloquea.
5. **Given** el nivel 4 seleccionado y una posición sin victoria o amenaza inmediata,
   **When** la máquina elige su siguiente movimiento, **Then** elige una jugada óptima
   en aproximadamente cuatro de cada cinco decisiones y una jugada legal aleatoria en
   las demás.
6. **Given** el nivel 5 seleccionado, **When** la máquina responde a cualquier posición
   válida, **Then** elige una jugada óptima y no pierde si puede evitar la derrota.

### Edge Cases

- Si se selecciona una casilla ocupada, el tablero no cambia y la partida permanece en
  el mismo turno.
- Si se intenta mover fuera del turno del jugador o después de un resultado final, la
  acción no produce un movimiento.
- La máquina no realiza movimiento cuando la partida ya terminó o no quedan casillas
  libres.
- Si no hay una victoria inmediata ni una casilla que bloquee una amenaza, la máquina
  elige entre las jugadas restantes según el nivel seleccionado.
- Si el jugador vuelve a configuración durante una partida activa, esta solo se
  descarta después de confirmar la acción.
- La configuración no permite asignar el mismo lado tanto al jugador como a la máquina.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación MUST permitir configurar una partida antes de comenzar:
  temática, lado del jugador, lado de la máquina, escenario y dificultad.
- **FR-002**: Cada temática MUST ofrecer exactamente dos lados jugables, cada uno con
  nombre y representación visual propios.
- **FR-003**: Cada temática MUST permitir uno o más escenarios seleccionables, cada uno
  con un nombre y un fondo visual asociado.
- **FR-004**: La aplicación MUST incluir las temáticas América vs Chivas (Estadio Azteca
  y Estadio MetLife), Real Madrid vs Barcelona (Estadio Santiago Bernabéu y Camp Nou),
  Gatos vs Perros (Casa y Veterinaria) y X vs O (Tablero tradicional).
- **FR-005**: La aplicación MUST permitir agregar temáticas, lados y escenarios sin
  modificar las reglas principales del Tres en Raya.
- **FR-006**: La lógica que determina movimientos legales, turnos, victoria y empate
  MUST funcionar independientemente de la temática y su representación visual.
- **FR-007**: La partida MUST presentar un tablero de tres filas por tres columnas y
  permitir que una persona juegue contra la máquina.
- **FR-008**: El jugador y la máquina MUST alternar turnos, y la máquina MUST seleccionar
  únicamente casillas libres.
- **FR-009**: La aplicación MUST impedir que se ocupe una casilla más de una vez y
  MUST ignorar movimientos que no correspondan al turno del jugador.
- **FR-010**: La aplicación MUST detectar automáticamente la victoria de cualquiera de
  los participantes y el empate cuando el tablero queda lleno sin ganador.
- **FR-011**: Al terminar la partida, la aplicación MUST impedir más movimientos y
  MUST mostrar claramente si ganó el jugador, ganó la máquina o hubo empate.
- **FR-012**: La aplicación MUST ofrecer cinco niveles: 1 Muy fácil, 2 Fácil, 3 Normal,
  4 Difícil y 5 Muy difícil.
- **FR-013**: Todos los niveles de dificultad MUST seguir el mismo contrato de selección
  de jugada; su lógica MUST estar separada de los componentes visuales.
- **FR-014**: El nivel 1 MUST seleccionar uniformemente al azar entre las casillas
  libres y MUST NOT priorizar victorias ni bloqueos.
- **FR-015**: Ante una amenaza inmediata, el nivel 2 MUST bloquear en la mitad de las
  decisiones y elegir al azar en la otra mitad.
- **FR-016**: El nivel 3 MUST priorizar una victoria inmediata y MUST bloquear una
  victoria inmediata del jugador cuando exista.
- **FR-017**: El nivel 4 MUST aprovechar victorias inmediatas y bloquear amenazas
  inmediatas. En las demás posiciones, MUST elegir una jugada óptima en cuatro de cada
  cinco decisiones y una jugada legal aleatoria en las restantes.
- **FR-018**: El nivel 5 MUST elegir movimientos óptimos y no perder cuando exista una
  estrategia que permita evitar la derrota.
- **FR-019**: La aplicación MUST permitir iniciar una nueva partida con la configuración
  actual y regresar a configuración para cambiar temática, escenario o dificultad.
- **FR-020**: La aplicación MUST pedir confirmación antes de descartar una partida activa
  al regresar a configuración.
- **FR-021**: La aplicación MUST mostrar el lado que tiene el turno y dar feedback visual
  al seleccionar o enfocar una casilla.
- **FR-022**: La interfaz MUST ser usable tanto en escritorio como en dispositivos
  móviles, con un tablero que se adapte al ancho disponible.
- **FR-023**: Las fichas MUST distinguirse mediante sus representaciones y no depender
  únicamente del color para identificarlas.
- **FR-024**: Los controles MUST poder operarse con teclado y exponer nombres accesibles;
  la información del juego MUST comunicarse también a tecnologías de asistencia.
- **FR-025**: La primera versión MUST ejecutarse completamente en el navegador, sin
  cuentas de usuario, servicios de backend ni persistencia de partidas.
- **FR-026**: Al iniciar cada partida, la aplicación MUST sortear con la misma
  probabilidad qué participante realiza el primer movimiento.

### Key Entities *(include if feature involves data)*

- **Temática**: conjunto seleccionable que define nombre, dos lados y una colección de
  escenarios con sus fondos.
- **Lado**: equipo, personaje o símbolo que participa; incluye nombre y representación
  visual.
- **Escenario**: opción visual asociada a una temática, con nombre y fondo.
- **Configuración de partida**: temática, lado asignado al jugador, lado asignado a la
  máquina, escenario y nivel de dificultad elegidos.
- **Partida**: tablero de nueve casillas, turno actual, secuencia de movimientos y
  estado de juego (en curso, victoria del jugador, victoria de la máquina o empate).
- **Nivel de dificultad**: uno de los cinco comportamientos disponibles para la
  selección de movimientos de la máquina.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Al menos 4 de cada 5 usuarios nuevos pueden configurar e iniciar una
  partida en menos de 2 minutos sin ayuda.
- **SC-002**: Las cuatro temáticas indicadas y sus siete escenarios pueden seleccionarse
  antes de iniciar una partida.
- **SC-003**: En pruebas con posiciones que permiten ganar o bloquear de inmediato,
  los niveles 3, 4 y 5 ejecutan la acción indicada en todos los casos.
- **SC-004**: En 100 decisiones repetidas ante una amenaza inmediata, el nivel 2 bloquea
  entre 40 y 60 veces; en 100 decisiones sin amenaza ni victoria inmediata, el nivel 4
  elige una jugada óptima entre 70 y 90 veces.
- **SC-005**: En todas las posiciones legales probadas, el nivel 5 no pierde si existe
  una jugada que evita la derrota.
- **SC-006**: El 100% de las partidas completadas muestran el resultado correcto y
  rechazan movimientos posteriores al final.
- **SC-007**: El tablero y sus controles permanecen visibles y utilizables en anchos de
  pantalla de 320 px y 1280 px.

## Assumptions

- Una partida es local y de una sola persona contra la máquina; no hay modo multijugador.
- La temática ofrece dos lados distintos. Al elegir el lado del jugador, el lado
  restante se asigna a la máquina; no se pueden asignar lados iguales.
- El nivel 1 elige al azar sin priorizar tácticas; el nivel 2 bloquea amenazas inmediatas
  en el 50% de las decisiones; el nivel 3 siempre gana o bloquea si existe una jugada
  inmediata; el nivel 4 combina estas acciones tácticas con jugadas óptimas en el 80%
  de otras posiciones; el nivel 5 juega de forma óptima.
- Cambiar la temática, escenario o dificultad ocurre volviendo a configuración. Una
  partida activa solo se descarta tras confirmación.
- La aplicación no almacena partidas ni configuración entre visitas.
- Al iniciar cada nueva partida, la persona y la máquina tienen la misma probabilidad
  de realizar el primer movimiento.
- El usuario puede usar teclado o pantalla táctil; los navegadores de escritorio y
  móviles son compatibles si soportan la aplicación web.
