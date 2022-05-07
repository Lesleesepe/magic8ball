// game set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// neg # will float.  higher number will drop faster
const gravity = 0.5

// player set up
class Player {
    constructor () {
        this.width = 30
        this.height = 30
        this.position = {
            x: 100,
            y: 100
        }
        // velocity is measurement that moves player larger number on y will move player down
        this.velocity ={
            x:0,
            y:0
        }
  
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate () {
    requestAnimationFrame(animate)
    // clearRect will clear the rectangle above it to keep it square instead of a line
    c.clearRect(0,0,canvas.width, canvas.height)
    player.update()

   if (keys.right.pressed) {
       player.velocity.x = 5
   } else if (keys.left.pressed) {
       player.velocity.x = -5
   } else player.velocity.x = 0
}
animate()

addEventListener('keydown', ({keyCode}) => {
   switch (keyCode) {
        // A key   
        case 65:
           console.log('left')
           keys.left.pressed = true
           break

        // S key   
        case 83:
            console.log('down')
            break

        // D key
        case 68:
            console.log('right')
            keys.right.pressed = true
            break

        // W key
        case 87:
            console.log('up')
            player.velocity.y -= 20
            break
   }
   console.log (keys.right.pressed)
})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
         // A key   
         case 65:
            console.log('left')
            keys.left.pressed = false
            break
 
         // S key   
         case 83:
             console.log('down')
             break
 
         // D key
         case 68:
             console.log('right')
             keys.right.pressed = false
             break
 
         // W key
         case 87:
             console.log('up')
             player.velocity.y -= 0
             break
    }
    console.log (keys.right.pressed)
 })