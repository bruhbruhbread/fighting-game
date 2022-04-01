const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width, canvas.height)

const gravity = .7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})
const player = new Fighter({
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

const enemy = new Fighter({
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

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
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

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
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
