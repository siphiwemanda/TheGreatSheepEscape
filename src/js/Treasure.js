export class Treasure{
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')

    }
    Draw(x,y) {
        return new Promise(resolve => {
            this.apple = new Image()
            this.apple.src = "../img/treasure/apple.png"

            this.apple.onload = () => {
                this.context.drawImage(this.apple, 0, 0, 512, 512, x, y, 30, 30)

            }
            this.carrot = new Image()
            this.carrot.src = "../img/treasure/carrot.png"
            this.carrot.onload = () => {
                this.context.drawImage(this.carrot, 0, 0, 512, 512, x, y, 30, 30)

            }

            this.pepper = new Image()
            this.pepper.src = "../img/treasure/pepper.png"
            this.pepper.onload = () => {
                this.context.drawImage(this.pepper, 0, 0, 512, 512, x, y, 30, 30)

            }
            resolve()
        })

    }
}