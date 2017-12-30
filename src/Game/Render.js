// Game-specific

function render() 
{
  clearCanvas()

  drawBall()
  drawPaddle()
  drawBricks()
  drawScores()
}

function clearCanvas() 
{
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall() 
{
  drawCircle(ball.position().x, 
             ball.position().y, 
             ball.radius(), 
             ball.color())
}

function drawVictoryText() {

  let alpha = 0,
      interval = setInterval( () => {
    ctx.fillStyle = 'rgba(250, 250, 250, ' + alpha + ')'
    ctx.font = '26px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`You\'re the best. Never change.`, 
                 canvas.width / 2, 
                 canvas.height / 2)
    ctx.fillText(`Score: ${totalScore}`,
                  canvas.width / 2, 
                  canvas.height / 2 + 50)
    alpha += .05
    if (alpha > .4) {
      clearInterval(interval)
    }
  }, 50)
}

function drawPaddle() 
{
  drawRect(paddle.topLeft().x,
           paddle.topLeft().y, 
           paddle.width(), 
           paddle.height(), 
           paddle.color())
}

function drawBricks() 
{
  bricks.forEach(brick => {
    if (brick.destroyed())
      return
      
    drawRect(
      brick.topLeft().x, 
      brick.topLeft().y, 
      brick.width(), 
      brick.height(), 
      brick.color()
    )
  })
}

function drawScores()
{
  scores.forEach(score => {
    ctx.fillStyle = 'rgba(250, 250, 250, ' + score.opacity() + ')'
    ctx.font = score.size() + 'px sans-serif'
    ctx.fillText(score.value(), 
                 score.position().x, 
                 score.position().y)
  })
}

// Generic

function drawCircle(x, y, radius, color) 
{
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  if (color) {
    ctx.fillStyle = color
    ctx.fill()
  }
  ctx.closePath()
}

function drawRect(x, y, width, height, color) 
{
  ctx.beginPath()
  ctx.rect(x, y, width, height)
  if (color) {
    ctx.fillStyle = color
    ctx.fill()
  }
  ctx.closePath()
}
