export class Pepper {
    constructor(canvas, x, y) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.x = x
        this.y = y

        this.cellwidth = 32
        this.cellheight = 32

    }

    Draw(x, y) {
        return new Promise(resolve => {
            this.pepper = new Image()
            this.pepper.src = "../img/treasure/Icon26.png"

            this.context.drawImage(this.pepper, 0, 0, this.cellwidth, this.cellheight, x, y, 32, 32)


            resolve()
        })

    }
}