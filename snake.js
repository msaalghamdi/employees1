import {
  BOARD_SIZE,
  createInitialState,
  setDirection,
  tick,
  togglePause
} from "./gameLogic.js";

const board = document.getElementById("board");
const scoreValue = document.getElementById("score");
const statusValue = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const pauseButton = document.getElementById("pauseButton");
const controlButtons = document.querySelectorAll("[data-direction]");

const KEY_TO_DIRECTION = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right"
};

const TICK_MS = 140;
let state = createInitialState();
let timerId = null;

const cells = buildGrid();
render();
startLoop();

document.addEventListener("keydown", handleKeydown);
restartButton.addEventListener("click", () => {
  state = createInitialState();
  render();
});

pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
});

for (const button of controlButtons) {
  button.addEventListener("click", () => {
    state = setDirection(state, button.dataset.direction);
  });
}

function buildGrid() {
  const nextCells = [];

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
    nextCells.push(cell);
  }

  return nextCells;
}

function render() {
  for (const cell of cells) {
    cell.className = "cell";
  }

  for (let i = state.snake.length - 1; i >= 0; i -= 1) {
    const segment = state.snake[i];
    const index = toIndex(segment.x, segment.y);
    if (index >= 0) {
      cells[index].classList.add("snake");
    }
  }

  const head = state.snake[0];
  const headIndex = toIndex(head.x, head.y);
  if (headIndex >= 0) {
    cells[headIndex].classList.add("snake-head");
  }

  const foodIndex = toIndex(state.food.x, state.food.y);
  if (foodIndex >= 0) {
    cells[foodIndex].classList.add("food");
  }

  scoreValue.textContent = String(state.score);
  statusValue.textContent = state.status;
  pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
}

function startLoop() {
  if (timerId !== null) {
    window.clearInterval(timerId);
  }

  timerId = window.setInterval(() => {
    const nextState = tick(state);
    if (nextState !== state) {
      state = nextState;
      render();
    }
  }, TICK_MS);
}

function handleKeydown(event) {
  if (event.code === "Space") {
    event.preventDefault();
    state = togglePause(state);
    render();
    return;
  }

  const direction = KEY_TO_DIRECTION[event.code];
  if (!direction) {
    return;
  }

  event.preventDefault();
  state = setDirection(state, direction);
}

function toIndex(x, y) {
  if (x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE) {
    return -1;
  }

  return y * BOARD_SIZE + x;
}