function update(dt) {
  updateBall(dt)
  updatePaddle(dt)
  updateScores(dt)
}

function updateBall(dt) 
{
  collisionCheck(dt)
  updateBallPosition(dt)
}

function collisionCheck(dt)
{
  handleWallCollision()
  handleBrickCollision()
  handlePaddleCollision()
}

function handleWallCollision()
{
  if (outsideLeftWall() && movingLeft() ||
      outsideRightWall() && movingRight())
  {
    nextSound(paddleSounds).play()
    invertXVelocity(ball)
  }
  if (outsideCeiling() && movingUp())
  {
    nextSound(paddleSounds).play()
    invertYVelocity(ball)
  }
  
  function outsideLeftWall() { return ball.left().x <= 0 }
  function outsideRightWall() { return ball.right().x >= canvas.width }
  function outsideCeiling() { return ball.top().y < 0 }
  function movingLeft() { return ball.velocity().x < 0 }
  function movingRight() { return ball.velocity().x > 0 }
  function movingUp() { return ball.velocity().y < 0 }
}

function handleBrickCollision()
{
  bricks.forEach(brick => {
    if (brick.destroyed())
      return
    
    if (intersects(ball, brick)) {
      brick.toggleDestroyed()
      nextSound(brickSounds).play()
      changeDirection(ball, brick)
      addScore(brick)
    }
  })
}

function intersects(circle, rectangle) 
{
  return circleCenterInRectangle(circle.position(), rectangle)
      || rectangleSideIntersectsCircle(circle, rectangle)
}

// Assumes intersection between ball and brick
function changeDirection(ball, brick) 
{
  if (ballBelowBrick() || ballAboveBrick()) {
    invertYVelocity(ball)
    return
  }
  if (ballLeftOfBrick() || ballRightOfBrick()) {
    invertXVelocity(ball)
    return
  }
  
  function ballLeftOfBrick() { return ball.left().x < brick.topLeft().x }
  function ballRightOfBrick() { return ball.right().x > brick.topRight().x }
  function ballAboveBrick() { return ball.top().y < brick.topLeft().y }
  function ballBelowBrick() { return ball.bottom().y > brick.bottomLeft().y }
}

function handlePaddleCollision()
{
  if (intersects(ball, paddle))
  {
    // reset score multiplier
    scoreMultiplier = 1
    
    nextSound(paddleSounds).play()
    
    // Change x velocity based on impact location
    adjustBallSpeedFromImpact()
    
    // Slowly increase ball speed over time
    increaseBallSpeed()
  }
}

function adjustBallSpeedFromImpact()
{
  // Range from -1 (far left) to +1 (far right)
  let distanceFromCenter = 
    (ball.position().x - paddle.position().x) / 
    (paddle.width() / 2)
  
  // Allow us to fine-tune the impact of the collision position
  let influence = 0.75
  
  let currentSpeed = Math.hypot(
    ball.velocity().x,
    ball.velocity().y
  )
  
  let xComponent = currentSpeed * distanceFromCenter * influence
  // let yDirection = ball.velocity().y > 0 ? -1 : 1
  let yComponent = - Math.sqrt(currentSpeed**2 - xComponent**2)//* yDirection

  ball.setVelocity(xComponent, yComponent)
}

function updateBallPosition(dt) 
{
  if (playing)
  {
    ball.setPosition(
      ball.position().x + ball.velocity().x * dt,
      ball.position().y + ball.velocity().y * dt
    )
  }
  
  else
  {
    ball.setPosition(
      paddle.position().x,
      ball.position().y
    )
  }
}

function invertXVelocity(object)
{
  return object.setVelocity(
    - object.velocity().x,
    object.velocity().y
  )
}
function invertYVelocity(object)
{
  return object.setVelocity(
    object.velocity().x,
    - object.velocity().y
  )
}

function increaseBallSpeed()
{
  // Find the magnitude of the velocity so that we can apply a constant increase to both x and y directions
  let currentSpeed = Math.hypot(
    ball.velocity().x, 
    ball.velocity().y
  )
  
  // Slowly increase speed over time up to a maximum
  let newSpeed = Math.min(750, currentSpeed + 25)
  let increaseFactor = newSpeed / currentSpeed
  
  ball.setVelocity(
    ball.velocity().x * increaseFactor,
    ball.velocity().y * increaseFactor
  )
}

function addScore(brick)
{
  scores.push(
    makeScore({
      x: brick.position().x,
      y: brick.position().y,
      value: Math.floor(100 * scoreMultiplier)
    })
  )
  scoreMultiplier += .5
}

function updatePaddle(dt) 
{
  updatePaddlePosition(dt)
}

function updatePaddlePosition(dt) 
{
  let currentPosition = paddle.position().x
  let targetPosition = clamp(
    mousePosition.x, 
    paddle.width() / 2, 
    canvas.width - (paddle.width() / 2)
  )
  
  // Smooth move to target
  let moveFactor = 0.2
  let delta = (targetPosition - currentPosition) * moveFactor
  paddle.setPosition(currentPosition + delta, paddle.position().y)
}

function updateScores(dt)
{
  let score
  for (let i = scores.length - 1; i >= 0; i--)
  {
    score = scores[i]
    score.animate(dt)
    
    if (score.timeRemaining() <= 0)
      removeFromList(i, scores)
  }
}

function removeFromList(index, list)
{
  return list.splice(index, 1)
}
