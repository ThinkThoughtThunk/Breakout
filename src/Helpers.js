function clamp(num, min, max)
{
  return Math.max(min, 
                  Math.min(num, 
                           max))
}

function rectangleSideIntersectsCircle(circle, rectangle)
{
  let topLeft = rectangle.topLeft(),
      topRight = rectangle.topRight(),
      bottomRight = rectangle.bottomRight(),
      bottomLeft = rectangle.bottomLeft()
      
  return intersectsCircle(circle, topLeft, topRight) 
      || intersectsCircle(circle, topRight, bottomRight) 
      || intersectsCircle(circle, bottomRight, bottomLeft) 
      || intersectsCircle(circle, bottomLeft, topLeft)
}

function circleCenterInRectangle(circleCenter, rectangle) {
  // Circle has center M
  // Rectangle has four points A, B, C, D
  let AB = vector(rectangle.topLeft(),
                  rectangle.topRight()),
      BC = vector(rectangle.topRight(),
                  rectangle.bottomRight()),
      AM = vector(rectangle.topLeft(),
                  circleCenter),
      BM = vector(rectangle.topRight(),
                  circleCenter),
      dotABAM = dotProduct(AB, AM),
      dotABAB = dotProduct(AB, AB),
      dotBCBM = dotProduct(BC, BM),
      dotBCBC = dotProduct(BC, BC)
      
  return  0 <= dotABAM &&
    dotABAM <= dotABAB &&
          0 <= dotBCBM &&
    dotBCBM <= dotBCBC
}

function intersectsCircle(circle, p1, p2) 
{
  //https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
  function square (x) { return x * x } 
  function distanceSquared (v, w) { return square(v.x - w.x) + square(v.y - w.y) }
  function distanceToSegment (p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)) }

  function distToSegmentSquared(p, v, w) {
    let l2 = distanceSquared(v, w)
      
    if (l2 == 0)
      return distanceSquared(p, v)
      
    let t = ((p.x - v.x) * (w.x - v.x) + 
             (p.y - v.y) * (w.y - v.y)) / l2
      
    if (t < 0) 
      return distanceSquared(p, v)
    if (t > 1)
      return distanceSquared(p, w)
      
    return distanceSquared(
      p, 
      makePoint(
        v.x + t * (w.x - v.x), 
        v.y + t * (w.y - v.y)
      )
    )
  }
  
  let isDistanceLessThanRadius = distanceToSegment(circle.position(), p1, p2) < circle.radius()
  
  return isDistanceLessThanRadius
}

function vector(p1, p2) 
{
  return makePoint(p2.x - p1.x,
                   p2.y - p1.y)
}
function dotProduct(u, v)
{
  return u.x * v.x + u.y * v.y
}
