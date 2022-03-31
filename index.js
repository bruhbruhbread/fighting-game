const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1900
canvas.height = 900
c.fillRect(0,0,canvas.width, canvas.height)

const gravity = .7

class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attackBox
        //
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        )
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else
            this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
},
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    }
})

enemy.draw()

console.log(player)

const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    z: {
        pressed: false
    },
    m: {
        pressed: false
    },
    k: {
        pressed: false
    }

}

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= enemy.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + enemy.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= enemy.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + enemy.height
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    //player movement
    if (keys.q.pressed && player.lastKey === 'q') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    enemy.velocity.x = 0

    //enemy movement
    if (keys.k.pressed && enemy.lastKey === 'k') {
        enemy.velocity.x = -5
    } else if (keys.m.pressed && enemy.lastKey === 'm') {
        enemy.velocity.x = 5
    }

    //detect for collision
    if (
        rectangularCollision({rectangle1: player, rectangle2: enemy}) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector("#enemyHealth").style.width = enemy.health + '%'
    }

    if (
        rectangularCollision({rectangle1: enemy, rectangle2: player}) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector("#playerHealth").style.width = player.health + '%'
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'q':
            keys.q.pressed = true
            player.lastKey = 'q'
            break
        case 'z':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        case 'm':
            keys.m.pressed = true
            enemy.lastKey = 'm'
            break
        case 'k':
            keys.k.pressed = true
            enemy.lastKey = 'k'
            break
        case 'o':
            enemy.velocity.y = -20
            break
        case 'l':
            enemy.attack()
            break
    }
    })

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'q':
            keys.q.pressed = false
            break

        case 'm':
            keys.m.pressed = false
            break
        case 'k':
            keys.k.pressed = false
            break
    }
})
