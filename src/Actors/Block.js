function makeBlock(spec)
{
  let { x, y, width, height, color } = spec || {},
      position = makePoint(x || canvas.width / 2,
                           y || canvas.height - 5)
  
  width  = width  || 60
  height = height || 10
  color  = color  || '#eee'
  
  function setPosition(x, y)
  {
    position = makePoint(x, y)
  }
  function topLeft()
  {
    return makePoint(position.x - width / 2,
                     position.y - height / 2)
  }
  function bottomLeft()
  {
    return makePoint(position.x - width / 2,
                     position.y + height / 2)
  }
  function topRight()
  {
    return makePoint(position.x + width / 2,
                     position.y - height / 2)
  }
  function bottomRight()
  {
    return makePoint(position.x + width / 2,
                     position.y + height / 2)
  }
  
  return {
    color: () => color,
    width: () => width,
    height: () => height,
    position: () => position,
    setPosition,
    topLeft,
    bottomLeft,
    topRight,
    bottomRight
  }
}
