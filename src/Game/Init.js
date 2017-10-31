function init()
{
  document.addEventListener('keydown',   keyDownHandler, false)
  document.addEventListener('keyup',     keyUpHandler,   false)
  document.addEventListener('mousemove', mouseMoveHandler, false)
  document.addEventListener('click',     clickHandler, false)
  
  bricks = initializeBricks()
}

function initializeBricks() 
{
  const columns = 5,
        rows = 4,
        padding = 20,
        width = 68,
        height = 15,
        offsetLeft = 30,
        offsetTop = 30
        
  for (let c = 0; c < columns; c++) {
    bricks[c] = []
    for (let r = 0; r < rows; r++) {
      let x = offsetLeft       // Margin on left side
            + c * (width + padding) // Rest of blocks
            + width / 2        // Centerpoint of this block
      let y = offsetTop
            + r * (height + padding)
            + (height / 2)
      bricks[c][r] = makeBrick({x, y, width, height})
    }
  }
  // Flatten bricks array
  return bricks.reduce((acc, curr) => acc.concat(curr))
}
