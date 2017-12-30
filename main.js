'use strict';

function makeBall(spec) {
                         var _ref = spec || {},
                             x = _ref.x,
                             y = _ref.y,
                             velX = _ref.velX,
                             velY = _ref.velY,
                             _color = _ref.color;

                         var _radius = 5;

                         var _position = makePoint(x || canvas.width / 2, y || canvas.height - 15);

                         var _velocity = makePoint(velX || 5, velY || -250);

                         _color = _color || '#eee';

                         var setPosition = function setPosition(x, y) {
                                                  return _position = makePoint(x, y);
                         };

                         var setVelocity = function setVelocity(x, y) {
                                                  return _velocity = makePoint(x, y);
                         };

                         var left = function left() {
                                                  return makePoint(_position.x - _radius, _position.y);
                         };

                         var right = function right() {
                                                  return makePoint(_position.x + _radius, _position.y);
                         };

                         var top = function top() {
                                                  return makePoint(_position.x, _position.y - _radius);
                         };

                         var bottom = function bottom() {
                                                  return makePoint(_position.x, _position.y + _radius);
                         };

                         return {
                                                  color: function color() {
                                                                           return _color;
                                                  },
                                                  position: function position() {
                                                                           return _position;
                                                  },
                                                  radius: function radius() {
                                                                           return _radius;
                                                  },
                                                  setPosition: setPosition,
                                                  velocity: function velocity() {
                                                                           return _velocity;
                                                  },
                                                  setVelocity: setVelocity,
                                                  left: left,
                                                  right: right,
                                                  top: top,
                                                  bottom: bottom
                         };
}
'use strict';

function makeBlock(spec) {
  var _ref = spec || {},
      x = _ref.x,
      y = _ref.y,
      _width = _ref.width,
      _height = _ref.height,
      _color = _ref.color,
      _position = makePoint(x || canvas.width / 2, y || canvas.height - 5);

  _width = _width || 60;
  _height = _height || 10;
  _color = _color || '#eee';

  function setPosition(x, y) {
    _position = makePoint(x, y);
  }
  function topLeft() {
    return makePoint(_position.x - _width / 2, _position.y - _height / 2);
  }
  function bottomLeft() {
    return makePoint(_position.x - _width / 2, _position.y + _height / 2);
  }
  function topRight() {
    return makePoint(_position.x + _width / 2, _position.y - _height / 2);
  }
  function bottomRight() {
    return makePoint(_position.x + _width / 2, _position.y + _height / 2);
  }

  return {
    color: function color() {
      return _color;
    },
    width: function width() {
      return _width;
    },
    height: function height() {
      return _height;
    },
    position: function position() {
      return _position;
    },
    setPosition: setPosition,
    topLeft: topLeft,
    bottomLeft: bottomLeft,
    topRight: topRight,
    bottomRight: bottomRight
  };
}
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function makeBrick(spec) {
  spec.color = spec.color || '#6599FF';
  var aBlock = makeBlock(spec),
      _destroyed = false;

  return _extends({}, aBlock, {
    destroyed: function destroyed() {
      return _destroyed;
    },
    toggleDestroyed: function toggleDestroyed() {
      return _destroyed = !_destroyed;
    }
  });
}
"use strict";

function makePoint(x, y) {
  return {
    x: x,
    y: y
  };
}
"use strict";

function makePaddle(spec) {
  return makeBlock(spec);
}
"use strict";

function makeScore(spec) {
  var _ref = spec || {},
      x = _ref.x,
      y = _ref.y,
      _value = _ref.value,
      angle = randomAngle(),
      speed = 4,
      _opacity = 1,
      _size = 24,
      _timeRemaining = 1,
      _position = makePoint(x, y),
      velocity = makePoint(speed * Math.cos(angle - Math.PI / 2), speed * Math.sin(angle - Math.PI / 2));

  function setPosition(x, y) {
    _position = makePoint(x, y);
  }

  function randomAngle() {
    return (1 + 2 * Math.random()) * Math.PI / 2;
  }

  function animate(dt) {
    setPosition(_position.x + velocity.x * dt, _position.y + velocity.y * dt);
    _size = clamp(_size * 1.05, 24, 54);
    _opacity *= _timeRemaining;
    _timeRemaining -= dt;
  }

  return {
    value: function value() {
      return _value;
    },
    animate: animate,
    position: function position() {
      return _position;
    },
    size: function size() {
      return _size;
    },
    opacity: function opacity() {
      return _opacity;
    },
    timeRemaining: function timeRemaining() {
      return _timeRemaining;
    }
  };
}
'use strict';

// Constants
var canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    speed = 1E-1;

var bricks = [],
    scores = [],
    isLeftPressed = false,
    isRightPressed = false,
    numberOfBricks = 10,
    lastTime = void 0,
    ball = makeBall(),
    paddle = makePaddle(),
    mousePosition = makePoint(canvas.width / 2, canvas.height - 5),
    scoreTimer = 1,
    // In seconds
scoreMultiplier = 1,
    totalScore = 0,
    // Starting score,
playing = false;
'use strict';

function init() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  document.addEventListener('mousemove', mouseMoveHandler, false);
  document.addEventListener('click', clickHandler, false);

  bricks = initializeBricks();
}

function initializeBricks() {
  var columns = 5,
      rows = 4,
      padding = 20,
      width = 68,
      height = 15,
      offsetLeft = 30,
      offsetTop = 30;

  for (var c = 0; c < columns; c++) {
    bricks[c] = [];
    for (var r = 0; r < rows; r++) {
      var x = offsetLeft // Margin on left side
      + c * (width + padding) // Rest of blocks
      + width / 2; // Centerpoint of this block
      var y = offsetTop + r * (height + padding) + height / 2;
      bricks[c][r] = makeBrick({ x: x, y: y, width: width, height: height });
    }
  }
  // Flatten bricks array
  return bricks.reduce(function (acc, curr) {
    return acc.concat(curr);
  });
}
"use strict";

// function updatePaddlePosition() {
//   const { paddle } = state
//   if (isLeftPressed && paddle.x > 0) {
//     paddle.x -= 3
//   }
//   else if (isRightPressed && paddle.x < canvas.width - paddle.width) {
//     paddle.x += 3
//   }
// }

function keyDownHandler(e) {
  // Left arrow
  if (e.keyCode === 37) {
    isLeftPressed = true;
  }
  // Right arrow
  if (e.keyCode === 39) {
    isRightPressed = true;
  }

  if (e.keyCode === 32) {}
}

function keyUpHandler(e) {
  // Left arrow
  if (e.keyCode === 37) {
    isLeftPressed = false;
  }
  // Right arrow
  if (e.keyCode === 39) {
    isRightPressed = false;
  }
}

function mouseMoveHandler(e) {
  var rect = canvas.getBoundingClientRect();
  mousePosition = makePoint(e.clientX - rect.left, e.clientY - rect.top);
}

function clickHandler(e) {
  playing ? window.location.reload() : releaseBall();
}

function releaseBall() {
  playing = true;
  ball.setVelocity(0, -300);
}
'use strict';

// Game-specific

function render() {
  clearCanvas();

  drawBall();
  drawPaddle();
  drawBricks();
  drawScores();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  drawCircle(ball.position().x, ball.position().y, ball.radius(), ball.color());
}

function drawVictoryText() {

  var alpha = 0,
      interval = setInterval(function () {
    ctx.fillStyle = 'rgba(250, 250, 250, ' + alpha + ')';
    ctx.font = '26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('You\'re the best. Never change.', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Score: ' + totalScore, canvas.width / 2, canvas.height / 2 + 50);
    alpha += .05;
    if (alpha > .4) {
      clearInterval(interval);
    }
  }, 50);
}

function drawPaddle() {
  drawRect(paddle.topLeft().x, paddle.topLeft().y, paddle.width(), paddle.height(), paddle.color());
}

function drawBricks() {
  bricks.forEach(function (brick) {
    if (brick.destroyed()) return;

    drawRect(brick.topLeft().x, brick.topLeft().y, brick.width(), brick.height(), brick.color());
  });
}

function drawScores() {
  scores.forEach(function (score) {
    ctx.fillStyle = 'rgba(250, 250, 250, ' + score.opacity() + ')';
    ctx.font = score.size() + 'px sans-serif';
    ctx.fillText(score.value(), score.position().x, score.position().y);
  });
}

// Generic

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.closePath();
}

function drawRect(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.closePath();
}
'use strict';

var paddleSound1 = new Audio('Sounds/PaddleBounce.wav');
paddleSound1.preload = 'auto';

var paddleSound2 = new Audio('Sounds/PaddleBounce.wav');
paddleSound2.preload = 'auto';

var gameOverSound = new Audio('Sounds/GameOverSound.wav');
gameOverSound.preload = 'auto';

var brickSound1 = new Audio('Sounds/Brick2.wav');
brickSound1.preload = 'auto';

var brickSound2 = new Audio('Sounds/Brick2.wav');
brickSound2.preload = 'auto';

var brickSound3 = new Audio('Sounds/Brick2.wav');
brickSound3.preload = 'auto';

var brickSound4 = new Audio('Sounds/Brick2.wav');
brickSound4.preload = 'auto';

var brickSound5 = new Audio('Sounds/Brick2.wav');
brickSound5.preload = 'auto';

var paddleSounds = [paddleSound1, paddleSound2];

var brickSounds = [brickSound1, brickSound2, brickSound3, brickSound4, brickSound5];

var nextSound = function (i) {
  return function (list) {
    return i >= list.length ? list[i = 0] : list[i++];
  };
}(0);
"use strict";

function update(dt) {
  updateBall(dt);
  updatePaddle(dt);
  updateScores(dt);
}

function updateBall(dt) {
  collisionCheck(dt);
  updateBallPosition(dt);
}

function collisionCheck(dt) {
  handleWallCollision();
  handleBrickCollision();
  handlePaddleCollision();
}

function handleWallCollision() {
  if (outsideLeftWall() && movingLeft() || outsideRightWall() && movingRight()) {
    nextSound(paddleSounds).play();
    invertXVelocity(ball);
  }
  if (outsideCeiling() && movingUp()) {
    nextSound(paddleSounds).play();
    invertYVelocity(ball);
  }

  function outsideLeftWall() {
    return ball.left().x <= 0;
  }
  function outsideRightWall() {
    return ball.right().x >= canvas.width;
  }
  function outsideCeiling() {
    return ball.top().y < 0;
  }
  function movingLeft() {
    return ball.velocity().x < 0;
  }
  function movingRight() {
    return ball.velocity().x > 0;
  }
  function movingUp() {
    return ball.velocity().y < 0;
  }
}

function handleBrickCollision() {
  bricks.forEach(function (brick) {
    if (brick.destroyed()) return;

    if (intersects(ball, brick)) {
      brick.toggleDestroyed();
      nextSound(brickSounds).play();
      changeDirection(ball, brick);
      addScore(brick);
    }
  });
}

function intersects(circle, rectangle) {
  return circleCenterInRectangle(circle.position(), rectangle) || rectangleSideIntersectsCircle(circle, rectangle);
}

// Assumes intersection between ball and brick
function changeDirection(ball, brick) {
  if (ballBelowBrick() || ballAboveBrick()) {
    invertYVelocity(ball);
    return;
  }
  if (ballLeftOfBrick() || ballRightOfBrick()) {
    invertXVelocity(ball);
    return;
  }

  function ballLeftOfBrick() {
    return ball.left().x < brick.topLeft().x;
  }
  function ballRightOfBrick() {
    return ball.right().x > brick.topRight().x;
  }
  function ballAboveBrick() {
    return ball.top().y < brick.topLeft().y;
  }
  function ballBelowBrick() {
    return ball.bottom().y > brick.bottomLeft().y;
  }
}

function handlePaddleCollision() {
  if (intersects(ball, paddle)) {
    // reset score multiplier
    scoreMultiplier = 1;

    nextSound(paddleSounds).play();

    // Change x velocity based on impact location
    adjustBallSpeedFromImpact();

    // Slowly increase ball speed over time
    increaseBallSpeed();
  }
}

function adjustBallSpeedFromImpact() {
  // Range from -1 (far left) to +1 (far right)
  var distanceFromCenter = (ball.position().x - paddle.position().x) / (paddle.width() / 2);

  // Allow us to fine-tune the impact of the collision position
  var influence = 0.75;

  var currentSpeed = Math.hypot(ball.velocity().x, ball.velocity().y);

  var xComponent = currentSpeed * distanceFromCenter * influence;
  // let yDirection = ball.velocity().y > 0 ? -1 : 1
  var yComponent = -Math.sqrt(Math.pow(currentSpeed, 2) - Math.pow(xComponent, 2)); //* yDirection

  ball.setVelocity(xComponent, yComponent);
}

function updateBallPosition(dt) {
  if (playing) {
    ball.setPosition(ball.position().x + ball.velocity().x * dt, ball.position().y + ball.velocity().y * dt);
  } else {
    ball.setPosition(paddle.position().x, ball.position().y);
  }
}

function invertXVelocity(object) {
  return object.setVelocity(-object.velocity().x, object.velocity().y);
}
function invertYVelocity(object) {
  return object.setVelocity(object.velocity().x, -object.velocity().y);
}

function increaseBallSpeed() {
  // Find the magnitude of the velocity so that we can apply a constant increase to both x and y directions
  var currentSpeed = Math.hypot(ball.velocity().x, ball.velocity().y);

  // Slowly increase speed over time up to a maximum
  var newSpeed = Math.min(750, currentSpeed + 25);
  var increaseFactor = newSpeed / currentSpeed;

  ball.setVelocity(ball.velocity().x * increaseFactor, ball.velocity().y * increaseFactor);
}

function addScore(brick) {
  scores.push(makeScore({
    x: brick.position().x,
    y: brick.position().y,
    value: Math.floor(100 * scoreMultiplier)
  }));
  scoreMultiplier += .5;
}

function updatePaddle(dt) {
  updatePaddlePosition(dt);
}

function updatePaddlePosition(dt) {
  var currentPosition = paddle.position().x;
  var targetPosition = clamp(mousePosition.x, paddle.width() / 2, canvas.width - paddle.width() / 2);

  // Smooth move to target
  var moveFactor = 0.2;
  var delta = (targetPosition - currentPosition) * moveFactor;
  paddle.setPosition(currentPosition + delta, paddle.position().y);
}

function updateScores(dt) {
  var score = void 0;
  for (var i = scores.length - 1; i >= 0; i--) {
    score = scores[i];
    score.animate(dt);

    if (score.timeRemaining() <= 0) removeFromList(i, scores);
  }
}

function removeFromList(index, list) {
  return list.splice(index, 1);
}
"use strict";

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

function rectangleSideIntersectsCircle(circle, rectangle) {
  var topLeft = rectangle.topLeft(),
      topRight = rectangle.topRight(),
      bottomRight = rectangle.bottomRight(),
      bottomLeft = rectangle.bottomLeft();

  return intersectsCircle(circle, topLeft, topRight) || intersectsCircle(circle, topRight, bottomRight) || intersectsCircle(circle, bottomRight, bottomLeft) || intersectsCircle(circle, bottomLeft, topLeft);
}

function circleCenterInRectangle(circleCenter, rectangle) {
  // Circle has center M
  // Rectangle has four points A, B, C, D
  var AB = vector(rectangle.topLeft(), rectangle.topRight()),
      BC = vector(rectangle.topRight(), rectangle.bottomRight()),
      AM = vector(rectangle.topLeft(), circleCenter),
      BM = vector(rectangle.topRight(), circleCenter),
      dotABAM = dotProduct(AB, AM),
      dotABAB = dotProduct(AB, AB),
      dotBCBM = dotProduct(BC, BM),
      dotBCBC = dotProduct(BC, BC);

  return 0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC;
}

function intersectsCircle(circle, p1, p2) {
  //https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
  function square(x) {
    return x * x;
  }
  function distanceSquared(v, w) {
    return square(v.x - w.x) + square(v.y - w.y);
  }
  function distanceToSegment(p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
  }

  function distToSegmentSquared(p, v, w) {
    var l2 = distanceSquared(v, w);

    if (l2 == 0) return distanceSquared(p, v);

    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;

    if (t < 0) return distanceSquared(p, v);
    if (t > 1) return distanceSquared(p, w);

    return distanceSquared(p, makePoint(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
  }

  var isDistanceLessThanRadius = distanceToSegment(circle.position(), p1, p2) < circle.radius();

  return isDistanceLessThanRadius;
}

function vector(p1, p2) {
  return makePoint(p2.x - p1.x, p2.y - p1.y);
}
function dotProduct(u, v) {
  return u.x * v.x + u.y * v.y;
}
'use strict';

// Level editor
// Points
// State transition

init();
gameLoop();

function gameLoop(currentTime) {
  if (lastTime) update((currentTime - lastTime) / 1000);
  lastTime = currentTime;

  render();

  if (isGameOver()) return handleGameOver();

  if (playerWon()) return handleVictory();
  requestAnimationFrame(gameLoop);
}

function handleGameOver() {
  gameOverSound.play();
}

function handleVictory() {
  drawVictoryText();
}

function playerWon() {
  for (var i = 0; i < bricks.length; i++) {
    if (!bricks[i].destroyed()) return false;
  }
  return true;
}

function isGameOver() {
  return ball.top().y > canvas.height;
}
