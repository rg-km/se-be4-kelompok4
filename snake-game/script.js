const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 100;
const LIFE = 22;
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 150;

const GAME_OVER_AUDIO = new Audio('assets/game-over.mp3');
const EAT_APPLE_AUDIO = new Audio('assets/eat-apple.wav');
const EAT_LIFE_AUDIO = new Audio('assets/eat-life.wav');
const UP_LEVEL_AUDIO = new Audio('assets/up-level.wav');


function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
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

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    level: 1,
    speed: MOVE_INTERVAL,
  };
}

let snake1 = initSnake("blue");

let apple1 = {
  position: initPosition(),
};

let apple2 = {
  position: initPosition(),
};

let totalLife = 3;

function clearScreen(ctx) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        life: 3,
    }

}


function drawCell(ctx, x, y, snakeId) {
  let img = document.getElementById(snakeId);
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(ctx, snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      drawCell(ctx, snake.head.x, snake.head.y, "leftmouth");
      break;
    case DIRECTION.RIGHT:
      drawCell(ctx, snake.head.x, snake.head.y, "rightmouth");
      break;
    case DIRECTION.DOWN:
      drawCell(ctx, snake.head.x, snake.head.y, "downmouth");
      break;
    case DIRECTION.UP:
      drawCell(ctx, snake.head.x, snake.head.y, "upmouth");
      break;
  }

  for (let i = 1; i < snake.body.length; i++) {
    let part = snake.body[i];
    drawCell(ctx, part.x, part.y, "snake_body");
  }
}

function drawApple(ctx, apple) {
  let img = document.getElementById("apple");
  ctx.drawImage(img,apple.position.x * CELL_SIZE,apple.position.y * CELL_SIZE,CELL_SIZE,CELL_SIZE);
let lifes = {
    position: initPosition(),
}

let apples = [{
    color: "red",
    position: initPosition(),
},
{
    color: "blue",
    position: initPosition(),
}]

function drawSnake(ctx, x, y, head) {
    var head = document.getElementById("snake_head"); 
    ctx.fillStyle = head;
    ctx.drawImage( head, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
      scoreCanvas = document.getElementById("score1Board");
  } else {
      scoreCanvas = document.getElementById("score2Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawSpeed(snake) {
  let speedCanvas;
  if (snake.color == snake1.color) {
    speedCanvas = document.getElementById("speed-board");
  }

  let ctx = speedCanvas.getContext("2d");

  clearScreen(ctx);
  ctx.font = "15px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Speed : " + snake.speed,speedCanvas.scrollWidth / 2,speedCanvas.scrollHeight / 2 + 5);
}

function drawLife(ctx, totalLife) {
  let img = document.getElementById("life");
  let space = CELL_SIZE;
  for (let i = 0; i < totalLife; i++) {
    ctx.drawImage(img, space, CELL_SIZE, CELL_SIZE, CELL_SIZE);
    space = space + LIFE;
  }
}

function drawLevel(snake) {
  let rankCanvas;
  if (snake.color == snake1.color) {
    rankCanvas = document.getElementById("rank-board");
  }

  let ctx = rankCanvas.getContext("2d");

  clearScreen(ctx);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Level : " + snake.level,
    rankCanvas.scrollWidth / 2,
    rankCanvas.scrollHeight / 2 + 5
  );
}

function drawLifeCorner(ctx, snake){
    let imgLife = document.getElementById("life");
    var lifePositionX = 0;
    for (let i = 1; i <= snake.life; i++) {
        ctx.drawImage(imgLife, lifePositionX * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        lifePositionX = lifePositionX + 1;
    }  
}

//function isPrime use for prime number
function isPrime(number) {
    let divider = 0;

    for (let i = 1; i <= number; i++) {
        if (number % i == 0) {
            divider++
        }
    }
    return (divider == 2) ? true : false
}

//drawLife use to display health in canvas
function drawLife(ctx, lifes) {

    let img = document.getElementById("life");
        ctx.drawImage(
            img,
            lifes.position.x * CELL_SIZE,
            lifes.position.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    clearScreen(ctx);

    drawSnake(ctx, snake1);
    
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawSnake(ctx, snake1.head.x, snake1.head.y, document.getElementById("snake_head"));
        for (let i = 1; i < snake1.body.length; i++) {
            drawSnake(ctx, snake1.body[i].x, snake1.body[i].y, document.getElementById("snake_body"));
        }
    
        for(let i=0; i<apples.length;i ++) {
            let apple = apples[i];
            var apple_img = document.getElementById("apple");
            ctx.drawImage(apple_img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        //drawLife Corner
        drawLifeCorner(ctx, snake1);

        //draw health on prime number
        if (isPrime(snake1.score)) {
            drawLife(ctx, lifes);
        }

    drawApple(ctx, apple1);
    drawApple(ctx, apple2);

    drawLife(ctx, totalLife);
    drawLevel(snake1); 
    drawScore(snake1);
    drawSpeed(snake1); 
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
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

function eat(snake, apple) {
  let eatApple = new Audio("./assets/audio/eat-apple.wav");
  let levelUp = new Audio("assets/audio/level-up.mpeg");
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    
    if (snake.body.x != apple.position.x && snake.body.y != apple.position.y) {
      apple.position = initPosition();
    }

    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    eatApple.play(); 

    
    if (snake.score != 0 && snake.score % 5 == 0) {
    
      if (snake.level == 5) {
        snake.level;
      } else {
        levelUp.play();
        snake.level++;
      }
      snake.speed -= 2; 
    }
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function checkCollision(snakes) {
  let isCollide = false;
  let gameOver = new Audio("assets/audio/game-over.wav");

  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;

function eat(snake, apples) {
    for(let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
            EAT_APPLE_AUDIO.play();
        }
    }

    if (snake.head.x == lifes.position.x && snake.head.y == lifes.position.y && isPrime(snake.score)) {
        lifes.position = initPosition();
        snake.life++;
        snake.score++; // biar scorenya nambah sehingga tidak selalu primer
        EAT_LIFE_AUDIO.play();
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples, lifes);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples, lifes);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples, lifes);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples, lifes);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    snake1.life--;
                    if(snake1.life == 0){
                        isCollide = true;
                    }
                }
            }
        }
      }
    }
  }

  if (isCollide) {
    if (totalLife == 0) {
      gameOver.play();
      alert("Game over");
      
      snake1 = initSnake("blue");   
      totalLife = 3;  
    } else {
      totalLife -= 1;
      snake1 = initSnake("blue"); 
    }
    
  }

  return isCollide;
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
    }, snake.speed);
  } else {
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
})

function initGame() {
  move(snake1);
}

initGame();
