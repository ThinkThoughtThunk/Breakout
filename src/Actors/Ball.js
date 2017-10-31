function makeBall(spec) 
{
  let { x, y, velX, velY, color } = spec || {}
  
  let radius = 5
  
  let position = makePoint(x || canvas.width / 2,
                           y || canvas.height -15)
                       
  let velocity = makePoint(velX || 5,
                           velY || -250)
      
  color = color || '#eee'
                       
  const setPosition = (x, y) => position = makePoint(x, y)
      
  const setVelocity = (x, y) => velocity = makePoint(x, y)
                       
  const left   = () => makePoint(position.x - radius, 
                                 position.y)
                           
  const right  = () => makePoint(position.x + radius,
                                 position.y)
                           
  const top    = () => makePoint(position.x,
                                 position.y - radius)
                           
  const bottom = () => makePoint(position.x,
                                 position.y + radius)
  
  return {
    color: () => color,
    position: () => position,
    radius: () => radius,
    setPosition,
    velocity: () => velocity,
    setVelocity,
    left,
    right,
    top,
    bottom
  }
}
