function makeBrick(spec)
{
  spec.color = spec.color || '#6599FF'
  let aBlock = makeBlock(spec),
      destroyed = false

  return {
    ...aBlock,
    destroyed: () => destroyed,
    toggleDestroyed: () => destroyed = !destroyed
  }
}
