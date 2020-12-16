import {generateRandomNumber} from "./utils.js";

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

    }

    Draw(x, y,xx,xxx,yy,yyy) {
        this.x = x
        this.y = y
        return new Promise(resolve => {
            this.apple = new Image()
            this.apple.src = "../img/treasure/apple.png"


            this.context.drawImage(this.apple, 0, 0, 512, 512, x, y, 20, 20)


            this.carrot = new Image()
            this.carrot.src = "../img/treasure/carrot.png"
            this.context.drawImage(this.carrot, 0, 0, 512, 512, xx ,yy, 30, 30)


            this.pepper = new Image()
            this.pepper.src = "../img/treasure/pepper.png"

            this.context.drawImage(this.pepper, 0, 0, 512, 512, xxx, yyy, 30, 30)


            resolve()
        })

    }
}