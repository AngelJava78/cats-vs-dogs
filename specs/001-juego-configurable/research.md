# Research: Tres en Raya configurable

## Decision: Frontend platform and project structure

Use the specified React functional components, hooks, JavaScript ES6, Vite, and
responsive CSS. Keep presentation, configuration data, game rules, AI strategies,
and active match state in separate modules. Use in-memory state for the first
version.

### Rationale

This matches the greenfield requirements while avoiding unnecessary server,
storage, and state-management dependencies. Pure JavaScript rules and strategy
modules can be tested without rendering the UI.

### Alternatives considered

- Backend or persisted state: excluded by the browser-only v1 scope.
- A global state library: not needed for a single local match.
- Theme-specific rule variants: rejected because themes must not change legal play.

## Decision: Rule engine model

Represent the board as nine cells containing either an empty value or one of two
player identifiers. The engine validates moves, alternates turns, detects any of
the eight standard three-in-a-row lines, recognizes a full-board draw, and
prevents state changes once the match is terminal.

### Rationale

The canonical board representation is independent of names, images, colors,
backgrounds, React, and the selected theme.

### Alternatives considered

- Using visible symbols such as X, O, or team names as rule values: rejected
  because visual configuration could then affect rule behavior.
- Implementing rules within a component: rejected because it complicates
  independent validation and risks coupling the engine to rendering.

## Decision: Starting player and active state

At the start of every new match, randomly choose the human or machine with equal
probability. Keep selected theme, side assignments, scene, and difficulty as
configuration; initialize a fresh board and match state from that configuration.
If the machine starts, it makes its opening move before accepting a human move.

### Rationale

An explicit unbiased starter rule removes ambiguity from game initialization and
keeps the human/machine role separate from the visual side identifier.

### Alternatives considered

- Always letting the human start: rejected because the clarified requirement is
  to decide randomly.
- Alternating starters by match history: rejected because matches are not
  persisted and no such sequence was requested.

## Decision: Shared strategy contract and difficulty behavior

All five strategies use one contract that receives the current legal match
position and returns a legal cell index. Levels 1 and 2 use uniform random
selection, with level 2 blocking an immediate human win in half of threat
decisions. Level 3 always takes an immediate machine win or blocks an immediate
human win. Level 4 also takes/block immediate tactics and selects an optimal
move in 80% of other decisions, otherwise a legal random move. Level 5 selects
an optimal move for every valid position.

### Rationale

The shared contract keeps callers independent from difficulty details.
Minimax is appropriate for a 3 x 3 game with a finite search tree and can
guarantee that level 5 does not lose when a draw or win remains possible.
Probabilistic levels have measurable rates in the specification.

### Alternatives considered

- Random behavior for all levels: rejected because it does not satisfy defined
  progression.
- Minimax for all levels: rejected because it would remove the specified
  differences between levels.
- Unspecified notions such as “mostly optimal”: rejected in favor of explicit
  decision rates for levels 2 and 4.

## Decision: Theme and scenario configuration

Define themes as data with a stable identifier, display name, exactly two player
sides, and one or more named scenes/backgrounds. A side has its own stable
identifier, label, and non-color visual representation; a scene has an identifier,
name, and background reference. The human chooses one side; the other is assigned
to the machine. The engine receives only the two side identifiers.

### Rationale

Data-driven configuration permits adding teams, characters, symbols, and scenes
without changing the rule engine. Stable identifiers distinguish game state from
presentation.

### Alternatives considered

- Hardcoded rendering and rule branches per theme: rejected because new themes
  would require changes outside configuration.
- Allowing both participants to select the same side: rejected because it makes
  board ownership and winner display ambiguous.

## Decision: Automated and manual validation

Use unit tests for rules, terminal states, all Minimax positions, difficulty
behavior, and equal-probability starter selection. Test randomized behavior with
repeated decisions and acceptance ranges from the spec. Use component/integration
tests for setup, theme/scene changes, turn messaging, keyboard interaction,
abandon confirmation, and match completion. Manually check responsive behavior
at the specified 320 px and 1280 px widths.

### Rationale

Pure logic tests provide precise coverage, while UI and viewport checks validate
the user-visible constitution requirements.

### Alternatives considered

- Only manual end-to-end testing: rejected because it cannot reliably exercise
  every board position or statistical behavior.
- Treating random strategy results as exact per-move guarantees: rejected;
  randomness must be evaluated across repeated decisions with defined ranges.

## Resolved requirements

- Browser-only operation, no backend, database, authentication, or persistence:
  fixed by the project requirements.
- The machine may open a match: it makes a legal first move when selected by the
  fair starter draw.
- Theme extension must not change the rules: addressed through stable visual
  identifiers and a theme-independent engine.
- Difficulty expectations and random selection rates: taken from the clarified
  specification.
