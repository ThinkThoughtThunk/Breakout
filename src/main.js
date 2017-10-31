'use strict'

// Level editor
// Points
// State transition

init()
gameLoop()

function gameLoop(currentTime) {
  if (lastTime) {
    update((currentTime - lastTime) / 1000)
  }
  lastTime = currentTime
  
  render()
  
  isGameOver()
    ? gameOverSound.play()
    : requestAnimationFrame(gameLoop)
}

function isGameOver() {
  return ball.top().y > canvas.height
}
