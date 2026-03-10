export const BOARD_SIZE = 20;
export const INITIAL_DIRECTION = "right";

const VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

export function createInitialState(rng = Math.random) {
  const center = Math.floor(BOARD_SIZE / 2);
  const snake = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center }
  ];

  return {
    snake,
    direction: INITIAL_DIRECTION,
    nextDirection: INITIAL_DIRECTION,
    food: placeFood(snake, rng),
    score: 0,
    status: "running"
  };
}

export function setDirection(state, direction) {
  if (!VECTORS[direction] || state.status !== "running") {
    return state;
  }

  const current = state.nextDirection || state.direction;
  if (OPPOSITES[current] === direction) {
    return state;
  }

  return { ...state, nextDirection: direction };
}

export function tick(state, rng = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const direction = state.nextDirection;
  const vector = VECTORS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + vector.x, y: head.y + vector.y };

  if (isOutOfBounds(nextHead) || hitsSnake(nextHead, state.snake)) {
    return {
      ...state,
      status: "gameover"
    };
  }

  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const nextSnake = ateFood
    ? [nextHead, ...state.snake]
    : [nextHead, ...state.snake.slice(0, -1)];

  return {
    ...state,
    snake: nextSnake,
    direction,
    nextDirection: direction,
    food: ateFood ? placeFood(nextSnake, rng) : state.food,
    score: ateFood ? state.score + 1 : state.score
  };
}

export function togglePause(state) {
  if (state.status === "running") {
    return { ...state, status: "paused" };
  }

  if (state.status === "paused") {
    return { ...state, status: "running" };
  }

  return state;
}

function isOutOfBounds(cell) {
  return (
    cell.x < 0 ||
    cell.x >= BOARD_SIZE ||
    cell.y < 0 ||
    cell.y >= BOARD_SIZE
  );
}

function hitsSnake(cell, snake) {
  return snake.some((segment) => segment.x === cell.x && segment.y === cell.y);
}

export function placeFood(snake, rng = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const freeCells = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return { x: -1, y: -1 };
  }

  const index = Math.floor(rng() * freeCells.length);
  return freeCells[index];
}