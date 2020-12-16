export class Treasure {
    constructor(canvas, x, y, xx, yy,xxx,yyy) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.x = x
        this.y = y
        this.xx =xx
        this.yy = yy
        this.xxx = xxx
        this.yyy = yyy
        this.cellwidth = 32
        this.cellheight = 32

    }

    Draw(x, y,xx,xxx,yy,yyy) {
        this.x = x
        this.y = y
        return new Promise(resolve => {
            this.apple = new Image()
            this.apple.src = "../img/treasure/Icon1.png"


            this.context.drawImage(this.apple, 0, 0, this.cellwidth, this.cellheight, x, y, 32, 32)


            this.carrot = new Image()
            this.carrot.src = "../img/treasure/Icon25.png"
            this.context.drawImage(this.carrot, 0, 0, this.cellwidth, this.cellheight, xx ,yy, 32, 32)


            this.pepper = new Image()
            this.pepper.src = "../img/treasure/Icon26.png"

            this.context.drawImage(this.pepper, 0, 0, this.cellwidth, this.cellheight, xxx, yyy, 32, 32)


            resolve()
        })

    }
}