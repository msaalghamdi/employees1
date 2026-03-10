# Snake (Classic)

Minimal classic Snake implementation with:
- Grid movement
- Food spawn
- Growth on eat
- Score
- Game over on wall/self collision
- Pause/Resume and Restart

## Run

1. From this folder, start a static server:
   - `python -m http.server 5173`
   - or `npx serve .` (if you already use Node tooling)
2. Open: `http://localhost:5173/index.html`

## Manual verification checklist

- Move with Arrow keys and `W/A/S/D`.
- Confirm snake cannot reverse direction directly (e.g., right to left).
- Confirm score increases by 1 when food is eaten.
- Confirm snake length grows after eating food.
- Confirm game ends when snake hits a wall.
- Confirm game ends when snake hits itself.
- Confirm `Pause`/`Resume` works (button and Space key).
- Confirm `Restart` resets score, snake, and game status.
- Confirm on-screen direction buttons work for touch/mobile use.

## Notes

- No extra dependencies were added.
- Core deterministic game logic is isolated in `gameLogic.js`.
- No test runner was present in this repository, so automated tests were not added.