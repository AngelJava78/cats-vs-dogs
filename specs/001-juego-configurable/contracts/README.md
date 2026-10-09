# Internal Contracts: Tres en Raya configurable

This v1 exposes no server API or external integration. These internal module
contracts define the boundaries needed to keep rules, machine behavior, visual
configuration, and React presentation independent.

## Game rules contract

- Input: board of nine empty-or-side-id cells, current side id, move index.
- Output: accepted/rejected move and updated board, next side, match status, and
  winning line when applicable.
- A move is legal only in a playing match, for the current side, at an empty cell.
- The rules module knows only the two side identifiers; it does not import React
  or read theme, scene, token, or background configuration.

## Starting-player contract

- Input: available participant identifiers (human and machine).
- Output: exactly one identifier selected with equal probability.
- A new match must call this once; if machine is selected, the machine opens with
  a legal move.

## Machine strategy contract

- Input: current playing position and difficulty level 1-5.
- Output: one legal empty-cell index, or no move if the game is terminal/full.
- All five levels implement the same contract.
- Levels 1-4 follow the probability and tactical priorities in the specification;
  level 5 returns an optimal move for standard 3 x 3 rules.
- Machine logic does not import or inspect visual components.

## Theme configuration contract

- A theme contains a stable id, display name, exactly two sides, and one or more
  scenes.
- Each side contains a stable id, display label, visible token representation,
  and accessible text label.
- Each scene contains a stable id, display name, and visual background reference.
- The human chooses one side; the remaining side is assigned to the machine.
- Rendering may use theme and scene data; the game-rules module may not.

## UI behavior contract

- Setup exposes theme, human-side, scene, and difficulty selection before starting.
- Match view presents a 3 x 3 board, current participant, and final result.
- Cells with moves are operable by keyboard and touch, expose accessible names,
  and show visible focus/selection feedback.
- Turn and outcome information is conveyed to assistive technology and not by
  color alone.
- Returning to setup from a live game requires confirmation; a new match keeps
  the current configuration and draws a new starter.
