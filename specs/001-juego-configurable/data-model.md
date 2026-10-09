# Data Model: Tres en Raya configurable

## Core entities

### Theme

Represents a user-selectable visual configuration. It does not define rules.

| Field | Type | Description | Validation |
| --- | --- | --- | --- |
| id | string | Stable theme identifier | Required, unique |
| name | string | Display name | Required, non-empty |
| sides | array of Side | The two playable sides | Required, exactly 2; distinct ids |
| scenes | array of Scene | Background choices | Required, at least 1; distinct ids within theme |

### Side

Represents one participant's visual identity within a theme.

| Field | Type | Description | Validation |
| --- | --- | --- | --- |
| id | string | Stable identifier used by match state | Required, unique within theme |
| name | string | Team, character, or symbol label | Required, non-empty |
| token | string | Visible token or icon reference | Required, distinct from opposing side |
| accessibleLabel | string | Text alternative identifying the token | Required, non-empty |

### Scene

Represents one background/setting available for a theme.

| Field | Type | Description | Validation |
| --- | --- | --- | --- |
| id | string | Stable scene identifier | Required, unique within theme |
| name | string | Display name, such as Camp Nou or Casa | Required, non-empty |
| background | string | Background visual reference | Required |

### MatchConfig

Captures the selected setup for one match.

| Field | Type | Description | Validation |
| --- | --- | --- | --- |
| themeId | string | Selected theme | Must reference a defined theme |
| humanSideId | string | Side assigned to the person | Must reference a side in theme |
| machineSideId | string | Side assigned to the machine | Must reference the other side in theme |
| sceneId | string | Selected background | Must reference a scene in theme |
| difficulty | integer | Machine difficulty | Required, 1-5 |

### MatchState

Represents the live state of a single match. The rule engine consumes only player
identifiers and board state; it does not consume `Theme` or `Scene`.

| Field | Type | Description | Validation |
| --- | --- | --- | --- |
| board | array of 9 values | Empty cells or one of the two side ids | Required; length 9 |
| humanSideId | string | Side controlled by the person | Must match `MatchConfig` |
| machineSideId | string | Side controlled by the machine | Must differ from human side |
| currentSideId | string | Participant whose turn it is | One of the two side ids while playing |
| startingSideId | string | Participant randomly chosen to start | One of the two side ids |
| status | enum | `playing`, `human-won`, `machine-won`, or `draw` | Required |
| winningLine | array of 3 indices or null | Cells forming a winning line | Present only for a win |
| moveCount | integer | Number of occupied cells | 0-9; equals occupied cells |

## Relationships

- A `Theme` has exactly two `Side` entities and one or more `Scene` entities.
- A `MatchConfig` references one `Theme`, both of its distinct `Side` entities,
  one of its `Scene` entities, and one difficulty level.
- A `MatchState` is initialized from one `MatchConfig`; it records a fair random
  `startingSideId` and tracks turns using side identifiers.

## State transitions

1. `setup` exists before a match is started and contains a valid `MatchConfig`.
2. Starting a match creates an empty board, randomly assigns `startingSideId`
   with equal probability, and sets `currentSideId` to that side.
3. If the machine starts, it makes a legal opening move before a human move is
   accepted.
4. A legal move fills one empty cell, increments `moveCount`, and either enters
   a terminal state or changes `currentSideId` to the other participant.
5. A legal line of three sets `status` to `human-won` or `machine-won` and records
   `winningLine`.
6. A full board with no winning line sets `status` to `draw`.
7. Terminal states reject all further moves. A new match returns to setup/current
   configuration and initializes an empty board with a new starter draw.
8. Returning to setup from an active match requires confirmation before discarding
   its state.

## Validation rules

- A move index is valid only if it is an integer from 0 through 8, the cell is
  empty, and the match status is `playing`.
- A move is accepted only from the participant whose side matches `currentSideId`.
- After an accepted move, evaluate all eight standard rows, columns, and diagonals;
  record a winner before evaluating a full-board draw.
- The machine strategy must return a legal empty-cell index when called for a
  playing state with available moves.
- Difficulty is an integer from 1 through 5 and resolves to exactly one strategy
  using the shared move-selection contract.
- The starter draw gives each participant probability 1/2 of starting each new
  match, independent of theme, chosen side, and previous matches.
- Theme and scene ids must be unique in their respective scopes; visual labels
  and tokens must be present before a theme can be selected.

## Difficulty behavior summary

| Level | Behavior |
| --- | --- |
| 1 | Uniform random choice among legal moves; no tactical preference |
| 2 | Blocks an immediate human win in 50% of decisions when threatened; otherwise random |
| 3 | Takes an immediate machine win; otherwise blocks an immediate human win |
| 4 | Takes/block immediate tactics; otherwise optimal in 80% of decisions and random in 20% |
| 5 | Optimal move for every valid position; cannot lose when a non-losing move exists |

## Theme examples and scenario counts

- América vs Chivas: Estadio Azteca; Estadio MetLife.
- Real Madrid vs Barcelona: Estadio Santiago Bernabéu; Camp Nou.
- Gatos vs Perros: Casa; Veterinaria.
- X vs O: Tablero tradicional.

These initial themes provide seven selectable scenarios.
