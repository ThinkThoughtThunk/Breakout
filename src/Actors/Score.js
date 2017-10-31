function makeScore(spec)
{
  let { x, y, value } = spec || {},
      angle = randomAngle(),
      speed = 4,
      opacity = 1,
      size = 24,
      timeRemaining = 1,
      position = makePoint(x, y),
      velocity = makePoint(speed * Math.cos(angle-(Math.PI/2)),
                           speed * Math.sin(angle-(Math.PI/2)))
  
  function setPosition(x, y)
  {
    position = makePoint(x, y)
  }
  
  function randomAngle()
  {
    return (1 + 2 * Math.random()) * Math.PI / 2
  }
  
  function animate(dt) 
  {
    setPosition(
      position.x + velocity.x * dt,
      position.y + velocity.y * dt
    )
    size = clamp(
      size * 1.05, 
      24, 
      54
    )
    opacity *= timeRemaining
    timeRemaining -= dt
  }
  
  return {
    value: () => value,
    animate,
    position: () => position,
    size: () => size,
    opacity: () => opacity,
    timeRemaining: () => timeRemaining
  }
}
