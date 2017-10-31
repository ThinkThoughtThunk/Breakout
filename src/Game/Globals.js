// Constants
const canvas = document.getElementById('game'),
      ctx = canvas.getContext('2d'),
      speed = 1E-1
      
let bricks = [],
    scores = [],
    isLeftPressed = false,
    isRightPressed = false,
    numberOfBricks = 10,
    lastTime,
    ball = makeBall(),
    paddle = makePaddle(),
    mousePosition = makePoint(canvas.width / 2, canvas.height - 5),
    scoreTimer = 1, // In seconds
    scoreMultiplier = 1,
    totalScore = 0, // Starting score,
    playing = false
