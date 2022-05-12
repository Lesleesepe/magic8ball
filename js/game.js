// game set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 526

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
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 30
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//8 ball 
class Ball {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// control text
class Controls {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 100
        this.height = 75
        this.backgroundColor = 'green'
        this.innerText = 'Controls\nLeft:A\nRight:D\nJump:W'
    }
    draw() {
        c.fillStyle = 'green'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillText('Controls: Left:A | Right:D | Jump:W', 10, 20)
    }
}

let player = new Player()
let platforms = []
let ball = []
let control = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

//reset player
function init() {
    player = new Player()
    ball = [
    new Ball({x: 3150, y: 110})
    ]
    platforms = [ 
    //floor
    new Platform({ x: 0, y: 500}), 
    new Platform({x:200, y: 500 }),
    new Platform({x: 1800, y: 500}), 
    new Platform({x: 2250, y: 500}),
    //floating floor 
    new Platform({x:400, y: 300 }), 
    new Platform({x: 650, y: 200}),
    new Platform({x: 1100, y: 400}),
    new Platform({x: 1300, y: 250}),

    new Platform({x: 2450, y: 300}),
    new Platform({x: 2850, y: 150}),
    new Platform({x: 3050, y: 150}),
    ]
    control = [new Controls({x: 1, y: 1})]

}

function animate () {
    requestAnimationFrame(animate)
    // clearRect will clear the rectangle above it to keep it square instead of a line
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width, canvas.height)

    platforms.forEach((platform) => {
        platform.draw()
    })

    ball.forEach((ball) => {
        ball.draw()
    })

    control.forEach((control) => {
        control.draw()
    })
    player.update()
    

    //player movement
   if (keys.right.pressed && player.position.x < 400) {
       player.velocity.x = 5
    } else if ((keys.left.pressed && player.position.x > 100)  ||keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
    player.velocity.x = -5
    } else {
    player.velocity.x = 0 

    if (keys.right.pressed) {
    scrollOffset += 5
    platforms.forEach((platform) => {
    platform.position.x -= 5
    })
    ball.forEach((ball) => {
    ball.position.x -= 5
    })

    } else if (keys.left.pressed && scrollOffset > 0) {
    scrollOffset -= 5
    platforms.forEach((platform) => {
    platform.position.x += 5
    })

    }
    }



   console.log (scrollOffset)

   //platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <=  platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x  && 
        player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }

        if (player.position.y <= 0) {
            player.velocity.y = 1
        }
    })

    ball.forEach((ball) => {
        if (player.position.y + player.height <= ball.position.y + ball.height && 
        player.position.y + player.height + player.velocity.y >= ball.position.y &&
        player.position.x + player.width >= ball.position.x   && 
        player.position.x <= ball.position.x + ball.width) {
            player.velocity.y = 0
            player.velocity.x = 0
            setTimeout(() => {
                window.location.replace("../eightball/");
              }, "1000")
            
        }

        if (player.position.y <= 0) {
            player.velocity.y = 1
        }
    })

    // win condition
    if (scrollOffset > 2000) {
        console.log('you win!')
    }

    //lose condition
    if (player.position.y > canvas.height) {
        init()
    }
}



init()
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
            player.velocity.y -= 15
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


