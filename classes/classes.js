class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
    }
    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale,
        )
    }

    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    }
}

class Fighter extends Sprite {
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, Sprites,}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

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
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7
        this.Sprites = Sprites
        this.dead = false

        for (const sprite in this.Sprites) {
            Sprites[sprite].image = new Image()
            Sprites[sprite].image.src = Sprites[sprite].imageSrc
        }

    }


    update() {
        this.draw()
        if (!this.dead) this.animateFrames()

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
        } else
            this.velocity.y += gravity
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    takeHit() {
        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(Sprite) {
        if (this.image === this.Sprites.death.image) {
            if (this.frameCurrent === this.Sprites.death.framesMax -1) this.dead = true
            return}

        if (this.image === this.Sprites.attack1.image && this.frameCurrent < this.Sprites.attack1. framesMax -1) return

        if (this.image === this.Sprites.takeHit.image && this.frameCurrent < this.Sprites.takeHit.framesMax -1) return

        switch (Sprite) {
            case 'idle':
                if (this.image !== this.Sprites.idle.image) {
                    this.image = this.Sprites.idle.image
                    this.framesMax = this.Sprites.idle.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'run':
                if (this.image !== this.Sprites.run.image) {
                    this.image = this.Sprites.run.image
                    this.framesMax = this.Sprites.run.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.Sprites.jump.image) {
                    this.image = this.Sprites.jump.image
                    this.framesMax = this.Sprites.jump.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'fall':
                if (this.image !== this.Sprites.fall.image) {
                    this.image = this.Sprites.fall.image
                    this.framesMax = this.Sprites.fall.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'attack1':
                if (this.image !== this.Sprites.attack1.image) {
                    this.image = this.Sprites.attack1.image
                    this.framesMax = this.Sprites.attack1.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'takeHit':
                if (this.image !== this.Sprites.takeHit.image) {
                    this.image = this.Sprites.takeHit.image
                    this.framesMax = this.Sprites.takeHit.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'death':
                if (this.image !== this.Sprites.death.image) {
                    this.image = this.Sprites.death.image
                    this.framesMax = this.Sprites.death.framesMax
                    this.frameCurrent = 0
                }
                break;
        }
    }
}
