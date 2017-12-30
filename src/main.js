'use strict'

// Level editor
// Points
// State transition

init()
gameLoop()

function gameLoop(currentTime) {
  if (lastTime)
    update((currentTime - lastTime) / 1000)
  lastTime = currentTime
  
  render()
  
  if (isGameOver())
    return handleGameOver()
    
  if (playerWon())
    return handleVictory()
  requestAnimationFrame(gameLoop)
}

function handleGameOver() {
  gameOverSound.play()
}

function handleVictory() {
  drawVictoryText()
}

function playerWon() {
  for (let i = 0; i < bricks.length; i++) {
    if (!bricks[i].destroyed())
      return false
  }
  return true
}

function isGameOver() {
  return ball.top().y > canvas.height
}
