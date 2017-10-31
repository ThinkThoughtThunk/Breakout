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
  if (e.keyCode === 37) 
  {
    isLeftPressed = true
  }
  // Right arrow
  if (e.keyCode === 39) 
  {
    isRightPressed = true
  }
  
  if (e.keyCode === 32)
  {
    releaseBall()
  }
}

function keyUpHandler(e) {
  // Left arrow
  if (e.keyCode === 37) {
    isLeftPressed = false
  }
  // Right arrow
  if (e.keyCode === 39) {
    isRightPressed = false
  }
}

function mouseMoveHandler(e) {
  let rect = canvas.getBoundingClientRect()
  mousePosition = makePoint(e.clientX - rect.left, 
                            e.clientY - rect.top)
}

function clickHandler(e) {
  window.location.reload()
}

function releaseBall()
{
  playing = true
  ball.setVelocity(
    0,
    -300
  )
}
