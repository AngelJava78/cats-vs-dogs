# Implementation Plan: Juego de tres en raya configurable

**Branch**: `001-juego-configurable` | **Date**: 2026-10-08 | **Spec**: `specs/001-juego-configurable/spec.md`

**Input**: Feature specification from `/specs/001-juego-configurable/spec.md`

## Summary

La aplicación permitirá configurar y jugar Tres en Raya contra la máquina en el
navegador. Antes de iniciar, la persona elige una de cuatro temáticas, su lado (el
opuesto queda asignado a la máquina), escenario y nivel. Una partida nueva sortea
con probabilidades iguales quién empieza. El proyecto greenfield usa React
funcional con hooks, JavaScript ES6, Vite y CSS responsive; las reglas puras, las
estrategias de máquina y los datos de temas se mantienen separados de la
presentación. No se incluye backend, persistencia ni autenticación.

## Technical Context

**Language/Version**: JavaScript ES6, React 18+, Vite

**Primary Dependencies**: React and Vite; responsive CSS; Vitest and React Testing Library are proposed for automated tests

**Storage**: None; in-memory browser session state only

**Testing**: Unit tests for pure game and AI modules; component/integration tests for configuration and play; manual browser checks at 320 px and 1280 px

**Target Platform**: modern desktop and mobile browsers

**Project Type**: frontend web app

**Performance Goals**: Local moves and board updates have no network dependency; user-facing validation uses the measurable completion-time and viewport criteria in the specification

**Constraints**: Greenfield; React functional components and hooks; browser-only; no backend, database, authentication, or persistence; responsive CSS; themes cannot alter rules; all five AI levels share one move-selection contract; level 5 must be optimal; starter is selected with equal probability each game

**Scale/Scope**: Single-page app, four themes and seven scenarios, five difficulty levels, one local human-versus-machine match at a time

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: User-centered play is supported by a clear setup flow, visible current turn/result, and a fair starter selection.
- PASS: Keyboard operation, accessible names, non-color-only side identification, and assistive status announcements are included in requirements.
- PASS: Rule logic and presentation are separate; theme data cannot define legal moves or outcomes.
- PASS: Game rules and deterministic AI tactics are testable; randomized rates have measurable acceptance criteria.
- PASS: Responsive usability and recovery from invalid moves or abandoning an active game are specified.
- PASS: Simplicity and privacy are preserved; no accounts, personal-data collection, backend, database, or persistence in v1.
- Post-design gate: PASS. The model, contracts, and validation guide preserve all principles; no exception or added project is required.

## Project Structure

### Documentation (this feature)

```text
specs/001-juego-configurable/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
├── components/
│   ├── Board.jsx
│   ├── Cell.jsx
│   ├── ThemeSelector.jsx
│   ├── DifficultySelector.jsx
│   └── StatusPanel.jsx
├── config/
│   ├── themes.js
│   └── difficultyLevels.js
├── game/
│   ├── rules.js
│   ├── state.js
│   └── starterSelection.js
├── ai/
│   ├── strategies.js
│   └── minimax.js
├── hooks/
│   ├── useGameState.js
│   └── useTheme.js
├── styles/
│   ├── layout.css
│   ├── board.css
│   └── theme.css
└── main.jsx

tests/
├── unit/
│   ├── game-rules.test.js
│   ├── minimax.test.js
│   ├── difficulty-strategies.test.js
│   ├── starter-selection.test.js
│   └── theme-config.test.js
├── integration/
│   ├── setup-flow.test.js
│   └── gameplay-flow.test.js
```

**Structure Decision**: Single-page React frontend with explicit folders for visual
components, theme configuration, pure game rules, machine strategies, hooks/state,
and tests. No backend or persistence layer. Theme/player identity is data; the rule
engine uses only the two player identifiers, board, and turn state. The machine move
contract accepts the current game state and level, and returns one legal cell index.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations observed; no complexity exception required.
