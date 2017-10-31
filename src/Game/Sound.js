let paddleSound1 = new Audio('Sounds/PaddleBounce.wav')
paddleSound1.preload = 'auto'

let paddleSound2 = new Audio('Sounds/PaddleBounce.wav')
paddleSound2.preload = 'auto'

let gameOverSound = new Audio('Sounds/GameOverSound.wav')
gameOverSound.preload = 'auto'

let brickSound1 = new Audio('Sounds/Brick2.wav')
brickSound1.preload = 'auto'

let brickSound2 = new Audio('Sounds/Brick2.wav')
brickSound2.preload = 'auto'

let brickSound3 = new Audio('Sounds/Brick2.wav')
brickSound3.preload = 'auto'

let brickSound4 = new Audio('Sounds/Brick2.wav')
brickSound4.preload = 'auto'

let brickSound5 = new Audio('Sounds/Brick2.wav')
brickSound5.preload = 'auto'

let paddleSounds = [
  paddleSound1,
  paddleSound2
]

let brickSounds = [
  brickSound1,
  brickSound2,
  brickSound3,
  brickSound4,
  brickSound5
]

let nextSound = ((i) => 
  (list) =>
    i >= list.length ? list[i=0] : list[i++])(0)
