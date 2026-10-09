# Tasks: Tres en Raya configurable

**Input**: Design documents from `/specs/001-juego-configurable/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/README.md`, `quickstart.md`

**Tests**: Included because the constitution requires automated coverage of game
behavior and the specification includes measurable strategy outcomes.

**Organization**: Tasks are grouped by user story. Story IDs follow the numbered
user stories in `spec.md`; phases are ordered by priority (P1 before P2).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: The task can run in parallel because it edits distinct files and has no
  dependency on incomplete tasks.
- **[Story]**: The user story served by the task.
- Every task description names its target file path.

## Path Conventions

Single frontend project: `src/` and `tests/` at repository root.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the greenfield React/Vite app and test tooling.

- [X] T001 Create the root `package.json` with React, React DOM, Vite, Vitest, React Testing Library, user-event, and test/dev/build scripts.
- [X] T002 Create the Vite entry files `index.html`, `vite.config.js`, `src/main.jsx`, and the initial `src/app/App.jsx` mount.
- [X] T003 [P] Configure Vitest and browser-like test setup in `vitest.config.js` and `src/test/setup.js`.
- [X] T004 [P] Create shared responsive page defaults and global focus styles in `src/styles/global.css`.

**Checkpoint**: `npm run dev` starts the blank app and `npm run test` runs the configured test runner.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish domain rules and match-state primitives shared by all stories.

- [X] T005 [P] Write unit tests for 3x3 board initialization, valid/invalid moves, all eight win lines, draw detection, terminal-state move rejection, and turn alternation in `tests/unit/game-rules.test.js`; also test that the baseline machine move is legal for a playing board and returns no move for a terminal/full board in `tests/unit/machine-strategy-contract.test.js`.
- [X] T006 Implement pure board and move rules in `src/game/rules.js`; accept only indices 0-8 on empty cells in a playing game, evaluate all eight lines before draw, and keep React/theme imports out.
- [X] T007 Implement match-state creation and transitions in `src/game/state.js`; track a nine-cell board, distinct human/machine side IDs, current/starting side IDs, status, winning line, and move count (0-9 matching occupied cells). Also provide the legal-random baseline machine move in `src/ai/strategies.js` so setup can start a playable match before difficulty-specific behavior is added.
- [X] T008 [P] Write starter-selection tests in `tests/unit/starter-selection.test.js`, injecting random values to verify both participants can be selected and boundary values map correctly.
- [X] T009 Implement equal-probability starter selection with an injectable random source in `src/game/starterSelection.js`; choose only the human or machine participant and never use prior-match history.

**Checkpoint**: The domain model and match-state transitions pass their unit tests without rendering React or reading theme configuration.

## Phase 3: User Story 1 - Configurar una partida (Priority: P1)

**Goal**: Let the player choose a valid theme, side, scene, and difficulty and start a match using that configuration.

**Independent Test**: Select each included theme, both player-side choices, an available scene, and each difficulty; verify the other side is assigned to the machine and the selected values initialize the match. Start repeated matches and verify the starter draw can select either participant with equal probability.

### Tests for User Story 1

- [X] T010 [P] [US1] Test the theme catalog for four unique themes, exactly two distinct sides per theme, and 1+ uniquely identified scenes per theme in `tests/unit/theme-config.test.js`.
- [X] T011 [P] [US1] Test invalid/missing theme, side, scene, and difficulty selections plus opposite-side assignment in `tests/unit/match-config.test.js`.
- [X] T012 [P] [US1] Test theme/side/scene/difficulty selection, machine-side derivation, and match start callback in `tests/integration/setup-flow.test.jsx`.

### Implementation for User Story 1

- [X] T013 [P] [US1] Define the four data-driven themes, their two sides, accessible token labels, and seven named scene/background references in `src/config/themes.js`.
- [X] T014 [US1] Implement `MatchConfig` validation in `src/game/matchConfig.js`; require valid theme and scene references, difficulty 1-5, and assign the machine the other of the theme's two distinct sides.
- [X] T015 [P] [US1] Implement theme and scene selection controls in `src/components/ThemeSelector.jsx`; update available side and scene options when the theme changes.
- [X] T016 [P] [US1] Implement the five named difficulty choices and human-side selection in `src/components/DifficultySelector.jsx`; use explicit labels from the spec and do not allow duplicate sides.
- [X] T017 [US1] Build the configuration form and start action in `src/components/SetupScreen.jsx`; expose selected theme, side, scene, and difficulty in the accessible form.
- [X] T018 [US1] Connect setup to validated match initialization and equal-probability starter selection in `src/app/App.jsx`; if the machine starts, request its opening move through the common machine-move entry point.
- [X] T019 [P] [US1] Style the setup form and theme/scene previews for desktop and mobile in `src/styles/setup.css`.

**Checkpoint**: Configuration tests pass; each theme has exactly two distinct sides and valid scene choices, and starting a match retains all selected settings.

## Phase 4: User Story 2 - Jugar y conocer el resultado (Priority: P1)

**Goal**: Play legal human-versus-machine turns on a 3x3 board and show wins, draws, and the active turn.

**Independent Test**: Start a match from a valid seeded state, play legal turns, and verify all win/draw outcomes, rejection of occupied cells, and no changes after the terminal result.

### Tests for User Story 2

- [X] T020 [P] [US2] Add integration cases for human and machine turns, occupied-cell rejection, each terminal outcome, and post-game input rejection in `tests/integration/gameplay-flow.test.jsx`.
- [X] T021 [P] [US2] Add accessibility checks for cell names, keyboard operation, visible focus, and announced turn/result updates in `tests/integration/game-accessibility.test.jsx`.
- [X] T022 [P] [US2] Test React game-state orchestration for current-turn enforcement, one machine response after a human move, and no machine response after terminal status in `tests/unit/use-game-state.test.jsx`.

### Implementation for User Story 2

- [X] T023 [US2] Implement React state orchestration in `src/hooks/useGameState.js`; dispatch only legal current-player moves, call the machine only on its turn, and stop on terminal status or full board.
- [X] T024 [P] [US2] Implement the 3x3 accessible board and cell controls in `src/components/Board.jsx` and `src/components/Cell.jsx`; label each cell, support keyboard/touch activation, and show focus/selection feedback.
- [X] T025 [P] [US2] Implement current-turn, winner, and draw messaging with accessible live announcements in `src/components/StatusPanel.jsx`.
- [X] T026 [US2] Render the configured match view and connect `useGameState`, `Board`, and `StatusPanel` in `src/app/App.jsx`; render each side through its configured token representation, not color alone.
- [X] T027 [P] [US2] Implement responsive board sizing, clear side tokens, selected-cell and keyboard-focus states in `src/styles/board.css`.

**Checkpoint**: A complete game can be played using a legal baseline machine move; every terminal outcome is announced and locks the board.

## Phase 5: User Story 4 - Enfrentar distintos niveles de máquina (Priority: P1)

**Goal**: Make the five difficulty choices produce the specified distinct behavior, with optimal play at level 5.

**Independent Test**: Exercise immediate-win and immediate-threat positions at levels 3-5; sample 100 level-2 threat decisions and 100 level-4 non-tactical decisions against the specification's acceptance ranges; verify level 5 does not lose from any valid position with a non-losing continuation.

### Tests for User Story 4

- [X] T028 [P] [US4] Test Minimax against immediate wins, forced blocks, draw-preserving positions, and all reachable valid board states in `tests/unit/minimax.test.js`.
- [X] T029 [P] [US4] Test the shared strategy contract and level 1-4 tactical/random behavior, including the 40-60/100 level-2 blocking and 70-90/100 level-4 optimal-move ranges in `tests/unit/difficulty-strategies.test.js`.

### Implementation for User Story 4

- [X] T030 [P] [US4] Implement optimal search for standard 3x3 positions in `src/ai/minimax.js`; return a legal best move and prefer faster wins/slower losses without importing UI or theme modules.
- [X] T031 [P] [US4] Define the five levels and their display labels and strategy identifiers in `src/config/difficultyLevels.js`.
- [X] T032 [US4] Implement strategy dispatch in `src/ai/strategies.js`: level 1 uniform random; level 2 block an immediate human win in 50% of threat decisions, otherwise random; level 3 take an immediate machine win then block an immediate human win; level 4 take/block immediate tactics and choose Minimax in 80% of other decisions; level 5 always choose an optimal move.
- [X] T033 [US4] Pass the selected difficulty and injectable random source from `src/hooks/useGameState.js` to the strategy dispatcher; preserve the same move contract and reject non-legal strategy output.

**Checkpoint**: Each level follows its specified behavior, and level 5 cannot lose when a non-losing move exists.

## Phase 6: User Story 3 - Reiniciar o cambiar la partida (Priority: P2)

**Goal**: Start another match with the current setup or return to setup to change theme, scene, or difficulty.

**Independent Test**: Start and finish a match, restart with the same configuration, and verify that returning to setup during an active match requires confirmation before discarding it.

### Tests for User Story 3

- [X] T034 [P] [US3] Test new-match reset, retained configuration, fresh starter selection, and confirm/cancel behavior when abandoning an active match in `tests/integration/match-lifecycle.test.jsx`.

### Implementation for User Story 3

- [X] T035 [US3] Implement restart and return-to-setup actions in `src/components/MatchControls.jsx`; restart with the current configuration and request confirmation before discarding a playing match.
- [X] T036 [US3] Connect lifecycle actions in `src/app/App.jsx`; cancellation must retain the exact active state, while confirmation returns to setup and a new match draws a new starter.
- [X] T037 [P] [US3] Style confirmation and lifecycle controls for keyboard, touch, and narrow viewports in `src/styles/match-controls.css`.

**Checkpoint**: Restart and return-to-setup work without reloading the application or silently discarding an active game.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete cross-story responsive, accessibility, and quickstart validation.

- [X] T038 [P] Add an end-to-end smoke test covering theme setup, starter selection, a game result, restart, and return-to-setup in `tests/integration/app-smoke.test.jsx`.
- [X] T039 [P] Verify the initial four theme visual treatments and seven scene backgrounds remain legible with both sides distinguished without color alone in `src/styles/theme.css`.
- [X] T040 Validate keyboard and touch operation and board usability at 320 px and 1280 px; record any fixes in `src/styles/global.css`, `src/styles/setup.css`, and `src/styles/board.css`.
- [X] T041 Run the scenarios and commands documented in `specs/001-juego-configurable/quickstart.md`; update the guide only if execution commands or expected results differ.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No prerequisites; must complete before tests or UI can run.
- **Foundational (Phase 2)**: Depends on setup; provides tested rules, match state, and starter selection needed by every story.
- **US1 (Phase 3)**: Depends on foundation; can build and test configuration independently. Uses the shared baseline machine entry point until US4 supplies difficulty strategies.
- **US2 (Phase 4)**: Depends on foundation; its runnable match flow also consumes the configuration contract from US1. The baseline random strategy keeps a playable match available before US4.
- **US4 (Phase 5)**: Depends on foundation and the US2 machine-move contract; can otherwise be developed in parallel with US1.
- **US3 (Phase 6)**: Depends on US1 setup and US2 match lifecycle; should follow their integration.
- **Polish (Phase 7)**: Depends on the desired user stories being integrated.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2. Configuration can be tested independently; full browser start/play flow uses the US2 baseline match view.
- **US2 (P1)**: Starts after Phase 2. A seeded game is independently testable with the baseline legal-random machine; UI integration uses US1 setup.
- **US4 (P1)**: Starts after Phase 2 and the US2 strategy contract. It replaces baseline move selection without changing the UI contract.
- **US3 (P2)**: Requires US1 and US2 because it restarts their configured matches and returns to their setup.

### Within Each User Story

- Write listed tests before implementing their corresponding behavior.
- Keep rules and AI modules independent from React and theme rendering.
- Integrate UI only after its relevant component and state tasks exist.
- Run the story's independent tests at its checkpoint before starting dependent work.

### Parallel Opportunities

- Setup tasks T003 and T004 can run alongside T001/T002 after the repository structure is initialized.
- Foundational rule tests (T005) and starter tests (T008) target separate files; implement T006/T007 and T009 after the corresponding tests.
- Within US1, theme catalog tests (T010), match-config tests (T011), and setup interaction tests (T012) target separate files; selector components T015/T016 and setup styles T019 are separable after the domain config exists.
- Within US2, gameplay integration tests (T020), accessibility tests (T021), board components T023, status component T024, and board styles T027 use separate files.
- Within US4, Minimax tests (T028) and strategy tests (T029) are separate; Minimax implementation (T030) and difficulty metadata (T031) can be developed in parallel before T032.
- US1 and the pure AI work in US4 can proceed in parallel once Phase 2 is complete, provided T033 waits for the US2 hook and T032.
- Within US3, lifecycle tests (T034) and control styles (T037) target separate files; app integration T036 follows controls and tests.

## Parallel Example: User Story 1

```text
Task T010: Test theme catalog in tests/unit/theme-config.test.js
Task T011: Test match configuration in tests/unit/match-config.test.js
Task T012: Test setup interaction in tests/integration/setup-flow.test.jsx
```

## Parallel Example: User Story 4

```text
Task T028: Test Minimax in tests/unit/minimax.test.js
Task T029: Test difficulty strategies in tests/unit/difficulty-strategies.test.js
Task T030: Implement Minimax in src/ai/minimax.js
Task T031: Define difficulty metadata in src/config/difficultyLevels.js
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete US1 configuration and US2 playable game as the smallest useful MVP pair.
3. Validate setup, all game outcomes, and invalid moves independently.
4. Complete US4 so every configured difficulty has its promised behavior.
5. Complete US3 restart/return flows and Phase 7 cross-cutting checks.

### Incremental Delivery

1. Deliver configuration and a playable baseline game.
2. Add and validate the five strategy levels without changing the UI contract.
3. Add restart and confirmed return-to-setup lifecycle flows.
4. Finish responsive, accessibility, and quickstart validation.
