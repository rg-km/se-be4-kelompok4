const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const CANVAS_SIZE_NYAWA = 500;
const CELL_SIZE_NYAWA = 20;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let MOVE_INTERVAL = 150;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initBalok() {
  return {
    x: 7,
    y: 5,
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(sorce, bdn) {
  return {
    src: sorce,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    badan: bdn,
    nyawa1: 3,
    level: 1,
  };
}

let snake1 = initSnake("assets/snake-head.jpg", "assets/snake-body.png");

let apple = {
  color: "red",
  position: initPosition(),
};

let apple2 = {
  color: "red",
  position: initPosition(),
};

let nyawa = {
  position: initPosition(),
  status: false,
};

let balok = {
  position: { x: 7, y: 5 },
};

let balok2 = {
  position: { x: 13, y: 5 },
};

let balok3 = {
  position: { x: 18, y: 5 },
};

let balok4 = {
  position: { x: 6, y: 6 },
};

let balok5 = {
  position: { x: 6, y: 15 },
};

// sound effect
const GAME_OVER_AUDIO = new Audio('assets/game-over.mp3');
const EAT_APPLE_AUDIO = new Audio('assets/eat-apple.wav');
const EAT_LIFE_AUDIO = new Audio('assets/eat-life.wav');
const UP_LEVEL_AUDIO = new Audio('assets/up-level.wav');

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawUlar(ctx, x, y, sorce) {
  const image = new Image();
  image.src = sorce;
  ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLipe(ctx, x, y, stat) {
  const image = new Image();
  image.src = "assets/heart.png";
  if (stat == true) {
    ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function naikLevel(snake) {
  if (snake.score % 5 == 0) {
    MOVE_INTERVAL = MOVE_INTERVAL - 20;
    snake.level = snake.level + 1;
    alert("Naik Level " + snake.level);
    UP_LEVEL_AUDIO.play();
  }
}

function drawTembok(ctx, x, y) {
  const image = new Image();
  // const image1 = new Image()
  image.src = "assets/block.png";
  // let a = balok.position.x
  for (let i = 0; i <= 12; i++) {
    ctx.drawImage(
      image,
      x * CELL_SIZE,
      (y + i) * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}

function drawTembokHorizontal(ctx, x, y) {
  const image = new Image();
  // const image1 = new Image()
  image.src = "assets/block.png";
  // let a = balok.position.x
  for (let i = 0; i <= 12; i++) {
    ctx.drawImage(
      image,
      (x + i) * CELL_SIZE,
      y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}

function drawNilai(snake) {
  let scoreCanvas;
  scoreCanvas = document.getElementById("score1Board");
  let scoreCtx = scoreCanvas.getContext("2d");
  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "40px Arial";
  scoreCtx.fillStyle = "black";
  scoreCtx.fillText(snake.score, 30, scoreCanvas.scrollHeight / 1.5);
}

function drawDarah(snake) {
  let life = document.getElementById("life");
  const scoreCanvas = document.getElementById("nyawa1");
  let scoreCtx = scoreCanvas.getContext("2d");
  scoreCtx.clearRect(0, 0, CANVAS_SIZE_NYAWA, CELL_SIZE_NYAWA);
  let lebar = 1;
  let tinggi = 1;
  let a = snake.nyawa1;
  for (let i = 0; i < a; i++) {
    scoreCtx.drawImage(life, lebar, tinggi, 20, 20);
    lebar = lebar + 29;
  }
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawUlar(ctx, snake1.head.x, snake1.head.y, snake1.src);

    for (let i = 1; i < snake1.body.length; i++) {
      drawUlar(ctx, snake1.body[i].x, snake1.body[i].y, snake1.badan);
    }

    // render level + speed to html page
    let speedLevel = document.getElementById("speedNumber");
    speedLevel.innerHTML = "Speed: " + MOVE_INTERVAL;

    let levelSnake = document.getElementById("levelNumber");
    levelSnake.innerHTML = "Level: " + snake1.level;

    let app = document.getElementById("apple");
    ctx.drawImage(
      app,
      apple.position.x * CELL_SIZE,
      apple.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    ctx.drawImage(
      app,
      apple2.position.x * CELL_SIZE,
      apple2.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // tambah tembok saat naik level
    if (snake1.level == 2) {
      drawTembok(ctx, balok.position.x, balok.position.y);
    } else if (snake1.level == 3) {
      drawTembok(ctx, balok.position.x, balok.position.y);
      drawTembok(ctx, balok2.position.x, balok2.position.y);
    } else if (snake1.level == 4) {
      drawTembok(ctx, balok.position.x, balok.position.y);
      drawTembok(ctx, balok2.position.x, balok2.position.y);
      drawTembok(ctx, balok3.position.x, balok3.position.y);
    } else if (snake1.level == 5) {
      drawTembokHorizontal(ctx, balok4.position.x, balok4.position.y);
      drawTembokHorizontal(ctx, balok5.position.x, balok5.position.y);
    }

    drawNilai(snake1);
    drawDarah(snake1);

    setInterval(function () {
      drawLipe(ctx, nyawa.position.x, nyawa.position.y, nyawa.status);
    }, 1000);
  }, REDRAW_INTERVAL);
}

function pindah(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function cekBalok(snake) {
  for (let i = 0; i <= 12; i++) {
    if (snake.level == 2) {
      if (
        snake.head.x == balok.position.x &&
        snake.head.y == balok.position.y + i
      ) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    } else if (snake.level == 3) {
      if (
        (snake.head.x == balok.position.x &&
          snake.head.y == balok.position.y + i) ||
        (snake.head.x == balok2.position.x &&
          snake.head.y == balok2.position.y + i)
      ) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    } else if (snake.level == 4) {
      if (
        (snake.head.x == balok.position.x &&
          snake.head.y == balok.position.y + i) ||
        (snake.head.x == balok2.position.x &&
          snake.head.y == balok2.position.y + i) ||
        (snake.head.x == balok3.position.x &&
          snake.head.y == balok3.position.y + i)
      ) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    } else if (snake.level == 5) {
      if (
        (snake.head.x == balok4.position.x + i &&
          snake.head.y == balok4.position.y) ||
        (snake.head.x == balok5.position.x + i &&
          snake.head.y == balok5.position.y)
      ) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    }
  }
}

function eat(snake, apple) {
  cekBalok(snake);
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    EAT_APPLE_AUDIO.play();
    naikLevel(snake);
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    if ((snake.score % 2 != 0 && snake.score > 1) || snake.score == 2) {
      nyawa.status = true;
      if (nyawa.status == true) {
        setTimeout(function () {
          cekBalok(snake);
          nyawa.position = initPosition();
          nyawa.status = false;
        }, 3000);
      }
    } else {
      setTimeout(function () {
        nyawa.status = false;
      });
    }
  } else if (
    snake.head.x == nyawa.position.x &&
    snake.head.y == nyawa.position.y &&
    nyawa.status == true
  ) {
    nyawa.position = initPosition();
    nyawa.status = false;
    snake.nyawa1++;
    EAT_LIFE_AUDIO.play();
  } else if (
    snake.head.x == apple2.position.x &&
    snake.head.y == apple2.position.y
  ) {
    apple2.position = initPosition();
    snake.score++;
    EAT_APPLE_AUDIO.play();
    naikLevel(snake);
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    if ((snake.score % 2 != 0 && snake.score > 1) || snake.score == 2) {
      nyawa.status = true;
      if (nyawa.status == true) {
        setTimeout(function () {
          nyawa.status = false;
          nyawa.position = initPosition();
          cekBalok(snake);
        }, 3000);
      }
    } else {
      setTimeout(function () {
        nyawa.status = false;
      });
    }
  }
}

function moveLeft(snake) {
  snake.head.x--;
  pindah(snake);
  eat(snake, apple);
}

function moveRight(snake) {
  snake.head.x++;
  pindah(snake);
  eat(snake, apple);
}

function moveDown(snake) {
  snake.head.y++;
  pindah(snake);
  eat(snake, apple);
}

function moveUp(snake) {
  snake.head.y--;
  pindah(snake);
  eat(snake, apple);
}

function checkCollision(snakes) {
  let isCollide = false;
  let isWin = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          snakes[i].nyawa1--;
          if (snakes[i].nyawa1 == 0) {
            isCollide = true;
          }
        }
      }
    }
  }

  for (let i = 0; i <= 12; i++) {
    if (snakes[0].level == 2) {
      if (
        snakes[0].head.x == balok.position.x &&
        snakes[0].head.y == balok.position.y + i
      ) {
        cekBalok(snakes[0]);
        snakes[0].nyawa1--;
        snakes[0].head = initPosition();
        if (snakes[0].nyawa1 == 0) {
          isCollide = true;
        }
      }
    } else if (snakes[0].level == 3) {
      if (
        (snakes[0].head.x == balok.position.x &&
          snakes[0].head.y == balok.position.y + i) ||
        (snakes[0].head.x == balok2.position.x &&
          snakes[0].head.y == balok2.position.y + i)
      ) {
        cekBalok(snakes[0]);
        snakes[0].nyawa1--;
        snakes[0].head = initPosition();
        if (snakes[0].nyawa1 == 0) {
          isCollide = true;
        }
      }
    } else if (snakes[0].level == 4) {
      if (
        (snakes[0].head.x == balok.position.x &&
          snakes[0].head.y == balok.position.y + i) ||
        (snakes[0].head.x == balok2.position.x &&
          snakes[0].head.y == balok2.position.y + i) ||
        (snakes[0].head.x == balok3.position.x &&
          snakes[0].head.y == balok3.position.y + i)
      ) {
        cekBalok(snakes[0]);
        snakes[0].nyawa1--;
        snakes[0].head = initPosition();
        if (snakes[0].nyawa1 == 0) {
          isCollide = true;
        }
      }
    } else if (snakes[0].level == 5) {
      if (
        (snakes[0].head.x == balok4.position.x + i &&
          snakes[0].head.y == balok4.position.y) ||
        (snakes[0].head.x == balok5.position.x + i &&
          snakes[0].head.y == balok5.position.y)
      ) {
        cekBalok(snakes[0]);
        snakes[0].nyawa1--;
        snakes[0].head = initPosition();
        if (snakes[0].nyawa1 == 0) {
          isCollide = true;
        }
      }
    }
  }

  if (isCollide) {
    alert("Game over");
    GAME_OVER_AUDIO.play();
    snake1 = initSnake("assets/snake-head.jpg", "assets/snake-body.png");
    MOVE_INTERVAL = 150;
    return isCollide;
  } else if (isWin) {
    alert("Selamat Anda Menang");
    snake1 = initSnake("assets/snake-head.jpg", "assets/snake-body.png");
    return isWin;
  }
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    balok.position = initBalok();
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
