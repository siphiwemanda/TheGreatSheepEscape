export class Carrot {
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
            this.carrot = new Image()
            this.carrot.src = "../img/treasure/Icon25.png"
            this.context.drawImage(this.carrot, 0, 0, this.cellwidth, this.cellheight, x ,y, 32, 32)
            resolve()
        })

    }
}